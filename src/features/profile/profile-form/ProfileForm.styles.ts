import styled from 'styled-components';

import { Button } from '@/components';

// Figma /userInput - 2안 (node 278:3001) 의 입력 영역
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

export const CareerInput = styled.input`
  width: 12.5rem;
  padding: 0.6875rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.gy100};
  border-radius: 0.5rem;
  outline: none;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayScale.gy700};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.violet.vt500};
  }
`;

export const AddButton = styled.button`
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.875rem;
  background-color: ${({ theme }) => theme.colors.grayScale.white};
  color: ${({ theme }) => theme.colors.grayScale.black};
  ${({ theme }) => theme.fonts.body.small400};
`;

// 오류 전용 색 변수가 아직 없어서 주 색(vt500)으로 표시한다
export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.violet.vt500};
  ${({ theme }) => theme.fonts.body.small400};
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;
