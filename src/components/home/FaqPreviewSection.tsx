import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { FAQ_ITEMS, BRAND } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function FaqPreviewSection() {
  const previewItems = FAQ_ITEMS.slice(0, 5);

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white border-b border-slate-200/80">
      <Container size="narrow">
        {/* Perk-Style Editorial Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-950 leading-[1.1]">
            Got questions?
            <br />
            We&apos;ve got answers.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Everything you need to know about {BRAND.name}, our 7-day free trial, and onboarding.
          </p>
        </div>

        <div className="rounded-[32px] border border-slate-200/80 bg-[#F4F3EE] p-6 sm:p-10 shadow-2xs">
          <FaqAccordion items={previewItems} allowMultiple />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            Have more questions about specific features, custom workflows, or billing?
          </p>
          <Link
            href="/faq"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>Explore all frequently asked questions</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
