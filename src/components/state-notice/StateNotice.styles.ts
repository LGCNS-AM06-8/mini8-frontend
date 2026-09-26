import styled, { css } from 'styled-components';

// F5 기업 상세의 안내 상자(Notice)와 같은 모양
export const Container = styled.div<{ $bare: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1.375rem;
  text-align: center;

  ${({ $bare, theme }) =>
    !$bare &&
    css`
      border: 1px solid ${theme.colors.grayScale.gy100};
      border-radius: 0.75rem;
    `}
`;

export const Title = styled.p`
  ${({ theme }) => theme.fonts.body.large400};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Description = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy700};
`;
