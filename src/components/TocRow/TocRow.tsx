import * as S from './TocRow.styles';

type TocRowProps = {
  order: number;
  title: string;
  highlighted?: boolean;
  onClick?: () => void;
};

export default function TocRow({ order, title, highlighted = false, onClick }: TocRowProps) {
  return (
    <S.Row type="button" $highlighted={highlighted} onClick={onClick}>
      <S.AccentBar $highlighted={highlighted} />
      <S.Order>{order}</S.Order>
      <S.Title $highlighted={highlighted}>{title}</S.Title>
      {highlighted && <S.Dot />}
    </S.Row>
  );
}
