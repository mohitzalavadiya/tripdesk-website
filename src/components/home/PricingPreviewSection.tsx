'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { APP_SIGNUP_URL } from '@/lib/constants';
import { Check, Sparkles } from 'lucide-react';

export function PricingPreviewSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <Container size="default">
        <SectionHeading
          eyebrow="Simple Pricing"
          title="Choose the plan that fits your agency."
          description="Start with a 7-day free trial and explore TripDesk before choosing a plan."
          align="center"
        />

        {/* Billing Toggle */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-[#0F172A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-[#4F46E5]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (2 Plans) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1: Starter */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0F172A]">Starter</h3>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                  Essential
                </span>
              </div>
              <p className="mt-2 text-sm text-[#475569]">
                Designed for independent travel advisors and boutique agencies.
              </p>

              <div className="mt-6 flex items-baseline gap-1 border-b border-slate-100 pb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                  {billingCycle === 'monthly' ? '$39' : '$31'}
                </span>
                <span className="text-sm font-medium text-[#475569]">
                  / user / month
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-[#475569]" role="list">
                {[
                  'Customer & traveler records',
                  'Trip planning & itinerary builder',
                  'Standard quotation generator',
                  'Booking confirmation management',
                  'Basic invoice generation',
                  'Standard support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#4F46E5] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button
                href={APP_SIGNUP_URL}
                variant="outline"
                size="md"
                className="w-full justify-center"
                isExternal
              >
                Choose Plan
              </Button>
              <p className="mt-2.5 text-center text-xs text-slate-500">
                Start your 7-day free trial
              </p>
            </div>
          </div>

          {/* Plan 2: Agency Pro (Highlighted) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-[#4F46E5] bg-white p-8 shadow-lg">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#4F46E5] px-3.5 py-0.5 text-xs font-bold text-white shadow-sm flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Recommended</span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0F172A]">Agency Pro</h3>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-[#4F46E5]">
                  Full Suite
                </span>
              </div>
              <p className="mt-2 text-sm text-[#475569]">
                Full operating power for growing travel agencies, tour operators, and DMCs.
              </p>

              <div className="mt-6 flex items-baseline gap-1 border-b border-slate-100 pb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                  {billingCycle === 'monthly' ? '$79' : '$63'}
                </span>
                <span className="text-sm font-medium text-[#475569]">
                  / user / month
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-[#475569]" role="list">
                {[
                  'Unlimited customers, trips & quotes',
                  'Multi-option quotation builder & custom branding',
                  'Supplier voucher & rooming list generator',
                  'Multiple & partial payment tracking',
                  'Hotel database & seasonal contract rates',
                  'Vehicles & excursion activity management',
                  'Priority agency support',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#4F46E5] shrink-0" />
                    <span className="font-medium text-slate-800">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <Button
                href={APP_SIGNUP_URL}
                variant="primary"
                size="md"
                className="w-full justify-center"
                isExternal
              >
                Choose Plan
              </Button>
              <p className="mt-2.5 text-center text-xs text-slate-500">
                Start your 7-day free trial
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
