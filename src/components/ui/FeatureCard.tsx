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
  interactive = true,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative rounded-xl border border-slate-200/90 bg-white p-6 sm:p-7 transition-all duration-200',
        interactive && 'hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 shadow-xs">
            {icon}
          </div>
        )}
        {badge && (
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
