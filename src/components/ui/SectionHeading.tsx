import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface SectionHeadingProps extends BaseProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  titleAs?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  titleAs: TitleTag = 'h2',
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div className={cn('flex flex-col max-w-3xl mb-12 lg:mb-16', alignClasses, className)}>
      {eyebrow && (
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#4F46E5] uppercase mb-2">
          {eyebrow}
        </span>
      )}
      <TitleTag className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#0F172A] leading-tight">
        {title}
      </TitleTag>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
