import { axiosInstance } from '@/lib';
import type { ProfileResponse } from '@/types/profile';

// GET /api/profile (07 마이페이지 조회). 토큰이 필요하다 — 없거나 만료면 인터셉터가 /login 으로 보낸다.
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get<ProfileResponse>('/api/profile');
  return response.data;
};
