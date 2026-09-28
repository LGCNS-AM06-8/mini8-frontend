import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem, WarningModal } from '@/components';
import { PATHS } from '@/constants/paths';
import { logout } from '@/services/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import * as S from './Sidebar.styles';

const MENU_ITEMS = [
  { label: '기업 목록', path: PATHS.HOME },
  { label: '북마크', path: PATHS.FAV },
  { label: '마이페이지', path: PATHS.MY_PAGE },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clear);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // 서버에 refresh 토큰 폐기를 요청한 뒤 저장한 토큰을 지운다.
  // 서버 요청이 실패해도(네트워크 · 토큰 불일치) 이 기기에서는 로그아웃시킨다.
  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    const { refreshToken } = useAuthStore.getState();
    try {
      if (refreshToken) await logout(refreshToken);
    } catch {
      // 실패해도 아래에서 로그아웃 처리
    } finally {
      clearAuth();
      navigate(PATHS.LOGIN, { replace: true });
    }
  };

  return (
    <S.Container>
      <S.LogoRow>
        <S.StarIcon />
        <S.Title>기술블로그 가이드</S.Title>
      </S.LogoRow>
      <S.Spacer />
      {MENU_ITEMS.map(({ label, path }) => (
        <MenuItem
          key={path}
          label={label}
          active={location.pathname === path}
          onClick={() => navigate(path)}
        />
      ))}
      <S.FlexSpacer />
      <MenuItem label="로그아웃" onClick={() => setShowLogoutModal(true)} />
      {showLogoutModal && (
        <WarningModal
          title="로그아웃 하시겠어요?"
          description="다시 로그인해야 이용할 수 있어요."
          confirmLabel="로그아웃"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          confirmLoading={loggingOut}
        />
      )}
    </S.Container>
  );
}
