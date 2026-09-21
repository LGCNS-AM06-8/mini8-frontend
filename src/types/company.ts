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
