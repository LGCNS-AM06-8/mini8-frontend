import { axiosInstance } from '@/lib';
import type { TechTag, TechTagsResponse } from '@/types/profile';

// GET /api/tech-tags. 토큰 없이 부른다. 순서는 서버가 계열별로 고정해 주니 그대로 쓰고,
// id 는 DB 적재값이라 명세 예시(1~20)와 다르다 — 응답 값을 그대로 쓴다.
export const getTechTags = async (): Promise<TechTag[]> => {
  const response = await axiosInstance.get<TechTagsResponse>('/api/tech-tags');
  return response.data.techTags;
};
