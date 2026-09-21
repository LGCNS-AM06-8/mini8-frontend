import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { SearchInput, Tag } from '@/components';

import * as S from './TechSelectModal.styles';
import type { TechSelectModalProps } from './TechSelectModal.types';

// 기술 검색 팝업. "선택 완료" 를 눌러야 반영되고, 바깥 클릭 · Esc 는 취소다.
export default function TechSelectModal({
  targetLabel,
  techTags,
  selectedIds,
  blockedIds,
  max,
  onConfirm,
  onClose,
}: TechSelectModalProps) {
  const [draft, setDraft] = useState(selectedIds);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isFull = max !== undefined && draft.length >= max;
  const query = keyword.trim().toLowerCase();
  const visibleTags = techTags.filter((tag) => tag.name.toLowerCase().includes(query));
  const hasBlocked = techTags.some((tag) => blockedIds.includes(tag.techTagId));

  const toggle = (id: number) =>
    setDraft((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));

  return createPortal(
    <S.Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <S.Popup role="dialog" aria-modal="true" aria-labelledby="tech-select-title">
        <S.Title id="tech-select-title">기술 선택</S.Title>
        <S.Description>
          저장된 기술을 검색해 {targetLabel}에 추가하세요
          {max !== undefined && ` (최대 ${max}개)`}
        </S.Description>
        <SearchInput
          placeholder="기술명 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          autoFocus
        />
        <S.Label>저장된 기술</S.Label>
        <S.TagList>
          {visibleTags.map((tag) => {
            const selected = draft.includes(tag.techTagId);
            const blocked = blockedIds.includes(tag.techTagId);
            return (
              <Tag
                key={tag.techTagId}
                selected={selected}
                disabled={blocked || (!selected && isFull)}
                onClick={() => toggle(tag.techTagId)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </S.TagList>
        {visibleTags.length === 0 && <S.Hint>검색 결과가 없어요.</S.Hint>}
        {isFull && <S.Hint>최대 {max}개까지 고를 수 있어요.</S.Hint>}
        {hasBlocked && <S.Hint>다른 칸에서 이미 고른 기술은 선택할 수 없어요.</S.Hint>}
        <S.ConfirmButton onClick={() => onConfirm(draft)}>선택 완료</S.ConfirmButton>
      </S.Popup>
    </S.Overlay>,
    document.body,
  );
}
