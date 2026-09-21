import type { JobField } from '@/types/profile';

// 화면 표시 / 서버 전송값 (09.21 확정). 피그마 칩의 "AI" 는 코드에서 모바일로 쓴다.
export const JOB_FIELD_OPTIONS: { value: JobField; label: string }[] = [
  { value: 'Backend', label: '백엔드' },
  { value: 'Frontend', label: '프론트엔드' },
  { value: 'Data', label: '데이터' },
  { value: 'Infra', label: '인프라' },
  { value: 'Mobile', label: '모바일' },
];

export const WANT_SKILL_MAX = 5;
