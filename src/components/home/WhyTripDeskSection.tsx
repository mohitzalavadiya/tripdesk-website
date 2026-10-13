import React from 'react';
import { Container } from '@/components/layout/Container';
import { Zap, Network, Award, Layers } from 'lucide-react';
import { BRAND } from '@/lib/constants';

const ROLES = [
  {
    icon: Award,
    role: 'FOUNDERS & OWNERS',
    title: 'Complete visibility & margin control',
    description:
      'Track total monthly gross bookings, outstanding receivables, quotation win rates, and team productivity without chasing individual consultants.',
  },
  {
    icon: Zap,
    role: 'TOUR PLANNERS',
    title: 'Intuitive day-wise workspaces',
    description:
      'Drag-and-drop itinerary builders with connected hotel tariffs, private vehicle routes, and dynamic meal plans configured in minutes.',
  },
  {
    icon: Network,
    role: 'SALES & COMMERCIAL',
    title: 'Instant proposals with locked markups',
    description:
      'Dispatch branded client PDF proposals with auto-calculated package pricing and protected agency profit margins before competitors respond.',
  },
  {
    icon: Layers,
    role: 'OPERATIONS & FLEET',
    title: 'Voucher dispatch & zero chaos',
    description:
      'Lock in accepted itineraries, generate hotel rooming lists, and dispatch driver duty slips directly with zero communication breakdowns.',
  },
];

const METRICS = [
  { value: '1 Min', label: 'Instant Onboarding', desc: 'Ready out of the box with zero IT setup' },
  { value: '100%', label: 'Travel Specialized', desc: 'Engineered for itineraries, vouchers & tariffs' },
  { value: '0', label: 'Spreadsheets Needed', desc: 'End-to-end client quotation to ledger flow' },
];

export function WhyTripDeskSection() {
  return (
    <section className="bg-white py-12 sm:py-20 lg:py-32 border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-20">
          <h2 className="text-2xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.14] sm:leading-[1.1]">
            Powerful for agency owners.
            <br />
            Effortless for travel consultants.
          </h2>
          <p className="mt-3.5 sm:mt-5 text-xs sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Generic CRMs and spreadsheets don&apos;t understand day-wise itineraries, room allocations,
            or supplier vouchers. {BRAND.name} is engineered around how modern travel operators actually work.
          </p>
        </div>

        {/* 4 Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
          {ROLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[28px] border border-slate-200/80 bg-[#F4F3EE] p-5 sm:p-9 transition-all duration-300 hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 text-indigo-600 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-200">
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-indigo-600 transition-colors mt-4 sm:mt-6 block">
                    {item.role}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mt-1.5 sm:mt-2 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Perk-Style Operational Metrics Strip */}
        <div className="mt-8 sm:mt-16 rounded-2xl sm:rounded-[28px] border border-slate-200/90 bg-[#F4F3EE] p-5 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {METRICS.map((metric, i) => (
              <div key={metric.label} className={`text-center ${i > 0 ? 'pt-5 md:pt-0 md:px-6' : ''}`}>
                <p className="text-3xl sm:text-5xl font-black text-indigo-600 font-mono tracking-tight">
                  {metric.value}
                </p>
                <p className="mt-1.5 sm:mt-2 text-sm sm:text-base font-bold text-slate-950">{metric.label}</p>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-600">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
