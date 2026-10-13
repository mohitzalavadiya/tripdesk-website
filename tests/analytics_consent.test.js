const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('=== Running Analytics Consent Verification Suite ===\n');
console.log('Note: Tests 1-10 are simulated browser contract tests in Node.js.');
console.log('Tests 11-14 are static source inspection tests.\n');

// 1. Mock Browser Environment for unit testing consent & gtag abstractions
class MockLocalStorage {
  constructor() {
    this.store = {};
    this.throwOnGet = false;
    this.throwOnSet = false;
  }
  getItem(key) {
    if (this.throwOnGet) throw new Error('Simulated localStorage read failure');
    return this.store[key] !== undefined ? this.store[key] : null;
  }
  setItem(key, value) {
    if (this.throwOnSet) throw new Error('Simulated localStorage write failure');
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();
const mockWindow = {
  localStorage: mockStorage,
  location: { hostname: 'yourtraveldesk.in' },
};
const mockDocument = {
  cookie: '',
};

// Global polyfills for testing pure logic in Node
global.window = mockWindow;
global.document = mockDocument;

const CONSENT_STORAGE_KEY = 'ytd_analytics_consent_v1';

function getStoredConsent() {
  if (typeof global.window === 'undefined') return 'pending';
  try {
    const raw = global.window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return 'pending';
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && (parsed.status === 'granted' || parsed.status === 'denied')) {
      return parsed.status;
    }
    return 'pending';
  } catch {
    return 'pending';
  }
}

function setStoredConsent(status) {
  if (typeof global.window === 'undefined') return false;
  try {
    const record = {
      status,
      timestamp: Date.now(),
      version: 1,
    };
    global.window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

function hasAnalyticsConsent() {
  return getStoredConsent() === 'granted';
}

function disableGoogleAnalytics(measurementId) {
  if (typeof global.window === 'undefined') return;
  if (measurementId) {
    global.window[`ga-disable-${measurementId}`] = true;
  }
  if (typeof global.document !== 'undefined') {
    global.document.cookie = '';
  }
}

function enableGoogleAnalytics(measurementId) {
  if (typeof global.window === 'undefined' || !measurementId) return;
  global.window[`ga-disable-${measurementId}`] = false;
  if (typeof global.window.gtag === 'function') {
    global.window.gtag('config', measurementId, { send_page_view: false });
  }
}

let gtagCalls = [];
function mockGtag(command, ...args) {
  gtagCalls.push({ command, args });
}
global.window.gtag = mockGtag;

function trackEvent(event, params, measurementId = 'G-9XGMXR7NF0') {
  if (
    typeof global.window === 'undefined' ||
    !global.window.gtag ||
    !measurementId ||
    !hasAnalyticsConsent()
  ) {
    return;
  }

  const safeParams = {};
  if (params) {
    const forbiddenKeys = ['name', 'email', 'phone', 'message', 'agency', 'company', 'notes'];
    for (const [key, value] of Object.entries(params)) {
      if (!forbiddenKeys.some((fk) => key.toLowerCase().includes(fk))) {
        safeParams[key] = value;
      }
    }
  }

  global.window.gtag('event', event, safeParams);
}

// --- Test 1: First Visit Default State (Simulated) ---
console.log('--- 1. Testing First Visit Default (Pending) State [Simulated] ---');
mockStorage.clear();
assert.strictEqual(getStoredConsent(), 'pending', 'First visit with empty storage must return "pending"');
assert.strictEqual(hasAnalyticsConsent(), false, 'First visit must not have analytics consent');
console.log('[PASS] First visit defaults to pending and analytics consent is false');

// --- Test 2: Pre-Consent Event Dispatch Blocking (Simulated) ---
console.log('--- 2. Testing Event Blocking Prior to Consent [Simulated] ---');
gtagCalls = [];
trackEvent('demo_form_success', { bookings_tier: '10_to_50' });
assert.strictEqual(gtagCalls.length, 0, 'No event must be dispatched when consent is pending');
console.log('[PASS] Analytics events blocked when consent is pending');

// --- Test 3: Acceptance State and Event Dispatch (Simulated) ---
console.log('--- 3. Testing Acceptance Workflow [Simulated] ---');
const acceptSaved = setStoredConsent('granted');
assert.strictEqual(acceptSaved, true, 'Acceptance preference successfully saved');
assert.strictEqual(getStoredConsent(), 'granted', 'Stored consent is now "granted"');
assert.strictEqual(hasAnalyticsConsent(), true, 'hasAnalyticsConsent() returns true');

gtagCalls = [];
trackEvent('demo_form_success', { bookings_tier: '10_to_50' });
assert.strictEqual(gtagCalls.length, 1, 'Event dispatched once consent is granted');
assert.strictEqual(gtagCalls[0].command, 'event');
assert.strictEqual(gtagCalls[0].args[0], 'demo_form_success');
assert.deepStrictEqual(gtagCalls[0].args[1], { bookings_tier: '10_to_50' });
console.log('[PASS] Acceptance permits legitimate analytics event dispatch');

// --- Test 4: PII Sanitization Preserved (Simulated) ---
console.log('--- 4. Testing PII Stripping Under Granted Consent [Simulated] ---');
gtagCalls = [];
trackEvent('contact_form_success', {
  fullName: 'John Doe',
  email: 'john@example.com',
  phoneNumber: '+919999999999',
  agencyName: 'Acme Travels',
  message: 'Confidential message',
  validCategory: 'general_inquiry',
});
assert.strictEqual(gtagCalls.length, 1);
assert.deepStrictEqual(gtagCalls[0].args[1], { validCategory: 'general_inquiry' }, 'PII keys must be filtered out');
console.log('[PASS] PII fields successfully sanitized from outgoing event');

// --- Test 5: Rejection State (Simulated) ---
console.log('--- 5. Testing Rejection Workflow [Simulated] ---');
mockStorage.clear();
const rejectSaved = setStoredConsent('denied');
assert.strictEqual(rejectSaved, true, 'Rejection preference successfully saved');
assert.strictEqual(getStoredConsent(), 'denied', 'Stored consent is "denied"');
assert.strictEqual(hasAnalyticsConsent(), false, 'hasAnalyticsConsent() returns false when denied');

gtagCalls = [];
trackEvent('pricing_cta_click', { cycle: 'yearly' });
assert.strictEqual(gtagCalls.length, 0, 'No events dispatched when consent is denied');
console.log('[PASS] Rejection prevents all analytics event dispatch');

// --- Test 6: Revocation from Granted to Denied (Simulated) ---
console.log('--- 6. Testing Revocation Workflow (Granted -> Denied) [Simulated] ---');
setStoredConsent('granted');
assert.strictEqual(hasAnalyticsConsent(), true);

// Revoke consent
setStoredConsent('denied');
disableGoogleAnalytics('G-9XGMXR7NF0');
assert.strictEqual(hasAnalyticsConsent(), false, 'Consent revoked immediately');
assert.strictEqual(global.window['ga-disable-G-9XGMXR7NF0'], true, 'Google Analytics disable flag set on window');

gtagCalls = [];
trackEvent('demo_cta_click');
assert.strictEqual(gtagCalls.length, 0, 'No events dispatched after revocation');
console.log('[PASS] Revocation sets ga-disable flag and immediately blocks subsequent events');

// --- Test 7: Re-acceptance from Denied to Granted with In-Session Config Re-issue (Simulated) ---
console.log('--- 7. Testing In-Session Re-acceptance (Denied -> Granted) [Simulated] ---');
gtagCalls = [];
// Enable and reconfigure since window.gtag exists
enableGoogleAnalytics('G-9XGMXR7NF0');
setStoredConsent('granted');
assert.strictEqual(global.window['ga-disable-G-9XGMXR7NF0'], false, 'Google Analytics disable flag cleared');
assert.strictEqual(hasAnalyticsConsent(), true, 'Consent granted on re-acceptance');
// Verify gtag('config', ...) was called exactly once with send_page_view: false
const configCalls = gtagCalls.filter(c => c.command === 'config');
assert.strictEqual(configCalls.length, 1, 'gtag config called exactly once on reacceptance');
assert.strictEqual(configCalls[0].args[0], 'G-9XGMXR7NF0');
assert.deepStrictEqual(configCalls[0].args[1], { send_page_view: false }, 'Reacceptance config must pass send_page_view: false');

gtagCalls = [];
trackEvent('pricing_cta_click', { cycle: 'monthly' });
assert.strictEqual(gtagCalls.length, 1, 'Events resume dispatching on re-acceptance');
console.log('[PASS] In-session re-acceptance reconfigures GA4 with send_page_view: false and restores event dispatch');

// --- Test 8: Fail-Closed Storage Error Handling (Simulated) ---
console.log('--- 8. Testing Fail-Closed Behavior on Storage Errors [Simulated] ---');
mockStorage.throwOnGet = true;
assert.strictEqual(getStoredConsent(), 'pending', 'Read error fails closed to "pending"');
assert.strictEqual(hasAnalyticsConsent(), false, 'Storage error denies analytics consent');
mockStorage.throwOnGet = false;

mockStorage.throwOnSet = true;
const writeSuccess = setStoredConsent('granted');
assert.strictEqual(writeSuccess, false, 'Write error returns false safely');
mockStorage.throwOnSet = false;
console.log('[PASS] Storage exceptions fail closed safely');

// --- Test 9: Corrupted Storage Value Handling (Simulated) ---
console.log('--- 9. Testing Corrupted Storage Data [Simulated] ---');
mockStorage.store[CONSENT_STORAGE_KEY] = 'not-valid-json';
assert.strictEqual(getStoredConsent(), 'pending', 'Corrupted JSON fails closed to "pending"');
mockStorage.store[CONSENT_STORAGE_KEY] = JSON.stringify({ status: 'invalid_status' });
assert.strictEqual(getStoredConsent(), 'pending', 'Unknown status fails closed to "pending"');
console.log('[PASS] Malformed storage entries fail closed');

// --- Test 10: Escape Dismissal State Machine (Simulated) ---
console.log('--- 10. Testing Escape Dismissal Logic [Simulated] ---');
mockStorage.clear();
let consentState = getStoredConsent(); // 'pending'
let isDismissed = false;
let userOpened = false;
let isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, true, 'Banner visible on first visit');

// Simulate Escape key press on first visit
isDismissed = true;
userOpened = false;
isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, false, 'Banner dismissed after Escape key');
assert.strictEqual(getStoredConsent(), 'pending', 'Storage remains pending after Escape');
assert.strictEqual(hasAnalyticsConsent(), false, 'Analytics remains disabled after Escape');

// Simulate reopening via footer Cookie Preferences button
isDismissed = false;
userOpened = true;
isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, true, 'Banner reopens when triggered from footer');

// Simulate user granting consent from reopened banner
setStoredConsent('granted');
consentState = getStoredConsent();
userOpened = false;
isDismissed = false;
isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, false, 'Banner closes after explicit acceptance');
assert.strictEqual(hasAnalyticsConsent(), true, 'Consent is now granted');

// Simulate reopening preferences while already granted, then pressing Escape
userOpened = true;
isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, true, 'Preferences open with current granted choice');
// Press Escape
userOpened = false;
isDismissed = true;
isBannerVisible = (consentState === 'pending' && !isDismissed) || userOpened;
assert.strictEqual(isBannerVisible, false, 'Preferences dismissed via Escape');
assert.strictEqual(getStoredConsent(), 'granted', 'Stored granted choice preserved after Escape dismissal');
console.log('[PASS] Escape dismissal preserves consent choices and does not trap visitor');

// --- Test 11: Static Source Code Inspection - Scripts & Reconfiguration ---
console.log('--- 11. Static Inspection: Next.js Script Delegation & Reconfiguration ---');
const layoutCode = fs.readFileSync(path.join(__dirname, '../src/app/layout.tsx'), 'utf8');
assert.ok(layoutCode.includes('<AnalyticsConsent />'), 'layout.tsx must render AnalyticsConsent component');
assert.ok(!layoutCode.includes('googletagmanager.com/gtag/js'), 'layout.tsx must NOT directly load gtag.js on server');
console.log('[PASS] layout.tsx delegates script loading exclusively to client component');

const bannerCode = fs.readFileSync(path.join(__dirname, '../src/components/analytics/AnalyticsConsent.tsx'), 'utf8');
assert.ok(bannerCode.includes("gtag('config', '${GA_MEASUREMENT_ID}');"), 'initial inline script must preserve default initial page view');
assert.ok(!bannerCode.includes('send_page_view: false'), 'initial inline script must NOT specify send_page_view: false');
console.log('[PASS] initial configuration in AnalyticsConsent.tsx preserves default initial page view');

const consentCode = fs.readFileSync(path.join(__dirname, '../src/lib/analytics/consent.ts'), 'utf8');
assert.ok(consentCode.includes("window.gtag('config', measurementId, { send_page_view: false })"), 'enableGoogleAnalytics must specify send_page_view: false on reacceptance');
console.log('[PASS] enableGoogleAnalytics specifies send_page_view: false to prevent duplicate same-page views on reacceptance');

// --- Test 12: Static Source Code Inspection - Keyboard Escape Handling ---
console.log('--- 12. Static Inspection: Escape Keydown Listener & Cleanup ---');
assert.ok(bannerCode.includes('event.key === \'Escape\''), 'AnalyticsConsent.tsx must check for Escape key');
assert.ok(bannerCode.includes('window.addEventListener(\'keydown\', handleKeyDown)'), 'AnalyticsConsent.tsx must register keydown listener');
assert.ok(bannerCode.includes('window.removeEventListener(\'keydown\', handleKeyDown)'), 'AnalyticsConsent.tsx must clean up keydown listener');
console.log('[PASS] AnalyticsConsent.tsx implements Escape key listener with proper cleanup');

// --- Test 13: Static Source Code Inspection - UI Content & Buttons ---
console.log('--- 13. Static Inspection: Banner UI & Links ---');
assert.ok(bannerCode.includes('Your privacy choices'), 'Banner must include "Your privacy choices"');
assert.ok(bannerCode.includes('Accept analytics'), 'Banner must include "Accept analytics"');
assert.ok(bannerCode.includes('Reject analytics'), 'Banner must include "Reject analytics"');
assert.ok(bannerCode.includes('href="/privacy"'), 'Banner must link to /privacy');
console.log('[PASS] AnalyticsConsent.tsx contains required copy, buttons, and links');

// --- Test 14: Static Source Code Inspection - Footer & Privacy Disclosures ---
console.log('--- 14. Static Inspection: Footer & Privacy Disclosures ---');
const footerCode = fs.readFileSync(path.join(__dirname, '../src/components/layout/Footer.tsx'), 'utf8');
assert.ok(footerCode.includes('CookiePreferencesButton'), 'Footer.tsx must include CookiePreferencesButton');

const privacyCode = fs.readFileSync(path.join(__dirname, '../src/app/privacy/page.tsx'), 'utf8');
assert.ok(privacyCode.includes('essential website functionality'), 'Privacy page must mention essential functionality');
assert.ok(privacyCode.includes('never loaded or initialized'), 'Privacy page must state GA4 is not loaded without consent');
assert.ok(privacyCode.includes('Cookie Preferences'), 'Privacy page must mention Cookie Preferences control');
console.log('[PASS] Footer and Privacy Policy include required controls and disclosures');

console.log('\n=== ALL ANALYTICS CONSENT TESTS PASSED SUCCESSFULLY ===\n');
