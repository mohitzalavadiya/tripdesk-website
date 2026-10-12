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
};

export default function ContactPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Direct Communication"
          title="Contact Our Team"
          description={`Have questions about ${BRAND.name}, onboarding your agency team, or technical requirements? Reach out directly using the form below or via our support channels.`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Email Support</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              For general inquiries and operational support:
            </p>
            <a
              href={`mailto:${BRAND.contactEmail}`}
              className="mt-2.5 inline-block text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline break-all"
            >
              {BRAND.contactEmail}
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Looking for a Demo?</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Want a personalized walkthrough of the platform?
            </p>
            <Link
              href="/request-demo"
              className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              <span>Go to Demo Request Page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <ContactForm />
      </Container>
    </div>
  );
}
