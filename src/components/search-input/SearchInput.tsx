import * as S from './SearchInput.styles';
import type { SearchInputProps } from './SearchInput.types';

export default function SearchInput(props: SearchInputProps) {
  return (
    <S.Container>
      <S.Icon aria-hidden />
      <S.Input type="text" {...props} />
    </S.Container>
  );
}
