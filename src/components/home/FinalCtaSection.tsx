import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { BRAND, APP_SIGNUP_URL } from '@/lib/constants';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24 lg:py-28 relative overflow-hidden">
      <Container size="narrow">
        <div className="text-center">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#4F46E5] mb-3">
            Ready to simplify your travel business?
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
            Run Your Entire Travel Agency in One Place.
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto">
            Bring customers, trips, quotations, bookings, invoices, and payments together with TripDesk.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={APP_SIGNUP_URL}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              isExternal
            >
              <span>{BRAND.primaryCta}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              {BRAND.secondaryCta}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-[#475569]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />
              7-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#4F46E5]" />
              Cancel anytime
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
