import { LoadingDots } from '@/components/loading-dots';

import * as S from './Button.styles';
import type { ButtonProps } from './Button.types';

// type 기본값이 button 인 이유: HTML 기본값은 submit 이라 form 안에서 의도치 않게 제출된다.
export default function Button({
  variant = 'primary',
  type = 'button',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <S.Button
      $variant={variant}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* 글자는 숨기기만 해서 로딩 중에도 버튼 너비가 그대로다 */}
      <S.Label $hidden={loading}>{children}</S.Label>
      {loading && (
        <S.Loading>
          <LoadingDots size="small" inheritColor label="처리하는 중" />
        </S.Loading>
      )}
    </S.Button>
  );
}
