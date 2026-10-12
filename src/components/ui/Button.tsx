import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'teal' | 'navy' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  isExternal,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantClasses = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/25 hover:shadow-md hover:shadow-indigo-600/30 hover:-translate-y-0.5 focus-visible:outline-indigo-600',
    teal:
      'bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-600/20 hover:shadow-md hover:shadow-teal-600/25 hover:-translate-y-0.5 focus-visible:outline-teal-600',
    navy:
      'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-slate-900',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200/90 focus-visible:outline-slate-400',
    outline:
      'border border-slate-200/90 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 focus-visible:outline-indigo-600 shadow-2xs hover:shadow-xs',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 focus-visible:outline-indigo-600',
  }[variant];

  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 font-semibold',
    md: 'text-sm px-4.5 py-2.5 gap-2 font-semibold',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-bold',
  }[size];

  const combinedClasses = cn(baseClasses, variantClasses, sizeClasses, className);

  if (href) {
    if (isExternal || href.startsWith('http')) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
