import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'TripDesk Terms of Service and user agreement.',
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Service"
          description="Last updated: September 2026"
        />

        <div className="prose prose-slate mt-8 text-sm sm:text-base text-[#475569] leading-relaxed space-y-6">
          <p>
            By accessing or using the {BRAND.name} website and services, you agree to be bound by these Terms of Service.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">1. Account Terms</h2>
          <p>
            You must be 18 years or older to use this service. You must provide your legal full name, a valid email address, and any other information requested during registration.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">2. Free Trial & Subscriptions</h2>
          <p>
            TripDesk offers a 7-day free trial. If you do not upgrade to a paid subscription before the end of the trial period, your access will be suspended until a subscription is activated.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">3. Limitation of Liability</h2>
          <p>
            TripDesk shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.
          </p>
        </div>
      </Container>
    </div>
  );
}
