// POST /api/auth/google (노션 API 명세, 09.21 「사용가능」)
export interface GoogleLoginRequest {
  googleAccessToken: string;
}

// 응답 바디. 우리 토큰 두 개는 바디가 아니라 응답 헤더(Authorization · Refresh-Token)로 온다.
export interface GoogleLoginResponse {
  userId: number;
  name: string;
  profileCompleted: boolean;
}

export interface GoogleLoginResult extends GoogleLoginResponse {
  accessToken: string;
  refreshToken: string;
}
