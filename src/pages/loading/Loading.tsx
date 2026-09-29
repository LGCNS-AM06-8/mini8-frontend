import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoadingDots } from '@/components';
import { PATHS } from '@/constants/paths';
import { generateGuide } from '@/services/guide';
import { useAuthStore } from '@/stores/useAuthStore';
import type { LoadingLocationState, LoadingVariant } from '@/types/navigation';

import * as S from './Loading.styles';

// 로딩 페이지별 문구 구분 변수
const COPY: Record<LoadingVariant, { line1: string; line2: string }> = {
  guide: { line1: '님 만의 리딩 가이드가', line2: '만들어지고 있어요.' },
  companyList: { line1: '님을 위한 기업 리스트를', line2: '준비하고 있어요.' },
};

// companyList는 서버에 저장된걸 불러오기 때문에 대기 시간만 부여
const PACING_DELAY_MS = 2000;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// AI 가이드 보기 선택시, 혹은 기본정보 저장 후 홈으로 갈 때 보이는 로딩 페이지
export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    to = PATHS.HOME,
    postId,
    forwardState,
    variant = 'guide',
  } = (location.state ?? {}) as LoadingLocationState;
  const copy = COPY[variant];
  // 백엔드 서버 없이 텍스트 스타일 확인용 기본값 설정
  const name = useAuthStore((state) => state.name) ?? '사용자';
  // 요청이 이중으로 걸리지 않도록 막음
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const finish = () => navigate(to, { replace: true, state: forwardState });
    // 실패해도 화면은 넘어가고, 실제 에러는 AiGuideDrawer 가 다시 부를 때 띄우도록 함.
    if (variant === 'guide' && postId) generateGuide(postId).then(finish).catch(finish);
    else wait(PACING_DELAY_MS).then(finish);
  }, [navigate, to, postId, variant, forwardState]);

  return (
    <S.Container>
      <S.Content>
        <LoadingDots size="medium" />
        <S.Title>
          <S.Highlight>{name}</S.Highlight>
          {copy.line1}
          <br />
          {copy.line2}
        </S.Title>
        <S.Description>잠시만 기다려주세요...</S.Description>
      </S.Content>
    </S.Container>
  );
}
