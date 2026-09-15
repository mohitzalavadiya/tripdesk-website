import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { PRODUCT_AREAS } from '@/lib/constants';
import { Users, Compass, Building, FileText, CalendarCheck, CreditCard, Car, Smile } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore the 8 core product areas designed to power your entire travel agency operation.',
};

const ICONS = [Users, Compass, Building, FileText, CalendarCheck, CreditCard, Car, Smile];

export default function FeaturesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="default">
        <SectionHeading
          eyebrow="Product Features"
          title="Everything You Need to Run Your Agency"
          description="Built specifically for travel businesses. TripDesk consolidates your operations into 8 integrated product modules."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PRODUCT_AREAS.map((area, index) => {
            const IconComponent = ICONS[index % ICONS.length];
            return (
              <FeatureCard
                key={area.title}
                icon={<IconComponent className="h-6 w-6" />}
                title={area.title}
                description={area.description}
                interactive
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
