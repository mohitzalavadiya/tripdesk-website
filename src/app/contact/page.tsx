import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/contact/ContactForm';
import { BRAND } from '@/lib/constants';
import { Mail, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Support & Inquiries — Your Travel Desk',
  description:
    'Get in touch with the Your Travel Desk team for product assistance, plan inquiries, and onboarding guidance.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-20 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Direct Communication"
          title="Contact Our Team"
          description={`Have questions about ${BRAND.name}, onboarding your agency team, or technical requirements? Reach out directly using the form below or via our support channels.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-10">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3.5 sm:p-5 shadow-xs flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs shrink-0 mt-0.5">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Email Support</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                General inquiries & operational help:
              </p>
              <a
                href={`mailto:${BRAND.contactEmail}`}
                className="mt-1.5 inline-block text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline break-all"
              >
                {BRAND.contactEmail}
              </a>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-slate-50/70 p-3.5 sm:p-5 shadow-xs flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs shrink-0 mt-0.5">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Looking for a Demo?</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                Personalized guided walkthrough:
              </p>
              <Link
                href="/request-demo"
                className="mt-1.5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                <span>Book a Demo</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <ContactForm />
      </Container>
    </div>
  );
}
