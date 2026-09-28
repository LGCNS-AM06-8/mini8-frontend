import { axiosInstance } from '@/lib';
import type { GuideResponse } from '@/types/guide';

// AI 가이드는 처음 만들 때 AI 응답을 기다려야 해서 이 호출만 60초까지 기다린다(다른 요청은 10초).
export const GUIDE_TIMEOUT_MS = 60_000;

// POST /api/posts/{id}/guide (05 AI 가이드). 토큰 필요, 기본정보가 없으면 PROFILE_REQUIRED.
export const generateGuide = async (postId: number): Promise<GuideResponse> => {
  const response = await axiosInstance.post<GuideResponse>(`/api/posts/${postId}/guide`, null, {
    timeout: GUIDE_TIMEOUT_MS,
  });
  return response.data;
};
