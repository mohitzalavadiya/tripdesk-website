/**
 * First-Party Analytics Consent Management
 * Manages visitor choices for optional Google Analytics 4 tracking.
 */

export const CONSENT_STORAGE_KEY = 'ytd_analytics_consent_v1';

export type ConsentStatus = 'granted' | 'denied' | 'pending';

export interface ConsentRecord {
  status: 'granted' | 'denied';
  timestamp: number;
  version: number;
}

/**
 * Reads the stored consent preference safely.
 * Returns 'pending' if no preference is stored, unreadable, or corrupted.
 */
export function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') {
    return 'pending';
  }
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return 'pending';
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      (parsed.status === 'granted' || parsed.status === 'denied')
    ) {
      return parsed.status;
    }
    return 'pending';
  } catch {
    // Fail closed if localStorage is disabled or throws (e.g. strict private mode)
    return 'pending';
  }
}

/**
 * Saves the visitor's consent decision.
 * Returns true if successfully saved, false otherwise.
 */
export function setStoredConsent(status: 'granted' | 'denied'): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const record: ConsentRecord = {
      status,
      timestamp: Date.now(),
      version: 1,
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(new Event('ytd:consent-changed'));
    return true;
  } catch {
    // Fail closed: cannot save preference
    return false;
  }
}

/**
 * Checks whether analytics consent is currently granted.
 */
export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === 'granted';
}

/**
 * Disables Google Analytics in the browser:
 * 1. Sets window['ga-disable-<MEASUREMENT_ID>'] = true
 * 2. Clears first-party Google Analytics cookies (_ga, _ga_*, _gid)
 */
export function disableGoogleAnalytics(measurementId?: string): void {
  if (typeof window === 'undefined') return;

  if (measurementId) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = true;
  }

  // Clear GA cookies across paths and domains
  if (typeof document !== 'undefined') {
    try {
      const cookies = document.cookie.split(';');
      const hostname = window.location.hostname;
      const domainParts = hostname.split('.');

      const domainsToTry = ['', hostname, '.' + hostname];
      if (domainParts.length > 1) {
        const rootDomain = domainParts.slice(-2).join('.');
        domainsToTry.push('.' + rootDomain);
      }

      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (name.startsWith('_ga') || name.startsWith('_gid')) {
          for (const domain of domainsToTry) {
            const domainAttr = domain ? `; domain=${domain}` : '';
            document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainAttr}`;
          }
        }
      }
    } catch {
      // Ignore cookie clearance failures in restricted environments
    }
  }
}

/**
 * Re-enables Google Analytics if previously disabled.
 * If the gtag runtime is already present in memory (e.g. in-session reacceptance),
 * re-executes the config command with send_page_view: false to resume measurement
 * and custom events without generating an unintended duplicate page view on the same page.
 */
export function enableGoogleAnalytics(measurementId?: string): void {
  if (typeof window === 'undefined' || !measurementId) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${measurementId}`] = false;

  if (typeof window.gtag === 'function') {
    window.gtag('config', measurementId, { send_page_view: false });
  }
}
