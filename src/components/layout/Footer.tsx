import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { BrandLogo } from '@/components/ui/BrandLogo';
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
    <footer className="border-t border-slate-800 bg-[#0F172A] text-slate-400">
      <Container size="default" className="py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <BrandLogo variant="dark" showSubtitle />
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              {BRAND.tagline}
            </p>
            <p className="mt-2 text-xs text-slate-500 max-w-sm">
              Purpose-built SaaS for Indian travel agencies, boutique holiday planners, tour operators, and destination management companies worldwide.
            </p>
            {/* <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Infrastructure Ready</span>
            </div> */}
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={APP_SIGNUP_URL}
                  className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
                >
                  Start Free Trial →
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  {'isExternal' in link && link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  {'isExternal' in link && link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm" role="list">
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
