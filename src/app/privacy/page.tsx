import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TripDesk Privacy Policy and data protection practices.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated: September 2026"
        />

        <div className="prose prose-slate mt-8 text-sm sm:text-base text-[#475569] leading-relaxed space-y-6">
          <p>
            At {BRAND.name}, we are committed to protecting your privacy and ensuring the security of your personal and agency operational data.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">1. Information We Collect</h2>
          <p>
            When you register for an account, subscribe to our service, or request a demo, we collect your name, email address, agency name, and billing details.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">2. How We Use Information</h2>
          <p>
            We use the information collected to operate, maintain, and provide the features of the TripDesk platform, process payments, and provide customer support.
          </p>
          <h2 className="text-xl font-bold text-[#0F172A] mt-8">3. Data Security</h2>
          <p>
            We employ administrative, technical, and physical security measures to safeguard your information against unauthorized access, destruction, or alteration.
          </p>
        </div>
      </Container>
    </div>
  );
}
