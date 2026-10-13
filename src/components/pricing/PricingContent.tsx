'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/constants';
import { Check, X, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const COMPARISON_ROWS = [
  { feature: 'Monthly Trips Cap', starter: '20 Trips / month', pro: 'Unlimited' },
  { feature: 'Monthly Quotations Cap', starter: '20 Quotes / month', pro: 'Unlimited' },
  { feature: 'Monthly Bookings Cap', starter: '20 Bookings / month', pro: 'Unlimited' },
  { feature: 'Customer Profiles & Contacts', starter: 'Unlimited', pro: 'Unlimited' },
  { feature: 'Itinerary Workspaces', starter: true, pro: true },
  { feature: 'Hotels, Vehicles & Rates Library', starter: true, pro: true },
  { feature: 'Service Vouchers & Rooming Lists', starter: true, pro: true },
  { feature: 'Invoices & Installment Tracking', starter: true, pro: true },
  { feature: 'Custom Agency Logo Branding', starter: false, pro: true },
  { feature: 'Feedback & Reviews Tracking', starter: false, pro: true },
  { feature: 'Customer Lifetime Insights', starter: false, pro: true },
  { feature: 'Executive Dashboard & Margin Reports', starter: 'Basic Overview', pro: 'Advanced Multi-horizon' },
  { feature: 'Support Level', starter: 'Standard Support', pro: 'Priority Desk Support' },
  { feature: '7-Day Free Trial Available', starter: true, pro: 'Start in Starter Trial' },
];

export function PricingContent() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="py-10 sm:py-20 lg:py-32 bg-white">
      <Container size="default">
        <SectionHeading
          eyebrow="Transparent Investment"
          title="Simple, verified pricing for every stage of your agency."
          description={`Start with our 7-day free trial on the Starter plan. Transparent pricing in Indian Rupees with ~17% savings on yearly commitments.`}
        />

        {/* Billing Toggle */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <div className="flex items-center rounded-full border border-slate-200 bg-[#F4F7FA] p-1 shadow-2xs max-w-full">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                billingCycle === 'yearly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Yearly</span>
              <span className="rounded-full bg-indigo-100 text-indigo-700 px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                SAVE ~17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.id === 'professional';
            const price = billingCycle === 'monthly' ? plan.monthlyDisplay : plan.yearlyDisplay;
            const period = billingCycle === 'monthly' ? '/ month' : '/ year';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-9 transition-all duration-300 ${
                  isPro
                    ? 'border-2 border-indigo-600 bg-white shadow-2xl shadow-indigo-600/10 ring-1 ring-indigo-500/20 md:-translate-y-2'
                    : 'border border-slate-200/90 bg-slate-50/50 shadow-xs hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3.5 sm:px-4 py-1 text-[11px] sm:text-xs font-bold text-white shadow-sm flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span>Best for Growing Agencies</span>
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{plan.name}</h3>
                    {'badge' in plan && plan.badge && (
                      <span
                        className={`rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-bold whitespace-nowrap ${
                          isPro
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-sm text-slate-600 font-normal leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 border-b border-slate-200/80 pb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                        {price}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        {period}
                      </span>
                      {billingCycle === 'yearly' && (
                        <span className="ml-2 text-xs font-bold text-emerald-600">
                          (~17% off)
                        </span>
                      )}
                    </div>
                    <span className="mt-1.5 block text-xs text-slate-500">
                      {billingCycle === 'monthly'
                        ? `Billed annually at ${plan.yearlyDisplay}/yr (${plan.yearlySavings})`
                        : `Standard monthly rate: ${plan.monthlyDisplay}/mo`}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-600" role="list">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span className={isPro ? 'font-semibold text-slate-800' : 'text-slate-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <Button
                    href={plan.ctaHref}
                    variant={isPro ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full justify-center shadow-xs"
                    isExternal={plan.isExternal}
                  >
                    {plan.ctaText}
                  </Button>
                  <p className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
                    <span>{plan.id === 'starter' ? '7-Day Free Trial • No Credit Card' : 'Unlimited operations'}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900">Full Plan Comparison</h2>
            <p className="text-sm text-slate-600 mt-1">Verified capability comparison based on live staging specifications.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-135 text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 font-bold text-slate-900">Capability / Entitlement</th>
                  <th className="p-4 font-bold text-slate-900 w-1/3">Starter</th>
                  <th className="p-4 font-bold text-indigo-600 w-1/3">Professional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                    <td className="p-4 text-slate-600">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <X className="h-4 w-4 text-slate-300" />
                        )
                      ) : (
                        <span>{row.starter}</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-900 font-semibold">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <X className="h-4 w-4 text-slate-300" />
                        )
                      ) : (
                        <span>{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demo Callout */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900">Need a guided tour or have multiple agency team branches?</h3>
          <p className="mt-2 text-sm text-slate-600">
            We are happy to answer your questions and walk through your agency setup.
          </p>
          <div className="mt-5">
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <span>Schedule a product demo →</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
