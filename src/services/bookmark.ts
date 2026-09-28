import { axiosInstance } from '@/lib';

// POST /api/bookmarks/{postId} (201). 이미 저장한 글이면 409 ALREADY_BOOKMARKED, 없는 글이면 404.
export const addBookmark = async (postId: number): Promise<void> => {
  await axiosInstance.post(`/api/bookmarks/${postId}`);
};

// DELETE /api/bookmarks/{postId} (204). 저장하지 않은 글이면 404.
export const removeBookmark = async (postId: number): Promise<void> => {
  await axiosInstance.delete(`/api/bookmarks/${postId}`);
};
