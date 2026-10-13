'use client';

import React, { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  ConsentStatus,
  getStoredConsent,
  setStoredConsent,
  disableGoogleAnalytics,
  enableGoogleAnalytics,
} from '@/lib/analytics/consent';
import { GA_MEASUREMENT_ID } from '@/lib/analytics/gtag';

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function subscribeToConsent(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('storage', callback);
  window.addEventListener('ytd:consent-changed', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('ytd:consent-changed', callback);
  };
}

export function AnalyticsConsent() {
  const isClient = useIsClient();
  const [userOpened, setUserOpened] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const consent: ConsentStatus = useSyncExternalStore(
    subscribeToConsent,
    getStoredConsent,
    () => 'pending'
  );

  const isValidId = Boolean(
    GA_MEASUREMENT_ID && /^G-[A-Za-z0-9]+$/.test(GA_MEASUREMENT_ID)
  );

  useEffect(() => {
    const handleOpen = () => {
      setIsDismissed(false);
      setUserOpened(true);
    };

    window.addEventListener('ytd:open-consent-banner', handleOpen);
    return () => {
      window.removeEventListener('ytd:open-consent-banner', handleOpen);
    };
  }, []);

  const handleAccept = useCallback(() => {
    setStoredConsent('granted');
    enableGoogleAnalytics(GA_MEASUREMENT_ID);
    setUserOpened(false);
    setIsDismissed(false);
  }, []);

  const handleReject = useCallback(() => {
    setStoredConsent('denied');
    disableGoogleAnalytics(GA_MEASUREMENT_ID);
    setUserOpened(false);
    setIsDismissed(false);
  }, []);

  const handleClose = useCallback(() => {
    setUserOpened(false);
    setIsDismissed(true);
  }, []);

  const isBannerVisible = (consent === 'pending' && !isDismissed) || userOpened;

  useEffect(() => {
    if (!isBannerVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserOpened(false);
        setIsDismissed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBannerVisible]);

  if (!isClient) {
    return null;
  }

  const showScripts = consent === 'granted' && isValidId;

  return (
    <>
      {showScripts && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {isBannerVisible && (
        <aside
          role="region"
          aria-label="Privacy and cookie choices"
          aria-describedby="consent-banner-desc"
          className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-3xl mx-auto rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/15 p-4 sm:p-6 transition-all duration-200">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">
                    Your privacy choices
                  </h2>
                  {consent !== 'pending' && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        consent === 'granted'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {consent === 'granted' ? 'Currently: Accepted' : 'Currently: Rejected'}
                    </span>
                  )}
                </div>
                <p
                  id="consent-banner-desc"
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed"
                >
                  We use essential website functionality to operate this site. With your
                  permission, we also use Google Analytics to understand how visitors use our
                  website and improve it. You can accept or reject optional analytics. Read our{' '}
                  <Link
                    href="/privacy"
                    className="text-indigo-600 font-semibold underline hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600 rounded-xs"
                  >
                    Privacy Policy
                  </Link>{' '}
                  for more information.
                </p>
              </div>

              {consent !== 'pending' && (
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close preferences without changing"
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 -mr-1 -mt-1 rounded-lg focus-visible:outline-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleReject}
                className="w-full sm:w-auto inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 shadow-2xs cursor-pointer"
              >
                Reject analytics
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="w-full sm:w-auto inline-flex items-center justify-center text-xs sm:text-sm font-semibold px-4 py-2 sm:py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 shadow-sm shadow-indigo-600/20 cursor-pointer"
              >
                Accept analytics
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
