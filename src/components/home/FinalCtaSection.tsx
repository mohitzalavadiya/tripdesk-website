import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { BRAND, APP_SIGNUP_URL } from '@/lib/constants';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="bg-[#F4F3EE] py-14 sm:py-32 lg:py-40 relative overflow-hidden">
      <Container size="narrow">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-slate-200/90 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 sm:mb-6 shadow-2xs max-w-full">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">Ready to transform your agency operations?</span>
          </div>

          <h2 className="text-2xl sm:text-5xl lg:text-[60px] font-black tracking-tight text-slate-950 leading-[1.14] sm:leading-[1.05]">
            Run your entire travel agency
            <br />
            in one unified platform.
          </h2>

          <p className="mt-3.5 sm:mt-5 text-xs sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Bring client inquiries, day-wise itineraries, quotation proposals, confirmed bookings,
            supplier vouchers, and payment collections together with {BRAND.name}.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href={APP_SIGNUP_URL}
              variant="primary"
              size="lg"
              className="rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold shadow-md shadow-indigo-600/25 w-full sm:w-auto"
              isExternal
            >
              <span>{BRAND.primaryCta}</span>
              <ChevronRight className="h-4 w-4 stroke-[2.5] shrink-0" />
            </Button>
            <Button
              href="/request-demo"
              variant="outline"
              size="lg"
              className="rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold bg-white text-slate-950 border-slate-300 hover:bg-slate-50 w-full sm:w-auto"
            >
              <span>{BRAND.secondaryCta}</span>
              <ArrowRight className="h-4 w-4 ml-1 shrink-0" />
            </Button>
          </div>

          {/* Social Proof / Guarantee Strip */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              7-Day Full Free Trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              Instant 5-Minute Setup
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
