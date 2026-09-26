import styled, { keyframes } from 'styled-components';

import type { LoadingDotsSize } from './LoadingDots.types';

// 피그마 /loading (node 278:3404) 의 점 세 개. 시안은 Lottie 자리만 잡혀 있어 CSS 로 튀게 만든다.
const bounce = keyframes`
  0%, 80%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  40% {
    opacity: 1;
    transform: translateY(-40%);
  }
`;

const dotSize = {
  small: '0.375rem',
  medium: '0.5rem',
} satisfies Record<LoadingDotsSize, string>;

export const Dots = styled.span<{ $size: LoadingDotsSize; $inheritColor: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $size }) => ($size === 'small' ? '0.25rem' : '0.375rem')};
  color: ${({ theme, $inheritColor }) => ($inheritColor ? 'inherit' : theme.colors.violet.vt700)};

  --dot-size: ${({ $size }) => dotSize[$size]};
`;

export const Dot = styled.span`
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background-color: currentcolor;
  animation: ${bounce} 1s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.15s;
  }

  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
