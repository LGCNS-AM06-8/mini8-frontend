import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem, WarningModal } from '@/components';
import { PATHS } from '@/constants/paths';
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

  const handleLogout = () => {
    clearAuth();
    navigate(PATHS.LOGIN);
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
        />
      )}
    </S.Container>
  );
}
