import React from 'react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { ScreenshotFrame } from '@/components/ui/ScreenshotFrame';
import { BRAND, APP_SIGNUP_URL } from '@/lib/constants';
import { ArrowRight, LayoutDashboard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 xl:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs sm:text-sm font-semibold text-[#4F46E5] mb-6">
              <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
              {BRAND.eyebrow}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#0F172A] leading-[1.12]">
              {BRAND.tagline}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
              {BRAND.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Button
                href={APP_SIGNUP_URL}
                variant="primary"
                size="lg"
                isExternal
                className="w-full sm:w-auto"
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

            <p className="mt-4 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#4F46E5] shrink-0" />
              <span>{BRAND.supportingText}</span>
            </p>

            <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4F46E5]" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4F46E5]" />
                <span>7-Day full access</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4F46E5]" />
                <span>Quick agency setup</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Visual */}
          <div className="lg:col-span-6 xl:col-span-6">
            <ScreenshotFrame
              title="Dashboard"
              subtitle="Agency Overview & Active Trips"
              icon={LayoutDashboard}
              badge="Main System"
              aspectRatio="video"
            >
              {/* High-fidelity Dashboard Module Mockup */}
              <div className="my-auto space-y-3.5 py-2">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                    <p className="text-[11px] font-medium text-slate-500">Active Trips</p>
                    <p className="mt-1 text-lg font-bold text-[#0F172A]">24</p>
                    <span className="text-[10px] text-[#4F46E5] font-semibold">6 Departing soon</span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                    <p className="text-[11px] font-medium text-slate-500">Pending Quotes</p>
                    <p className="mt-1 text-lg font-bold text-[#0F172A]">12</p>
                    <span className="text-[10px] text-amber-600 font-semibold">4 Needs review</span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-3 shadow-2xs">
                    <p className="text-[11px] font-medium text-slate-500">Confirmed Bookings</p>
                    <p className="mt-1 text-lg font-bold text-[#0F172A]">18</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Invoiced</span>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200/80 bg-white p-3.5 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-xs font-bold text-[#0F172A]">Recent Agency Activity</span>
                    <span className="text-[10px] font-medium text-slate-400">Live Status</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Alpine Explorer (8 Pax)</span>
                      <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-[#4F46E5]">Quotation Sent</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Bali Honeymoon Package</span>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">Booking Confirmed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">Mediterranean Cruise Group</span>
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">Deposit Received</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScreenshotFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
