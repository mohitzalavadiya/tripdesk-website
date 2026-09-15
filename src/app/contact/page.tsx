import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact & Book a Demo',
  description: 'Get in touch with the TripDesk team or schedule a live personalized demo.',
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Book a Demo or Ask a Question"
          description="Interested in seeing how TripDesk fits your agency workflow? We'd love to show you around."
        />

        <ContactForm />
      </Container>
    </div>
  );
}
