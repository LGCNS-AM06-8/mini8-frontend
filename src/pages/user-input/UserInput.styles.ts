import styled from 'styled-components';

import StarSvg from '@/assets/icons/star.svg?react';

// Figma /userInput - 2안 (node 278:3001). 배경 그라데이션은 변수가 아닌 프레임 채우기 색이다.
// 피그마 값은 정지점 순서가 뒤섞여 CSS 에선 중간에 경계가 생겨서, 시안 렌더와 같아 보이게 순서만 바로잡았다
export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 4.875rem;
  background-image: linear-gradient(
    180deg,
    rgb(231 227 255) 0%,
    rgb(137 122 220) 50%,
    rgb(100 73 251) 100%
  );
`;

export const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 65.25rem;
  min-height: 43.75rem;
  border-radius: 1.5rem;
  background-color: ${({ theme }) => theme.colors.violet.vt000};
  box-shadow: 0 1.875rem 5rem rgb(0 0 0 / 35%);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 38.1875rem;
  padding: 2rem 0;
`;

export const Sigil = styled(StarSvg)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.header.h1};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grayScale.gy500};
  ${({ theme }) => theme.fonts.body.small400};
`;
