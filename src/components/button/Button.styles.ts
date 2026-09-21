import styled, { css } from 'styled-components';

import type { ButtonVariant } from './Button.types';

// Figma 공통 컴포넌트 Button (node 171:509). 길이는 Figma px ÷ 16 으로 rem 환산.
const variantStyle = {
  // 화면의 주 CTA. TODO: Figma 상 hover 가 default 와 값이 같음 (디자인 확인 필요)
  primary: css`
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.violet.vt500};
    color: ${({ theme }) => theme.colors.grayScale.white};
  `,

  // primary 옆 보조 액션. 호버하면 연보라
  secondary: css`
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.grayScale.white};
    color: ${({ theme }) => theme.colors.grayScale.black};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.violet.vt200};
      color: ${({ theme }) => theme.colors.violet.vt500};
    }
  `,

  // primary 와 같은 보라인데 글씨만 작다 (font-size/lg)
  warning: css`
    padding: 0.75rem 1.25rem;
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.colors.violet.vt500};
    color: ${({ theme }) => theme.colors.grayScale.white};
    font-size: 0.8125rem;
  `,

  // 카드 안에서 쓰는 작은 강조 버튼. TODO: 11.5px 이 Figma 변수에 연결돼 있지 않음
  soft: css`
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.grayScale.gy100};
    color: ${({ theme }) => theme.colors.violet.vt500};
    font-size: 0.7188rem;
  `,
} satisfies Record<ButtonVariant, ReturnType<typeof css>>;

export const Button = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  white-space: nowrap;
  word-break: break-word;

  ${({ theme }) => theme.fonts.title.semiBold600};
  ${({ $variant }) => variantStyle[$variant]};

  /* Figma 는 primary/secondary 에만 정의돼 있지만 네 변형에 모두 적용한다 */
  &:disabled {
    background-color: ${({ theme }) => theme.colors.grayScale.gy100};
    color: ${({ theme }) => theme.colors.grayScale.gy300};
    cursor: not-allowed;
  }
`;
