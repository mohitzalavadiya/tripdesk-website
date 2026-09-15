import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  BRAND,
  FOOTER_PRODUCT_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_LEGAL_LINKS,
  APP_SIGNUP_URL,
} from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-[#0F172A]">
      <Container size="default" className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-xl text-[#0F172A] tracking-tight group inline-flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white font-black text-sm">
                TD
              </span>
              <span className="text-xl font-bold">{BRAND.name}</span>
            </Link>
            <p className="mt-3 text-sm text-[#475569] max-w-sm leading-relaxed">
              {BRAND.tagline}
            </p>
            <p className="mt-2 text-xs text-slate-500 max-w-sm">
              The operating system designed for small and medium travel agencies, tour operators, and DMCs.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={APP_SIGNUP_URL}
                  className="text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors"
                >
                  Start Free Trial →
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#475569] hover:text-[#0F172A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#475569]">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0F172A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0F172A] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
