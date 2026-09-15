import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { ProductOverviewSection } from '@/components/home/ProductOverviewSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { ProductScreensSection } from '@/components/home/ProductScreensSection';
import { WhyTripDeskSection } from '@/components/home/WhyTripDeskSection';
import { PricingPreviewSection } from '@/components/home/PricingPreviewSection';
import { BookDemoSection } from '@/components/home/BookDemoSection';
import { FaqPreviewSection } from '@/components/home/FaqPreviewSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Problem */}
      <ProblemSection />

      {/* 4. Product Overview */}
      <ProductOverviewSection />

      {/* 5. How It Works */}
      <HowItWorksSection />

      {/* 6. Real Product Screens */}
      <ProductScreensSection />

      {/* 7. Why TripDesk */}
      <WhyTripDeskSection />

      {/* 8. Pricing Preview */}
      <PricingPreviewSection />

      {/* 9. Book a Demo */}
      <BookDemoSection />

      {/* 10. FAQ */}
      <FaqPreviewSection />

      {/* 11. Final CTA */}
      <FinalCtaSection />
    </div>
  );
}
