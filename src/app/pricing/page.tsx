import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { APP_SIGNUP_URL, BRAND } from '@/lib/constants';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing tailored for travel agencies of all sizes.',
};

export default function PricingPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          eyebrow="Pricing Plans"
          title="Simple, Transparent Pricing"
          description="Everything you need to run and scale your travel agency. Start with a 7-day free trial."
        />

        <div className="mx-auto max-w-lg mt-12 rounded-2xl border-2 border-[#4F46E5] bg-white p-8 shadow-xl">
          <div className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#4F46E5] mb-4">
            7-Day Free Trial Available
          </div>
          <h3 className="text-2xl font-bold text-[#0F172A]">Agency Pro</h3>
          <p className="mt-2 text-sm text-[#475569]">
            Full access to all 8 modules and unlimited operational workflows.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-[#475569]">
            {[
              'Unlimited Customers & Contacts',
              'Quotation Builder & PDF Generation',
              'Booking & Voucher Management',
              'Invoicing & Payment Tracking',
              'Hotel & Rates Database',
              'Priority Support',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check className="h-4 w-4 text-[#4F46E5] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              href={APP_SIGNUP_URL}
              variant="primary"
              size="lg"
              className="w-full justify-center"
              isExternal
            >
              {BRAND.primaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
