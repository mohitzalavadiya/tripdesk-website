import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata: Metadata = {
  title: 'Terms of Service — Your Travel Desk',
  description:
    'Terms of Service for Your Travel Desk. Outlines subscription rights, acceptable use, trial terms, and business responsibilities.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="py-10 sm:py-20 lg:py-32 bg-white">
      <Container size="narrow">
        <SectionHeading
          eyebrow="Terms & Conditions"
          title="Terms of Service"
          description="Guidelines and terms governing your use of Your Travel Desk."
        />

        <div className="mt-6 mb-6 pb-3 border-b border-slate-200 text-xs sm:text-sm text-slate-500">
          Last updated: 13 October 2026
        </div>

        <div className="space-y-6 sm:space-y-8 text-xs sm:text-base text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-700">
            Your Travel Desk provides travel agency management software to help travel businesses manage trips, quotations, bookings, and related operations.
          </p>
          <p>
            By using the service, you agree to these Terms of Service.
          </p>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">1. Using the Service</h2>
            <p>
              You may use Your Travel Desk for legitimate business purposes. You are responsible for providing accurate account information, protecting your login credentials, and ensuring that you have the necessary permissions to use the information you enter into the service.
            </p>
            <p className="mt-2">
              You must not misuse the service, attempt unauthorized access, interfere with its operation, or use it for unlawful purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">2. Seven-Day Free Trial</h2>
            <p>
              New accounts are offered a seven-day free trial, subject to the conditions displayed during signup. The trial provides Professional-level features during the trial period, as implemented by the service.
            </p>
            <p className="mt-2">
              After the trial expires, the workspace enters read-only mode. You can continue viewing existing records, but creating or modifying business records requires an eligible active subscription.
            </p>
            <p className="mt-2">
              The trial does not automatically convert into a paid subscription, and no automatic subscription charge is made when the trial expires.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">3. Subscription Plans and Prices</h2>
            <p>The advertised plans are:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Starter:</strong> ₹499 per month or ₹4,999 per year.</li>
              <li><strong>Professional:</strong> ₹999 per month or ₹9,999 per year.</li>
            </ul>
            <p className="mt-2">
              The Starter plan advertises monthly limits of 20 trips, 20 quotations, and 20 bookings. The Professional plan advertises unlimited usage for these items, subject to applicable technical and service restrictions.
            </p>
            <p className="mt-2">
              The applicable plan, features, limits, price, and final amount payable will be presented during the subscription process. Any applicable taxes should be disclosed before payment.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">4. Payments and Renewals</h2>
            <p>
              Subscription payments are currently handled through manual UPI or bank transfer. Payment requests are subject to verification before a subscription is activated.
            </p>
            <p className="mt-2">
              Subscriptions do not automatically renew. To continue using paid features after the current subscription period, you must complete the applicable payment and verification process.
            </p>
            <p className="mt-2">
              You will not be automatically charged for a future subscription period by the service.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">5. Ending a Subscription</h2>
            <p>
              The current service does not provide a self-service subscription cancellation feature.
            </p>
            <p className="mt-2">
              Because subscriptions do not automatically renew, you can choose not to make another payment when your current subscription period ends.
            </p>
            <p className="mt-2">
              If you wish to stop using paid features earlier, contact support to discuss the available options. Access changes depend on the subscription status and applicable service process.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">6. Annual Refund Requests</h2>
            <p>
              If you have purchased an annual subscription, you may contact support to request a refund for eligible unused subscription time.
            </p>
            <p className="mt-2">
              Our intended policy is to consider eligible annual refunds based on the unused days remaining in the subscription period. Eligibility, the calculation method, treatment of discounts or plan changes, and processing time must be confirmed before a refund amount can be promised.
            </p>
            <p className="mt-2">
              Refund requests will be reviewed individually under the applicable refund terms and law. A request does not itself confirm approval or a particular refund amount.
            </p>
            <p className="mt-2">
              Until a specific refund procedure is published, please contact support before relying on an estimated refund.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">7. Your Business Data</h2>
            <p>
              You remain responsible for the information you enter into Your Travel Desk, including customer details, travel arrangements, quotations, supplier information, and business records.
            </p>
            <p className="mt-2">
              You should ensure that you have the necessary rights and permissions to use this information.
            </p>
            <p className="mt-2">
              Please check the accuracy of quotations, invoices, booking details, and other generated documents before sharing them with customers or suppliers.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">8. Access and Data Retention</h2>
            <p>
              When a trial or subscription expires, or access is otherwise restricted, some features may become unavailable. Expired trial workspaces are intended to retain read-only access to existing data, as implemented by the service.
            </p>
            <p className="mt-2">
              Subscription expiry does not automatically delete your business records. The service does not currently offer a self-service account-deletion feature or a one-click export of all workspace data.
            </p>
            <p className="mt-2">
              If you need help with your account or data, contact support to discuss the available options. Any deletion request is subject to review, applicable requirements, and the actual technical capabilities of the service.
            </p>
            <p className="mt-2">
              You should maintain appropriate copies of important business records.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">9. Service Availability</h2>
            <p>
              We aim to provide a useful and reliable service, but uninterrupted or error-free operation cannot be guaranteed at all times. Maintenance, technical issues, or third-party service disruptions may affect availability.
            </p>
            <p className="mt-2">
              Features may change as the service develops.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">10. Responsibility and Applicable Law</h2>
            <p>
              You are responsible for how you use the service and for verifying business information before relying on it.
            </p>
            <p className="mt-2">
              Nothing in these terms excludes or limits liability where such exclusion or limitation is not permitted by applicable law.
            </p>
            <p className="mt-2">
              These terms are subject to applicable law. Any more specific governing-law or dispute-resolution provisions will be added if appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">11. Changes to These Terms</h2>
            <p>
              We may update these terms as the service develops. The latest version will be published on this page with its revised date, with notice provided where required.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-xl font-black text-slate-900 mb-2 sm:mb-3">12. Contact Us</h2>
            <p>For questions about subscriptions, payments, refunds, or the service:</p>
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
