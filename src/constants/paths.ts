// F0a 티켓에 정의된 경로 8개. /userInput 이후는 전부 보호 경로다.
export const PATHS = {
  LANDING: '/landing',
  LOGIN: '/login',
  USER_INPUT: '/userInput',
  HOME: '/home',
  COMPANY: '/:companyId',
  BLOG: '/:companyId/:blogId',
  FAV: '/fav',
  MY_PAGE: '/myPage',
} as const;

export const toCompany = (companyId: string) => `/${companyId}`;
export const toBlog = (companyId: string, blogId: string) => `/${companyId}/${blogId}`;
