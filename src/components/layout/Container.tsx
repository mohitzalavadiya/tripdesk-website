import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface ContainerProps extends BaseProps {
  as?: React.ElementType;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function Container({
  as: Component = 'div',
  size = 'default',
  className,
  children,
  ...props
}: ContainerProps & React.HTMLAttributes<HTMLElement>) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
    full: 'max-w-full',
  }[size];

  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
