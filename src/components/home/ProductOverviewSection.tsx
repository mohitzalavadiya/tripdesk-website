import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  Users,
  Compass,
  Building,
  FileText,
  CalendarCheck,
  CreditCard,
  Car,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const MODULES = [
  {
    icon: Users,
    title: 'Customer CRM',
    tag: 'CONTACTS & ROSTERS',
    description:
      'Store complete customer profiles, family passenger rosters, passport notes, and lifetime booking history in one searchable database.',
    href: '/features#crm',
  },
  {
    icon: Compass,
    title: 'Trip Workspaces',
    tag: 'DAY-WISE ITINERARIES',
    description:
      'Structure day-by-day itineraries, destinations, travel dates, hotel check-ins, and activity schedules with drag-and-drop ease.',
    href: '/features#itineraries',
  },
  {
    icon: FileText,
    title: 'Instant Quotations',
    tag: 'DYNAMIC PRICING',
    description:
      'Assemble proposals with automatic pricing calculations, customizable agency profit markups, and client-ready PDFs in minutes.',
    href: '/features#quotations',
  },
  {
    icon: CalendarCheck,
    title: 'Bookings & Operations',
    tag: 'ACTIVE TOURS',
    description:
      'Lock in confirmed bookings, generate rooming lists, track live trip execution, and manage changes without miscommunication.',
    href: '/features#bookings',
  },
  {
    icon: Building,
    title: 'Hotels & Rate Sheets',
    tag: 'SUPPLIER TARIFFS',
    description:
      'Maintain contracted room tariffs, seasonal pricing, extra beds, and supplier contact agreements in a centralized tariff library.',
    href: '/features#hotels',
  },
  {
    icon: Car,
    title: 'Vehicles & Sightseeing',
    tag: 'FLEET LOGISTICS',
    description:
      'Organize airport transfers, private cabs, daily excursions, and driver duty slips seamlessly across your transport partners.',
    href: '/features#logistics',
  },
  {
    icon: CreditCard,
    title: 'Invoicing & Ledgers',
    tag: 'PAYMENTS & TAX',
    description:
      'Issue GST-compliant invoices, log partial UPI/bank installments, and monitor outstanding receivables without spreadsheets.',
    href: '/features#finance',
  },
  {
    icon: TrendingUp,
    title: 'Executive Analytics',
    tag: 'INSIGHTS & MARGINS',
    description:
      'View gross profit margins, quotation win rates, top destination sales, and lead conversion funnels on a live executive dashboard.',
    href: '/features#analytics',
  },
];

export function ProductOverviewSection() {
  return (
    <section id="product-overview" className="py-12 sm:py-20 lg:py-32 bg-white border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.14] sm:leading-[1.1]">
            Built for everything you do.
            <br />
            From inquiry to final tax invoice.
          </h2>
          <p className="mt-3.5 sm:mt-5 text-xs sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eight tightly synchronized modules built specifically for travel operators, destination
            management desks, and holiday specialists. Zero generic forms or IT complexity.
          </p>

          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-3">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore all 8 modules</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 8 Perk-Style Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
          {MODULES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative flex flex-col justify-between rounded-2xl sm:rounded-[28px] border border-slate-200/80 bg-[#F4F3EE] p-5 sm:p-8 transition-all duration-300 hover:bg-white hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5 gap-2">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 text-indigo-600 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-200 shrink-0">
                      <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-slate-200/60 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors shrink-0 truncate max-w-[140px] sm:max-w-none">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
