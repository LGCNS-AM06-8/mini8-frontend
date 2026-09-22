import { getErrorMessage } from '@/constants/errorMessages';
import { axiosInstance, type ApiError } from '@/lib';
import type { GoogleLoginRequest, GoogleLoginResponse, GoogleLoginResult } from '@/types/auth';

// 서버 로그인 API 가 머지되기 전(작업1)에는 가짜 응답을 쓴다. 실제 서버를 붙일 때(작업2) false 로 바꾸고 목업을 지운다.
const USE_MOCK_SERVER = true;

// 가짜 서버가 「기본정보를 저장한 사용자」인지 기억하는 곳. 목업 기본정보 저장(mockSaveProfile)이 켠다.
const MOCK_PROFILE_KEY = 'mock:profileCompleted';

export const markMockProfileCompleted = () => localStorage.setItem(MOCK_PROFILE_KEY, 'true');

const invalidGoogleToken: ApiError = {
  code: 'INVALID_GOOGLE_TOKEN',
  message: getErrorMessage('INVALID_GOOGLE_TOKEN'),
  field: null,
};

// POST /api/auth/google. 토큰은 응답 헤더로 온다(axios 는 헤더 이름을 소문자로 준다).
const requestGoogleLogin = async (googleAccessToken: string): Promise<GoogleLoginResult> => {
  const body: GoogleLoginRequest = { googleAccessToken };
  const response = await axiosInstance.post<GoogleLoginResponse>('/api/auth/google', body);

  const accessToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  const refreshToken = String(response.headers['refresh-token'] ?? '');
  if (!accessToken || !refreshToken) throw invalidGoogleToken;

  return { ...response.data, accessToken, refreshToken };
};

// 첫 로그인은 profileCompleted=false(→ /userInput), 기본정보를 저장한 뒤 다시 로그인하면 true(→ /home).
const mockGoogleLogin = (googleAccessToken: string) =>
  new Promise<GoogleLoginResult>((resolve, reject) => {
    setTimeout(() => {
      if (!googleAccessToken) {
        reject(invalidGoogleToken);
        return;
      }
      const profileCompleted = localStorage.getItem(MOCK_PROFILE_KEY) === 'true';
      console.info('[mock] POST /api/auth/google', { profileCompleted });
      resolve({
        userId: 1,
        name: '테스트',
        profileCompleted,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      });
    }, 500);
  });

export const loginWithGoogle = USE_MOCK_SERVER ? mockGoogleLogin : requestGoogleLogin;
