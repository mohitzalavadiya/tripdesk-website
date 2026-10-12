import React from 'react';
import { Container } from '@/components/layout/Container';
import { WORKFLOW_LIFECYCLE, BRAND } from '@/lib/constants';
import { ArrowRight, CheckCheck } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="bg-[#F4F3EE] py-20 sm:py-28 lg:py-36 border-b border-slate-200/80">
      <Container size="default">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            One continuous workflow.
            <br />
            Zero operational drag.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {BRAND.name} connects your day-to-day operations into an automated lifecycle where
            information flows seamlessly from first client inquiry to final bank reconciliation.
          </p>
        </div>

        <div>
          {/* Desktop Connected Grid (6 columns) */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-4">
            {WORKFLOW_LIFECYCLE.map((step, idx) => (
              <div
                key={step.step}
                className="group relative flex flex-col justify-between rounded-[28px] border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-xs font-mono font-black text-indigo-700 shadow-2xs group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {step.step}
                    </span>
                    {idx < WORKFLOW_LIFECYCLE.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-950 leading-snug group-hover:text-indigo-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-4 max-w-lg mx-auto">
            {WORKFLOW_LIFECYCLE.map((step, idx) => (
              <div
                key={step.step}
                className="flex items-start gap-4 rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-xs"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-mono font-black text-indigo-700 shadow-2xs">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-950">
                      {step.title}
                    </h3>
                    {idx < WORKFLOW_LIFECYCLE.length - 1 && (
                      <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                        Next →
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Reassurance Banner */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs">
              <CheckCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Zero copy-pasting between separate apps, emails, and Excel sheets.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
