'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronRight } from 'lucide-react';
import { NAV_LINKS, APP_LOGIN_URL } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { MobileNav } from '@/components/layout/MobileNav';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-[#F9F9F6]/95 backdrop-blur-md transition-all">
      <Container size="default">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${
                      isActive
                        ? 'text-slate-950 bg-stone-200/70'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-stone-200/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Actions (Brand Logo Color Combination: Indigo-600 + Slate Outline) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white rounded-full transition-all shadow-sm shadow-indigo-600/25"
            >
              <span>Book a demo</span>
              <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
            <a
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 text-xs sm:text-sm font-bold bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-900 border border-slate-300 rounded-full transition-all shadow-xs"
            >
              <span>Get started</span>
              <ChevronRight className="h-3.5 w-3.5 stroke-[2.5] text-slate-500" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-950 rounded-lg hover:bg-stone-200/50 focus-visible:outline-2 focus-visible:outline-slate-900"
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
