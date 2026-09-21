import type { ComponentPropsWithoutRef } from 'react';

export interface ToggleProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
