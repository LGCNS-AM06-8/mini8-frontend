import styled from 'styled-components';

import TocDotIcon from '@/assets/icons/toc-dot.svg?react';

export const Row = styled.button<{ $highlighted: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5625rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.violet.vt200 : 'transparent'};
  cursor: pointer;
`;

export const AccentBar = styled.span<{ $highlighted: boolean }>`
  flex-shrink: 0;
  width: 0.1875rem;
  height: 0.875rem;
  border-radius: 0.125rem;
  background-color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.violet.vt500 : theme.colors.grayScale.gy100};
`;

export const Order = styled.span`
  ${({ theme }) => theme.fonts.body.large400};
  flex-shrink: 0;
  width: 0.75rem;
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  text-align: center;
`;

export const Title = styled.span<{ $highlighted: boolean }>`
  ${({ theme }) => theme.fonts.body.medium400};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
  color: ${({ $highlighted, theme }) =>
    $highlighted ? theme.colors.grayScale.black : theme.colors.grayScale.gy900};
`;

export const Dot = styled(TocDotIcon)`
  flex-shrink: 0;
  width: 0.3125rem;
  height: 0.3125rem;
`;
