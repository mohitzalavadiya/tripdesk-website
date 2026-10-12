import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame';
import { BRAND, APP_SIGNUP_URL } from '@/lib/constants';
import { UserCheck, Compass, FileText, CalendarCheck, Receipt, Wallet, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works — Step-by-Step Travel Agency Workflow',
  description:
    'Discover how Your Travel Desk turns customer inquiries into confirmed bookings, supplier vouchers, and collected payments in 6 connected steps.',
};

const STEP_DETAILS = [
  {
    step: '01',
    icon: UserCheck,
    title: 'Customer Inquiry & Profile Setup',
    summary: 'Consolidate travelers and their preferences without searching messy chat histories.',
    details:
      'When a client reaches out for a domestic holiday or international tour, create or open their profile in the Customer Directory. Add contact info, passport details, number of travelers, and trip dates. Every past and future quote stays connected to this single client record.',
    image: '/screenshots/dashboard.png',
  },
  {
    step: '02',
    icon: Compass,
    title: 'Trip Workspace & Day-Wise Itinerary',
    summary: 'Map out destinations, schedules, passenger counts, and travel items.',
    details:
      'Open a Trip Workspace. Define the travel window, specify destinations (e.g. Dwarka, Kashmir, Dubai), allocate travelers, and draft day-by-day travel schedules with hotel check-ins, transfers, and activities.',
    image: '/screenshots/trips.png',
  },
  {
    step: '03',
    icon: FileText,
    title: 'Instant Quotation & Proposal Generation',
    summary: 'Pull live rates from your catalog and generate pricing proposals in seconds.',
    details:
      'Generate a commercial proposal directly from the trip. Select room types from your hotel database, add vehicle tariffs, and let Your Travel Desk compute net costs. Apply your agency markup with automated percentage calculation and share the proposal with your client.',
    image: '/screenshots/quotations.png',
  },
  {
    step: '04',
    icon: CalendarCheck,
    title: 'One-Click Booking Confirmation & Vouchers',
    summary: 'Transform accepted quotations into active bookings and issue supplier vouchers.',
    details:
      'Once the traveler approves the quotation, lock in the booking with a single click. Generate booking reference numbers, supplier rooming vouchers, and driver transfer sheets. Move the trip from Planning to Confirmed status.',
    image: '/screenshots/bookings.png',
  },
  {
    step: '05',
    icon: Receipt,
    title: 'Invoice Generation & Installment Schedules',
    summary: 'Issue compliant invoices reflecting custom package items and taxes.',
    details:
      'Create a formal invoice directly from confirmed booking records. Set up installment milestones: advance deposit at booking, second installment before travel, and final payment before departure.',
    image: '/screenshots/dashboard.png',
  },
  {
    step: '06',
    icon: Wallet,
    title: 'Payment Reconciliation & Margin Tracking',
    summary: 'Log bank or UPI collections, reconcile supplier payables, and view profit.',
    details:
      'Record collections as they arrive. The payment ledger tracks outstanding receivables, payables owed to suppliers, and your realized gross profit margin in real time on the Executive Dashboard.',
    image: '/screenshots/dashboard.png',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="default">
        <SectionHeading
          eyebrow="Connected Agency Workflow"
          title="From initial inquiry to final payment collection."
          description={`Discover how ${BRAND.name} eliminates double entry and connects every phase of your travel operations into one seamless lifecycle.`}
        />

        {/* 6 Step Cards with Details */}
        <div className="mt-16 sm:mt-20 space-y-24 lg:space-y-32">
          {STEP_DETAILS.map((step, idx) => {
            const Icon = step.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={step.step}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center border-b border-slate-100 pb-20 sm:pb-24 last:border-0 last:pb-0"
              >
                {/* Text description */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-mono font-bold text-indigo-700 shadow-2xs">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight leading-tight">
                    {step.title}
                  </h2>

                  <p className="mt-4 text-base text-slate-700 font-semibold leading-relaxed">
                    {step.summary}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                    {step.details}
                  </p>
                </div>

                {/* Screenshot visual */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <ScreenshotFrame
                    imageSrc={step.image}
                    imageAlt={`${BRAND.name} ${step.title}`}
                    title={step.title}
                    subtitle={step.summary}
                    icon={Icon}
                    badge={`Step ${step.step}`}
                    aspectRatio="video"
                    floatingChips={[
                      {
                        label: step.title,
                        sublabel: `Phase ${idx + 1} • Connected Pipeline`,
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

        {/* Bottom CTA */}
        <div className="mt-24 rounded-3xl bg-[#0F172A] p-8 sm:p-14 text-center text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-full max-w-xs sm:w-96 opacity-25 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Ready to experience this workflow firsthand?
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
            Test the entire process with sample trips in our 7-day free trial, or schedule a personalized team demo.
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
