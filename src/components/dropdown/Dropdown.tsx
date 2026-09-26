import * as S from './Dropdown.styles';
import type { DropdownProps } from './Dropdown.types';

// 펼친 목록 시안이 없어 브라우저 기본 select 목록을 쓰고, 닫힌 모양만 Figma 에 맞췄다.
export default function Dropdown<T extends string>({
  options,
  value,
  onChange,
  ...props
}: DropdownProps<T>) {
  return (
    <S.Wrapper>
      <S.Select value={value} onChange={(event) => onChange(event.target.value as T)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>
      <S.Chevron aria-hidden />
    </S.Wrapper>
  );
}
