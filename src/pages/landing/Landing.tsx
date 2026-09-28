import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GradientCard } from '@/components';
import { PATHS } from '@/constants/paths';
import { useAuthStore } from '@/stores/useAuthStore';

import * as S from './Landing.styles';

// 등장 애니메이션(약 1.7초)을 본 뒤 잠깐 머물고 넘어간다
const AUTO_NEXT_MS = 3500;

// 랜딩 (F10 · 08). 별과 문구가 차례로 나타난 뒤 로그인 화면으로 넘어간다.
// 이미 로그인한 사용자는 기업 목록으로 보낸다. 화면을 누르면 기다리지 않고 바로 넘어간다.
export default function Landing() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);

  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  // 컷처럼 끊기지 않게 짧게 사라진 뒤 이동한다(움직임 줄이기 설정이면 바로 이동)
  const goNext = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    const move = () => navigate(accessToken ? PATHS.HOME : PATHS.LOGIN, { replace: true });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      move();
      return;
    }
    setLeaving(true);
    window.setTimeout(move, S.FADE_OUT_MS);
  }, [accessToken, navigate]);

  useEffect(() => {
    const timer = window.setTimeout(goNext, AUTO_NEXT_MS);
    return () => window.clearTimeout(timer);
  }, [goNext]);

  return (
    <GradientCard>
      <S.Body
        type="button"
        onClick={goNext}
        $leaving={leaving}
        aria-label="기술블로그 읽기 가이드 시작하기"
      >
        <S.Group>
          <S.BigStar aria-hidden />
          <S.Title>
            <S.Line $order={0}>새로운 기술이</S.Line>
            <S.Line $order={1}>기다려지는</S.Line>
            <S.Line $order={2}>
              당신만의 <S.Highlight>기술 리딩 큐레이션</S.Highlight>
            </S.Line>
          </S.Title>
          <S.SmallStar aria-hidden />
        </S.Group>
      </S.Body>
    </GradientCard>
  );
}
