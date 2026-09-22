import { PATHS } from '@/constants/paths';

// 구글 로그인은 리다이렉트로 access token 을 받는 방식(implicit, response_type=token)이다. (09.22 확정)
// 구글 창에서 로그인하면 /google/callback#access_token=... 으로 돌아온다.
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const STATE_KEY = 'googleOAuthState';

// 떠나기 전에 만든 state 를 돌아와서 비교해, 우리가 보낸 요청의 응답인지 확인한다.
export const redirectToGoogleLogin = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('[google] .env.local 에 VITE_GOOGLE_CLIENT_ID 가 없습니다.');
    return false;
  }

  const state = crypto.randomUUID();
  sessionStorage.setItem(STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${window.location.origin}${PATHS.GOOGLE_CALLBACK}`,
    response_type: 'token',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  });
  window.location.assign(`${GOOGLE_AUTH_URL}?${params}`);
  return true;
};

// 돌아온 주소의 # 뒤에서 access token 을 꺼낸다. 취소 · 오류 · state 불일치면 null.
export const readGoogleCallback = (hash: string) => {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const savedState = sessionStorage.getItem(STATE_KEY);
  sessionStorage.removeItem(STATE_KEY);

  const accessToken = params.get('access_token');
  if (params.get('error') || !accessToken || !savedState || params.get('state') !== savedState) {
    return null;
  }
  return accessToken;
};
