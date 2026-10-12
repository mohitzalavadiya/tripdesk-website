import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { APP_SIGNUP_URL, BRAND } from '@/lib/constants';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

export function BookDemoSection() {
  return (
    <section className="bg-[#F4F3EE] py-20 sm:py-24 lg:py-32 border-b border-slate-200/80">
      <Container size="narrow">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-white p-8 sm:p-14 text-center shadow-lg shadow-slate-900/5">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 mb-6 shadow-2xs">
            <Calendar className="h-6 w-6" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4F3EE] border border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span>Personalized Walkthrough</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-slate-950 leading-[1.12] max-w-xl mx-auto">
            See how {BRAND.name} fits your specific agency.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-normal">
            Schedule a 20-minute walkthrough. We will demonstrate customer management, day-wise
            trip costing, quotation generation, and payment ledgers mapped to your destination types.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              href="/request-demo"
              variant="primary"
              size="lg"
              className="rounded-full px-8 py-3.5 font-bold shadow-md shadow-indigo-600/20 w-full sm:w-auto"
            >
              <span>Schedule Product Walkthrough</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              href={APP_SIGNUP_URL}
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-3.5 font-bold bg-white text-slate-900 border-slate-300 hover:bg-slate-50 w-full sm:w-auto"
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
