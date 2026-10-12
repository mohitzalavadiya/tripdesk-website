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
    <div className={cn('flex flex-col max-w-3xl mb-12 sm:mb-16', alignClasses, className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-bold tracking-wider text-indigo-700 uppercase mb-4 shadow-2xs">
          <span>{eyebrow}</span>
        </div>
      )}
      <TitleTag className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-900 leading-[1.14]">
        {title}
      </TitleTag>
      {description && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
