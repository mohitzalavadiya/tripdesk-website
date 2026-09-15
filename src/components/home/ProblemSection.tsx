import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Users, FileSpreadsheet, Building2, CreditCard, Sparkles } from 'lucide-react';

const PROBLEMS = [
  {
    icon: Users,
    title: 'Customer information everywhere',
    description:
      'Contacts, passenger passports, and travel histories scattered across inboxes, messaging apps, and separate files.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Quotations take too much time',
    description:
      'Manually drafting itineraries from scratch, calculating supplier markups, and retyping prices for every inquiry.',
  },
  {
    icon: Building2,
    title: 'Hotel rates are difficult to manage',
    description:
      'Losing track of seasonal contracts, room categories, blackout dates, and supplier rate changes across static sheets.',
  },
  {
    icon: CreditCard,
    title: 'Bookings and payments are harder to track',
    description:
      'Struggling with partial client installments, unlinked supplier vouchers, and manual reconciliation headaches.',
  },
];

export function ProblemSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container size="default">
        <SectionHeading
          eyebrow="Built for the way travel agencies work"
          title="Your travel business shouldn't run on spreadsheets and scattered information."
          description="As an agency grows, managing customers, trips, quotations, bookings, and payments across different tools can become difficult. TripDesk brings the core workflow together."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs transition-all hover:border-slate-300"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Section conclusion callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-[#4F46E5] shadow-2xs">
            <Sparkles className="h-4 w-4" />
            <span>Bring your workflow together with TripDesk.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
