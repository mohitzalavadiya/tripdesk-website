import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { HOMEPAGE_FAQ } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Detailed answers to common questions about TripDesk features, pricing, trials, and support.',
};

export default function FaqPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Support & Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about TripDesk and getting started."
        />

        <div className="mt-8">
          <FaqAccordion items={[...HOMEPAGE_FAQ]} allowMultiple />
        </div>
      </Container>
    </div>
  );
}
