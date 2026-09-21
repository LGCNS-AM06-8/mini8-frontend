import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

export default function Layout() {
  return (
    <S.Container>
      <Outlet />
    </S.Container>
  );
}
