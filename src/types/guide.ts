// POST /api/posts/{id}/guide 응답 (백엔드 GuideResponseDTO 와 같은 칸 이름)
export interface GuideBasis {
  careerYears: number | null;
  haveSkills: string[];
  wantSkills: string[];
}

export interface GuideSectionBadge {
  seq: number;
  badge: string;
}

export interface GuideResponse {
  guideId: number;
  // 같은 사용자 · 글 · 프로필 버전이면 저장된 결과를 다시 준다
  cached: boolean;
  basis: GuideBasis;
  focusSections: number[];
  sectionBadges: GuideSectionBadge[];
  section1Text: string;
  section2Text: string;
  section3Text: string;
}
