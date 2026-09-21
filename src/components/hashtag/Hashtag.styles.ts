import styled from 'styled-components';

import type { HashtagVariant } from './Hashtag.types';

// Figma 공통 컴포넌트 Hashtag (node 273:545). 기업 카드 · 글 카드 · 글 상세 헤더에서 쓴다.
export const Hashtag = styled.span<{ $variant: HashtagVariant }>`
  white-space: nowrap;
  color: ${({ theme, $variant }) =>
    $variant === 'tech' ? theme.colors.violet.vt500 : theme.colors.grayScale.gy700};
  ${({ theme }) => theme.fonts.body.medium400};
`;
