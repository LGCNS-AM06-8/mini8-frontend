import { axiosInstance } from '@/lib';
import type { CompanyPostsResponse } from '@/types/company';

// GET /api/companies/{id}/posts?onlyMySkills= (04 기업 상세 글 카드 목록). 토큰이 필요하다.
// onlyMySkills=true 에서 관심 기술 글이 0편이면 빈 목록이 오고(대체 없음), 화면이 「전체 글 보기」를 안내한다.
export const getCompanyPosts = async (
  companyId: number,
  onlyMySkills: boolean,
): Promise<CompanyPostsResponse> => {
  const response = await axiosInstance.get<CompanyPostsResponse>(
    `/api/companies/${companyId}/posts`,
    { params: { onlyMySkills } },
  );
  return response.data;
};
