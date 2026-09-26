import type { ComponentPropsWithoutRef } from 'react';

export interface BookmarkButtonProps extends ComponentPropsWithoutRef<'button'> {
  bookmarked: boolean;
}
