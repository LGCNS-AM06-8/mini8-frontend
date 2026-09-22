import * as S from './GradientCard.styles';
import type { GradientCardProps } from './GradientCard.types';

// 사이드바 없는 화면(로그인 · 기본정보 입력)의 보라 배경 + 가운데 흰 카드. 카드 안 배치는 각 화면이 정한다.
export default function GradientCard({ children }: GradientCardProps) {
  return (
    <S.Container>
      <S.Card>{children}</S.Card>
    </S.Container>
  );
}
