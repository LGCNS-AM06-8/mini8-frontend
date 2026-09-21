import type { ComponentPropsWithoutRef } from 'react';

// Figma 의 Type 프로퍼티. HTML button type 과 겹쳐서 코드에서는 variant 로 받는다.
export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'soft';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
}
