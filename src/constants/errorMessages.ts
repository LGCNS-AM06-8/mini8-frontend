// 서버 오류 응답 형식: { code, message, field }
// 서버의 message 원문은 노출하지 않고 code 를 아래 문구로 바꿔서 보여 준다. (F0a 요구사항)
export const ERROR_MESSAGES = {
  UNAUTHORIZED: '로그인이 필요합니다.',
  TOKEN_EXPIRED: '로그인이 만료되었습니다.',
  INVALID_GOOGLE_TOKEN: '구글 로그인에 실패했습니다. 다시 시도해 주세요.',
  INVALID_REFRESH_TOKEN: '로그인이 만료되었습니다. 다시 로그인해 주세요.',
  INVALID_INPUT: '입력한 내용을 다시 확인해 주세요.',
  PROFILE_REQUIRED: '기본 정보를 먼저 입력해 주세요.',
  NOT_FOUND: '요청하신 항목을 찾을 수 없습니다.',
  ALREADY_BOOKMARKED: '이미 저장한 글입니다.',
  AI_UNAVAILABLE: 'AI 가이드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.',
  INTERNAL_ERROR: '문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;

export const DEFAULT_ERROR_MESSAGE = '문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';

export const getErrorMessage = (code?: string) =>
  (code && ERROR_MESSAGES[code as ErrorCode]) || DEFAULT_ERROR_MESSAGE;
