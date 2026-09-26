// GET /api/companies 응답의 기업 한 곳 (노션 API 명세, 09.21 기준 "작성중")
export interface MatchedSkill {
  name: string;
  postCount: number;
}

export interface CompanySummary {
  companyId: number;
  name: string;
  summary: string;
  matchedSkillCount: number;
  totalSkillCount: number;
  matchedPostCount: number;
  totalPostCount: number;
  matchedSkills: MatchedSkill[];
  recommended: boolean;
}

// GET /api/companies/{id} 응답 (노션 API 명세, 09.21 기준 "작성중")
// 손으로 채우는 4칸(summary · mainBusiness · sourceUrl · checkedAt)은 티켓 기준 null 일 수 있다.
export interface NameCount {
  name: string;
  count: number;
}

export interface CompanyStats {
  postCount: number;
  firstPublishedAt: string;
  lastPublishedAt: string;
  topCategories: NameCount[];
  topSkills: NameCount[];
}

export interface CompanyDetail {
  companyId: number;
  name: string;
  summary: string | null;
  mainBusiness: string | null;
  sourceUrl: string | null;
  checkedAt: string | null;
  stats: CompanyStats;
}

// GET /api/companies/{id}/posts 응답 (노션 API 명세, 09.21 확정)
export type PostLevel = '입문' | '중급' | '고급';

export interface CompanyPost {
  postId: number;
  title: string;
  publishedAt: string;
  categories: string[];
  level: PostLevel;
  summary: string;
  skills: string[];
  matchedSkills: string[];
  charCount: number;
  sectionCount: number;
  originalUrl: string;
  bookmarked: boolean;
  hasGuide: boolean;
}

export interface CompanyPostsResponse {
  filter: {
    onlyMySkills: boolean;
    matchedCount: number;
    totalCount: number;
  };
  posts: CompanyPost[];
}
