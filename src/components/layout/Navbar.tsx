'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { NAV_LINKS, APP_SIGNUP_URL, APP_LOGIN_URL, BRAND } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { MobileNav } from '@/components/layout/MobileNav';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <Container size="default">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-[#0F172A] tracking-tight group focus-visible:outline-2 focus-visible:outline-[#4F46E5] rounded-md"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white font-black text-sm shadow-sm group-hover:bg-[#4338CA] transition-colors">
                TD
              </span>
              <span className="text-lg sm:text-xl font-bold">{BRAND.name}</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'text-[#4F46E5] bg-indigo-50/70 font-semibold'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href={APP_LOGIN_URL}
              variant="ghost"
              size="sm"
              isExternal
            >
              Log in
            </Button>
            <Button
              href={APP_SIGNUP_URL}
              variant="primary"
              size="sm"
              isExternal
            >
              {BRAND.primaryCta}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#4F46E5]"
              aria-expanded={mobileMenuOpen}
              aria-label="Open mobile navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
