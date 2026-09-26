import type { ReactNode } from 'react';

// loading: 불러오는 중 · empty: 결과 0건 · error: 실패 (F9)
export type StateNoticeTone = 'loading' | 'empty' | 'error';

export interface StateNoticeAction {
  label: string;
  onClick: () => void;
}

export interface StateNoticeProps {
  tone: StateNoticeTone;
  title: ReactNode;
  description?: ReactNode;
  // 다시 시도 · 목록으로 등 한 가지 행동
  action?: StateNoticeAction;
  // 테두리 없이 화면 가운데에만 띄울 때 (전체 화면 로딩 등)
  bare?: boolean;
}
