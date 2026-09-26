import * as S from './Toggle.styles';
import type { ToggleProps } from './Toggle.types';

// 화면에 보이는 라벨과 이어 주려면 aria-label 이나 aria-labelledby 를 함께 넘긴다.
export default function Toggle({ checked, onChange, ...props }: ToggleProps) {
  return (
    <S.Track
      type="button"
      role="switch"
      aria-checked={checked}
      $checked={checked}
      onClick={() => onChange(!checked)}
      {...props}
    >
      <S.Thumb $checked={checked} />
    </S.Track>
  );
}
