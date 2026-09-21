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
