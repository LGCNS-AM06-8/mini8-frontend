import type { TechTag } from '@/types/profile';

export interface TechSelectModalProps {
  // 어느 칸에 추가하는지에 따라 안내 문구가 달라진다
  targetLabel: string;
  techTags: TechTag[];
  selectedIds: number[];
  // 다른 칸에서 이미 고른 기술 — 보유 · 관심 동시 선택 금지
  blockedIds: number[];
  max?: number;
  onConfirm: (ids: number[]) => void;
  onClose: () => void;
}
