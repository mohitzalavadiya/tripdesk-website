import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { APP_SIGNUP_URL, BRAND } from '@/lib/constants';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

export function BookDemoSection() {
  return (
    <section className="bg-[#F4F3EE] py-12 sm:py-24 lg:py-32 border-b border-slate-200/80">
      <Container size="narrow">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-slate-200/90 bg-white p-5 sm:p-14 text-center shadow-lg shadow-slate-900/5">
          <div className="mx-auto flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-4 sm:mb-6 shadow-2xs">
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F3EE] border border-slate-200 text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 sm:mb-4 shadow-2xs">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-indigo-600 shrink-0" />
            <span>Guided Product Demo</span>
          </div>

          <h2 className="text-xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-950 leading-[1.18] sm:leading-[1.12] max-w-xl mx-auto">
            See how {BRAND.name} fits your specific agency.
          </h2>

          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Schedule a 20-minute walkthrough. We will demonstrate customer management, day-wise
            trip costing, quotation generation, and payment ledgers mapped to your destination types.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              href="/request-demo"
              variant="primary"
              size="lg"
              className="rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold shadow-md shadow-indigo-600/20 w-full sm:w-auto"
            >
              <span>Book a Demo</span>
              <ArrowRight className="h-4 w-4 ml-1 shrink-0" />
            </Button>
            <Button
              href={APP_SIGNUP_URL}
              variant="outline"
              size="lg"
              className="rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold bg-white text-slate-900 border-slate-300 hover:bg-slate-50 w-full sm:w-auto"
              isExternal
            >
              {BRAND.primaryCta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
