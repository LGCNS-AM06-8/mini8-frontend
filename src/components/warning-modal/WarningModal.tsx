import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/button';

import * as S from './WarningModal.styles';
import type { WarningModalProps } from './WarningModal.types';

export default function WarningModal({
  title,
  description,
  cancelLabel = '취소',
  confirmLabel,
  onCancel,
  onConfirm,
  confirmLoading = false,
}: WarningModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return createPortal(
    <S.Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <S.Popup role="alertdialog" aria-modal="true" aria-labelledby="warning-modal-title">
        <S.IconBadge aria-hidden>!</S.IconBadge>
        <S.Title id="warning-modal-title">{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        <S.Actions>
          <Button variant="secondary" onClick={onCancel} disabled={confirmLoading}>
            {cancelLabel}
          </Button>
          <Button variant="warning" onClick={onConfirm} loading={confirmLoading}>
            {confirmLabel}
          </Button>
        </S.Actions>
      </S.Popup>
    </S.Overlay>,
    document.body,
  );
}
