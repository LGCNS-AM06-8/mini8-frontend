import * as S from './MenuItem.styles';

type MenuItemProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export default function MenuItem({ label, active = false, onClick }: MenuItemProps) {
  return (
    <S.Item type="button" $active={active} onClick={onClick}>
      {label}
    </S.Item>
  );
}
