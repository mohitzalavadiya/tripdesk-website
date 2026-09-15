import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const variantClasses = {
    primary:
      'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-sm focus-visible:outline-[#4F46E5] active:bg-[#3730A3]',
    secondary:
      'bg-slate-100 text-[#0F172A] hover:bg-slate-200 focus-visible:outline-slate-400 active:bg-slate-300',
    outline:
      'border border-slate-300 bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-400 focus-visible:outline-[#4F46E5]',
    ghost:
      'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 focus-visible:outline-[#4F46E5]',
  }[variant];

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
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
