import RemoveSvg from '@/assets/icons/remove.svg?react';

import * as S from './Tag.styles';
import type { TagProps } from './Tag.types';

export default function Tag({
  variant = 'pill',
  selected = false,
  type = 'button',
  children,
  ...props
}: TagProps) {
  return (
    <S.Tag
      $variant={variant}
      $selected={selected}
      type={type}
      aria-pressed={variant === 'pill' ? selected : undefined}
      {...props}
    >
      {children}
      {variant === 'removable' && (
        <S.RemoveIcon aria-hidden>
          <RemoveSvg />
        </S.RemoveIcon>
      )}
    </S.Tag>
  );
}
