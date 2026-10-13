import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { CapabilitiesStrip } from '@/components/home/CapabilitiesStrip';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ProductOverviewSection } from '@/components/home/ProductOverviewSection';
import { ProductScreensSection } from '@/components/home/ProductScreensSection';
import { WhyTripDeskSection } from '@/components/home/WhyTripDeskSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PricingPreviewSection } from '@/components/home/PricingPreviewSection';
import { BookDemoSection } from '@/components/home/BookDemoSection';
import { FaqPreviewSection } from '@/components/home/FaqPreviewSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Core Capabilities Proof Strip */}
      <CapabilitiesStrip />

      {/* 3. Problem / The Struggle */}
      <ProblemSection />

      {/* 4. Product Overview (8 Modules) */}
      <ProductOverviewSection />

      {/* 5. Inside the Platform: Editorial Screen Spotlights */}
      <ProductScreensSection />

      {/* 6. Why Your Travel Desk (High-Contrast Navy Section) */}
      <WhyTripDeskSection />

      {/* 7. How It Works (6-Stage Lifecycle) */}
      <HowItWorksSection />

      {/* 8. Pricing Preview */}
      <PricingPreviewSection />

      {/* 9. Book a Demo */}
      <BookDemoSection />

      {/* 10. FAQ Preview */}
      <FaqPreviewSection />

      {/* 11. Final Closing CTA */}
      <FinalCtaSection />
    </div>
  );
}
