import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const Path = styled.h1`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;

export const Note = styled.p`
  ${({ theme }) => theme.fonts.body.small400};
  color: ${({ theme }) => theme.colors.grayScale.gy500};
`;
