import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame';
import {
  Users,
  Compass,
  FileText,
  CalendarCheck,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

const SCREENS = [
  {
    id: 'customers',
    area: 'Customer Management',
    heading: 'Keep every customer organized.',
    description:
      'Store customer and traveler information and keep trips connected to the right customer.',
    benefits: [
      'Organized customer information',
      'Multiple trips for the same customer',
      'Traveler information within trips',
      'Easy customer history',
    ],
    icon: Users,
    badge: 'CRM & Traveler Hub',
    reverse: false,
    mockContent: (
      <div className="my-auto space-y-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Sarah Jenkins</p>
              <p className="text-[11px] text-slate-500">sarah.j@example.com • +1 (555) 019-2834</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              Active Client
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded bg-slate-50 p-2">
              <span className="text-slate-500 block text-[10px]">Total Trips Booked</span>
              <span className="font-bold text-slate-800">4 Completed / 1 Upcoming</span>
            </div>
            <div className="rounded bg-slate-50 p-2">
              <span className="text-slate-500 block text-[10px]">Traveler Group</span>
              <span className="font-bold text-slate-800">Family (2 Adults, 2 Kids)</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'trips',
    area: 'Trip Management',
    heading: 'Plan and manage every trip from one place.',
    description:
      'Bring hotels, vehicles, activities, travelers, and trip details together.',
    benefits: [
      'Centralized trip information',
      'Multiple travelers',
      'Hotel details',
      'Vehicles and activities',
      'Trip-level organization',
    ],
    icon: Compass,
    badge: 'Itinerary Planner',
    reverse: true,
    mockContent: (
      <div className="my-auto space-y-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Swiss Alps Expedition 2026</p>
              <p className="text-[11px] text-slate-500">Oct 12 – Oct 20 • 8 Days • 4 Travelers</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-[#4F46E5]">
              Planning
            </span>
          </div>
          <div className="mt-2.5 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between rounded bg-slate-50 p-2">
              <span className="text-slate-700 font-medium">Hotel: The Chedi Andermatt (3 Nights)</span>
              <span className="text-slate-500">Confirmed</span>
            </div>
            <div className="flex items-center justify-between rounded bg-slate-50 p-2">
              <span className="text-slate-700 font-medium">Transfer: Private Mercedes V-Class</span>
              <span className="text-slate-500">Assigned</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'quotations',
    area: 'Quotations',
    heading: 'Create travel quotations without starting from scratch.',
    description:
      'Build quotations from trip information and present a clear, professional travel proposal.',
    benefits: [
      'Structured quotation workflow',
      'Hotel/service details',
      'Trip-based pricing',
      'Customer-facing quotation experience',
    ],
    icon: FileText,
    badge: 'Proposal Generator',
    reverse: false,
    mockContent: (
      <div className="my-auto space-y-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Quotation #QT-2026-084</p>
              <p className="text-[11px] text-slate-500">Client: Robert Langdon • Luxury Safari</p>
            </div>
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
              Proposal Sent
            </span>
          </div>
          <div className="mt-2.5 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1">
              <span className="text-slate-600">Option 1: 5-Star Luxury Lodge</span>
              <span className="font-bold text-slate-900">$8,450.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Option 2: Executive Tented Camp</span>
              <span className="font-bold text-slate-900">$6,200.00</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'bookings',
    area: 'Bookings',
    heading: 'Keep confirmed bookings under control.',
    description:
      'Once a customer confirms a trip, keep booking and service information connected to the trip.',
    benefits: [
      'Organized booking information',
      'Connected trip services',
      'Customer/traveler details',
      'Clear booking status',
    ],
    icon: CalendarCheck,
    badge: 'Operations & Vouchers',
    reverse: true,
    mockContent: (
      <div className="my-auto space-y-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Booking #BK-9482</p>
              <p className="text-[11px] text-slate-500">Status: All Supplier Vouchers Issued</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
              100% Confirmed
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded bg-slate-50 p-2">
              <span className="text-slate-500 block text-[10px]">Hotel Confirmation</span>
              <span className="font-semibold text-slate-800">#H-7729 (Verified)</span>
            </div>
            <div className="rounded bg-slate-50 p-2">
              <span className="text-slate-500 block text-[10px]">Activity Voucher</span>
              <span className="font-semibold text-slate-800">#ACT-402 (Ready)</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'invoices',
    area: 'Invoices & Payments',
    heading: 'Stay on top of customer payments.',
    description:
      'Create invoices for confirmed bookings, record partial or multiple payments, and track outstanding balances.',
    benefits: [
      'Professional invoices',
      'Multiple payments',
      'Partial payment tracking',
      'Outstanding balance visibility',
      'Payment history',
    ],
    icon: CreditCard,
    badge: 'Financial Billing',
    reverse: false,
    mockContent: (
      <div className="my-auto space-y-3 py-3">
        <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="text-xs font-bold text-[#0F172A]">Invoice #INV-2026-109</p>
              <p className="text-[11px] text-slate-500">Total: $12,500.00 • Paid: $6,250.00</p>
            </div>
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-[#4F46E5]">
              Partial Paid (50%)
            </span>
          </div>
          <div className="mt-2.5 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between rounded bg-slate-50 p-2">
              <span className="text-slate-700">Deposit Payment (Credit Card)</span>
              <span className="font-bold text-emerald-600">+$6,250.00 (Received)</span>
            </div>
            <div className="flex items-center justify-between rounded bg-amber-50/50 p-2">
              <span className="text-amber-800 font-medium">Balance Due by Sep 30</span>
              <span className="font-bold text-amber-900">$6,250.00 Remaining</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export function ProductScreensSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container size="default">
        <SectionHeading
          eyebrow="Real Product Experience"
          title="See how TripDesk powers each stage of your agency."
          description="A visual walkthrough of the specialized modules purpose-built to eliminate operational friction."
          align="center"
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {SCREENS.map((screen) => {
            const Icon = screen.icon;
            return (
              <div
                key={screen.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Text Column */}
                <div
                  className={`lg:col-span-5 ${
                    screen.reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold text-[#4F46E5] mb-4">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{screen.area}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight leading-tight">
                    {screen.heading}
                  </h3>

                  <p className="mt-4 text-base text-[#475569] leading-relaxed">
                    {screen.description}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-[#0F172A]" role="list">
                    {screen.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#4F46E5] shrink-0" />
                        <span className="font-medium text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshot Frame Column */}
                <div
                  className={`lg:col-span-7 ${
                    screen.reverse ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <ScreenshotFrame
                    title={screen.area}
                    subtitle={screen.heading}
                    icon={Icon}
                    badge={screen.badge}
                    aspectRatio="video"
                  >
                    {screen.mockContent}
                  </ScreenshotFrame>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
