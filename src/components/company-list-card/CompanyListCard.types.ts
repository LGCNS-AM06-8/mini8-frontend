import type { CompanySummary } from '@/types/company';

export interface CompanyListCardProps {
  company: CompanySummary;
  // 사용자가 고른 "더 알아보고 싶은 기술" 이름. 설명 문구의 괄호 안에 들어간다.
  interestSkills: string[];
  logoUrl?: string;
}
