import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PATHS } from '@/constants/paths';
import { useAuthStore } from '@/stores/useAuthStore';

// 미로그인 상태로 보호 경로에 들어오면 /login 으로 보낸다. (F0a)
// (추가)단, 로컬 개발 모드(vite dev)에서는 로그인 없이 다른 페이지 작업이 가능하도록 우회함.
export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!accessToken && !import.meta.env.DEV) {
    return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
