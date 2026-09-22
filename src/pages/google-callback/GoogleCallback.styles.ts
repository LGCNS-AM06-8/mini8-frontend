import styled from 'styled-components';

import StarSvg from '@/assets/icons/star.svg?react';

// 구글에서 돌아와 서버 응답을 기다리는 잠깐 동안 보이는 화면. 시안이 없어 로그인 카드 모양만 맞췄다.
export const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Sigil = styled(StarSvg)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const Message = styled.p`
  ${({ theme }) => theme.fonts.header.h3};
  color: ${({ theme }) => theme.colors.grayScale.gy500};
`;
