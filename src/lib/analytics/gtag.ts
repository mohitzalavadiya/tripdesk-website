/**
 * Google Analytics 4 (GA4) & Custom Event Abstraction
 * Complies with strict privacy guidelines: No PII (names, emails, phones) is ever sent.
 */

import { hasAnalyticsConsent } from './consent';

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

export type AnalyticsEventType =
  | 'demo_cta_click'
  | 'demo_form_success'
  | 'trial_cta_click'
  | 'trial_signup_success'
  | 'contact_form_success'
  | 'pricing_cta_click';

export function trackEvent(
  event: AnalyticsEventType,
  params?: Record<string, string | number | boolean>
) {
  if (
    typeof window === 'undefined' ||
    !window.gtag ||
    !GA_MEASUREMENT_ID ||
    !hasAnalyticsConsent()
  ) {
    // Analytics is unconfigured, consent is not granted, or in SSR mode
    return;
  }

  // Sanitize params: strictly filter out any potential personal data keys
  const safeParams: Record<string, string | number | boolean> = {};
  if (params) {
    const forbiddenKeys = ['name', 'email', 'phone', 'message', 'agency', 'company', 'notes'];
    for (const [key, value] of Object.entries(params)) {
      if (!forbiddenKeys.some((fk) => key.toLowerCase().includes(fk))) {
        safeParams[key] = value;
      }
    }
  }

  window.gtag('event', event, safeParams);
}
