const assert = require('assert');
const { execSync } = require('child_process');

async function testSuite() {
  const baseUrl = 'http://localhost:3002';
  console.log(`Starting Phase 1 remediation verification against ${baseUrl}...\n`);

  // --- 1. Environment Template Ignore Verification ---
  console.log('--- 1. Testing .gitignore & Environment Template Tracking ---');
  try {
    const ignoredLocal = execSync('git check-ignore .env.local', { encoding: 'utf8' }).trim();
    assert.strictEqual(ignoredLocal, '.env.local', '.env.local must remain ignored by git');
    console.log('[PASS] .env.local remains properly ignored by git');
  } catch (err) {
    assert.fail(`.env.local check-ignore failed: ${err.message}`);
  }

  let exampleIgnored = false;
  try {
    execSync('git check-ignore .env.example', { encoding: 'utf8' });
    exampleIgnored = true;
  } catch {
    exampleIgnored = false;
  }
  assert.strictEqual(exampleIgnored, false, '.env.example must NOT be ignored by git');
  console.log('[PASS] .env.example is properly tracked (exception verified)');

  // --- 2. Testing Route Availability & HTML Content ---
  console.log('\n--- 2. Testing Route Availability & HTML Content ---');
  const pages = [
    { path: '/', titlePart: 'Your Travel Desk' },
    { path: '/features', titlePart: 'Features' },
    { path: '/pricing', titlePart: 'Pricing' },
    { path: '/how-it-works', titlePart: 'How It Works' },
    { path: '/request-demo', titlePart: 'Request a Demo' },
    { path: '/about', titlePart: 'About' },
    { path: '/faq', titlePart: 'Frequently Asked Questions' },
    { path: '/contact', titlePart: 'Contact' },
    { path: '/privacy', titlePart: 'Privacy Policy' },
    { path: '/terms', titlePart: 'Terms of Service' },
    { path: '/robots.txt', textCheck: 'Disallow: /' },
    { path: '/sitemap.xml', textCheck: '<urlset' },
  ];

  for (const page of pages) {
    const res = await fetch(`${baseUrl}${page.path}`);
    assert.strictEqual(res.status, 200, `Page ${page.path} returned status ${res.status}`);
    const text = await res.text();

    if (page.titlePart) {
      assert(
        text.includes(page.titlePart),
        `Page ${page.path} does not contain expected title snippet: "${page.titlePart}"`
      );
    }
    if (page.textCheck) {
      assert(
        text.includes(page.textCheck),
        `Page ${page.path} does not contain expected body snippet: "${page.textCheck}"`
      );
    }
    console.log(`[PASS] ${page.path} (Status: 200, Content verified)`);
  }

  // --- 3. Testing Static Screenshot Assets ---
  console.log('\n--- 3. Testing Screenshot Assets ---');
  const screenshots = [
    '/screenshots/dashboard.png',
    '/screenshots/trips.png',
    '/screenshots/quotations.png',
    '/screenshots/bookings.png',
    '/screenshots/pricing.png',
  ];

  for (const asset of screenshots) {
    const res = await fetch(`${baseUrl}${asset}`);
    assert.strictEqual(res.status, 200, `Screenshot ${asset} failed to load`);
    const contentType = res.headers.get('content-type');
    assert(contentType && contentType.includes('image'), `Asset ${asset} content-type is not image: ${contentType}`);
    const contentLength = parseInt(res.headers.get('content-length') || '0', 10);
    assert(contentLength > 50000, `Asset ${asset} is unusually small (${contentLength} bytes), possible empty image`);
    console.log(`[PASS] Asset ${asset} loaded successfully (${contentType}, ${contentLength} bytes)`);
  }

  // --- 4. Testing Honeypot & Anti-Abuse Server Rejection ---
  console.log('\n--- 4. Testing Honeypot & Anti-Spam Server Rejection ---');
  // 4a. Demo form with honeypot filled
  const spamDemoRes = await fetch(`${baseUrl}/api/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Bot User',
      workEmail: 'bot@spamnetwork.com',
      agencyName: 'Spam Travels',
      website: 'http://malicious-advertiser.com', // Honeypot populated!
    }),
  });
  assert.strictEqual(spamDemoRes.status, 400, 'Populated honeypot in demo form must return HTTP 400');
  const spamDemoData = await spamDemoRes.json();
  assert.strictEqual(spamDemoData.status, 'spam_detected', 'Honeypot violation must report status: spam_detected');
  console.log('[PASS] POST /api/demo correctly rejects bot with honeypot filled (HTTP 400, spam_detected)');

  // 4b. Contact form with honeypot filled
  const spamContactRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Bot User',
      email: 'bot@spamnetwork.com',
      subject: 'Commercial advertisement',
      message: 'Unsolicited marketing text here.',
      website: 'http://malicious-advertiser.com', // Honeypot populated!
    }),
  });
  assert.strictEqual(spamContactRes.status, 400, 'Populated honeypot in contact form must return HTTP 400');
  const spamContactData = await spamContactRes.json();
  assert.strictEqual(spamContactData.status, 'spam_detected', 'Honeypot violation must report status: spam_detected');
  console.log('[PASS] POST /api/contact correctly rejects bot with honeypot filled (HTTP 400, spam_detected)');

  // --- 5. Testing Demo & Contact API Validation and Honest Unconfigured State ---
  console.log('\n--- 5. Testing API Validation & Honest Unconfigured State ---');
  // 5a. Invalid Demo payload (missing fields)
  const badDemoRes = await fetch(`${baseUrl}/api/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName: 'A' }),
  });
  assert.strictEqual(badDemoRes.status, 400, 'Invalid demo request must return 400');
  const badDemoData = await badDemoRes.json();
  assert.strictEqual(badDemoData.success, false);
  assert(badDemoData.errors);
  console.log('[PASS] POST /api/demo rejects invalid input with 400 and validation errors');

  // 5b. Valid Demo payload with unconfigured backend (without honeypot)
  const validDemoRes = await fetch(`${baseUrl}/api/demo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Rahul Sharma',
      workEmail: 'rahul@sharmatours.com',
      agencyName: 'Sharma Tours',
      monthlyBookings: '10_to_50',
      website: '', // Clean empty honeypot
    }),
  });
  assert.strictEqual(validDemoRes.status, 501, 'Unconfigured backend must return 501 Not Implemented');
  const validDemoData = await validDemoRes.json();
  assert.strictEqual(validDemoData.status, 'unconfigured');
  assert.strictEqual(validDemoData.success, false);
  console.log('[PASS] POST /api/demo transparently returns status: unconfigured when no webhook is set');

  // 5c. Valid Contact payload with unconfigured backend
  const validContactRes = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Priya Verma',
      email: 'priya@apexholidays.com',
      subject: 'Inquiry regarding multi-city itineraries',
      message: 'Hello team, wanted to understand the pricing and quotation workflow.',
      website: '',
    }),
  });
  assert.strictEqual(validContactRes.status, 501, 'Unconfigured contact must return 501');
  const validContactData = await validContactRes.json();
  assert.strictEqual(validContactData.status, 'unconfigured');
  assert.strictEqual(validContactData.success, false);
  console.log('[PASS] POST /api/contact transparently reports status: unconfigured without webhook');

  // --- 6. Local Mock-Webhook Dispatch Suite (Production Adapter Exercised) ---
  console.log('\n--- 6. Mock-Webhook Dispatch Suite (Production Adapter Exercised) ---');
  try {
    execSync('npx --no-install tsx tests/mock_webhook.test.ts', { stdio: 'inherit' });
    console.log('[PASS] Full mock-webhook dispatch test suite passed (8/8 scenarios verified)');
  } catch (err) {
    assert.fail(`Mock webhook test suite failed: ${err.message}`);
  }

  // --- 7. Pricing Verification ---
  console.log('\n--- 7. Pricing & Currency Verification ---');
  const pricingHtmlRes = await fetch(`${baseUrl}/pricing`);
  const pricingHtml = await pricingHtmlRes.text();
  assert(pricingHtml.includes('₹499'), 'Pricing page must include canonical ₹499 monthly price');
  assert(pricingHtml.includes('₹999'), 'Pricing page must include canonical ₹999 monthly price');
  assert(pricingHtml.includes('₹4,999'), 'Pricing page must include canonical ₹4,999 yearly price');
  assert(pricingHtml.includes('₹9,999'), 'Pricing page must include canonical ₹9,999 yearly price');
  console.log('[PASS] Verified canonical INR pricing (₹499, ₹999, ₹4,999, ₹9,999) on /pricing');

  console.log('\n=============================================');
  console.log('ALL PHASE 1 REMEDIATION TESTS PASSED (100%)');
  console.log('=============================================\n');
}

testSuite().catch((err) => {
  console.error('TEST SUITE FAILED:', err);
  process.exit(1);
});
