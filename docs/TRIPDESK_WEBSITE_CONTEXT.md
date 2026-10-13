# TripDesk Marketing Website — Context & Architecture Decision Record

This document serves as the persistent source of truth and architectural decision record for the **TripDesk Marketing Website**.

---

## 1. Project Boundaries & Isolation

* **Independent Repository/Project**: This marketing website is completely separate from the core TripDesk SaaS application.
* **Separation of Concerns**:
  * **Marketing Website**: Public marketing, product presentation, feature highlights, conversion funnels, SEO, contact/demo booking, and legal compliance pages.
  * **TripDesk SaaS Application**: Authentication, agency account creation/onboarding, subscriptions, customer CRM, trips, quotations, bookings, supplier management, invoices, payments, and operational business logic.
* **No Database / No Auth**: The marketing website does not include Prisma, Supabase, database connections, or SaaS business logic.

---

## 2. Brand Positioning & Core Messaging

* **Brand Name**: TripDesk
* **Positioning**: Travel Agency Operating System
* **Primary Tagline**: Run Your Entire Travel Agency in One Place.
* **Target Audience**:
  * Small and medium-sized travel agencies
  * Tour operators
  * Destination Management Companies (DMCs)
  * Independent travel businesses
* **Primary CTA**: "Start 7-Day Free Trial" → `${NEXT_PUBLIC_APP_URL}/signup`
* **Secondary CTA**: "Book a Demo" → `/contact`
* **Login Link**: "Log in" → `${NEXT_PUBLIC_APP_URL}/login`
* **Supporting Text**: "No complicated setup. Start managing your agency with TripDesk."

---

## 3. Product Architecture Tokens

### 3.1 Product Modules (Strict 8 Areas)
1. **Customers**: Lead management, client profiles, travel history, and communication logs.
2. **Trips**: Itinerary planning, destination details, dates, and day-by-day scheduling.
3. **Hotels & Rates**: Supplier rates, contract management, room types, and seasonal pricing.
4. **Quotations**: Multi-option custom proposal builder with PDF generation.
5. **Bookings**: Supplier confirmations, vouchers, rooming lists, and status tracking.
6. **Invoices & Payments**: Automated invoice generation, payment schedules, and financial reconciliation.
7. **Vehicles & Activities**: Transport arrangements, driver assignments, excursions, and ticketing.
8. **Customer Experience**: Client travel portal, itinerary viewing, and post-trip feedback.

*Rule: Do not invent additional modules without explicit project authorization.*

### 3.2 Core Conceptual Workflow
`Customer → Trip → Quotation → Booking → Invoice → Payment`

---

## 4. Technical Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS (v4) with CSS design tokens
* **Icons**: `lucide-react`
* **Fonts**: `Inter` via `next/font/google`
* **Linting**: ESLint + `eslint-config-next`

---

## 5. Design System & Tokens

* **Aesthetic**: Minimal, clean, modern B2B SaaS.
* **Color Palette**:
  * **Primary**: `#4F46E5` (Indigo-600)
  * **Primary Dark / Hover**: `#4338CA` (Indigo-700)
  * **Accent**: `#7C3AED` (Violet-600, used sparingly)
  * **Main Text**: `#0F172A` (Slate-900)
  * **Muted Text**: `#475569` (Slate-600)
  * **Background**: `#FFFFFF` (Pure White)
  * **Surface**: `#F8FAFC` (Slate-50)
  * **Borders**: `#E2E8F0` (Slate-200)
* **Typography**:
  * Hero Heading: Desktop ~56–64px (`text-4xl sm:text-5xl lg:text-[54px]`)
  * Section Headings: Desktop ~40–48px (`text-3xl sm:text-4xl lg:text-[44px]`)
  * Body Text: 16–18px (`text-base sm:text-lg`)
* **Visual Guidelines**:
  * Real UI screenshots as primary visuals (no generic stock photos of airplanes/beaches as hero visual).
  * Subtle borders, rounded cards (`rounded-xl` / `rounded-2xl`), gentle shadows.
  * Generous whitespace and restrained animations.
  * Full accessibility with `prefers-reduced-motion` and visible focus outlines.

---

## 6. Environment Variables & URL Resolution

* `NEXT_PUBLIC_APP_URL`: Base domain for the TripDesk SaaS app (e.g. `https://app.tripdesk.com` in production, `http://localhost:3000` in development).
* `NEXT_PUBLIC_SITE_URL`: Base domain for the marketing site (e.g. `https://tripdesk.com`).

---

## 7. Homepage Architecture (W-02)

The homepage is organized into exactly 12 sections in strict sequential order:
1. **Header**: Sticky navigation with brand logo, desktop links, Log in, and Start Free Trial CTA.
2. **Hero**: 2-column layout (Left: Eyebrow, headline, description, CTAs, supporting text; Right: Product screenshot area).
3. **Problem**: Subtle contrasting slate background with 4 problem cards on spreadsheet chaos and scattered tools.
4. **Product Overview**: 8-card responsive grid highlighting the core modules.
5. **How It Works**: 6-step workflow (Customer → Trip → Quotation → Booking → Invoice → Payment) with horizontal desktop and vertical mobile timeline.
6. **Real Product Screens**: Alternating A/B/C/D/E layouts for Customer Management, Trip Management, Quotations, Bookings, and Invoices & Payments.
7. **Why TripDesk**: Contrasting dark slate section (`#0F172A`) covering Simple, Connected, Professional, and Centralized pillars.
8. **Pricing Preview**: 2-tier plans (Starter / Agency Pro) with interactive Monthly/Yearly toggle and 7-day free trial CTA.
9. **Book a Demo**: Conversion card routing to `/contact` for personalized walkthroughs.
10. **FAQ**: 10 essential questions with accessible accordions and deep link to `/faq`.
11. **Final CTA**: High-conversion closing banner with dual CTAs.
12. **Footer**: 4-column structured directory (Product, Company, Resources, Legal) and 2026 copyright.

---

## 8. Screenshot Strategy & Asset Architecture

* **Reusable Frame**: `src/components/ui/ScreenshotFrame.tsx` provides a standard browser/window chrome with breadcrumbs, status badges, and consistent aspect ratios (`16/10` / `16/9`).
* **Asset Location**: Actual screenshots will reside in `public/screenshots/`:
  * `public/screenshots/dashboard.png`
  * `public/screenshots/customers.png`
  * `public/screenshots/trips.png`
  * `public/screenshots/quotations.png`
  * `public/screenshots/bookings.png`
  * `public/screenshots/invoices.png`
* **Fallback Behavior**: When an image file is absent, `ScreenshotFrame` renders a clean, non-fabricating UI wireframe showing module badges and real structural workflows without disrupting page geometry.

---

## 9. Pricing Catalog Dependency

* Pricing preview reflects current planned tier structures (Starter at $39/mo, Agency Pro at $79/mo, with 20% annual discount).
* Actual checkout, billing subscriptions, and localized currency rates are managed strictly in the SaaS application (`${NEXT_PUBLIC_APP_URL}/signup`).

---

## 10. Routes Map

| Route | Purpose |
| :--- | :--- |
| `/` | Complete 12-section B2B SaaS marketing homepage |
| `/features` | Deep-dive breakdown of the 8 core product areas |
| `/how-it-works` | Step-by-step visual walkthrough of the customer-to-payment workflow |
| `/pricing` | Transparent plan details & trial benefits |
| `/about` | Company background and mission |
| `/faq` | Detailed categorized FAQ with accessible accordions |
| `/contact` | Demo request form & contact channels |
| `/privacy` | Privacy policy & data protection compliance |
| `/terms` | Terms of service |
| `/robots.txt` | Automated search crawler instructions (`/robots.ts`) |
| `/sitemap.xml` | Automated dynamic sitemap (`/sitemap.ts`) |

---

## 11. Changelog & Project History

* **2026-09-15 (W-01)**:
  * Project initialized with Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide icons.
  * Created design system tokens and global typography (`globals.css`).
  * Implemented reusable global components: `Container`, `Button`, `SectionHeading`, `FeatureCard`, `FaqAccordion`, `Navbar`, `MobileNav`, and `Footer`.
  * Configured dynamic environment routing via `NEXT_PUBLIC_APP_URL`.
  * Created foundational route handlers, SEO metadata, `sitemap.ts`, and `robots.ts`.
  * Established `docs/TRIPDESK_WEBSITE_CONTEXT.md` as architectural source of truth.
* **2026-09-15 (W-02)**:
  * Implemented complete 12-section B2B SaaS marketing homepage in exact required sequence.
  * Created `ScreenshotFrame` component with drop-in image support and UI simulation fallback.
  * Implemented `HeroSection`, `ProblemSection`, `ProductOverviewSection`, `HowItWorksSection`, `ProductScreensSection`, `WhyTripDeskSection`, `PricingPreviewSection`, `BookDemoSection`, `FaqPreviewSection`, and `FinalCtaSection`.
  * Updated Footer with 4-column categorization (Product, Company, Resources, Legal) and 2026 copyright.
  * Verified build, lint, TypeScript strict types, and responsive breakpoints.
* **2026-10-13 (Analytics & Consent)**:
  * Implemented first-party, opt-in Google Analytics 4 (GA4) consent architecture.
  * Added `src/lib/analytics/consent.ts` for versioned preference persistence (`ytd_analytics_consent_v1`), safe fallback handling, and cookie/disable revocation.
  * Configured in-session reacceptance in `enableGoogleAnalytics()` with `{ send_page_view: false }` to prevent duplicate automatic page views on the same page while restoring custom event measurement.
  * Updated `src/lib/analytics/gtag.ts` to require verified consent before dispatching events (`demo_form_success`, `contact_form_success`, `pricing_cta_click`), while maintaining strict PII sanitization.
  * Created `src/components/analytics/AnalyticsConsent.tsx` client component rendering an unobtrusive, accessible consent choices banner ("Your privacy choices"), Escape-key dismissal without consent mutation, and conditionally loading GA4 scripts only upon explicit acceptance.
  * Added `src/components/analytics/CookiePreferencesButton.tsx` in `Footer.tsx` allowing visitors to inspect, change, or revoke their consent choice at any time.
  * Updated `src/app/privacy/page.tsx` describing essential vs. optional analytics, consent requirements, opt-out tools, and revocation impact.
