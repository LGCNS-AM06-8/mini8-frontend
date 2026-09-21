import type { CompanyDetail, CompanyPost, CompanyPostsResponse } from '@/types/company';

// F5 목데이터. 숫자와 글은 예시이고, 실제 API 연동 전까지 화면 구조 확인용.
// 관심 기술은 F4 목데이터(mockCompanies 의 mockUser)와 같게 맞췄다.
const MY_SKILLS = ['Kafka', 'Redis'];

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
    companyId: 1,
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
    companyId: 2,
    name: '토스',
    summary: '금융을 쉽고 간편하게',
    mainBusiness: '간편 송금 · 증권 · 은행',
    sourceUrl: 'https://toss.tech',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 20 },
  },
  {
    companyId: 3,
    name: 'LY(라인)',
    summary: '메신저 LINE 을 만드는 회사',
    mainBusiness: null,
    sourceUrl: 'https://techblog.lycorp.co.jp/ko',
    checkedAt: null,
    stats: { ...baseStats, postCount: 140 },
  },
  {
    companyId: 4,
    name: '컬리',
    summary: '새벽배송 마켓컬리',
    mainBusiness: '신선식품 새벽배송',
    sourceUrl: 'https://helloworld.kurly.com',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 60 },
  },
  {
    companyId: 5,
    name: '네이버 D2',
    summary: '네이버 개발자 블로그',
    mainBusiness: null,
    sourceUrl: 'https://d2.naver.com',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 90 },
  },
  {
    companyId: 6,
    name: 'SK플래닛',
    summary: 'OK캐쉬백 · 시럽을 만드는 회사',
    mainBusiness: null,
    sourceUrl: null,
    checkedAt: null,
    stats: { ...baseStats, postCount: 30 },
  },
  {
    companyId: 7,
    name: '올리브영',
    summary: '헬스 · 뷰티 스토어',
    mainBusiness: '헬스 · 뷰티 커머스',
    sourceUrl: 'https://oliveyoung.tech',
    checkedAt: '2026-09-18',
    stats: { ...baseStats, postCount: 25 },
  },
  {
    companyId: 8,
    name: '인프랩',
    summary: null,
    mainBusiness: null,
    sourceUrl: null,
    checkedAt: null,
    stats: { ...baseStats, postCount: 15 },
  },
];

const createPost = (
  post: Pick<
    CompanyPost,
    'postId' | 'title' | 'publishedAt' | 'categories' | 'skills' | 'summary' | 'bookmarked'
  >,
): CompanyPost => ({
  level: '중급',
  matchedSkills: post.skills.filter((skill) => MY_SKILLS.includes(skill)),
  charCount: 8000,
  sectionCount: 8,
  originalUrl: 'https://techblog.woowahan.com',
  hasGuide: false,
  ...post,
});

// 서버 정렬(관심 기술 겹침 수 → 최신순)을 흉내 내려고 순서를 그대로 둔다.
const woowahanPosts: CompanyPost[] = [
  createPost({
    postId: 101,
    title: 'Kafka 와 Redis 로 주문 이벤트 유실 없이 처리하기',
    publishedAt: '2026-08-02',
    categories: ['Backend'],
    skills: ['Kafka', 'Redis', 'Spring'],
    summary:
      '주문 상태가 바뀔 때마다 이벤트를 발행하면서 생긴 중복·유실 문제를 Kafka 트랜잭션과 Redis 멱등 키로 막은 과정을 정리했습니다.',
    bookmarked: true,
  }),
  createPost({
    postId: 102,
    title: '집 나간 네트워크는 돌아왔는데 React.lazy는 왜 안 돌아올까',
    publishedAt: '2026-09-15',
    categories: ['Frontend'],
    skills: ['React', 'Redis'],
    summary:
      '파트너(업주)님이 영업 내내 주문을 받는 배민주문접수 웹뷰를 개발하던 중, QA 과정에서 네트워크가 오프라인에서 온라인으로 바뀐 뒤 다른 화면으로 이동하면 오류 화면이 뜨는 문제를 발견했습니다. 원인을 추적해보니 브라우저가 한 번 실패한 모듈 요청을 내부적으로 계속 캐시하고 있었고, 이는 버그가 아니라 HTML 스펙에 명시된 동작이었습니다.',
    bookmarked: false,
  }),
  createPost({
    postId: 103,
    title: '대규모 트래픽에서 Kafka 컨슈머 지연 줄이기',
    publishedAt: '2026-05-11',
    categories: ['Backend', 'Infra'],
    skills: ['Kafka'],
    summary:
      '점심 피크 시간에 컨슈머 랙이 수십만 건까지 쌓이던 문제를 파티션 재설계와 배치 처리로 해결한 경험을 공유합니다.',
    bookmarked: false,
  }),
  createPost({
    postId: 104,
    title: 'Spring Boot 3 전환기',
    publishedAt: '2026-09-01',
    categories: ['Backend'],
    skills: ['Spring', 'Java'],
    summary:
      'Java 17 과 Jakarta 패키지 변경을 포함해 수백 개 모듈을 Spring Boot 3 로 옮기며 겪은 호환성 문제와 순서를 정리했습니다.',
    bookmarked: false,
  }),
  createPost({
    postId: 105,
    title: '디자인 시스템 문서 사이트 빌드 시간 절반으로 줄이기',
    publishedAt: '2026-07-20',
    categories: ['Frontend'],
    skills: ['React', 'Vite'],
    summary:
      '사내 디자인 시스템 문서 사이트를 정적 배포로 바꾸면서 빌드 시간을 절반으로 줄인 방법입니다.',
    bookmarked: false,
  }),
];

// 올리브영은 관심 기술 글이 0편인 기업 예시다(빈 목록 → 화면이 빈 상태를 그림).
const oliveyoungPosts: CompanyPost[] = [
  createPost({
    postId: 701,
    title: '올리브영 검색 랭킹 개선기',
    publishedAt: '2026-06-03',
    categories: ['Data'],
    skills: ['Elasticsearch'],
    summary: '검색어별 클릭 데이터를 모아 랭킹 모델을 다시 학습시킨 과정을 소개합니다.',
    bookmarked: false,
  }),
  createPost({
    postId: 702,
    title: '프론트엔드 모노레포 도입 후 1년',
    publishedAt: '2026-08-21',
    categories: ['Frontend'],
    skills: ['React'],
    summary: '여러 서비스의 프론트엔드를 모노레포로 합친 뒤 좋아진 점과 남은 숙제를 정리했습니다.',
    bookmarked: false,
  }),
];

const mockPostsByCompany: Record<number, CompanyPost[]> = {
  1: woowahanPosts,
  7: oliveyoungPosts,
};

export const mockGetCompanyDetail = (companyId: number) =>
  mockCompanyDetails.find((company) => company.companyId === companyId) ?? null;

// GET /api/companies/{id}/posts?onlyMySkills=. false 면 그 기업 전체 글을 최신순으로 준다(명세).
export const mockGetCompanyPosts = (
  companyId: number,
  onlyMySkills: boolean,
): CompanyPostsResponse => {
  const all = mockPostsByCompany[companyId] ?? [];
  const matched = all.filter((post) => post.matchedSkills.length > 0);
  const latest = [...all].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return {
    filter: { onlyMySkills, matchedCount: matched.length, totalCount: all.length },
    posts: onlyMySkills ? matched : latest,
  };
};
