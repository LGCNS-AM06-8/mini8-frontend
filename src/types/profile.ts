// GET /api/tech-tags · POST /api/profile (노션 API 명세 + 09.21 디스코드 확정값)
export type JobField = 'Backend' | 'Frontend' | 'Data' | 'Infra' | 'Mobile';

export interface TechTag {
  techTagId: number;
  name: string;
  field: JobField;
  postCount: number;
}

export interface TechTagsResponse {
  techTags: TechTag[];
}

export interface ProfileRequest {
  jobFields: JobField[];
  careerYears: number;
  haveSkillIds: number[];
  wantSkillIds: number[];
}

// GET /api/profile (07 마이페이지 조회). careerYears 가 null 이면 아직 입력하지 않은 것
export interface ProfileSkill {
  techTagId: number;
  name: string;
}

export interface ProfileResponse {
  name: string;
  jobFields: JobField[];
  careerYears: number | null;
  haveSkills: ProfileSkill[];
  wantSkills: ProfileSkill[];
  profileVersion: number;
}
