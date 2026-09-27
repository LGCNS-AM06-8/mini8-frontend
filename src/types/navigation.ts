// 화면에 보여줄 문구. guide = AI 읽기 가이드 생성 중(기본), companyList = 기본정보 저장 후 기업 리스트 준비 중
export type LoadingVariant = 'guide' | 'companyList';

// /loading 으로 이동해 올 때 넘기는 값. 완료되면 to 로 이동하고, forwardState 는 그 화면에 그대로 넘김
export interface LoadingLocationState {
  to?: string;
  forwardState?: unknown;
  variant?: LoadingVariant;
}
