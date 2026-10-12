import { DemoRequestInput, ContactMessageInput } from '../validation/demoSchema';

export interface SubmissionResult {
  success: boolean;
  status: 'delivered' | 'unconfigured' | 'error';
  message: string;
}

export interface SubmissionOptions {
  timeoutMs?: number;
}

export const DEFAULT_SUBMISSION_TIMEOUT_MS = 8000;

/**
 * Maximum supported timer duration in Node.js / JavaScript runtime.
 * In Node.js, timer delays are bounded by 32-bit signed integer max: 2^31 - 1 (2,147,483,647 ms, approx. 24.8 days).
 * Passing values > 2,147,483,647 triggers a Node.js TimeoutOverflowWarning and sets delay to 1 ms,
 * while values > 4,294,967,295 throw a RangeError in AbortSignal.timeout().
 */
export const MAX_SUBMISSION_TIMEOUT_MS = 2147483647; // 2^31 - 1

/**
 * Validates whether a value is a safe, strictly positive integer within the supported Node.js timer range.
 */
export function isValidTimeoutDuration(val: unknown): val is number {
  return (
    typeof val === 'number' &&
    Number.isInteger(val) &&
    val >= 1 &&
    val <= MAX_SUBMISSION_TIMEOUT_MS
  );
}

/**
 * Strictly parses and validates an environment variable timeout string.
 * Rejects partially numeric strings ("500ms"), decimals ("500.5"), non-numeric ("invalid"),
 * zero ("0"), negative ("-100"), and values exceeding MAX_SUBMISSION_TIMEOUT_MS.
 */
export function parseStrictTimeoutString(str: string | undefined): number | null {
  if (typeof str !== 'string') return null;
  const trimmed = str.trim();
  if (!/^[1-9]\d*$/.test(trimmed)) {
    return null;
  }
  const parsed = Number(trimmed);
  return isValidTimeoutDuration(parsed) ? parsed : null;
}

/**
 * Resolves the outbound timeout duration in milliseconds.
 * Priority:
 * 1. Explicit options.timeoutMs (if strictly valid)
 * 2. process.env.SUBMISSION_TIMEOUT_MS (if strictly valid integer)
 * 3. DEFAULT_SUBMISSION_TIMEOUT_MS (8,000 ms)
 */
export function resolveTimeoutMs(options?: SubmissionOptions): number {
  if (options?.timeoutMs !== undefined && isValidTimeoutDuration(options.timeoutMs)) {
    return options.timeoutMs;
  }

  const envTimeout = parseStrictTimeoutString(process.env.SUBMISSION_TIMEOUT_MS);
  if (envTimeout !== null) {
    return envTimeout;
  }

  return DEFAULT_SUBMISSION_TIMEOUT_MS;
}

function isValidHttpUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Provider-agnostic submission adapter for Demo requests and Contact messages.
 * If an external webhook (DEMO_WEBHOOK_URL) or email service is not configured,
 * it returns an explicit unconfigured state rather than falsely claiming success.
 */
export async function submitDemoRequest(
  data: DemoRequestInput,
  options?: SubmissionOptions
): Promise<SubmissionResult> {
  // Honeypot defense: If filled by automated bots, reject
  if (data.website && data.website.trim().length > 0) {
    return {
      success: false,
      status: 'error',
      message: 'Submission rejected by anti-abuse validation.',
    };
  }

  const webhookUrl = process.env.DEMO_WEBHOOK_URL;

  // If no delivery backend is configured, reject transparently
  if (!webhookUrl) {
    return {
      success: false,
      status: 'unconfigured',
      message:
        'Demo submission backend is not yet connected by the administrator. Please email us directly at contact@yourtraveldesk.in or configure DEMO_WEBHOOK_URL.',
    };
  }

  if (!isValidHttpUrl(webhookUrl)) {
    return {
      success: false,
      status: 'error',
      message: 'Configured delivery endpoint is not a valid HTTP/HTTPS URL.',
    };
  }

  // Strip honeypot from forwarded payload
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, ...cleanData } = data;

  const timeoutMs = resolveTimeoutMs(options);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'demo_request',
        timestamp: new Date().toISOString(),
        ...cleanData,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      return {
        success: false,
        status: 'error',
        message: 'External delivery failed. Please reach out to contact@yourtraveldesk.in.',
      };
    }

    return {
      success: true,
      status: 'delivered',
      message: 'Your demo request has been received. Our team will contact you shortly.',
    };
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error &&
      (err.name === 'TimeoutError' || err.name === 'AbortError');
    return {
      success: false,
      status: 'error',
      message: isTimeout
        ? 'Submission request timed out. Please email us directly at contact@yourtraveldesk.in.'
        : 'Unable to reach submission endpoint. Please try again later.',
    };
  }
}

export async function submitContactMessage(
  data: ContactMessageInput,
  options?: SubmissionOptions
): Promise<SubmissionResult> {
  // Honeypot defense: If filled by automated bots, reject
  if (data.website && data.website.trim().length > 0) {
    return {
      success: false,
      status: 'error',
      message: 'Submission rejected by anti-abuse validation.',
    };
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.DEMO_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      success: false,
      status: 'unconfigured',
      message:
        'Contact delivery backend is not yet configured. Please reach out directly to support@yourtraveldesk.in.',
    };
  }

  if (!isValidHttpUrl(webhookUrl)) {
    return {
      success: false,
      status: 'error',
      message: 'Configured delivery endpoint is not a valid HTTP/HTTPS URL.',
    };
  }

  // Strip honeypot from forwarded payload
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { website, ...cleanData } = data;

  const timeoutMs = resolveTimeoutMs(options);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact_message',
        timestamp: new Date().toISOString(),
        ...cleanData,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      return {
        success: false,
        status: 'error',
        message: 'Delivery service returned an error. Please try again later.',
      };
    }

    return {
      success: true,
      status: 'delivered',
      message: 'Thank you for reaching out. Your message has been safely delivered.',
    };
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error &&
      (err.name === 'TimeoutError' || err.name === 'AbortError');
    return {
      success: false,
      status: 'error',
      message: isTimeout
        ? 'Submission request timed out. Please reach out to support@yourtraveldesk.in.'
        : 'Failed to send message. Please reach out to support@yourtraveldesk.in.',
    };
  }
}
