import http from 'http';
import assert from 'assert';
import { AddressInfo } from 'net';
import {
  submitDemoRequest,
  submitContactMessage,
  resolveTimeoutMs,
  DEFAULT_SUBMISSION_TIMEOUT_MS,
  MAX_SUBMISSION_TIMEOUT_MS,
  isValidTimeoutDuration,
  parseStrictTimeoutString,
} from '../src/lib/adapters/submissionAdapter';
import { DemoRequestInput, ContactMessageInput } from '../src/lib/validation/demoSchema';

interface RecordedRequest {
  url?: string;
  method?: string;
  headers: http.IncomingHttpHeaders;
  body: Record<string, unknown>;
}

async function runMockWebhookTests() {
  console.log('=== Running Production Webhook Adapter Mock Tests ===\n');

  // Preserve initial environment variables
  const initialDemoUrl = process.env.DEMO_WEBHOOK_URL;
  const initialContactUrl = process.env.CONTACT_WEBHOOK_URL;
  const initialTimeout = process.env.SUBMISSION_TIMEOUT_MS;

  let recordedRequests: RecordedRequest[] = [];
  let responseStatusCode = 200;
  let responseDelayMs = 0;
  let responsePayload: Record<string, unknown> = { success: true };

  // Create local mock HTTP server on loopback
  const server = http.createServer((req, res) => {
    let rawBody = '';
    req.on('data', (chunk) => {
      rawBody += chunk;
    });

    req.on('end', () => {
      let parsedBody: Record<string, unknown> = {};
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        parsedBody = { _raw: rawBody };
      }

      recordedRequests.push({
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: parsedBody,
      });

      if (responseDelayMs > 0) {
        setTimeout(() => {
          if (!res.writableEnded) {
            res.writeHead(responseStatusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responsePayload));
          }
        }, responseDelayMs);
      } else {
        res.writeHead(responseStatusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responsePayload));
      }
    });
  });

  // Bind to loopback on ephemeral port 0
  await new Promise<void>((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => resolve());
    server.on('error', reject);
  });

  const address = server.address() as AddressInfo;
  const serverUrl = `http://127.0.0.1:${address.port}`;
  console.log(`[INFO] Local mock server listening on ${serverUrl} (loopback only)\n`);

  try {
    // -------------------------------------------------------------
    // Test 1: Successful Demo Delivery & Payload Verification
    // -------------------------------------------------------------
    console.log('--- Test 1: Successful Demo Delivery ---');
    recordedRequests = [];
    responseStatusCode = 200;
    responseDelayMs = 0;
    process.env.DEMO_WEBHOOK_URL = `${serverUrl}/webhook/demo`;

    const demoPayload: DemoRequestInput = {
      fullName: 'Vikram Mehta',
      workEmail: 'vikram@mehtatravels.in',
      agencyName: 'Mehta Travel Solutions',
      monthlyBookings: '10_to_50',
      primaryRequirement: 'Need multi-day itinerary quotation tool',
      marketingConsent: true,
      website: '', // Clean honeypot
    };

    const demoResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(demoResult.success, true, 'Demo delivery should report success: true');
    assert.strictEqual(demoResult.status, 'delivered', 'Demo delivery status should be delivered');
    assert.strictEqual(recordedRequests.length, 1, 'Mock server should receive exactly 1 request');

    const recordedDemo = recordedRequests[0];
    assert.strictEqual(recordedDemo.method, 'POST');
    assert.strictEqual(recordedDemo.url, '/webhook/demo');
    assert.strictEqual(recordedDemo.headers['content-type'], 'application/json');
    assert.strictEqual(recordedDemo.body.type, 'demo_request');
    assert.strictEqual(recordedDemo.body.fullName, 'Vikram Mehta');
    assert.strictEqual(recordedDemo.body.workEmail, 'vikram@mehtatravels.in');
    assert.strictEqual(recordedDemo.body.agencyName, 'Mehta Travel Solutions');
    assert.strictEqual(
      'website' in recordedDemo.body,
      false,
      'Honeypot field "website" must be stripped from forwarded payload'
    );
    console.log('[PASS] Demo delivery succeeded and verified on mock server (honeypot stripped)');

    // -------------------------------------------------------------
    // Test 2: Successful Contact Delivery & Payload Verification
    // -------------------------------------------------------------
    console.log('\n--- Test 2: Successful Contact Delivery ---');
    recordedRequests = [];
    responseStatusCode = 200;
    responseDelayMs = 0;
    process.env.CONTACT_WEBHOOK_URL = `${serverUrl}/webhook/contact`;

    const contactPayload: ContactMessageInput = {
      name: 'Ananya Sharma',
      email: 'ananya@sharmatours.com',
      subject: 'Inquiry on API integrations',
      message: 'Does Your Travel Desk support custom supplier voucher exports?',
      website: '',
    };

    const contactResult = await submitContactMessage(contactPayload);
    assert.strictEqual(contactResult.success, true, 'Contact delivery should report success: true');
    assert.strictEqual(contactResult.status, 'delivered', 'Contact delivery status should be delivered');
    assert.strictEqual(recordedRequests.length, 1, 'Mock server should receive exactly 1 request');

    const recordedContact = recordedRequests[0];
    assert.strictEqual(recordedContact.method, 'POST');
    assert.strictEqual(recordedContact.url, '/webhook/contact');
    assert.strictEqual(recordedContact.body.type, 'contact_message');
    assert.strictEqual(recordedContact.body.name, 'Ananya Sharma');
    assert.strictEqual(recordedContact.body.email, 'ananya@sharmatours.com');
    assert.strictEqual(
      'website' in recordedContact.body,
      false,
      'Honeypot field "website" must be stripped from forwarded contact payload'
    );
    console.log('[PASS] Contact delivery succeeded and verified on mock server');

    // -------------------------------------------------------------
    // Test 3: Honeypot Rejection in Adapter (Zero Outbound Request)
    // -------------------------------------------------------------
    console.log('\n--- Test 3: Honeypot Rejection (Zero Outbound Request) ---');
    recordedRequests = [];
    const spamDemoPayload: DemoRequestInput = {
      fullName: 'Bot User',
      workEmail: 'bot@spam.com',
      agencyName: 'Spam Travels',
      website: 'http://advertisement.example.com', // Populated honeypot!
    };

    const spamResult = await submitDemoRequest(spamDemoPayload);
    assert.strictEqual(spamResult.success, false, 'Populated honeypot must be rejected');
    assert.strictEqual(spamResult.status, 'error', 'Status must be error on honeypot violation');
    assert.strictEqual(
      recordedRequests.length,
      0,
      'No HTTP request must ever be dispatched to webhook when honeypot is populated'
    );
    console.log('[PASS] Honeypot rejection blocked outbound dispatch completely');

    // -------------------------------------------------------------
    // Test 4: Controlled Non-2xx Failure Response
    // -------------------------------------------------------------
    console.log('\n--- Test 4: Non-2xx HTTP Failure Handling ---');
    recordedRequests = [];
    responseStatusCode = 502; // Upstream gateway failure
    responsePayload = { error: 'Bad Gateway' };

    const non2xxResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(non2xxResult.success, false, 'Non-2xx response must not report success');
    assert.strictEqual(non2xxResult.status, 'error', 'Non-2xx response must report status: error');
    assert(
      non2xxResult.message.includes('External delivery failed'),
      'Should return truthful delivery failure message'
    );
    console.log('[PASS] Non-2xx response truthfully handled as error without false success');

    // -------------------------------------------------------------
    // Test 5: Controlled Connection Failure (Unused Port)
    // -------------------------------------------------------------
    console.log('\n--- Test 5: Controlled Connection Failure ---');
    // Port 1 on loopback is typically closed and refuses connection
    process.env.DEMO_WEBHOOK_URL = 'http://127.0.0.1:1/nonexistent';

    const connFailResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(connFailResult.success, false, 'Connection failure must not report success');
    assert.strictEqual(connFailResult.status, 'error', 'Connection failure must report status: error');
    assert(
      connFailResult.message.includes('Unable to reach submission endpoint'),
      'Connection failure should return safe endpoint unreachable message'
    );
    console.log('[PASS] Connection failure safely handled without leaking stack traces or crashing');

    // -------------------------------------------------------------
    // Test 6: Bounded Timeout Configuration & Strict Hardening
    // -------------------------------------------------------------
    console.log('\n--- Test 6: Bounded Timeout Configuration & Strict Hardening ---');

    // 6a. Direct helper assertions for parseStrictTimeoutString and isValidTimeoutDuration
    assert.strictEqual(
      parseStrictTimeoutString('500ms'),
      null,
      'Partially numeric string "500ms" must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('500.5'),
      null,
      'Decimal string "500.5" must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('0'),
      null,
      'Zero string "0" must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('-500'),
      null,
      'Negative string "-500" must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('invalid_text'),
      null,
      'Non-numeric string must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('2147483648'),
      null,
      'Value exceeding 32-bit signed int max (2147483648) must be strictly rejected'
    );
    assert.strictEqual(
      parseStrictTimeoutString('2147483647'),
      2147483647,
      'Max 32-bit signed int boundary (2147483647) must be accepted'
    );
    assert.strictEqual(
      parseStrictTimeoutString('  8000  '),
      8000,
      'Trimmed valid integer string must be accepted'
    );

    assert.strictEqual(
      isValidTimeoutDuration(500.5),
      false,
      'Decimal number options must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(0),
      false,
      'Zero number options must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(-100),
      false,
      'Negative number options must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(NaN),
      false,
      'NaN options must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(Infinity),
      false,
      'Infinity options must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(2147483648),
      false,
      'Exceeding MAX_SUBMISSION_TIMEOUT_MS must be rejected'
    );
    assert.strictEqual(
      isValidTimeoutDuration(2147483647),
      true,
      'Boundary MAX_SUBMISSION_TIMEOUT_MS must be accepted'
    );

    // 6b. Direct helper assertions for resolveTimeoutMs
    delete process.env.SUBMISSION_TIMEOUT_MS;
    assert.strictEqual(
      resolveTimeoutMs(),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Absence of env and options must return default 8,000 ms'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: 150 }),
      150,
      'Explicitly supplied valid timeout option must be respected'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: 0 }),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Zero timeout option must safely fall back to default'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: -100 }),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Negative timeout option must safely fall back to default'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: 500.5 }),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Decimal timeout option must safely fall back to default'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: 2147483648 }),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Timeout option exceeding supported timer range must safely fall back to default'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: NaN }),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'NaN timeout option must safely fall back to default'
    );

    process.env.SUBMISSION_TIMEOUT_MS = '500ms';
    assert.strictEqual(
      resolveTimeoutMs(),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Partially numeric env "500ms" must fall back to default'
    );

    process.env.SUBMISSION_TIMEOUT_MS = '500.5';
    assert.strictEqual(
      resolveTimeoutMs(),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Decimal env "500.5" must fall back to default'
    );

    process.env.SUBMISSION_TIMEOUT_MS = '2147483648';
    assert.strictEqual(
      resolveTimeoutMs(),
      DEFAULT_SUBMISSION_TIMEOUT_MS,
      'Timer overflow env "2147483648" must fall back to default'
    );

    process.env.SUBMISSION_TIMEOUT_MS = '120';
    assert.strictEqual(
      resolveTimeoutMs(),
      120,
      'Valid positive integer env value must be respected'
    );
    assert.strictEqual(
      resolveTimeoutMs({ timeoutMs: 60 }),
      60,
      'Explicit options must take precedence over env variable'
    );
    console.log('[PASS] resolveTimeoutMs helper strictly enforces shared range & format policy');

    // 6c. End-to-end execution with explicit options timeout
    delete process.env.SUBMISSION_TIMEOUT_MS;
    process.env.DEMO_WEBHOOK_URL = `${serverUrl}/webhook/delayed`;
    responseStatusCode = 200;
    responseDelayMs = 300; // Mock server delays response by 300ms

    const optionsTimeoutResult = await submitDemoRequest(demoPayload, { timeoutMs: 60 });
    assert.strictEqual(optionsTimeoutResult.success, false);
    assert.strictEqual(optionsTimeoutResult.status, 'error');
    assert(optionsTimeoutResult.message.includes('timed out'));
    console.log('[PASS] Demo request with explicit options timeout fired and returned truthful error');

    // 6d. End-to-end execution with valid SUBMISSION_TIMEOUT_MS environment variable
    process.env.SUBMISSION_TIMEOUT_MS = '60';
    const envTimeoutDemoResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(envTimeoutDemoResult.success, false);
    assert.strictEqual(envTimeoutDemoResult.status, 'error');
    assert(envTimeoutDemoResult.message.includes('timed out'));

    process.env.CONTACT_WEBHOOK_URL = `${serverUrl}/webhook/delayed`;
    const envTimeoutContactResult = await submitContactMessage(contactPayload);
    assert.strictEqual(envTimeoutContactResult.success, false);
    assert.strictEqual(envTimeoutContactResult.status, 'error');
    assert(envTimeoutContactResult.message.includes('timed out'));
    console.log('[PASS] Both demo and contact requests respect valid SUBMISSION_TIMEOUT_MS');

    // 6e. End-to-end execution verifying safe fallback for invalid strings in both paths
    responseDelayMs = 0; // Immediate response for fallback verification
    process.env.DEMO_WEBHOOK_URL = `${serverUrl}/webhook/fast-demo`;
    process.env.CONTACT_WEBHOOK_URL = `${serverUrl}/webhook/fast-contact`;

    const invalidEnvCases = ['500ms', '500.5', '2147483648', '0', '-50', 'invalid_str'];
    for (const testCase of invalidEnvCases) {
      process.env.SUBMISSION_TIMEOUT_MS = testCase;
      const demoFallbackRes = await submitDemoRequest(demoPayload);
      assert.strictEqual(
        demoFallbackRes.success,
        true,
        `Demo submission with SUBMISSION_TIMEOUT_MS="${testCase}" should safely fall back and succeed`
      );

      const contactFallbackRes = await submitContactMessage(contactPayload);
      assert.strictEqual(
        contactFallbackRes.success,
        true,
        `Contact submission with SUBMISSION_TIMEOUT_MS="${testCase}" should safely fall back and succeed`
      );
    }
    console.log('[PASS] Both demo and contact submission paths safely fall back across all invalid env values');

    // Reset delay and env
    responseDelayMs = 0;
    delete process.env.SUBMISSION_TIMEOUT_MS;

    // -------------------------------------------------------------
    // Test 7: Honest Unconfigured State
    // -------------------------------------------------------------
    console.log('\n--- Test 7: Honest Unconfigured State ---');
    delete process.env.DEMO_WEBHOOK_URL;
    delete process.env.CONTACT_WEBHOOK_URL;

    const unconfiguredDemo = await submitDemoRequest(demoPayload);
    assert.strictEqual(unconfiguredDemo.success, false);
    assert.strictEqual(unconfiguredDemo.status, 'unconfigured');

    const unconfiguredContact = await submitContactMessage(contactPayload);
    assert.strictEqual(unconfiguredContact.success, false);
    assert.strictEqual(unconfiguredContact.status, 'unconfigured');
    console.log('[PASS] Unconfigured environment transparently returns unconfigured status');

    // -------------------------------------------------------------
    // Test 8: Destination Isolation & URL Scheme Validation
    // -------------------------------------------------------------
    console.log('\n--- Test 8: Destination Isolation & URL Scheme Validation ---');
    // Verify untrusted user payload cannot override destination
    const spoofedPayload = {
      ...demoPayload,
      webhookUrl: 'http://malicious-attacker.com/steal',
      target: 'http://malicious-attacker.com',
    } as unknown as DemoRequestInput;

    process.env.DEMO_WEBHOOK_URL = `${serverUrl}/webhook/legitimate`;
    recordedRequests = [];
    const spoofResult = await submitDemoRequest(spoofedPayload);
    assert.strictEqual(spoofResult.success, true);
    assert.strictEqual(recordedRequests.length, 1);
    assert.strictEqual(
      recordedRequests[0].url,
      '/webhook/legitimate',
      'Destination must strictly match process.env and ignore payload injection'
    );

    // Verify invalid schemes are rejected by isValidHttpUrl
    process.env.DEMO_WEBHOOK_URL = 'ftp://insecure-ftp.local/upload';
    const invalidSchemeResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(invalidSchemeResult.success, false);
    assert.strictEqual(invalidSchemeResult.status, 'error');
    assert(invalidSchemeResult.message.includes('not a valid HTTP/HTTPS URL'));

    process.env.DEMO_WEBHOOK_URL = 'javascript:alert(1)';
    const jsSchemeResult = await submitDemoRequest(demoPayload);
    assert.strictEqual(jsSchemeResult.success, false);
    assert.strictEqual(jsSchemeResult.status, 'error');
    console.log('[PASS] Destination is strictly server-isolated and invalid URL schemes are rejected');

    console.log('\n=============================================================');
    console.log('ALL MOCK WEBHOOK ADAPTER DISPATCH TESTS PASSED (8/8 SCENARIOS)');
    console.log('=============================================================\n');
  } finally {
    // Deterministic server cleanup
    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });

    // Restore original environment variables
    if (initialDemoUrl !== undefined) {
      process.env.DEMO_WEBHOOK_URL = initialDemoUrl;
    } else {
      delete process.env.DEMO_WEBHOOK_URL;
    }

    if (initialContactUrl !== undefined) {
      process.env.CONTACT_WEBHOOK_URL = initialContactUrl;
    } else {
      delete process.env.CONTACT_WEBHOOK_URL;
    }

    if (initialTimeout !== undefined) {
      process.env.SUBMISSION_TIMEOUT_MS = initialTimeout;
    } else {
      delete process.env.SUBMISSION_TIMEOUT_MS;
    }

    console.log('[INFO] Mock server closed and environment variables cleanly restored.');
  }
}

runMockWebhookTests().catch((err) => {
  console.error('MOCK WEBHOOK TEST SUITE FAILED:', err);
  process.exit(1);
});
