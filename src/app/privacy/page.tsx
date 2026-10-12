import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND } from '@/lib/constants';
import { AlertTriangle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (Draft) — Your Travel Desk',
  description:
    'Draft Privacy Policy foundation for Your Travel Desk. Identifies data handling practices and points requiring owner confirmation prior to public publication.',
};

export default function PrivacyPage() {
  return (
    <div className="py-20 sm:py-28 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Compliance & Data Protection"
          title="Privacy Policy"
          description="Draft policy framework awaiting final owner review and legal confirmation."
        />

        {/* Mandatory Draft Notice Banner */}
        <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-5 text-amber-900 shadow-2xs mb-10">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p className="font-bold uppercase tracking-wider text-amber-800">
                Notice: Draft Legal Foundation
              </p>
              <p>
                This document serves as an architectural legal foundation. Specific corporate registration details, jurisdiction, subprocessor listings, and retention schedules must be confirmed by the site owner and legal counsel prior to formal publication.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">1. Scope & Application</h2>
            <p>
              This Privacy Policy describes how {BRAND.name} (operated under the proposed business entity, subject to final owner confirmation) collects, uses, and safeguards information when you visit our marketing website (yourtraveldesk.in) or use our travel agency software suite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">2. Information Collected</h2>
            <p>
              We collect information provided directly by travel agencies and prospective clients:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
              <li><strong>Account Credentials:</strong> Full name, work email address, phone number, and agency name during trial registration and demo requests.</li>
              <li><strong>Agency Operational Data:</strong> Customer profiles, itinerary details, hotel tariffs, and booking vouchers entered into the SaaS platform.</li>
              <li><strong>Billing Information:</strong> Transaction identifiers and payment logs (billing details are securely processed by authorized payment gateways).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">3. How Information Is Used</h2>
            <p>
              Information is utilized strictly to provide, maintain, and support our travel management platform, including generating quotations, invoices, and vouchers as requested by the user, and communicating service notices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">4. Items Awaiting Owner Confirmation</h2>
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-2">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-indigo-600" />
                The following specific parameters must be verified by the owner:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>[ ] Registered legal entity name (e.g. LLP, Pvt Ltd, or Sole Proprietorship)</li>
                <li>[ ] Official postal and registered office address</li>
                <li>[ ] Applicable jurisdiction and governing dispute forum (e.g. Courts of Gujarat / India)</li>
                <li>[ ] Data retention schedule for cancelled trials and inactive agency records</li>
                <li>[ ] Official Data Protection Officer contact email</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black text-slate-900 mb-3">5. Inquiries & Contact</h2>
            <p>
              For privacy-related inquiries regarding this draft policy, please contact us at{' '}
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
