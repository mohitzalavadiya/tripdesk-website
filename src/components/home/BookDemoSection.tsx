import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { APP_SIGNUP_URL } from '@/lib/constants';
import { Calendar, ArrowRight } from 'lucide-react';

export function BookDemoSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20 lg:py-24">
      <Container size="narrow">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-[#4F46E5] mb-6">
            <Calendar className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight max-w-xl mx-auto">
            Want to see how TripDesk can work for your agency?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto">
            Book a personalized demo and see customer management, trips, quotations, bookings, invoices, and payments in action with one of our travel workflow specialists.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>Book a Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={APP_SIGNUP_URL}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              isExternal
            >
              Start 7-Day Free Trial
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
