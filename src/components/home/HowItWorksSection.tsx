import React from 'react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WORKFLOW_STEPS } from '@/lib/constants';
import { ArrowRight, CheckCheck } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section className="border-t border-slate-200 bg-slate-50/70 py-16 sm:py-20 lg:py-28">
      <Container size="default">
        <SectionHeading
          eyebrow="Simple from start to finish"
          title="Turn your travel workflow into one connected process."
          description="TripDesk structures your daily agency operations into a seamless pipeline where information flows automatically between every stage."
          align="center"
        />

        {/* Workflow container */}
        <div className="mt-12 lg:mt-16">
          {/* Desktop Connected Grid (6 columns) */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-3 relative">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition-all hover:border-indigo-300 hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-[#4F46E5]">
                      {step.number}
                    </span>
                    {idx < WORKFLOW_STEPS.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-slate-300" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / Tablet Vertical Timeline */}
          <div className="lg:hidden space-y-4 max-w-lg mx-auto">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-2xs"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-[#4F46E5]">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {step.title}
                    </h3>
                    {idx < WORKFLOW_STEPS.length - 1 && (
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Next →
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Statement */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-[#0F172A] shadow-2xs">
              <CheckCheck className="h-4 w-4 text-[#4F46E5]" />
              <span>One connected workflow from customer to payment.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
