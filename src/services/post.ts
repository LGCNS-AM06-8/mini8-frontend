import { axiosInstance } from '@/lib';
import type { PostDetail } from '@/types/post';

// GET /api/posts/{id}
export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  const response = await axiosInstance.get<PostDetail>(`/api/posts/${postId}`);
  return response.data;
};
