import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE_URL, BRAND } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — ${BRAND.eyebrow}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    'travel agency software',
    'travel agency CRM',
    'tour operator software',
    'DMC software',
    'travel quotation software',
    'travel booking system',
  ],
  authors: [{ name: 'TripDesk' }],
  creator: 'TripDesk',
  publisher: 'TripDesk',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: `${BRAND.name} — ${BRAND.eyebrow}`,
    description: BRAND.description,
    siteName: BRAND.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.eyebrow}`,
    description: BRAND.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0F172A] font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
