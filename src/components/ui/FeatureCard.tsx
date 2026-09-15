import React from 'react';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';

interface FeatureCardProps extends BaseProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  interactive?: boolean;
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  interactive = false,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 sm:p-8 transition-all',
        interactive && 'hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      {badge && (
        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-[#4F46E5] mb-4">
          {badge}
        </span>
      )}
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5] mb-5">
          {icon}
        </div>
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
