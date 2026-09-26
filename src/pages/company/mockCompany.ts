import type { CompanyDetail } from '@/types/company';

// F5 상단(기업 소개 · 통계) 목데이터. GET /api/companies/{id} 가 서버에 생기면 지운다.
// companyId 는 DB company 표 번호와 같게 맞췄다(글 목록은 이미 서버에서 받는다).

const baseStats = {
  firstPublishedAt: '2025-09-22',
  lastPublishedAt: '2026-09-15',
  topCategories: [
    { name: 'Backend', count: 20 },
    { name: 'Frontend', count: 12 },
    { name: 'Infra', count: 8 },
  ],
  topSkills: [
    { name: 'Spring', count: 9 },
    { name: 'Kafka', count: 6 },
    { name: 'React', count: 5 },
  ],
};

// GET /api/companies/{id}. 1번은 Figma 시안 값, 나머지는 null 표시 확인용으로 손 입력 칸을 비운 곳도 둔다.
const mockCompanyDetails: CompanyDetail[] = [
  {
    companyId: 5,
    name: '우아한형제들',
    summary: '배달의민족을 만드는 회사',
    mainBusiness: '음식 배달 · 로봇 배달 · B2B 식자재',
    sourceUrl: 'https://techblog.woowahan.com',
    checkedAt: '2026-09-18',
    stats: {
      postCount: 528,
      firstPublishedAt: '2016-04-28',
      lastPublishedAt: '2026-09-15',
      topCategories: [
        { name: 'Backend', count: 155 },
        { name: 'Culture', count: 122 },
        { name: 'Frontend', count: 75 },
        { name: 'Education', count: 53 },
        { name: 'PM', count: 44 },
      ],
      topSkills: [
        { name: 'AWS', count: 91 },
        { name: 'Spring', count: 81 },
        { name: 'Java', count: 48 },
        { name: 'React', count: 38 },
        { name: 'JPA', count: 38 },
      ],
    },
  },
  {
    companyId: 4,
    name: '토스',
    summary: '금융을 쉽고 간편하게',
    mainBusiness: '간편 송금 · 증권 · 은행',
    sourceUrl: 'https://toss.tech',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 20 },
  },
  {
    companyId: 8,
    name: 'LY(라인)',
    summary: '메신저 LINE 을 만드는 회사',
    mainBusiness: null,
    sourceUrl: 'https://techblog.lycorp.co.jp/ko',
    checkedAt: null,
    stats: { ...baseStats, postCount: 140 },
  },
  {
    companyId: 6,
    name: '컬리',
    summary: '새벽배송 마켓컬리',
    mainBusiness: '신선식품 새벽배송',
    sourceUrl: 'https://helloworld.kurly.com',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 60 },
  },
  {
    companyId: 7,
    name: '네이버 D2',
    summary: '네이버 개발자 블로그',
    mainBusiness: null,
    sourceUrl: 'https://d2.naver.com',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 90 },
  },
  {
    companyId: 3,
    name: 'SK플래닛',
    summary: 'OK캐쉬백 · 시럽을 만드는 회사',
    mainBusiness: null,
    sourceUrl: null,
    checkedAt: null,
    stats: { ...baseStats, postCount: 30 },
  },
  {
    companyId: 1,
    name: '올리브영',
    summary: '헬스 · 뷰티 스토어',
    mainBusiness: '헬스 · 뷰티 커머스',
    sourceUrl: 'https://oliveyoung.tech',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 25 },
  },
  {
    companyId: 2,
    name: '인프랩',
    summary: null,
    mainBusiness: null,
    sourceUrl: null,
    checkedAt: null,
    stats: { ...baseStats, postCount: 15 },
  },
];

export const mockGetCompanyDetail = (companyId: number) =>
  mockCompanyDetails.find((company) => company.companyId === companyId) ?? null;
