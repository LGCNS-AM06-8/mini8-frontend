import { Button } from '@/components/button';
import { LoadingDots } from '@/components/loading-dots';

import * as S from './StateNotice.styles';
import type { StateNoticeProps } from './StateNotice.types';

// 로딩 · 빈 상태 · 오류를 같은 자리에 같은 모양으로 보여 준다 (F9).
export default function StateNotice({
  tone,
  title,
  description,
  action,
  bare = false,
}: StateNoticeProps) {
  return (
    <S.Container $bare={bare} role={tone === 'error' ? 'alert' : undefined}>
      {tone === 'loading' && <LoadingDots />}
      <S.Title>{title}</S.Title>
      {description && <S.Description>{description}</S.Description>}
      {action && (
        <Button variant="soft" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </S.Container>
  );
}
