import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  className?: string;
  markOnly?: boolean;
}

export function BrandLogo({
  variant = 'light',
  showSubtitle = false,
  className = '',
  markOnly = false,
}: BrandLogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}
      aria-label="Your Travel Desk — Home"
    >
      {markOnly ? (
        <Image
          src="/logo-mark.svg"
          alt="Your Travel Desk Logo Mark"
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-lg shadow-sm"
          priority
        />
      ) : isDark ? (
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo-mark.svg"
            alt="Your Travel Desk"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-lg shadow-sm"
          />
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-lg font-black tracking-tight text-white">
              Your Travel <span className="text-indigo-400">Desk</span>
            </span>
            {showSubtitle && (
              <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">
                Agency Suite
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Your Travel Desk"
            width={160}
            height={40}
            className="h-12 sm:h-16 w-auto shrink-0 max-w-40 sm:max-w-none"
            priority
          />
        </div>
      )}
    </Link>
  );
}
