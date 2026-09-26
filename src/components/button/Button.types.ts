import type { ComponentPropsWithoutRef } from 'react';

// Figma 의 Type 프로퍼티. HTML button type 과 겹쳐서 코드에서는 variant 로 받는다.
export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'soft';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  // 요청 중. 버튼을 잠가 중복 클릭을 막고 글자 대신 점 세 개를 보여 준다 (F9)
  loading?: boolean;
}
