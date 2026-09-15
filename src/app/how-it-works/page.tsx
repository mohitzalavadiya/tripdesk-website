import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WORKFLOW_STEPS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Understand the seamless workflow from customer inquiry to trip booking and payment.',
};

export default function HowItWorksPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          eyebrow="Workflow"
          title="From Inquiry to Payment, Seamlessly Connected"
          description="TripDesk structures your entire agency workflow into an intuitive, step-by-step pipeline."
        />

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-3 lg:gap-4 overflow-x-auto py-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200 bg-white shadow-sm w-full md:w-40 text-center">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-[#4F46E5] mb-2">
                  {step.number}
                </span>
                <span className="text-sm font-semibold text-[#0F172A]">{step.title}</span>
                <p className="mt-1 text-xs text-[#475569] leading-snug">{step.description}</p>
              </div>
              {index < WORKFLOW_STEPS.length - 1 && (
                <ArrowRight className="hidden md:block h-5 w-5 text-slate-400 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  );
}
