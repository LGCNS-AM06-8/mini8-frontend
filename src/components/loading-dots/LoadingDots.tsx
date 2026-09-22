import * as S from './LoadingDots.styles';
import type { LoadingDotsProps } from './LoadingDots.types';

export default function LoadingDots({
  size = 'medium',
  inheritColor = false,
  label = '불러오는 중',
}: LoadingDotsProps) {
  return (
    <S.Dots role="status" aria-label={label} $size={size} $inheritColor={inheritColor}>
      <S.Dot />
      <S.Dot />
      <S.Dot />
    </S.Dots>
  );
}
