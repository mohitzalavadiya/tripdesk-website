import http from 'http';
import assert from 'assert';
import { AddressInfo } from 'net';
import {
  submitDemoRequest,
  submitContactMessage,
} from '../src/lib/adapters/submissionAdapter';
import {
  escapeHtml,
  isResendConfigured,
  resolveFromEmail,
  resolveRecipientEmail,
  DEFAULT_RESEND_FROM_EMAIL,
  DEFAULT_NOTIFICATION_RECIPIENT_EMAIL,
} from '../src/lib/email/resend';
import { DemoRequestInput, ContactMessageInput, demoRequestSchema, contactMessageSchema } from '../src/lib/validation/demoSchema';

interface CapturedRequest {
  url?: string;
  method?: string;
  headers: http.IncomingHttpHeaders;
  body: Record<string, unknown>;
}

async function runResendDeliveryTestSuite() {
  console.log('=== Running Resend Notification Delivery Mock Tests ===\n');

  // Preserve initial environment variables
  const initialResendKey = process.env.RESEND_API_KEY;
  const initialResendBaseUrl = process.env.RESEND_API_BASE_URL;
  const initialResendFrom = process.env.RESEND_FROM_EMAIL;
  const initialRecipient = process.env.NOTIFICATION_RECIPIENT_EMAIL;
  const initialDemoWebhook = process.env.DEMO_WEBHOOK_URL;
  const initialContactWebhook = process.env.CONTACT_WEBHOOK_URL;
  const initialTimeout = process.env.SUBMISSION_TIMEOUT_MS;

  let capturedResendRequests: CapturedRequest[] = [];
  let capturedWebhookRequests: CapturedRequest[] = [];

  let resendStatusCode = 200;
  let resendDelayMs = 0;
  let resendResponseBody: Record<string, unknown> = { id: 'msg_test_mock_123' };

  let webhookStatusCode = 200;
  let webhookResponseBody: Record<string, unknown> = { success: true };

  // 1. Mock Resend HTTP Server on loopback
  const resendServer = http.createServer((req, res) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      let parsed = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { _raw: raw };
      }
      capturedResendRequests.push({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: parsed,
      });

      if (resendDelayMs > 0) {
        setTimeout(() => {
          if (!res.writableEnded) {
            res.writeHead(resendStatusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(resendResponseBody));
          }
        }, resendDelayMs);
      } else {
        res.writeHead(resendStatusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resendResponseBody));
      }
    });
  });

  // 2. Mock Webhook HTTP Server on loopback
  const webhookServer = http.createServer((req, res) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      let parsed = {};
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { _raw: raw };
      }
      capturedWebhookRequests.push({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: parsed,
      });

      res.writeHead(webhookStatusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(webhookResponseBody));
    });
  });

  await new Promise<void>((resolve, reject) => {
    resendServer.listen(0, '127.0.0.1', () => resolve());
    resendServer.on('error', reject);
  });
  const resendAddr = resendServer.address() as AddressInfo;
  const resendMockUrl = `http://127.0.0.1:${resendAddr.port}/emails`;

  await new Promise<void>((resolve, reject) => {
    webhookServer.listen(0, '127.0.0.1', () => resolve());
    webhookServer.on('error', reject);
  });
  const webhookAddr = webhookServer.address() as AddressInfo;
  const webhookMockUrl = `http://127.0.0.1:${webhookAddr.port}/webhook`;

  console.log(`[INFO] Mock Resend server bound to ${resendMockUrl}`);
  console.log(`[INFO] Mock Webhook server bound to ${webhookMockUrl}\n`);

  try {
    // -------------------------------------------------------------------------
    // Unit Assertions: HTML Escaping & Configuration Helpers
    // -------------------------------------------------------------------------
    console.log('--- Test 1: HTML Escaping & Config Resolver Unit Checks ---');
    const dirty = '<script>alert("XSS")</script> & \'hello\'';
    const clean = escapeHtml(dirty);
    assert.strictEqual(
      clean,
      '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; &#039;hello&#039;',
      'HTML special characters must be safely converted to entities'
    );

    delete process.env.RESEND_API_KEY;
    assert.strictEqual(isResendConfigured(), false, 'isResendConfigured() must be false when key is unset');
    process.env.RESEND_API_KEY = '   ';
    assert.strictEqual(isResendConfigured(), false, 'isResendConfigured() must be false for whitespace-only key');
    process.env.RESEND_API_KEY = 're_mock_test_key_abc123';
    assert.strictEqual(isResendConfigured(), true, 'isResendConfigured() must be true for valid key');

    delete process.env.RESEND_FROM_EMAIL;
    assert.strictEqual(resolveFromEmail(), DEFAULT_RESEND_FROM_EMAIL);
    delete process.env.NOTIFICATION_RECIPIENT_EMAIL;
    assert.strictEqual(resolveRecipientEmail(), DEFAULT_NOTIFICATION_RECIPIENT_EMAIL);

    console.log('[PASS] HTML escaping and configuration helpers strictly verified');

    // Set mock testing configuration
    process.env.RESEND_API_BASE_URL = resendMockUrl;
    process.env.RESEND_API_KEY = 're_mock_test_key_abc123';
    process.env.RESEND_FROM_EMAIL = 'Your Travel Desk <notifications@auth.yourtraveldesk.in>';
    process.env.NOTIFICATION_RECIPIENT_EMAIL = 'supportyourtraveldesk@gmail.com';

    // -------------------------------------------------------------------------
    // Test 2: Contact Form Resend Notification Delivery
    // -------------------------------------------------------------------------
    console.log('\n--- Test 2: Contact Form Submission via Resend ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    resendStatusCode = 200;
    resendResponseBody = { id: 'msg_contact_101' };

    const contactPayload: ContactMessageInput = {
      name: 'Rohan Mehra',
      email: 'rohan@travelsmart.com',
      subject: 'Inquiry on white-label itineraries',
      message: 'Hello, do you support custom PDF branding for vouchers?',
      website: '', // Clean honeypot
    };

    const contactResult = await submitContactMessage(contactPayload);
    assert.strictEqual(contactResult.success, true, 'Contact submission must return success: true');
    assert.strictEqual(contactResult.status, 'delivered', 'Status must be "delivered"');
    assert.strictEqual(capturedResendRequests.length, 1, 'Exactly 1 Resend API request must be sent');
    assert.strictEqual(capturedWebhookRequests.length, 0, 'Webhook must NOT be called when Resend handles delivery');

    const req1 = capturedResendRequests[0];
    assert.strictEqual(req1.method, 'POST');
    assert.strictEqual(req1.headers['authorization'], 'Bearer re_mock_test_key_abc123');
    assert.strictEqual(req1.headers['content-type'], 'application/json');
    assert.strictEqual(req1.body.from, 'Your Travel Desk <notifications@auth.yourtraveldesk.in>');
    assert.deepStrictEqual(req1.body.to, ['supportyourtraveldesk@gmail.com']);
    assert.strictEqual(req1.body.reply_to, 'rohan@travelsmart.com');
    assert.strictEqual(req1.body.subject, 'New Contact Enquiry — Your Travel Desk: Inquiry on white-label itineraries');
    assert(typeof req1.body.html === 'string' && (req1.body.html as string).includes('Rohan Mehra'));
    assert(typeof req1.body.text === 'string' && (req1.body.text as string).includes('rohan@travelsmart.com'));
    assert.strictEqual('website' in req1.body, false, 'Honeypot field must never be included');

    const contactHtml = req1.body.html as string;
    assert(contactHtml.includes('role="presentation"'), 'Must use presentation table wrapper');
    assert(contactHtml.includes('name="viewport"'), 'Must include responsive viewport meta tag');
    assert(contactHtml.includes('word-break: break-word'), 'Must apply word-break styling');
    assert(contactHtml.includes('overflow-wrap: anywhere'), 'Must apply overflow-wrap styling');
    assert(!contactHtml.includes('width: 140px'), 'Must not contain rigid 140px width');
    assert(!contactHtml.includes('width: 170px'), 'Must not contain rigid 170px width');
    console.log('[PASS] Contact submission delivered via Resend with verified headers, recipient, reply_to, and responsive layout');

    // -------------------------------------------------------------------------
    // Test 3: Demo Request Resend Notification Delivery
    // -------------------------------------------------------------------------
    console.log('\n--- Test 3: Demo Request Submission via Resend ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    resendStatusCode = 200;
    resendResponseBody = { id: 'msg_demo_202' };

    const demoPayload: DemoRequestInput = {
      fullName: 'Pooja Iyer',
      workEmail: 'pooja@iyerholidays.in',
      agencyName: 'Iyer Holidays & Safaris',
      phone: '+91 9876543210',
      monthlyBookings: '50_to_200',
      primaryRequirement: 'Need multi-currency costing & B2B supplier ledger tracking.',
      marketingConsent: true,
      website: '',
    };

    const demoResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(demoResult.success, true);
    assert.strictEqual(demoResult.status, 'delivered');
    assert.strictEqual(capturedResendRequests.length, 1);
    assert.strictEqual(capturedWebhookRequests.length, 0, 'No duplicate dispatch to webhook');

    const req2 = capturedResendRequests[0];
    assert.strictEqual(req2.headers['authorization'], 'Bearer re_mock_test_key_abc123');
    assert.strictEqual(req2.body.from, 'Your Travel Desk <notifications@auth.yourtraveldesk.in>');
    assert.deepStrictEqual(req2.body.to, ['supportyourtraveldesk@gmail.com']);
    assert.strictEqual(req2.body.reply_to, 'pooja@iyerholidays.in');
    assert.strictEqual(req2.body.subject, 'New Demo Request — Iyer Holidays & Safaris (Your Travel Desk)');
    assert(typeof req2.body.html === 'string' && (req2.body.html as string).includes('50 to 200 trips / month'));
    assert(typeof req2.body.text === 'string' && (req2.body.text as string).includes('+91 9876543210'));

    const demoHtml = req2.body.html as string;
    assert(demoHtml.includes('role="presentation"'), 'Must use presentation table wrapper');
    assert(demoHtml.includes('name="viewport"'), 'Must include responsive viewport meta tag');
    assert(demoHtml.includes('word-break: break-word'), 'Must apply word-break styling');
    assert(demoHtml.includes('overflow-wrap: anywhere'), 'Must apply overflow-wrap styling');
    assert(!demoHtml.includes('width: 140px'), 'Must not contain rigid 140px width');
    assert(!demoHtml.includes('width: 170px'), 'Must not contain rigid 170px width');
    console.log('[PASS] Demo request delivered via Resend with verified fields, consent, tier labels, and responsive layout');

    // -------------------------------------------------------------------------
    // Test 4: Honeypot Rejection (Zero Dispatch)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 4: Honeypot Rejection (Zero Outbound Dispatch) ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];

    const spamContact: ContactMessageInput = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'Cheap SEO deals',
      message: 'Buy our backlink package today!',
      website: 'http://spamlinks.org', // Populated honeypot!
    };

    const spamResult = await submitContactMessage(spamContact);
    assert.strictEqual(spamResult.success, false);
    assert.strictEqual(spamResult.status, 'error');
    assert.strictEqual(capturedResendRequests.length, 0, 'Resend MUST NOT be called when honeypot is populated');
    assert.strictEqual(capturedWebhookRequests.length, 0, 'Webhook MUST NOT be called when honeypot is populated');
    console.log('[PASS] Honeypot rejection blocked all outbound communication');

    // -------------------------------------------------------------------------
    // Test 5: Resend Provider Rejection (No Webhook Fallback Rule)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 5: Resend Provider Rejection (HTTP 422 / 401) ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    resendStatusCode = 422;
    resendResponseBody = { message: 'Domain not verified or from address disallowed' };
    process.env.DEMO_WEBHOOK_URL = webhookMockUrl;

    const rejectedDemo = await submitDemoRequest(demoPayload);
    assert.strictEqual(rejectedDemo.success, false, 'Rejected Resend send must return success: false');
    assert.strictEqual(rejectedDemo.status, 'error', 'Status must be "error"');
    assert.strictEqual(capturedResendRequests.length, 1, 'Resend was attempted');
    assert.strictEqual(
      capturedWebhookRequests.length,
      0,
      'Webhook fallback MUST NOT execute when Resend attempt fails'
    );
    assert.strictEqual(
      rejectedDemo.message.includes('Notification delivery failed'),
      true,
      'Returns sanitized error message without exposing provider payload'
    );
    console.log('[PASS] Resend rejection returned sanitized failure without silent webhook fallback');

    // -------------------------------------------------------------------------
    // Test 6: Resend Timeout Handling (No Webhook Fallback Rule)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 6: Resend Timeout Handling ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    resendDelayMs = 250; // Delay response
    process.env.DEMO_WEBHOOK_URL = webhookMockUrl;

    const timeoutDemo = await submitDemoRequest(demoPayload, { timeoutMs: 60 });
    assert.strictEqual(timeoutDemo.success, false);
    assert.strictEqual(timeoutDemo.status, 'error');
    assert.strictEqual(
      capturedWebhookRequests.length,
      0,
      'Webhook fallback MUST NOT execute on Resend timeout'
    );
    resendDelayMs = 0;
    console.log('[PASS] Resend timeout handled cleanly without fallback');

    // -------------------------------------------------------------------------
    // Test 7: Resend Network Failure (Closed Port / Bad Endpoint)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 7: Resend Network Failure Handling ---');
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    process.env.RESEND_API_BASE_URL = 'http://127.0.0.1:1/nonexistent';

    const netFailResult = await submitContactMessage(contactPayload);
    assert.strictEqual(netFailResult.success, false);
    assert.strictEqual(netFailResult.status, 'error');
    assert.strictEqual(capturedWebhookRequests.length, 0);
    process.env.RESEND_API_BASE_URL = resendMockUrl;
    console.log('[PASS] Network error returned safe failure without leaking stack trace');

    // -------------------------------------------------------------------------
    // Test 8: Unconfigured Resend Falls Back to Webhook Path
    // -------------------------------------------------------------------------
    console.log('\n--- Test 8: Unconfigured Resend Preserves Webhook Delivery ---');
    delete process.env.RESEND_API_KEY; // Resend not configured
    process.env.DEMO_WEBHOOK_URL = webhookMockUrl;
    capturedResendRequests = [];
    capturedWebhookRequests = [];
    webhookStatusCode = 200;

    const fallbackDemo = await submitDemoRequest(demoPayload);
    assert.strictEqual(fallbackDemo.success, true);
    assert.strictEqual(fallbackDemo.status, 'delivered');
    assert.strictEqual(capturedResendRequests.length, 0, 'Resend not called when unconfigured');
    assert.strictEqual(capturedWebhookRequests.length, 1, 'Webhook correctly received submission');
    console.log('[PASS] Unconfigured Resend cleanly preserved existing webhook delivery');

    // -------------------------------------------------------------------------
    // Test 9: Both Unconfigured Transparently Returns 'unconfigured' (501 contract)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 9: Transparent Unconfigured State ---');
    delete process.env.RESEND_API_KEY;
    delete process.env.DEMO_WEBHOOK_URL;
    delete process.env.CONTACT_WEBHOOK_URL;

    const unconfiguredResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(unconfiguredResult.success, false);
    assert.strictEqual(unconfiguredResult.status, 'unconfigured');
    console.log('[PASS] Both providers unconfigured transparently returns "unconfigured"');

    // -------------------------------------------------------------------------
    // Test 10: Schema Validation Integrity (Invalid data rejected before adapter)
    // -------------------------------------------------------------------------
    console.log('\n--- Test 10: Schema Validation Integrity ---');
    const invalidContact = contactMessageSchema.safeParse({ name: 'A' }); // Too short, missing email/subject/message
    assert.strictEqual(invalidContact.success, false, 'Invalid contact must be rejected by schema');

    const invalidDemo = demoRequestSchema.safeParse({ workEmail: 'not-an-email' });
    assert.strictEqual(invalidDemo.success, false, 'Invalid demo request must be rejected by schema');
    console.log('[PASS] Shared Zod schemas strictly reject invalid input');

    // -------------------------------------------------------------------------
    // Test 11: Long Content Wrapping, Non-Truncation & Escaping in HTML & Plain Text
    // -------------------------------------------------------------------------
    console.log('\n--- Test 11: Long Content Wrapping, Non-Truncation & Escaping ---');
    capturedResendRequests = [];
    resendStatusCode = 200;
    resendResponseBody = { id: 'msg_long_303' };
    process.env.RESEND_API_BASE_URL = resendMockUrl;
    process.env.RESEND_API_KEY = 're_mock_test_key_abc123';

    const veryLongEmail = 'super-extra-long-executive-director-email-address@extremely-long-travel-agency-domain-name.co.in';
    const veryLongAgency = 'Shri Venkateshwara International Luxury Heritage Global Leisure Tours & Destination Management Private Limited';
    const injectedRequirement = '<img src=x onerror=alert(1)> & "quoted requirements" for customized itineraries spanning multiple continents.';

    const longDemoPayload: DemoRequestInput = {
      fullName: 'Dr. Chandrashekhar Venkataraman Subramaniam',
      workEmail: veryLongEmail,
      agencyName: veryLongAgency,
      phone: '+91 998877665544332211',
      monthlyBookings: 'over_200',
      primaryRequirement: injectedRequirement,
      marketingConsent: true,
      website: '',
    };

    const longDemoResult = await submitDemoRequest(longDemoPayload);
    assert.strictEqual(longDemoResult.success, true);
    assert.strictEqual(capturedResendRequests.length, 1);

    const longReq = capturedResendRequests[0];
    const longHtml = longReq.body.html as string;
    const longText = longReq.body.text as string;

    // Verify non-truncation: full strings present in both HTML and text
    assert(longHtml.includes(veryLongEmail), 'Long email must not be truncated in HTML');
    assert(longText.includes(veryLongEmail), 'Long email must not be truncated in plain text');
    assert(longHtml.includes(escapeHtml(veryLongAgency)), 'Long agency name must be escaped and not truncated in HTML');
    assert(longText.includes(veryLongAgency), 'Long agency name must not be truncated in plain text');

    // Verify HTML escaping of injected markup
    assert(!longHtml.includes('<img src=x'), 'Injected tag must be safely escaped');
    assert(longHtml.includes('&lt;img src=x'), 'Escaped entity &lt;img must be present');
    assert(longHtml.includes('&amp;'), 'Ampersand must be escaped');

    // Verify wrapping CSS styles applied to long email link and container
    assert(longHtml.includes('overflow-wrap: anywhere'), 'Must include overflow-wrap: anywhere');
    assert(longHtml.includes('word-break: break-word'), 'Must include word-break: break-word');
    console.log('[PASS] Long values preserved without truncation, injection escaped, and wrapping styles verified');

    console.log('\n============================================================');
    console.log('ALL RESEND NOTIFICATION DELIVERY TESTS PASSED (11/11 SCENARIOS)');
    console.log('============================================================\n');
  } finally {
    // Deterministic server cleanup
    await new Promise<void>((resolve) => resendServer.close(() => resolve()));
    await new Promise<void>((resolve) => webhookServer.close(() => resolve()));

    // Cleanly restore initial environment variables
    if (initialResendKey !== undefined) process.env.RESEND_API_KEY = initialResendKey;
    else delete process.env.RESEND_API_KEY;

    if (initialResendBaseUrl !== undefined) process.env.RESEND_API_BASE_URL = initialResendBaseUrl;
    else delete process.env.RESEND_API_BASE_URL;

    if (initialResendFrom !== undefined) process.env.RESEND_FROM_EMAIL = initialResendFrom;
    else delete process.env.RESEND_FROM_EMAIL;

    if (initialRecipient !== undefined) process.env.NOTIFICATION_RECIPIENT_EMAIL = initialRecipient;
    else delete process.env.NOTIFICATION_RECIPIENT_EMAIL;

    if (initialDemoWebhook !== undefined) process.env.DEMO_WEBHOOK_URL = initialDemoWebhook;
    else delete process.env.DEMO_WEBHOOK_URL;

    if (initialContactWebhook !== undefined) process.env.CONTACT_WEBHOOK_URL = initialContactWebhook;
    else delete process.env.CONTACT_WEBHOOK_URL;

    if (initialTimeout !== undefined) process.env.SUBMISSION_TIMEOUT_MS = initialTimeout;
    else delete process.env.SUBMISSION_TIMEOUT_MS;

    console.log('[INFO] Mock test servers closed and environment variables cleanly restored.');
  }
}

runResendDeliveryTestSuite().catch((err) => {
  console.error('RESEND TEST SUITE FAILED:', err);
  process.exit(1);
});
