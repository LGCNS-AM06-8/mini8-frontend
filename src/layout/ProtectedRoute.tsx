import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { PATHS } from '@/constants/paths';
import { useAuthStore } from '@/stores/useAuthStore';

// 미로그인 상태로 보호 경로에 들어오면 /login 으로 보낸다. (F0a)
export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();

  if (!accessToken) return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;

  return <Outlet />;
}
