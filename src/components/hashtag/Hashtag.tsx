import * as S from './Hashtag.styles';
import type { HashtagProps } from './Hashtag.types';

// children 에는 # 없이 이름만 넘긴다. 서버 응답의 기술 이름을 그대로 쓰기 위해서다.
export default function Hashtag({ variant = 'category', children, ...props }: HashtagProps) {
  return (
    <S.Hashtag $variant={variant} {...props}>
      #{children}
    </S.Hashtag>
  );
}
