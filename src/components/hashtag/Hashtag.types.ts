import type { ComponentPropsWithoutRef } from 'react';

// Figma Hashtag 의 Type. category = 파트 · 카테고리(회색), tech = 기술 스택(보라)
export type HashtagVariant = 'category' | 'tech';

export interface HashtagProps extends ComponentPropsWithoutRef<'span'> {
  variant?: HashtagVariant;
}
