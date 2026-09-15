'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { NAV_LINKS, APP_SIGNUP_URL, APP_LOGIN_URL, BRAND } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when mobile menu is open
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over menu */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-[#0F172A]"
              onClick={onClose}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white font-black text-sm">
                TD
              </span>
              <span>{BRAND.name}</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#4F46E5]"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col space-y-1" aria-label="Mobile Navigation Links">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-[#4F46E5]'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col gap-3">
          <Button
            href={APP_LOGIN_URL}
            variant="outline"
            className="w-full justify-center"
            isExternal
          >
            Log in
          </Button>
          <Button
            href={APP_SIGNUP_URL}
            variant="primary"
            className="w-full justify-center"
            isExternal
          >
            {BRAND.primaryCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
