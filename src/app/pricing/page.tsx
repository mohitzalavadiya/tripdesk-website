import React from 'react';
import type { Metadata } from 'next';
import { PricingContent } from '@/components/pricing/PricingContent';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Simple, Transparent Pricing — Starter & Professional Plans',
  description:
    'Explore verified pricing for Your Travel Desk. Starter plan at ₹499/month with 7-day free trial; Professional plan at ₹999/month for unlimited operations.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: `Pricing & Plans — ${BRAND.name}`,
    description:
      'Simple, verified pricing for small travel agencies and tour operators. Starter (₹499/mo) and Professional (₹999/mo) with 7-day free trial.',
    url: '/pricing',
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
