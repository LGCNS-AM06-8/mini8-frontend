import type { ComponentPropsWithoutRef } from 'react';

export type SearchInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'type'>;
