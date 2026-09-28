import { axiosInstance } from '@/lib';
import type { ProfileRequest, ProfileResponse } from '@/types/profile';

// GET /api/profile (07 마이페이지 조회). 토큰이 필요하다 — 없거나 만료면 인터셉터가 /login 으로 보낸다.
export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await axiosInstance.get<ProfileResponse>('/api/profile');
  return response.data;
};

// POST /api/profile (02 기본정보 최초 저장, 201). 이미 저장한 사용자면 409 PROFILE_ALREADY_EXISTS.
export const createProfile = async (request: ProfileRequest): Promise<ProfileResponse> => {
  const response = await axiosInstance.post<ProfileResponse>('/api/profile', request);
  return response.data;
};

// PUT /api/profile (07 마이페이지 저장, 200). 저장할 때마다 서버가 profileVersion 을 올린다.
export const updateProfile = async (request: ProfileRequest): Promise<ProfileResponse> => {
  const response = await axiosInstance.put<ProfileResponse>('/api/profile', request);
  return response.data;
};
