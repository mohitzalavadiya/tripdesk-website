# Your Travel Desk — Marketing Website

> **Production-Quality Marketing Website for Your Travel Desk**<br />
> Modern, product-led marketing site built for Indian travel agencies and independent tour operators.<br />
> **Target Production Domain:** `https://yourtraveldesk.in`<br />
> **Production SaaS Application:** `https://app.yourtraveldesk.in`<br />
> **Staging Reference:** `https://staging.yourtraveldesk.in`

---

## 1. Project Purpose & Architecture Isolation

This repository contains the standalone, independent marketing website for **Your Travel Desk**.

### Mandatory Safety & Isolation Boundaries
- **Completely Independent Project:** This project is housed in a separate sibling directory (`tripdesk-website`) from the SaaS repository (`tripdesk`).
- **Zero Shared Dependencies:** Does not import code, Prisma schemas, database connections, authentication sessions, or secrets from the SaaS core.
- **Strict Read-Only Reference:** The staging application was referenced purely in read-only mode to verify actual feature availability, UI workflows, and subscription plans. No staging records were modified, created, or deleted.
- **Zero Credentials in Code:** No authentication tokens, passwords, or personal credentials exist in source code, `.env` files, or git history.

---

## 2. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **Language:** TypeScript 5 (Strict Mode checking)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 with bespoke B2B SaaS palette:
  - Deep Navy (`#15283F`)
  - Teal (`#147D78`)
  - Soft Slate Surface (`#F4F7FA`)
  - Pure White (`#FFFFFF`)
  - Slate text and border scales
- **Icons:** [Lucide React](https://lucide.dev/)
- **Validation:** [Zod](https://zod.dev/) for server-side form schema enforcement
- **Image Processing (Build/Sanitization):** [Sharp](https://sharp.pixelplumbing.com/)
- **Testing:** Custom Node.js HTTP & HTML verification test suite (`tests/site_verification.test.js`)
- **Linting:** ESLint with Next.js Core Web Vitals configuration

---

## 3. Page Inventory

| Route | Title | Description | Primary CTA |
|---|---|---|---|
| `/` | Operating Software for Indian Travel Agencies | Product-led homepage featuring real dashboard, 8 core modules, 6-step lifecycle, interactive pricing toggle, and FAQs. | Start 7-Day Free Trial / Book a Demo |
| `/features` | Core Agency Operating Features | Deep-dive into all 8 verified workflows: Trips, Quotations, Bookings, Destinations, Hotels, Vehicles, Invoices, and Reports. | Start 7-Day Free Trial |
| `/pricing` | Transparent Pricing for Tour Operators | Verified Starter (₹499/mo or ₹4,999/yr) and Professional (₹999/mo or ₹9,999/yr) plans with monthly/yearly switcher and full feature matrix. | Start 7-Day Free Trial |
| `/how-it-works` | From Inquiry to Reconciliation | Step-by-step visual walkthrough of how an agency manages trips and automates quotations. | Explore Live Demo |
| `/request-demo` | Request a Live 1-on-1 Walkthrough | Interactive demo request form with server validation, agenda overview, and honest unconfigured state handling. | Request Demo Walkthrough |
| `/contact` | Get in Touch with Support | Direct email channels, operational support information, and validated inquiry form. | Send Message |
| `/about` | Built for Small Travel Businesses | Fact-based company mission and software philosophy without fabricated statistics or false team biographies. | Start 7-Day Free Trial |
| `/faq` | Frequently Asked Questions | Categorized accordion answering common questions about pricing, data security, onboarding, and free trials. | View All Plans |
| `/privacy` | Privacy Policy (Draft / Pre-Launch) | Structured data protection foundation with prominent banner identifying owner details required before legal publication. | Contact Privacy Team |
| `/terms` | Terms of Service (Draft / Pre-Launch) | Structured commercial and usage terms foundation with clear placeholders for governing jurisdiction and legal entity. | View Pricing |
| `/_not-found` | Page Not Found (404) | Branded, helpful 404 recovery page linking visitors back to core platform features. | Back to Home |

---

## 4. Product Screenshots & Data Sanitization

All visual assets represent the **actual staging interface** of Your Travel Desk, captured under read-only mode and processed to guarantee 100% privacy compliance:

- `public/screenshots/dashboard.png`: Executive dashboard showing active trips, quotation conversions, and operational KPIs. Sanitized to remove test agency names and personal phone numbers.
- `public/screenshots/trips.png`: Multi-destination trip management workspace and stage tracking.
- `public/screenshots/quotations.png`: Quotation builder, markup engine, and PDF export preview.
- `public/screenshots/bookings.png`: Confirmed booking operations, voucher tracking, and supplier status.
- `public/screenshots/pricing.png`: Staging subscription tier screen verifying live limits and INR pricing.

> **Sanitization Script:** `scripts/sanitize_images.js` uses `sharp` to apply pixel-perfect masking and anonymized labels over customer phone numbers, test agency titles, and personal identifiers.

---

## 5. Verified Product & Pricing Facts

Directly verified against the live staging application:
- **Starter Plan:**
  - ₹499/month (or ₹4,999/year with ~17% annual discount)
  - 7-Day Free Trial included (no upfront payment required)
  - 20 trips / month
  - 20 quotations / month
  - 20 bookings / month
  - Unlimited customers
  - Essential reporting and PDF downloads
- **Professional Plan:**
  - ₹999/month (or ₹9,999/year)
  - Unlimited trips, quotations, bookings, and customers
  - Custom agency branding on quotations
  - Supplier rate sheets and advanced analytics
  - Priority support

---

## 6. Local Setup & Development Commands

### Prerequisites
- Node.js 18+ (tested with Node.js 20+)
- npm or yarn

### Installation
```bash
# Clone or navigate to the repository
cd tripdesk-website

# Install dependencies
npm install
```

### Development Server
```bash
# Start local dev server (default port 3000 or next available, e.g., 3002)
npm run dev
```

### Production Build & Linting
```bash
# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```

### Automated Integration & Verification Suite
```bash
# Runs full HTTP status, screenshot asset, Zod validation, and pricing checks
node tests/site_verification.test.js
```

---

## 7. Environment Variables

Copy `.env.example` to `.env.local` to configure local or deployment settings:

```bash
cp .env.example .env.local
```

### Variable Reference
| Variable | Default / Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourtraveldesk.in` | Canonical URL root for SEO, Open Graph tags, sitemap, and robots. |
| `NEXT_PUBLIC_APP_URL` | `https://app.yourtraveldesk.in` | Verified destination for "Start Free Trial" and "Agency Login" CTAs. (Can point to staging during testing). |
| `DEMO_WEBHOOK_URL` | *(Empty by default)* | Webhook/CRM endpoint (Slack, Zapier, HubSpot, etc.) for receiving demo requests. |
| `CONTACT_WEBHOOK_URL` | *(Empty by default)* | Webhook/CRM endpoint for general contact inquiries. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | *(Optional, e.g., `G-XXXXXXXXXX`)* | Google Analytics 4 Measurement ID. Scripts only load if this ID is supplied. |

---

## 8. Form Integration & Honest Unconfigured State

The demo and contact forms use a provider-agnostic submission adapter (`src/lib/adapters/submissionAdapter.ts`):
- **Server Validation:** Both forms enforce strict Zod schemas (`src/lib/validation/demoSchema.ts`) preventing injection or malformed data.
- **Honest Behavior:** If `DEMO_WEBHOOK_URL` or `CONTACT_WEBHOOK_URL` is not configured, the API transparently responds with HTTP 501 (`status: "unconfigured"`).
- **No False Success:** The UI alerts the user honestly that demo dispatch is currently awaiting backend setup, rather than displaying a fake "Message sent!" notification.
- **Webhook Payload:** When configured, it automatically dispatches clean JSON payloads with timestamp, origin, client details, and consent preferences.

---

## 9. SEO, Analytics & Privacy Foundations

- **Canonical URLs & Metadata:** Every route specifies unique, descriptive title tags, meta descriptions, and canonical URL pointers.
- **Robots & Sitemap:**
  - `robots.ts` allows full crawling on `yourtraveldesk.in`.
  - Preview deployments (e.g. `*.vercel.app` or staging domains) automatically serve `X-Robots-Tag: noindex, nofollow` to prevent search engine indexing.
  - Dynamically generated `sitemap.ts` includes all verified public routes.
- **Google Analytics 4 & Search Console:**
  - GA4 integration helper (`src/lib/analytics/gtag.ts`) records clean conversion events (`trial_cta_click`, `demo_cta_click`, `pricing_cta_click`).
  - **Zero PII Policy:** No names, emails, phone numbers, or business identifiers are ever passed to analytics.
  - GSC ownership verification can be established via DNS TXT record or HTML meta tag once authorized by the domain owner.

---

## 10. Owner Decisions & Action Items Before Live Deployment

Before publishing this site to `https://yourtraveldesk.in`, the product owner should confirm:

1. [ ] **Legal Entity Name & Address:** Populate the registered Indian business entity name, CIN/GSTIN, and registered office address in `/privacy` and `/terms`.
2. [ ] **Lead Delivery Webhook:** Add `DEMO_WEBHOOK_URL` and `CONTACT_WEBHOOK_URL` in production environment settings (pointing to agency email relay, Slack channel, or CRM).
3. [ ] **Production SaaS App URL:** Confirm whether `https://app.yourtraveldesk.in` is live for direct customer signups, or if signups should temporarily route to another verified destination.
4. [ ] **Google Analytics 4 ID:** Provide the GA4 `G-XXXXXXXXXX` measurement ID for production traffic tracking.
5. [ ] **Support Email:** Confirm the primary support inbox (e.g., `support@yourtraveldesk.in` or `hello@yourtraveldesk.in`).
