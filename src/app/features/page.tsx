import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame';
import { Button } from '@/components/ui/Button';
import { BRAND, APP_SIGNUP_URL, PRODUCT_MODULES } from '@/lib/constants';
import {
  Compass,
  FileText,
  CalendarCheck,
  Users,
  Building2,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features — Travel Agency Management Modules',
  description:
    'Explore the 8 verified core modules of Your Travel Desk: Trip workspaces, quotation generator, booking vouchers, client CRM, hotel rates, and payment tracking.',
};

const MODULE_ICONS: Record<string, LucideIcon> = {
  trips: Compass,
  quotations: FileText,
  bookings: CalendarCheck,
  customers: Users,
  rates: Building2,
  finance: CreditCard,
  analytics: TrendingUp,
  branding: ShieldCheck,
};

export default function FeaturesPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="default">
        <SectionHeading
          eyebrow="Verified Product Modules"
          title="Engineered specifically for travel agency operations."
          description={`Every module in ${BRAND.name} is designed around real tour operator workflows. No generic bloat, no complex configurations—just what you need to run trips efficiently.`}
        />

        {/* Feature Deep-Dive Grid */}
        <div className="mt-16 sm:mt-20 space-y-24 lg:space-y-32">
          {PRODUCT_MODULES.map((module, idx) => {
            const Icon = MODULE_ICONS[module.id] || Compass;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={module.id}
                id={module.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-slate-100 pb-20 sm:pb-24 last:border-0 last:pb-0"
              >
                {/* Details Column */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 mb-4 shadow-2xs">
                    <Icon className="h-3.5 w-3.5 text-indigo-600" />
                    <span>{module.badge}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight leading-tight">
                    {module.title}
                  </h2>

                  <p className="mt-4 text-base text-slate-700 leading-relaxed font-semibold">
                    {module.shortDesc}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {module.longDesc}
                  </p>

                  <div className="mt-8 flex items-center gap-3.5">
                    <Button
                      href={APP_SIGNUP_URL}
                      variant="primary"
                      size="sm"
                      isExternal
                    >
                      <span>Try in 7-Day Trial</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button
                      href="/request-demo"
                      variant="outline"
                      size="sm"
                    >
                      Book Demo
                    </Button>
                  </div>
                </div>

                {/* Screenshot Visual Column */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ScreenshotFrame
                    imageSrc={module.screenshot}
                    imageAlt={`${BRAND.name} ${module.title}`}
                    title={module.title}
                    subtitle={module.shortDesc}
                    icon={Icon}
                    badge={module.badge}
                    aspectRatio="video"
                    floatingChips={[
                      {
                        label: module.title,
                        sublabel: 'Verified SaaS Module',
                        icon: Icon,
                        position: 'top-right',
                      },
                    ]}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Conversion Card */}
        <div className="mt-24 rounded-3xl bg-[#0F172A] p-8 sm:p-14 text-center text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-full max-w-xs sm:w-96 opacity-25 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Ready to streamline your travel desk?
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Get instant access to all 8 core management modules. No setup fees, no credit card required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={APP_SIGNUP_URL}
              variant="primary"
              size="lg"
              isExternal
              className="w-full sm:w-auto shadow-md shadow-indigo-600/30"
            >
              <span>{BRAND.primaryCta}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              href="/request-demo"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-slate-800"
            >
              Request a Walkthrough
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
