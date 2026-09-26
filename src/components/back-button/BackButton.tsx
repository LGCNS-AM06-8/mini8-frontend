import { useNavigate } from 'react-router-dom';

import * as S from './BackButton.styles';
import type { BackButtonProps } from './BackButton.types';

// onClick 을 넘기지 않으면 브라우저 뒤로 가기(navigate(-1))로 동작한다.
export default function BackButton({ onClick, ...props }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <S.Button
      type="button"
      aria-label="뒤로 가기"
      onClick={onClick ?? (() => navigate(-1))}
      {...props}
    >
      <S.Icon aria-hidden />
    </S.Button>
  );
}
