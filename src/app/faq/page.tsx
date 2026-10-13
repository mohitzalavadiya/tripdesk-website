import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { FAQ_ITEMS, BRAND } from '@/lib/constants';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Your Travel Desk',
  description:
    'Comprehensive answers to questions about Your Travel Desk software, 7-day free trial, Starter and Professional plans, quotation generation, and onboarding.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FaqPage() {
  const categories = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Help & Knowledge Base"
          title="Frequently Asked Questions"
          description={`Find clear answers to common questions about ${BRAND.name}, plan capabilities, data organization, and trial access.`}
        />

        <div className="mt-12 sm:mt-16 space-y-16">
          {categories.map((category) => {
            const categoryItems = FAQ_ITEMS.filter((item) => item.category === category);

            return (
              <div key={category} className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600 shadow-2xs" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{category}</h2>
                </div>
                <FaqAccordion items={categoryItems} allowMultiple />
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <div className="mt-20 rounded-3xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-12 text-center shadow-xs">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-5 shadow-2xs border border-indigo-100">
            <MessageSquare className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Still have questions?</h3>
          <p className="mt-2.5 text-base text-slate-600 max-w-md mx-auto font-normal">
            Our team is happy to discuss your specific agency requirements or arrange a personalized live demonstration.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-demo"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 text-white text-base font-bold hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all hover:-translate-y-0.5"
            >
              <span>Request a Demo</span>
              <ArrowRight className="h-4 w-4 ml-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200/90 bg-white text-slate-800 text-base font-bold hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all hover:-translate-y-0.5"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
