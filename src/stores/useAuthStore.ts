import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  // 로딩 화면("OOO님 만의 리딩 가이드가...")에 쓰는 구글 로그인 응답 이름
  name: string | null;
  setTokens: (accessToken: string, refreshToken: string, name: string) => void;
  clear: () => void;
}

// 토큰 보관 위치는 localStorage 로 정했다 (메모리면 새로고침 시 로그아웃되므로).
// React 밖에서는 useAuthStore.getState() 로 읽는다 — AxiosInstance 가 그렇게 쓴다.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      name: null,
      setTokens: (accessToken, refreshToken, name) => set({ accessToken, refreshToken, name }),
      clear: () => set({ accessToken: null, refreshToken: null, name: null }),
    }),
    { name: 'auth' },
  ),
);
