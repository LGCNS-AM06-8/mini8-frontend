import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, GradientCard } from '@/components';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/errorMessages';
import { redirectToGoogleLogin } from '@/lib';

import * as S from './Login.styles';

// 로그인 (F2 · 01). 버튼을 누르면 구글 로그인 창으로 갔다가 /google/callback 으로 돌아온다.
export default function Login() {
  const location = useLocation();
  // 콜백 화면에서 실패하면 문구를 state 로 넘겨 여기로 돌려보낸다.
  const callbackError = (location.state as { loginError?: string } | null)?.loginError;
  const [error, setError] = useState(callbackError);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleLogin = () => {
    setIsRedirecting(true);
    if (!redirectToGoogleLogin()) {
      setIsRedirecting(false);
      setError(DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <GradientCard>
      <S.Body>
        <S.BigStar aria-hidden />
        <S.Sigil aria-hidden />
        <S.Title>
          안녕하세요!
          <br />
          기술블로그 읽기 가이드예요
        </S.Title>
        <S.Subtitle>내 수준에 맞게 어떤 글을 어떻게 읽을지 알려드려요</S.Subtitle>
        <Button onClick={handleLogin} loading={isRedirecting}>
          Google로 3초 만에 시작하기
        </Button>
        {error && <S.ErrorText role="alert">{error}</S.ErrorText>}
      </S.Body>
    </GradientCard>
  );
}
