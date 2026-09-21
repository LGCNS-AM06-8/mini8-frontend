import { Outlet } from 'react-router-dom';

import Sidebar from '@/layout/Sidebar/Sidebar';
import * as S from './SidebarLayout.styles';

// 사이드바가 붙는 보호 경로용 레이아웃 (홈 · 북마크 · 마이페이지 · 기업 상세). 블로그 상세는 제외한다.
export default function SidebarLayout() {
  return (
    <S.Container>
      <Sidebar />
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Container>
  );
}
