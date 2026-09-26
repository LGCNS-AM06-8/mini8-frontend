import * as S from './BookmarkButton.styles';
import type { BookmarkButtonProps } from './BookmarkButton.types';

// Figma 의 State 중 Hover 는 CSS :hover 로, Active(저장됨)는 bookmarked 로 푼다.
export default function BookmarkButton({ bookmarked, ...props }: BookmarkButtonProps) {
  return (
    <S.Button
      type="button"
      aria-pressed={bookmarked}
      aria-label={bookmarked ? '저장 해제' : '저장'}
      $bookmarked={bookmarked}
      {...props}
    >
      {bookmarked ? <S.FilledIcon aria-hidden /> : <S.OutlineIcon aria-hidden />}
    </S.Button>
  );
}
