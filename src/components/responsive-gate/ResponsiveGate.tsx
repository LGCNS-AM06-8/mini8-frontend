import { StateNotice } from '@/components/state-notice';

import * as S from './ResponsiveGate.styles';
import type { ResponsiveGateProps } from './ResponsiveGate.types';

// 프로토타입 디자인은 데스크탑 전용이므로 다른 레이아웃에서 화면을 제한
export default function ResponsiveGate({ children }: ResponsiveGateProps) {
  return (
    <>
      <S.Notice>
        <S.Icon aria-hidden />
        <StateNotice
          tone="error"
          title="PC 화면으로 이용해 주세요"
          description="이 서비스는 데스크탑 화면 크기에 맞춰 만들어졌어요."
          bare
        />
      </S.Notice>
      <S.AppContent>{children}</S.AppContent>
    </>
  );
}
