'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import {
  Compass,
  FileText,
  CalendarCheck,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const TABS = [
  {
    id: 'itineraries',
    label: 'Itineraries',
    tag: 'DAY-WISE WORKSPACE',
    icon: Compass,
    title: 'Build multi-day custom tours in minutes, not hours.',
    description:
      'Connect day-by-day sightseeing itineraries with contracted hotels, private cab transfers, and dynamic meal plans. Auto-calculate total package costs without manual formulas.',
    bullets: [
      'Interactive day-by-day schedules with timing & routing',
      'Directly linked hotel check-ins and room categories',
      'Automated private cab transfers and driver itineraries',
    ],
    screenshot: '/screenshots/trips.png',
    screenshotAlt: 'Your Travel Desk Itinerary Workspace Preview',
    badgeText: 'Active Workspace • 5D Kerala Explorer',
    href: '/features#itineraries',
  },
  {
    id: 'quotations',
    label: 'Quotations',
    tag: 'DYNAMIC PRICING ENGINE',
    icon: FileText,
    title: 'Instant, branded client quotations with protected margins.',
    description:
      'Aggregate accommodation, transfer tariffs, and agency markups automatically. Export beautiful, professional PDFs with detailed day-wise inclusions and payment terms.',
    bullets: [
      'Automated cost aggregation across hotels, cabs & sightseeing',
      'Customizable agency percentage or flat-fee profit markups',
      'Instant client-ready PDF downloads and shareable links',
    ],
    screenshot: '/screenshots/quotations.png',
    screenshotAlt: 'Your Travel Desk Quotations Engine Preview',
    badgeText: 'Live Costing • 100% Margin Accuracy',
    href: '/features#quotations',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    tag: 'SUPPLIER DISPATCH',
    icon: CalendarCheck,
    title: 'Lock in supplier confirmations and dispatch vouchers.',
    description:
      'Convert accepted quotations into confirmed operational bookings with a single click. Generate rooming lists, driver duty slips, and dispatch service vouchers seamlessly.',
    bullets: [
      'One-click quotation to booking conversion',
      'Automated hotel rooming lists and driver duty slips',
      'Clean PDF service vouchers dispatched to suppliers',
    ],
    screenshot: '/screenshots/bookings.png',
    screenshotAlt: 'Your Travel Desk Supplier Vouchers Preview',
    badgeText: 'Operations Hub • Vouchers Dispatched',
    href: '/features#bookings',
  },
  {
    id: 'ledgers',
    label: 'Ledgers',
    tag: 'PAYMENT TRACKING',
    icon: CreditCard,
    title: 'Milestone installment ledgers with zero balance leakage.',
    description:
      'Track 20% advance deposits, milestone due dates, supplier payables, and gross margins in one transparent ledger. Know exactly what is collected and what is pending.',
    bullets: [
      'Automated 20%, 50%, and final balance milestone schedules',
      'Real-time receivables tracking and payment due alerts',
      'Net supplier payables and agency gross profit visibility',
    ],
    screenshot: '/screenshots/dashboard.png',
    screenshotAlt: 'Your Travel Desk Financial Ledgers Preview',
    badgeText: 'Payment Ledger • Zero Uncollected Dues',
    href: '/features#finance',
  },
];

export function CapabilitiesStrip() {
  const [activeTabId, setActiveTabId] = useState('itineraries');
  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];
  const ActiveIcon = activeTab.icon;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            One platform.
            <br />
            Hundreds of agency hours saved.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            One itinerary builder, one quotation engine, one booking ledger across all your
            trips and clients. Every hour that used to disappear between disconnected tools, now
            back in your team&apos;s hands.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-3 shadow-md shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Explore Platform</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Perk-Style Unified Interactive Showcase Card */}
        <div className="rounded-2xl sm:rounded-[32px] border border-slate-200/90 bg-[#F4F3EE] p-3.5 sm:p-8 lg:p-12 shadow-sm transition-all">
          {/* Top Pill Tabs */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 pb-6 sm:pb-8 border-b border-slate-200/70">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer w-full sm:w-auto ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-[1.02]'
                      : 'bg-white/80 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <TabIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive 2-Column Content */}
          <div className="pt-6 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Descriptive Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                  <ActiveIcon className="h-3.5 w-3.5 shrink-0" />
                  <span>{activeTab.tag}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug">
                  {activeTab.title}
                </h3>

                <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                  {activeTab.description}
                </p>

                {/* Micro Bullet Highlights */}
                <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-2.5">
                  {activeTab.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                      <div className="h-4 sm:h-4.5 w-4 sm:w-4.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3 sm:h-3.5 w-3 sm:w-3.5 stroke-[2.5]" />
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module Link */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-200/60">
                <Link
                  href={activeTab.href}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 group"
                >
                  <span>Explore {activeTab.label.toLowerCase()} workflow</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column: High-Fidelity SaaS UI Mockup Frame */}
            <div className="lg:col-span-7">
              <div className="group relative rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-2.5 sm:p-4 shadow-xl transition-all duration-300">
                {/* Mockup Header Bar */}
                <div className="flex items-center justify-between gap-2 pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-slate-100 min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-rose-400 shrink-0" />
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400 shrink-0" />
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="ml-1.5 sm:ml-2 text-[10px] sm:text-[11px] font-semibold text-slate-400 truncate">
                      app.yourtraveldesk.com
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {activeTab.label}
                  </span>
                </div>

                {/* Screenshot Display */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg sm:rounded-xl bg-slate-900/5">
                  <Image
                    src={activeTab.screenshot}
                    alt={activeTab.screenshotAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Perk-Style Integrated Proof & ROI Banner */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200/70">
            <div className="rounded-xl sm:rounded-2xl bg-white/95 border border-slate-200/80 p-3.5 sm:p-7 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Agency Logo / Verified Badge */}
              <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 w-full lg:w-auto">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs sm:text-sm shrink-0">
                  TD
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-950 text-xs sm:text-sm tracking-tight truncate">ROYAL WANDERLUST TOURS</span>
                    <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600 shrink-0" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Bespoke Holiday Agency • 45 Agents</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 w-full lg:w-auto lg:flex lg:items-center sm:gap-10 border-y lg:border-y-0 lg:border-x border-slate-100 py-3 lg:py-0 px-0 lg:px-8">
                <div>
                  <div className="text-lg sm:text-3xl font-black text-slate-950 tracking-tight">14 hrs</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">manual work saved weekly</div>
                </div>
                <div>
                  <div className="text-lg sm:text-3xl font-black text-slate-950 tracking-tight">3.5x</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">faster quotation dispatch</div>
                </div>
              </div>

              {/* Quote */}
              <div className="text-xs sm:text-sm text-slate-700 italic max-w-md text-left w-full lg:w-auto">
                &ldquo;We eliminated three disconnected spreadsheets. Our consultants send professional PDF quotes in 4 minutes instead of half a day.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
