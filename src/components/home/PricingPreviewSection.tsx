'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/lib/constants';
import { Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics/gtag';

export function PricingPreviewSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleToggle = (cycle: 'monthly' | 'yearly') => {
    setBillingCycle(cycle);
    trackEvent('pricing_cta_click', { cycle });
  };

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            Transparent pricing.
            <br />
            Uncapped agency growth.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Start with a 7-day free trial on the Starter plan. Straightforward pricing designed for
            Indian travel agencies, tour desks, and independent DMCs.
          </p>

          {/* Billing Toggle (Perk Style Pill Switch) */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center rounded-full border border-slate-200 bg-[#F4F3EE] p-1 shadow-2xs max-w-full">
              <button
                type="button"
                onClick={() => handleToggle('monthly')}
                className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => handleToggle('yearly')}
                className={`px-3.5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${
                  billingCycle === 'yearly'
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <span>Yearly</span>
                <span className="rounded-full bg-indigo-600 text-white px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                  SAVE ~17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPro = plan.id === 'professional';
            const price = billingCycle === 'monthly' ? plan.monthlyDisplay : plan.yearlyDisplay;
            const period = billingCycle === 'monthly' ? '/ month' : '/ year';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl sm:rounded-4xl p-5 sm:p-8 lg:p-10 transition-all duration-300 ${
                  isPro
                    ? 'border-2 border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 md:-translate-y-2'
                    : 'border border-slate-200/80 bg-[#F4F3EE] shadow-2xs hover:bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3.5 sm:px-4 py-1 text-[11px] sm:text-xs font-bold text-white shadow-sm flex items-center gap-1.5 uppercase tracking-wide whitespace-nowrap">
                    <Sparkles className="h-3 w-3 shrink-0" />
                    <span>Best Value for Growth</span>
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">{plan.name}</h3>
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
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 border-b border-slate-200/70 pb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight font-mono">
                        {price}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-500">
                        {period}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="mt-1.5 text-xs font-semibold text-indigo-600">
                        Billed annually (Includes 2 months free)
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Everything included:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/70">
                  <Button
                    href={plan.ctaHref}
                    variant={isPro ? 'primary' : 'outline'}
                    size="lg"
                    className="w-full rounded-full py-3.5 font-bold shadow-xs flex items-center justify-center gap-1.5"
                    isExternal={plan.isExternal}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="mt-2.5 text-center text-[11px] text-slate-500 font-medium">
                    {plan.id === 'starter' ? 'No credit card required • Instant access' : 'Full commercial access • Priority onboarding'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Footer */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            7-Day Full Free Trial
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Cancel Anytime
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            GST Invoicing Supported
          </span>
        </div>
      </Container>
    </section>
  );
}
