import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureCard } from '@/components/ui/FeatureCard';
import {
  Users,
  Compass,
  Building,
  FileText,
  CalendarCheck,
  CreditCard,
  Car,
  Smile,
} from 'lucide-react';

const MODULES = [
  {
    icon: Users,
    title: 'Customers',
    description:
      'Store customer records, traveler preferences, contact details, and full trip history in one centralized database.',
  },
  {
    icon: Compass,
    title: 'Trips',
    description:
      'Plan and manage day-to-day itineraries, destinations, travel dates, passenger lists, and activity schedules.',
  },
  {
    icon: Building,
    title: 'Hotels & Rates',
    description:
      'Maintain your hotel inventory, seasonal rate contracts, room meal plans, and supplier contact agreements.',
  },
  {
    icon: FileText,
    title: 'Quotations',
    description:
      'Generate clear, branded travel proposals and custom quotation PDFs directly from trip requirements in minutes.',
  },
  {
    icon: CalendarCheck,
    title: 'Bookings',
    description:
      'Keep supplier confirmations, service vouchers, room allocations, and booking statuses fully organized.',
  },
  {
    icon: CreditCard,
    title: 'Invoices & Payments',
    description:
      'Create professional client invoices, record multiple partial installments, and track balance due dates with ease.',
  },
  {
    icon: Car,
    title: 'Vehicles & Activities',
    description:
      'Schedule airport transfers, private transport, excursion bookings, and local activity guide allocations.',
  },
  {
    icon: Smile,
    title: 'Customer Experience',
    description:
      'Deliver transparent travel itineraries, reliable documentation, and a polished agency service to every traveler.',
  },
];

export function ProductOverviewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container size="default">
        <SectionHeading
          eyebrow="One platform. One workflow."
          title="Everything your travel agency needs to run day to day."
          description="TripDesk replaces scattered tools with 8 tightly integrated modules built specifically around travel agency operations."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {MODULES.map((item) => {
            const Icon = item.icon;
            return (
              <FeatureCard
                key={item.title}
                icon={<Icon className="h-6 w-6" />}
                title={item.title}
                description={item.description}
                interactive
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
