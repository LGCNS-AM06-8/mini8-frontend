import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem } from '@/components';
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
      <MenuItem label="로그아웃" onClick={handleLogout} />
    </S.Container>
  );
}
