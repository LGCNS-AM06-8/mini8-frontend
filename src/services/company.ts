import { axiosInstance } from '@/lib';
import type {
  CompaniesResponse,
  CompanyDetail,
  CompanyPostsResponse,
  CompanySummary,
} from '@/types/company';

// GET /api/companies (03 기업 목록). 토큰 필요. 서버가 관심 기술 겹침 수 → 겹친 글 수 순으로 정렬해 준다.
export const getCompanies = async (): Promise<CompanySummary[]> => {
  const response = await axiosInstance.get<CompaniesResponse>('/api/companies');
  return response.data.companies;
};

// GET /api/companies/{id} (04 기업 상세 상단). 토큰 불필요, 없는 기업이면 404 NOT_FOUND.
export const getCompanyDetail = async (companyId: number): Promise<CompanyDetail> => {
  const response = await axiosInstance.get<CompanyDetail>(`/api/companies/${companyId}`);
  return response.data;
};

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
