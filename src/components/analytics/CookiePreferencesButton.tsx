'use client';

import React from 'react';

interface CookiePreferencesButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function CookiePreferencesButton({
  className = 'hover:text-slate-300 transition-colors cursor-pointer',
  children = 'Cookie Preferences',
}: CookiePreferencesButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ytd:open-consent-banner'));
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
