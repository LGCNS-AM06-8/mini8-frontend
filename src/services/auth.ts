import { getErrorMessage } from '@/constants/errorMessages';
import { axiosInstance, type ApiError } from '@/lib';
import type { GoogleLoginRequest, GoogleLoginResponse, GoogleLoginResult } from '@/types/auth';

const invalidGoogleToken: ApiError = {
  code: 'INVALID_GOOGLE_TOKEN',
  message: getErrorMessage('INVALID_GOOGLE_TOKEN'),
  field: null,
};

// POST /api/auth/google. 토큰은 응답 헤더로 온다(axios 는 헤더 이름을 소문자로 준다).
export const loginWithGoogle = async (googleAccessToken: string): Promise<GoogleLoginResult> => {
  const body: GoogleLoginRequest = { googleAccessToken };
  const response = await axiosInstance.post<GoogleLoginResponse>('/api/auth/google', body);

  const accessToken = String(response.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  const refreshToken = String(response.headers['refresh-token'] ?? '');
  if (!accessToken || !refreshToken) throw invalidGoogleToken;

  return { ...response.data, accessToken, refreshToken };
};
