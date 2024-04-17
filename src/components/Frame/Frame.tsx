import React, { memo } from 'react';
import cn from 'clsx';
import * as s from './styles.module.scss';

export type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Frame = memo<Props>(({ className, children }) => <div className={cn(s.root, className)}>{children}</div>);

Frame.displayName = 'Frame';
