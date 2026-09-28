import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { getErrorMessage } from '@/constants/errorMessages';
import { PATHS } from '@/constants/paths';
import { useAuthStore } from '@/stores/useAuthStore';

// 서버가 주는 오류 본문
export interface ApiErrorBody {
  code: string;
  message: string;
  field: string | null;
}

// 화면이 실제로 쓰는 오류. message 는 서버 원문이 아니라 code 를 바꾼 우리 문구다.
export interface ApiError {
  code: string;
  message: string;
  field: string | null;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// 라우터 밖(인터셉터)이라 navigate 를 못 써서 location 으로 이동한다.
const redirect = (path: string) => {
  if (window.location.pathname !== path) window.location.replace(path);
};

const logoutToLogin = () => {
  useAuthStore.getState().clear();
  redirect(PATHS.LOGIN);
};

// POST /api/auth/refresh. refresh 토큰은 요청 헤더 Refresh-Token, 새 access 토큰은 응답 헤더 Authorization.
// 만료된 access 토큰을 붙이면 서버가 그 자체로 막으므로 인터셉터가 없는 기본 axios 로 부른다.
const requestNewAccessToken = async (refreshToken: string) => {
  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`, null, {
    headers: { 'Refresh-Token': refreshToken },
    withCredentials: true,
    timeout: 10000,
  });
  const accessToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  if (!accessToken) throw new Error('재발급 응답에 토큰이 없습니다');
  useAuthStore.getState().setAccessToken(accessToken);
  return accessToken;
};

// 한 화면이 요청을 여러 개 보내 동시에 만료되면, 재발급은 한 번만 하고 나머지는 그 결과를 기다린다.
let refreshing: Promise<string> | null = null;
const refreshAccessToken = (refreshToken: string) => {
  refreshing ??= requestNewAccessToken(refreshToken).finally(() => {
    refreshing = null;
  });
  return refreshing;
};

type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const code = error.response?.data?.code;
    const config = error.config as RetriableConfig | undefined;

    // access 토큰이 만료되면 재발급받아 원래 요청을 한 번만 다시 보낸다.
    // 재발급까지 실패하면(refresh 토큰 만료 · 폐기) 로그인 화면으로 보낸다.
    if (code === 'TOKEN_EXPIRED' && config && !config._retried) {
      const { refreshToken } = useAuthStore.getState();
      if (refreshToken) {
        config._retried = true;
        try {
          const accessToken = await refreshAccessToken(refreshToken);
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(config);
        } catch {
          logoutToLogin();
          return Promise.reject({
            code: 'INVALID_REFRESH_TOKEN',
            message: getErrorMessage('INVALID_REFRESH_TOKEN'),
            field: null,
          } satisfies ApiError);
        }
      }
    }

    switch (code) {
      case 'UNAUTHORIZED':
      case 'TOKEN_EXPIRED':
      case 'INVALID_REFRESH_TOKEN':
        logoutToLogin();
        break;
      case 'PROFILE_REQUIRED':
        redirect(PATHS.USER_INPUT);
        break;
    }

    const apiError: ApiError = {
      code: code ?? 'INTERNAL_ERROR',
      message: getErrorMessage(code),
      field: error.response?.data?.field ?? null,
    };
    return Promise.reject(apiError);
  },
);

export default axiosInstance;
