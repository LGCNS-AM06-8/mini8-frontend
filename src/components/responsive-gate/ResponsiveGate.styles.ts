import styled from 'styled-components';

import DesktopSvg from '@/assets/icons/desktop.svg?react';

// 화면 전체가 고정폭(GradientCard 등 최대 1044px 카드 + 여백)이라 이 아래 폭에서는 레이아웃이 깨진다
export const AppContent = styled.div`
  @media (width <= 80rem) {
    display: none;
  }
`;

export const Notice = styled.div`
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9999;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.colors.violet.vt100};

  @media (width <= 80rem) {
    display: flex;
  }
`;

export const Icon = styled(DesktopSvg)`
  width: 5rem;
  height: 5rem;
`;
