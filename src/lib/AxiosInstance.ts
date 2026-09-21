import axios, { AxiosError } from 'axios';

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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const code = error.response?.data?.code;

    switch (code) {
      case 'UNAUTHORIZED':
      case 'INVALID_REFRESH_TOKEN':
        useAuthStore.getState().clear();
        redirect(PATHS.LOGIN);
        break;
      case 'PROFILE_REQUIRED':
        redirect(PATHS.USER_INPUT);
        break;
      // TOKEN_EXPIRED 는 재발급 후 재시도 — F0b 에서 처리한다.
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
