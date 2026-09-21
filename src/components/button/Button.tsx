import * as S from './Button.styles';
import type { ButtonProps } from './Button.types';

// type 기본값이 button 인 이유: HTML 기본값은 submit 이라 form 안에서 의도치 않게 제출된다.
export default function Button({
  variant = 'primary',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <S.Button $variant={variant} type={type} {...props}>
      {children}
    </S.Button>
  );
}
