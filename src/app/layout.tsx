import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { CANONICAL_SITE_URL, BRAND } from '@/lib/constants';
import { AnalyticsConsent } from '@/components/analytics/AnalyticsConsent';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  title: {
    default: `${BRAND.name} — Travel Agency Operating System`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    'travel agency software',
    'travel agency CRM',
    'tour operator software India',
    'DMC software',
    'travel quotation builder',
    'itinerary management system',
    'travel booking software',
    'travel agency billing software',
  ],
  authors: [{ name: 'Your Travel Desk' }],
  creator: 'Your Travel Desk',
  publisher: 'Your Travel Desk',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: CANONICAL_SITE_URL,
    title: `${BRAND.name} — Travel Agency Operating System`,
    description: BRAND.description,
    siteName: BRAND.name,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/screenshots/dashboard.png`,
        width: 1920,
        height: 953,
        alt: 'Your Travel Desk Executive Dashboard Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — Travel Agency Operating System`,
    description: BRAND.description,
    images: [`${CANONICAL_SITE_URL}/screenshots/dashboard.png`],
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: BRAND.name,
  operatingSystem: 'Web Browser (Cloud SaaS)',
  applicationCategory: 'BusinessApplication',
  description: BRAND.description,
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '499',
    highPrice: '999',
    offerCount: '2',
  },
  author: {
    '@type': 'Organization',
    name: BRAND.name,
    url: CANONICAL_SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/logo-mark.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <AnalyticsConsent />
      </body>
    </html>
  );
}
