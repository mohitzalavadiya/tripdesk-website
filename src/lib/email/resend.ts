import { ContactMessageInput, DemoRequestInput } from '../validation/demoSchema';

export const DEFAULT_RESEND_FROM_EMAIL = 'Your Travel Desk <notifications@auth.yourtraveldesk.in>';
export const DEFAULT_NOTIFICATION_RECIPIENT_EMAIL = 'supportyourtraveldesk@gmail.com';
export const DEFAULT_RESEND_API_BASE_URL = 'https://api.resend.com/emails';

export interface ResendSendResult {
  success: boolean;
  status: 'delivered' | 'unconfigured' | 'error';
  message: string;
  resendId?: string;
}

export interface ResendEmailOptions {
  timeoutMs?: number;
  apiBaseUrl?: string;
}

/**
 * Escapes characters with special meaning in HTML to prevent HTML/XSS injection
 * when rendering user-submitted text in email clients.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Returns true if the Resend API key environment variable is configured with a non-empty string.
 */
export function isResendConfigured(): boolean {
  const key = process.env.RESEND_API_KEY;
  return typeof key === 'string' && key.trim().length > 0;
}

/**
 * Resolves the configured sender email address.
 */
export function resolveFromEmail(): string {
  const envFrom = process.env.RESEND_FROM_EMAIL;
  if (typeof envFrom === 'string' && envFrom.trim().length > 0) {
    return envFrom.trim();
  }
  return DEFAULT_RESEND_FROM_EMAIL;
}

/**
 * Resolves the fixed recipient email address.
 * Never accepts user-supplied recipient input.
 */
export function resolveRecipientEmail(): string {
  const envTo = process.env.NOTIFICATION_RECIPIENT_EMAIL;
  if (typeof envTo === 'string' && envTo.trim().length > 0) {
    return envTo.trim();
  }
  return DEFAULT_NOTIFICATION_RECIPIENT_EMAIL;
}

function resolveApiUrl(options?: ResendEmailOptions): string {
  if (options?.apiBaseUrl && options.apiBaseUrl.trim().length > 0) {
    return options.apiBaseUrl.trim();
  }
  const envUrl = process.env.RESEND_API_BASE_URL;
  if (typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim();
  }
  return DEFAULT_RESEND_API_BASE_URL;
}

interface RawResendPayload {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Dispatches an email request to the Resend REST API via native fetch.
 * Sanitizes errors and never leaks credentials, authorization headers,
 * or raw provider bodies to caller or client.
 */
async function postToResend(
  payload: RawResendPayload,
  timeoutMs: number,
  options?: ResendEmailOptions
): Promise<ResendSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      success: false,
      status: 'unconfigured',
      message: 'Resend API key is not configured.',
    };
  }

  const endpoint = resolveApiUrl(options);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!res.ok) {
      // Safely consume response without logging secrets
      let errorSummary = `HTTP ${res.status}`;
      try {
        const errorData = await res.json();
        if (errorData && typeof errorData.message === 'string') {
          errorSummary = errorData.message;
        }
      } catch {
        // Non-JSON error body handled gracefully
      }

      console.error(`[Resend Error] Delivery rejected (${res.status}): ${errorSummary}`);
      return {
        success: false,
        status: 'error',
        message: 'Notification delivery failed upstream.',
      };
    }

    const data = await res.json().catch(() => ({}));
    const resendId = typeof data?.id === 'string' ? data.id : undefined;

    return {
      success: true,
      status: 'delivered',
      message: 'Notification email accepted by provider.',
      resendId,
    };
  } catch (err: unknown) {
    const isTimeout =
      err instanceof Error &&
      (err.name === 'TimeoutError' || err.name === 'AbortError');
    console.error(
      `[Resend Delivery Failure] ${isTimeout ? 'Request timed out' : 'Network connection failure'}`
    );
    return {
      success: false,
      status: 'error',
      message: isTimeout
        ? 'Notification delivery request timed out.'
        : 'Failed to communicate with email delivery provider.',
    };
  }
}

export interface NotificationEmailRow {
  label: string;
  valueHtml: string;
}

export interface RenderNotificationEmailParams {
  subject: string;
  titleHtml: string;
  rows: NotificationEmailRow[];
  boxTitle?: string;
  boxContentHtml?: string;
  footerNote: string;
}

/**
 * Renders a mobile-responsive, client-compatible HTML email template.
 * Uses fluid percentage widths, an outer presentation table wrapper with MSO conditional comments,
 * compact padding for 320px+ mobile viewports, and universal word-break/overflow-wrap.
 */
export function renderNotificationEmailHtml(params: RenderNotificationEmailParams): string {
  const { subject, titleHtml, rows, boxTitle, boxContentHtml, footerNote } = params;

  const rowsHtml = rows
    .map(
      (row) => `
      <tr>
        <td style="padding: 7px 8px 7px 0; color: #64748b; font-size: 13px; line-height: 1.5; font-weight: 600; width: 34%; vertical-align: top; word-break: break-word;">
          ${escapeHtml(row.label)}:
        </td>
        <td style="padding: 7px 0; color: #0f172a; font-size: 14px; line-height: 1.5; font-weight: 400; width: 66%; vertical-align: top; word-break: break-word; overflow-wrap: anywhere;">
          ${row.valueHtml}
        </td>
      </tr>`
    )
    .join('');

  const boxSectionHtml =
    boxTitle && boxContentHtml
      ? `
    <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
      <p style="color: #64748b; font-size: 13px; font-weight: 600; margin-top: 0; margin-bottom: 8px;">
        ${escapeHtml(boxTitle)}:
      </p>
      <div style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; padding: 14px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; word-break: break-word; overflow-wrap: anywhere;">
        ${boxContentHtml}
      </div>
    </div>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; margin: 0; padding: 12px 8px; width: 100%;">
    <tr>
      <td align="center" style="padding: 0;">
        <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"><tr><td>
        <![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin: 0 auto;">
          <tr>
            <td style="padding: 20px 16px;">
              <h2 style="color: #0f172a; margin-top: 0; margin-bottom: 16px; font-size: 18px; line-height: 1.4; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; font-weight: 700; word-break: break-word; overflow-wrap: anywhere;">
                ${titleHtml}
              </h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
                ${rowsHtml}
              </table>
              ${boxSectionHtml}
              <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid #f1f5f9; font-size: 12px; line-height: 1.5; color: #94a3b8; text-align: center; word-break: break-word; overflow-wrap: anywhere;">
                ${escapeHtml(footerNote)}
              </div>
            </td>
          </tr>
        </table>
        <!--[if (gte mso 9)|(IE)]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

/**
 * Prepares and sends a notification email for a Contact form submission.
 */
export async function sendContactEmailNotification(
  data: Omit<ContactMessageInput, 'website'>,
  options?: ResendEmailOptions
): Promise<ResendSendResult> {
  const from = resolveFromEmail();
  const to = [resolveRecipientEmail()];
  const replyTo = data.email.trim();
  const subject = `New Contact Enquiry — Your Travel Desk: ${data.subject.trim()}`;
  const timestamp = new Date().toISOString();

  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeSubject = escapeHtml(data.subject);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  const html = renderNotificationEmailHtml({
    subject,
    titleHtml: 'New Contact Enquiry — Your Travel Desk',
    rows: [
      { label: 'Sender Name', valueHtml: safeName },
      {
        label: 'Email Address',
        valueHtml: `<a href="mailto:${safeEmail}" style="color: #4f46e5; text-decoration: underline; word-break: break-word; overflow-wrap: anywhere;">${safeEmail}</a>`,
      },
      { label: 'Subject', valueHtml: safeSubject },
      { label: 'Submitted At', valueHtml: escapeHtml(timestamp) },
    ],
    boxTitle: 'Message',
    boxContentHtml: safeMessage,
    footerNote: `This notification was sent automatically to ${to[0]} via Your Travel Desk Marketing Desk.`,
  });

  const text = `
New Contact Enquiry — Your Travel Desk
----------------------------------------
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Submitted At: ${timestamp}

Message:
${data.message}

Reply directly to this email to contact ${data.name} (${data.email}).
`.trim();

  const timeoutMs = options?.timeoutMs ?? 8000;
  return postToResend(
    {
      from,
      to,
      reply_to: replyTo,
      subject,
      html,
      text,
    },
    timeoutMs,
    options
  );
}

/**
 * Prepares and sends a notification email for a Request Demo form submission.
 */
export async function sendDemoEmailNotification(
  data: Omit<DemoRequestInput, 'website'>,
  options?: ResendEmailOptions
): Promise<ResendSendResult> {
  const from = resolveFromEmail();
  const to = [resolveRecipientEmail()];
  const replyTo = data.workEmail.trim();
  const subject = `New Demo Request — ${data.agencyName.trim()} (Your Travel Desk)`;
  const timestamp = new Date().toISOString();

  const tierLabels: Record<string, string> = {
    under_10: 'Under 10 trips / month (Starting out)',
    '10_to_50': '10 to 50 trips / month (Growing agency)',
    '50_to_200': '50 to 200 trips / month (Established operator)',
    over_200: '200+ trips / month (High volume DMC)',
  };

  const bookingTier = data.monthlyBookings
    ? tierLabels[data.monthlyBookings] || data.monthlyBookings
    : 'Not specified';

  const safeFullName = escapeHtml(data.fullName);
  const safeWorkEmail = escapeHtml(data.workEmail);
  const safeAgencyName = escapeHtml(data.agencyName);
  const safePhone = data.phone ? escapeHtml(data.phone) : 'Not provided';
  const safeRequirement = data.primaryRequirement
    ? escapeHtml(data.primaryRequirement).replace(/\n/g, '<br />')
    : 'None provided';
  const consentText = data.marketingConsent ? 'Agreed' : 'Not opted in';

  const html = renderNotificationEmailHtml({
    subject,
    titleHtml: `New Demo Request — ${safeAgencyName}`,
    rows: [
      { label: 'Contact Name', valueHtml: safeFullName },
      {
        label: 'Work Email',
        valueHtml: `<a href="mailto:${safeWorkEmail}" style="color: #4f46e5; text-decoration: underline; word-break: break-word; overflow-wrap: anywhere;">${safeWorkEmail}</a>`,
      },
      { label: 'Agency / Business', valueHtml: safeAgencyName },
      { label: 'Phone Number', valueHtml: safePhone },
      { label: 'Monthly Bookings', valueHtml: escapeHtml(bookingTier) },
      { label: 'Marketing Consent', valueHtml: escapeHtml(consentText) },
      { label: 'Submitted At', valueHtml: escapeHtml(timestamp) },
    ],
    boxTitle: 'Specific Requirements / Notes',
    boxContentHtml: safeRequirement,
    footerNote: `This demo alert was sent automatically to ${to[0]} via Your Travel Desk Marketing Desk.`,
  });

  const text = `
New Demo Request — ${data.agencyName}
----------------------------------------
Contact Name: ${data.fullName}
Work Email: ${data.workEmail}
Agency: ${data.agencyName}
Phone: ${data.phone || 'Not provided'}
Monthly Bookings: ${bookingTier}
Marketing Updates: ${consentText}
Submitted At: ${timestamp}

Requirements / Notes:
${data.primaryRequirement || 'None provided'}

Reply directly to this email to contact ${data.fullName} (${data.workEmail}).
`.trim();

  const timeoutMs = options?.timeoutMs ?? 8000;
  return postToResend(
    {
      from,
      to,
      reply_to: replyTo,
      subject,
      html,
      text,
    },
    timeoutMs,
    options
  );
}
