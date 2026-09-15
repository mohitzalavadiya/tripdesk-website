import React from 'react';
import { Container } from '@/components/layout/Container';
import { Zap, Network, Award, Layers } from 'lucide-react';

const PILLARS = [
  {
    icon: Zap,
    title: 'Simple',
    description:
      'Intuitive design built directly around travel workflows. Your team can onboard and start organizing trips in minutes without heavy training.',
  },
  {
    icon: Network,
    title: 'Connected',
    description:
      'No more copying data between different tools. Customer profiles flow into trips, which generate quotes, confirmed bookings, and invoices automatically.',
  },
  {
    icon: Award,
    title: 'Professional',
    description:
      'Deliver clean, high-impact quotations, accurate vouchers, and structured invoices that inspire trust and confidence in your clients.',
  },
  {
    icon: Layers,
    title: 'Centralized',
    description:
      'All your customer records, hotel contracts, supplier vouchers, and payment histories live in one single, organized source of truth.',
  },
];

export function WhyTripDeskSection() {
  return (
    <section className="bg-[#0F172A] text-white py-20 sm:py-24 lg:py-28 relative overflow-hidden">
      <Container size="default">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
            Why TripDesk
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-tight">
            Built around your travel agency workflow.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Traditional generic software forces you to adapt your process to their platform. TripDesk was engineered specifically for travel agents, tour operators, and DMCs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xs transition-colors hover:border-slate-700"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-5 border border-indigo-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
