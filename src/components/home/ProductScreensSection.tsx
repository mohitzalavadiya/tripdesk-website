import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  Compass,
  FileText,
  CalendarCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const SCREENS = [
  {
    id: 'trips',
    area: 'Trip Workspaces',
    heading: 'Plan and manage every multi-day trip from one central workspace.',
    description:
      'Organize destinations, multi-day schedules, passenger lists, hotel stays, and transportation in a dedicated workspace with zero friction.',
    benefits: [
      'Day-by-day itinerary structuring with connected stays & transfers',
      'Unified passenger counts, lead traveler contacts, and room rosters',
      'Integrated hotel and transport contract rate lookups',
      'Real-time status tracking (Planning, Confirmed, On Tour, Completed)',
    ],
    icon: Compass,
    badge: 'Operations & Itineraries',
    reverse: false,
    imageSrc: '/screenshots/trips.png',
    chip: {
      title: 'Active Tour Itinerary',
      subtitle: 'Day 3: Munnar Tea Valley • Cab Assigned',
      badge: 'Live',
    },
    href: '/features#itineraries',
  },
  {
    id: 'quotations',
    area: 'Quotations & Proposals',
    heading: 'Assemble client-ready quotations in minutes, not hours.',
    description:
      'Generate clear client-facing pricing proposals directly from your trip workspaces without retyping rates or recalculating markups in spreadsheets.',
    benefits: [
      'Automatic cost aggregation and customizable agency markups',
      'Draft, Sent, Viewed, and Accepted quotation tracking pipeline',
      'One-click conversion from accepted proposal to active booking',
      'Professional branded presentation that earns client confidence',
    ],
    icon: FileText,
    badge: 'Commercial Proposals',
    reverse: true,
    imageSrc: '/screenshots/quotations.png',
    chip: {
      title: 'Commercial Proposal',
      subtitle: 'Goa 7-Day Tour • ₹1,11,203 (Margin +22%)',
      badge: 'Accepted',
    },
    href: '/features#quotations',
  },
  {
    id: 'bookings',
    area: 'Bookings & Operations',
    heading: 'Keep confirmed bookings and supplier vouchers under control.',
    description:
      'Lock in accepted itineraries, generate supplier vouchers, and monitor operational execution across your team with total clarity.',
    benefits: [
      'Dedicated booking reference numbers and payment milestone tracking',
      'Supplier rooming lists, vehicle allotments, and service vouchers',
      'Filtered operational views for Confirmed, Travelling Now, and Completed',
      'Zero communication breakdowns with hotel or transport partners',
    ],
    icon: CalendarCheck,
    badge: 'Active Operations',
    reverse: false,
    imageSrc: '/screenshots/bookings.png',
    chip: {
      title: 'Supplier Service Voucher',
      subtitle: 'Taj Gateway Cochin • Room Allotted',
      badge: 'Dispatched',
    },
    href: '/features#bookings',
  },
  {
    id: 'customers',
    area: 'Executive Overview & CRM',
    heading: 'Real-time visibility over sales, margins, and customers.',
    description:
      'Monitor monthly gross bookings, outstanding receivables, top holiday destinations, and quotation conversion win rates on a live dashboard.',
    benefits: [
      'Total sales, collections, and gross margin analytics at a glance',
      'Quotation conversion funnel from raw inquiry to confirmed tour',
      'Top destinations and high-value repeat customer directory',
      'Fast CSV exports for accounting, tax reporting, and reviews',
    ],
    icon: TrendingUp,
    badge: 'Executive Dashboard',
    reverse: true,
    imageSrc: '/screenshots/dashboard.png',
    chip: {
      title: 'Live Executive Overview',
      subtitle: '100% Win Rate • ₹29,484 Total Bookings',
      badge: 'Analytics',
    },
    href: '/features#analytics',
  },
];

export function ProductScreensSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#F4F3EE] border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            Inside the platform.
            <br />
            Engineered for travel precision.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A visual walkthrough of the specialized workspaces engineered for boutique agencies,
            tour operators, and destination management companies.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {SCREENS.map((screen) => {
            const Icon = screen.icon;
            return (
              <div
                key={screen.id}
                id={screen.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  screen.reverse ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    screen.reverse ? 'lg:col-start-8' : ''
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-bold text-indigo-700 shadow-2xs">
                    <Icon className="h-4 w-4 text-indigo-600" />
                    <span>{screen.badge}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[38px] font-black text-slate-950 leading-[1.14] tracking-tight">
                    {screen.heading}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {screen.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {screen.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link
                      href={screen.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group"
                    >
                      <span>Explore {screen.area}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Device Frame Screenshot Column - Clean Modern Window Mockup */}
                <div
                  className={`lg:col-span-7 relative ${
                    screen.reverse ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="relative mx-auto rounded-[28px] border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xl transition-all duration-300">
                    {/* Frame Top Header */}
                    <div className="flex h-9 items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-2 text-[11px] font-semibold text-slate-400">
                          app.yourtraveldesk.com/{screen.id}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                        Live System
                      </span>
                    </div>

                    {/* Screenshot Image */}
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900/5">
                      <Image
                        src={screen.imageSrc}
                        alt={screen.heading}
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>

                  {/* Floating Contextual Chip (Perk-Style UI Micro-Card) */}
                  <div
                    className={`hidden sm:flex absolute ${
                      screen.reverse ? '-left-3 -bottom-4' : '-right-3 -bottom-4'
                    } items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-200/90 z-10 max-w-xs`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {screen.chip.title}
                        </p>
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                          {screen.chip.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {screen.chip.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
