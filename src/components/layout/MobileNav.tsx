'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { NAV_LINKS, APP_SIGNUP_URL, APP_LOGIN_URL, BRAND } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !isClient) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over menu */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[290px] sm:max-w-xs bg-white p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-200">
            <div onClick={onClose}>
              <BrandLogo />
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-indigo-600"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <nav className="mt-4 sm:mt-6 flex flex-col space-y-1 sm:space-y-1.5" aria-label="Mobile Navigation Links">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/request-demo"
              className={`block px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                pathname === '/request-demo'
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              onClick={onClose}
            >
              Request Demo
            </Link>
          </nav>
        </div>

        <div className="pt-4 sm:pt-6 border-t border-slate-200 flex flex-col gap-2.5 sm:gap-3">
          <Button
            href={APP_LOGIN_URL}
            variant="outline"
            className="w-full justify-center text-xs sm:text-sm py-2 sm:py-2.5"
            isExternal
          >
            Agency Login
          </Button>
          <Button
            href={APP_SIGNUP_URL}
            variant="primary"
            className="w-full justify-center text-xs sm:text-sm py-2 sm:py-2.5"
            isExternal
          >
            {BRAND.primaryCta}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
