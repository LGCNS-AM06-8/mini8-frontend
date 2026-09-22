export type LoadingDotsSize = 'small' | 'medium';

export interface LoadingDotsProps {
  size?: LoadingDotsSize;
  // 버튼 안처럼 글자색을 따라가야 할 때 true. 기본은 피그마 /loading 의 보라
  inheritColor?: boolean;
  // 화면 읽기 프로그램이 읽는 문구
  label?: string;
}
