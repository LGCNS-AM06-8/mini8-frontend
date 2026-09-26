import type { ReactNode } from 'react';

export interface WarningModalProps {
  title: ReactNode;
  description?: ReactNode;
  // 기본값 "취소"
  cancelLabel?: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  // 확인 버튼이 요청 중일 때 (F9)
  confirmLoading?: boolean;
}
