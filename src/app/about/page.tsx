import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about TripDesk and our mission to streamline travel agency operations worldwide.',
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="About TripDesk"
          title="Building the Operating System for Travel Agencies"
          description="We are dedicated to helping travel operators, agencies, and DMCs replace fragmented tools with one cohesive operating platform."
        />

        <div className="prose prose-slate mt-8 text-base text-[#475569] leading-relaxed space-y-6">
          <p>
            {BRAND.name} was created to solve a persistent challenge in the travel industry: travel agencies running their businesses across dozens of disconnected spreadsheets, word documents, email threads, and invoicing tools.
          </p>
          <p>
            Our mission is to provide an all-in-one system where teams can manage customer inquiries, generate professional quotations, confirm bookings with suppliers, and track invoices and payments — all in a single workspace.
          </p>
        </div>
      </Container>
    </div>
  );
}
