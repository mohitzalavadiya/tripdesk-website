import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { BRAND, APP_SIGNUP_URL } from '@/lib/constants';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Purpose-Built Travel SaaS',
  description:
    'Learn about Your Travel Desk, a focused SaaS operating system engineered to eliminate spreadsheet chaos for independent travel agencies and tour operators.',
  alternates: {
    canonical: '/about',
  },
};

const PRINCIPLES = [
  {
    title: 'Focused on Travel Realities',
    desc: 'Unlike generic CRM software, every feature is built around the actual dynamics of day-wise travel itineraries, room meal plans, passenger lists, and installment ledgers.',
  },
  {
    title: 'Zero Unnecessary Complexity',
    desc: 'We prioritize straightforward usability so boutique agency founders and booking teams can master the platform in minutes, without requiring technical consultants.',
  },
  {
    title: 'Connected Operations',
    desc: 'Eliminating duplicate data entry between quotation drafts, booking vouchers, and tax invoices to protect margins and reduce human calculation errors.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-20 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Our Focus & Philosophy"
          title="The Operating System for Modern Travel Agencies"
          description={`${BRAND.name} was built to solve a clear and widespread problem: travel professionals forced to run their businesses across fragmented spreadsheets, WhatsApp threads, and disconnected invoicing tools.`}
        />

        <div className="mt-8 sm:mt-16 space-y-8 sm:space-y-10 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50/70 p-5 sm:p-10 shadow-xs">
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
              Why We Built {BRAND.name}
            </h3>
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              Travel agencies create memorable experiences for travelers, but managing the operational backend is often exhausting. Inquiries get delayed in messaging apps, quotations require manual formulas in Word, supplier contracts sit in static PDFs, and tracking whether a client paid their second installment involves paper diaries.
            </p>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed">
              We engineered {BRAND.name} to centralize that entire journey into one connected workspace. From the first customer inquiry to day-by-day itinerary planning, supplier voucher generation, and automated installment tracking, everything stays in sync.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-2xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Our Core Principles
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {PRINCIPLES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs hover:border-indigo-300 transition-colors"
                >
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 sm:gap-2.5">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 shrink-0" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 pl-6 sm:pl-7 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-indigo-200/80 bg-indigo-50/60 p-5 sm:p-10 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-8 shadow-xs">
            <div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Experience {BRAND.name} Today
              </h4>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 max-w-md">
                Explore our full feature suite risk-free with our 7-day free trial on the Starter plan.
              </p>
            </div>
            <div className="mt-5 sm:mt-0 shrink-0">
              <Button
                href={APP_SIGNUP_URL}
                variant="primary"
                size="lg"
                isExternal
                className="w-full sm:w-auto shadow-md shadow-indigo-600/25 text-xs sm:text-base py-3 sm:py-3.5"
              >
                <span>{BRAND.primaryCta}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
