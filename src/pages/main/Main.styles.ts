import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.fonts.header.h2};
  color: ${({ theme }) => theme.colors.grayScale.black};
`;
