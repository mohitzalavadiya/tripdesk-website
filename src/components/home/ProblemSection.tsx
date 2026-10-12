import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Users, Zap, ShieldCheck, CreditCard, ArrowRight, Check } from 'lucide-react';

const PILLARS = [
  {
    icon: Users,
    tag: 'CONTROL',
    title: 'Customer data in one place',
    description:
      'Client notes, passport copies, and traveler preferences stop getting lost in personal WhatsApp chats. Keep a unified traveler CRM with complete family rosters and trip history.',
    solution: 'Unified Traveler CRM & History',
  },
  {
    icon: Zap,
    tag: 'SPEED',
    title: 'Quotations in 3 minutes',
    description:
      'Draft complex multi-day tours from verified day-wise templates and dispatch polished, branded client PDFs before your competitors even open Word or Excel.',
    solution: 'Instant Branded Quotation Engine',
  },
  {
    icon: ShieldCheck,
    tag: 'ACCURACY',
    title: 'Contract rates auto-calculated',
    description:
      'Never dig through hundreds of outdated seasonal PDF rate cards again. Centralized contracted hotel tariffs and private vehicle rate sheets applied with zero math errors.',
    solution: 'Live Contract Tariffs & Markups',
  },
  {
    icon: CreditCard,
    tag: 'REVENUE',
    title: 'Zero uncollected balances',
    description:
      'Milestone installment ledgers track 20% advance deposits, 50% midterm payments, and final balances automatically so uncollected receivables never fall through the cracks.',
    solution: 'Automated Milestone Ledgers',
  },
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32 border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            Take control of your agency.
            <br />
            From first lead to final ledger.
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            That&apos;s what happens when you have centralized control over client itineraries,
            automated contracted tariffs, and a platform your travel consultants actually love to use.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-sm px-6 py-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>See how it works</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Perk-Style 4-Pillar Strategic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 mt-12 sm:mt-16">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between rounded-[28px] border border-slate-200/80 bg-[#F4F3EE] p-8 sm:p-9 transition-all duration-300 hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5"
              >
                <div>
                  {/* Clean Geometric Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200/80 text-indigo-600 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-200">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Micro Uppercase Category Tag */}
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-indigo-600 transition-colors mt-6 block">
                    {pillar.tag}
                  </span>

                  {/* Prominent Bold Title */}
                  <h3 className="text-xl sm:text-[22px] font-black text-slate-950 mt-2 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Body Paragraph */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle Solution Check Tag */}
                <div className="mt-8 pt-5 border-t border-slate-200/60">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">
                      {pillar.solution}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Operational Guarantee Banner */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-[#F4F3EE] px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Built specifically for Destination Specialists, DMCs, and Independent Travel Agencies</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
