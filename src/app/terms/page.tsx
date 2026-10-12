import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND } from '@/lib/constants';
import { AlertTriangle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service (Draft) — Your Travel Desk',
  description:
    'Draft Terms of Service for Your Travel Desk. Outlines subscription rights, account responsibilities, and terms awaiting owner confirmation.',
};

export default function TermsPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Terms & Conditions"
          title="Terms of Service"
          description="Draft contractual terms awaiting owner review and legal counsel confirmation."
        />

        {/* Mandatory Draft Notice Banner */}
        <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-5 text-amber-900 shadow-2xs mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="font-bold uppercase tracking-wider text-amber-800">
                Notice: Draft Terms Framework
              </p>
              <p>
                These draft terms establish the service framework for Your Travel Desk. Specific governing laws, arbitration forums, tax treatment, and refund policies must be formally verified by the site owner prior to production enforcement.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing our website (yourtraveldesk.in) or registering for a trial account on our SaaS platform, you represent that you have the authority to bind your travel agency or business to these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">2. 7-Day Free Trial & Subscription Plans</h2>
            <p>
              New travel agencies are eligible for a 7-day free trial on the Starter plan. During the trial, you have full access to core modules without entering payment card information.
            </p>
            <p className="mt-2">
              Following the trial, continued access requires an active subscription to either the Starter plan (₹499/mo or ₹4,999/yr) or the Professional plan (₹999/mo or ₹9,999/yr). Monthly tier limits (such as 20 trips/quotes/bookings on Starter) reset on each billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">3. User Responsibilities & Data Ownership</h2>
            <p>
              You maintain full ownership of all customer profiles, traveler records, hotel rates, and custom itinerary content entered into your workspace. You are responsible for ensuring that all traveler data complies with applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">4. Information Requiring Owner Finalization</h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-2">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-indigo-600" />
                The following business parameters must be finalized prior to live billing:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>[ ] Official registered business entity name and GSTIN details</li>
                <li>[ ] Cancellation, refund, and proration policies for annual subscriptions</li>
                <li>[ ] Governing state/court jurisdiction (e.g. Courts of India)</li>
                <li>[ ] Service Level Agreement (SLA) and maintenance notification procedures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">5. Contact Information</h2>
            <p>
              For legal questions regarding these draft terms, please reach out to{' '}
              <a href={`mailto:${BRAND.supportEmail}`} className="text-indigo-600 font-semibold underline hover:text-indigo-700">
                {BRAND.supportEmail}
              </a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
