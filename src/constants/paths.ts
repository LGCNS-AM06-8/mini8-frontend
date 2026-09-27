// F0a 티켓에 정의된 경로 8개. /userInput 이후는 전부 보호 경로다.
export const PATHS = {
  LANDING: '/landing',
  LOGIN: '/login',
  // 구글 로그인이 access token 을 붙여 돌려보내는 주소. 구글 콘솔의 「승인된 리디렉션」과 같아야 한다.
  GOOGLE_CALLBACK: '/google/callback',
  USER_INPUT: '/userInput',
  // AI 가이드 생성, 기업 리스트 대기
  LOADING: '/loading',
  HOME: '/home',
  COMPANY: '/:companyId',
  BLOG: '/:companyId/:blogId',
  FAV: '/fav',
  MY_PAGE: '/myPage',
} as const;

export const toCompany = (companyId: string) => `/${companyId}`;
export const toBlog = (companyId: string, blogId: string) => `/${companyId}/${blogId}`;
