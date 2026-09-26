import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { GradientCard } from '@/components';
import { getErrorMessage } from '@/constants/errorMessages';
import { PATHS } from '@/constants/paths';
import { readGoogleCallback, type ApiError } from '@/lib';
import { loginWithGoogle } from '@/services/auth';
import { useAuthStore } from '@/stores/useAuthStore';

import * as S from './GoogleCallback.styles';

// 구글 로그인에서 돌아오는 곳 (/google/callback#access_token=...).
// 구글 access token 을 우리 서버에 보내 우리 토큰 두 개를 받고, 기본정보 저장 여부로 다음 화면을 고른다.
export default function GoogleCallback() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((state) => state.setTokens);
  // 같은 구글 토큰으로 서버를 두 번 부르지 않게 막는다.
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const fail = (message: string = getErrorMessage('INVALID_GOOGLE_TOKEN')) =>
      navigate(PATHS.LOGIN, { replace: true, state: { loginError: message } });

    const googleAccessToken = readGoogleCallback(window.location.hash);
    if (!googleAccessToken) {
      fail();
      return;
    }

    // 이름 받아오는 변수 추가
    loginWithGoogle(googleAccessToken)
      .then(({ accessToken, refreshToken, name, profileCompleted }) => {
        setTokens(accessToken, refreshToken, name);
        navigate(profileCompleted ? PATHS.HOME : PATHS.USER_INPUT, { replace: true });
      })
      .catch((error: ApiError) => fail(error.message));
  }, [navigate, setTokens]);

  return (
    <GradientCard>
      <S.Body>
        <S.Sigil aria-hidden />
        <S.Message>구글 계정을 확인하고 있어요</S.Message>
      </S.Body>
    </GradientCard>
  );
}
