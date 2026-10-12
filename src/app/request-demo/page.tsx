import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';
import { BRAND } from '@/lib/constants';
import { CheckCircle2, Sparkles, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request a Demo — Your Travel Desk',
  description:
    'Schedule a personalized product demonstration of Your Travel Desk with a travel workflow specialist. Explore itineraries, quotations, bookings, and payment tracking.',
};

export default function RequestDemoPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left info column */}
          <div className="lg:col-span-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 mb-5 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
              <span>Personalized Walkthrough</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15] break-words">
              See How {BRAND.name} Fits Your Agency.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every travel agency operates with unique destination mixes, rate structures, and payment schedules. In a 20-minute guided session, we will tailor the walkthrough to your specific operational needs.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                What we will cover together:
              </h3>
              <div className="space-y-3.5">
                {[
                  'Review your current trip workflow and operational pain points',
                  'Creating day-by-day itineraries and multi-traveler groups',
                  'Assembling instant quotations with automated markup calculation',
                  'Converting quotes into confirmed bookings and issuing vouchers',
                  'Tracking partial customer installments and payment ledgers',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                <Clock className="h-4 w-4 text-indigo-600" />
                <span>What happens next?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                After you submit your request, our team will review your business requirements and contact you via email to coordinate a convenient meeting slot.
              </p>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <DemoRequestForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
