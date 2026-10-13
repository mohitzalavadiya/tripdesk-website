import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Privacy Policy — Your Travel Desk',
  description:
    'Privacy Policy for Your Travel Desk. Explains what information we collect, how we use it, and how we handle inquiries.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-10 sm:py-20 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Compliance & Data Protection"
          title="Privacy Policy"
          description="How we collect, use, and protect your information when you use our marketing website."
        />

        <div className="mt-6 mb-6 pb-3 border-b border-slate-200 text-xs sm:text-sm text-slate-500">
          Last updated: 13 October 2026
        </div>

        <div className="space-y-6 sm:space-y-8 text-xs sm:text-base text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-700">
            Your Travel Desk provides travel agency management software for managing trips, quotations, bookings, and related business operations.
          </p>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">1. Information We Collect</h2>
            <p>
              When you submit a demo request or contact form, we may collect your name, email address, agency name, optional phone number, inquiry details, and information about your business needs.
            </p>
            <p className="mt-2">
              If you choose to receive product updates, we may also use your stated preference to send occasional updates.
            </p>
            <p className="mt-2 text-slate-700 font-medium">
              Please do not submit passwords, payment details, or sensitive personal information through our marketing forms.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information you submit to respond to inquiries, arrange demonstrations, explain our services, follow up on requests, send optional product updates where you have opted in, and protect our forms against spam.
            </p>
            <p className="mt-2">
              You may ask us to stop sending optional marketing updates at any time.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">3. Email Processing</h2>
            <p>
              Our marketing forms use an email delivery provider, Resend, to route submissions to our current support inbox:{' '}
              <a
                href="mailto:supportyourtraveldesk@gmail.com"
                className="text-indigo-600 font-semibold underline hover:text-indigo-700"
              >
                supportyourtraveldesk@gmail.com
              </a>
            </p>
            <p className="mt-2">
              The marketing website does not maintain a separate database of these form submissions. Copies may remain in email inboxes and third-party service systems under their applicable retention practices.
            </p>
            <p className="mt-2">
              We do not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">4. Cookies and Analytics</h2>
            <p>
              We distinguish between essential website functionality and optional analytics. Essential features (such as page rendering, navigation, and contact form delivery) operate without optional tracking cookies.
            </p>
            <p className="mt-2">
              With your explicit permission, we use Google Analytics (Google Analytics 4) to evaluate aggregate website traffic, understand visitor engagement, and improve our content. Google Analytics is <strong>never loaded or initialized</strong> on your first visit unless you explicitly choose to accept optional analytics via our choices banner.
            </p>
            <p className="mt-2">
              If you reject analytics, no Google Analytics scripts are loaded, no analytics cookies are set, and all normal website features and inquiry forms remain fully usable.
            </p>
            <p className="mt-2">
              When accepted, Google Analytics may use first-party cookies or device identifiers to collect technical usage data, such as your browser type, device characteristics, pages viewed, approximate geographic region, referral sources, and session duration.
            </p>
            <p className="mt-2">
              Our website code strictly enforces data boundaries: direct identifying details entered into demo request or contact forms—including your name, email address, phone number, agency name, and message text—are never sent as analytics event parameters.
            </p>
            <p className="mt-2">
              You can change or revoke your analytics choice at any time by clicking the <strong>Cookie Preferences</strong> link in the footer of any page. When consent is revoked, further event dispatch and page tracking are blocked immediately, and first-party Google Analytics cookies are deleted where technically possible.
            </p>
            <p className="mt-2">
              Google Analytics is provided by Google LLC, and its processing is subject to Google&apos;s privacy practices. You can learn more at{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold underline hover:text-indigo-700"
              >
                Google&apos;s Partner Privacy Policy
              </a>
              . You may also manage cookies through your web browser settings or install the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold underline hover:text-indigo-700"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">5. Retention and Requests</h2>
            <p>
              We retain inquiry information for as long as reasonably necessary to respond to requests, manage follow-up communications, and maintain relevant business records.
            </p>
            <p className="mt-2">
              You may contact us to request access to, correction of, or deletion of information you submitted. We will review reasonable requests and take appropriate action, subject to applicable law and legitimate recordkeeping requirements.
            </p>
            <p className="mt-2">
              Deletion from our own systems does not necessarily remove copies held by third-party service providers or in their backups.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">6. Third-Party Services</h2>
            <p>
              We use third-party services to operate the website and deliver form submissions. These providers may process information as necessary to provide their services under their applicable terms and privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this policy as our website and services develop. The latest version will be published on this page with its revised date.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">8. Contact Us</h2>
            <p>For privacy questions or requests:</p>
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm space-y-1">
              <p className="font-bold text-slate-900">Your Travel Desk</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:supportyourtraveldesk@gmail.com"
                  className="text-indigo-600 font-semibold underline hover:text-indigo-700"
                >
                  supportyourtraveldesk@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
