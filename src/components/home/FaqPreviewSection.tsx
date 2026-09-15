import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { HOMEPAGE_FAQ } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export function FaqPreviewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Questions & Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about TripDesk and getting started."
          align="center"
        />

        <div className="mt-10">
          <FaqAccordion items={[...HOMEPAGE_FAQ]} allowMultiple />
        </div>

        {/* Link to full FAQ page */}
        <div className="mt-12 text-center border-t border-slate-200 pt-8">
          <p className="text-sm text-[#475569]">
            Have more questions about specific features or enterprise setups?
          </p>
          <Link
            href="/faq"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors"
          >
            <span>View all questions and answers</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
