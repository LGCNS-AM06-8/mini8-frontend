import type { ComponentPropsWithoutRef } from 'react';

// Figma Tag 의 Style=Pill. Removable 은 State 지만 X 아이콘이 붙는 별도 모양이라 variant 로 뺐다.
export type TagVariant = 'pill' | 'removable';

export interface TagProps extends ComponentPropsWithoutRef<'button'> {
  variant?: TagVariant;
  selected?: boolean;
}
