import type { ComponentPropsWithoutRef } from 'react';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

export interface DropdownProps<T extends string> extends Omit<
  ComponentPropsWithoutRef<'select'>,
  'value' | 'onChange'
> {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}
