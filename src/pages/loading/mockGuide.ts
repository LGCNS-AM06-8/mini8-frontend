// AI 가이드 API 작성 전까지 로딩데이터 띄우는 목업 - 2초로 설정(API 연결 후 제거)
export const mockGenerateGuide = () => new Promise<void>((resolve) => setTimeout(resolve, 2000));
