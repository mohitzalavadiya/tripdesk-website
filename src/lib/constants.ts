export const CANONICAL_SITE_URL = 'https://yourtraveldesk.in';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_SITE_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.yourtraveldesk.in';

export const APP_SIGNUP_URL = `${APP_URL}/signup`;
export const APP_LOGIN_URL = `${APP_URL}/login`;

export const BRAND = {
  name: 'Your Travel Desk',
  shortName: 'Your Travel Desk',
  tagline: 'Run Your Entire Travel Agency in One Unified Platform',
  eyebrow: 'Travel Agency Operating System',
  description:
    'Your Travel Desk is the modern SaaS operating system for small travel agencies, tour operators, and DMCs. Manage customer inquiries, multi-day itineraries, quotation proposals, confirmed bookings, supplier vouchers, invoices, and payments in one place.',
  primaryCta: 'Start 7-Day Free Trial',
  secondaryCta: 'Book a Demo',
  supportingText: 'Instant access. 7 days free. No credit card required.',
  trialDays: 7,
  contactEmail: 'supportyourtraveldesk@gmail.com',
  supportEmail: 'supportyourtraveldesk@gmail.com',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: 'Core Features', href: '/features' },
  { label: 'Pricing & Plans', href: '/pricing' },
  { label: 'Workflow & How It Works', href: '/how-it-works' },
  { label: 'Request a Demo', href: '/request-demo' },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Support', href: '/contact' },
  { label: 'Agency Login', href: APP_LOGIN_URL, isExternal: true },
] as const;

export const FOOTER_RESOURCE_LINKS = [
  { label: 'Frequently Asked Questions', href: '/faq' },
  { label: 'Free Trial Signup', href: APP_SIGNUP_URL, isExternal: true },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

// Verified Pricing from Staging Subscription Configuration
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '7-Day Free Trial Included',
    tagline: 'Essential travel planning & quotation workflow for boutique operators.',
    monthlyPrice: 499,
    yearlyPrice: 4999, // ~₹416/mo (Save ~17%)
    monthlyDisplay: '₹499',
    yearlyDisplay: '₹4,999',
    yearlySavings: 'Save ~17%',
    popular: false,
    ctaText: 'Start 7-Day Free Trial',
    ctaHref: APP_SIGNUP_URL,
    isExternal: true,
    features: [
      'Up to 20 Trips per month',
      'Up to 20 Quotations per month',
      'Up to 20 Bookings per month',
      'Unlimited Customers & Traveler Profiles',
      'Custom Itinerary & Trip Workspaces',
      'Hotels, Vehicles & Rates Master Library',
      'Invoice & Payment Ledger Tracking',
      'Email & Community Support',
    ],
    limitsNote: 'Monthly counts reset each billing cycle. Overages require upgrade.',
  },
  {
    id: 'professional',
    name: 'Professional',
    badge: 'Most Popular for Growing Agencies',
    tagline: 'Comprehensive operating suite for established agencies and tour desks.',
    monthlyPrice: 999,
    yearlyPrice: 9999, // ~₹833/mo (Save ~17%)
    monthlyDisplay: '₹999',
    yearlyDisplay: '₹9,999',
    yearlySavings: 'Save ~17%',
    popular: true,
    ctaText: 'Choose Professional',
    ctaHref: APP_SIGNUP_URL,
    isExternal: true,
    features: [
      'Unlimited Trips (No monthly cap)',
      'Unlimited Quotations & Proposal Exports',
      'Unlimited Confirmed Bookings',
      'Unlimited Customers & Complete History',
      'Custom Agency Logo on Vouchers & Invoices',
      'Advanced Executive Dashboard & Margin Reports',
      'Quotation Conversion Funnel & Lead Win Rates',
      'Customer Feedback & Review Tracking',
      'Priority Support with Dedicated Desk',
    ],
    limitsNote: 'Zero workflow limitations. Scale your operations freely.',
  },
] as const;

// Verified Core Product Modules from Staging
export const PRODUCT_MODULES = [
  {
    id: 'trips',
    title: 'Trip Workspaces & Itineraries',
    shortDesc: 'Build multi-day travel itineraries with destinations, schedules, passenger details, and costing in one central view.',
    longDesc: 'Stop juggling Word docs and messy folders. Create structured day-by-day itineraries with flight details, hotel check-ins, transfers, and activities. Every itinerary is linked directly to your customer profile and costing ledger.',
    badge: 'Operations & Itineraries',
    icon: 'Compass',
    screenshot: '/screenshots/trips.png',
  },
  {
    id: 'quotations',
    title: 'Fast Quotations & Proposals',
    shortDesc: 'Generate client-ready commercial proposals directly from trip workspaces with automated costing and markup.',
    longDesc: 'Speed up proposal turnaround times. Build multi-option quotations with real-time hotel and vehicle rates, custom agency margins, and clean presentation that clients understand and accept faster.',
    badge: 'Commercial Proposals',
    icon: 'FileText',
    screenshot: '/screenshots/quotations.png',
  },
  {
    id: 'bookings',
    title: 'Confirmed Bookings & Vouchers',
    shortDesc: 'Lock in confirmed services, generate supplier rooming vouchers, and track travel statuses in real time.',
    longDesc: 'Transform accepted quotations into confirmed operational bookings with a single click. Maintain booking reference codes, supplier vouchers, room allocations, and track whether a trip is Planning, Confirmed, On Trip, or Completed.',
    badge: 'Active Operations',
    icon: 'CalendarCheck',
    screenshot: '/screenshots/bookings.png',
  },
  {
    id: 'customers',
    title: 'Customer Directory & Travel History',
    shortDesc: 'Centralize traveler profiles, passport notes, dietary preferences, and multi-trip history in a unified CRM.',
    longDesc: 'Keep every client relationship intact. View all past, present, and upcoming trips for each customer, along with total lifetime spend, contact records, and quick quotation re-engagement.',
    badge: 'Agency CRM',
    icon: 'Users',
    screenshot: '/screenshots/dashboard.png',
  },
  {
    id: 'rates',
    title: 'Hotels, Vehicles & Rate Sheets',
    shortDesc: 'Maintain master supplier contracts, seasonal room rates, vehicle tariffs, and activity prices.',
    longDesc: 'No more searching through supplier emails or PDF price sheets. Store contracted room tariffs, extra bed charges, meal plans, and taxi rates in a reusable database ready to inject into any quotation.',
    badge: 'Resource Master',
    icon: 'Building2',
    screenshot: '/screenshots/dashboard.png',
  },
  {
    id: 'finance',
    title: 'Invoicing & Payment Collections',
    shortDesc: 'Issue professional tax invoices, record partial milestone installments, and track receivables automatically.',
    longDesc: 'Maintain complete financial clarity. Generate branded invoices directly from confirmed bookings, log bank and UPI installment collections, monitor supplier payables, and see gross profit margins per trip.',
    badge: 'Finance & Ledgers',
    icon: 'CreditCard',
    screenshot: '/screenshots/dashboard.png',
  },
  {
    id: 'analytics',
    title: 'Executive Dashboards & Conversion Funnel',
    shortDesc: 'Monitor total bookings, quotation win rates, receivables, and top destination trends at a glance.',
    longDesc: 'Make data-backed decisions. Track inquiries received, quotes sent, quotes viewed, quotes accepted, and net revenue. Identify your highest-grossing destinations and top repeat clients.',
    badge: 'Executive Suite',
    icon: 'TrendingUp',
    screenshot: '/screenshots/dashboard.png',
  },
  {
    id: 'branding',
    title: 'White-Label Agency Branding',
    shortDesc: 'Present your own agency identity with custom logos on vouchers, quotations, and client-facing documents.',
    longDesc: 'Maintain high trust with travelers. Your clients see your travel agency name and logo on every generated document, reinforcing your professional brand credibility.',
    badge: 'Brand Presence',
    icon: 'ShieldCheck',
    screenshot: '/screenshots/pricing.png',
  },
] as const;

export const WORKFLOW_LIFECYCLE = [
  {
    step: '01',
    title: 'Inquiry & Client Profile',
    desc: 'Capture customer details, travel dates, passenger count, and specific destination preferences.',
  },
  {
    step: '02',
    title: 'Trip Workspace Setup',
    desc: 'Map out the day-by-day travel schedule, destinations, sightseeing activities, and transport needs.',
  },
  {
    step: '03',
    title: 'Instant Quotation',
    desc: 'Pull rates from your hotel and vehicle master sheets, apply agency markup, and send a proposal.',
  },
  {
    step: '04',
    title: 'Booking Confirmation',
    desc: 'Client accepts the proposal. Convert the quotation into an active booking and issue supplier vouchers.',
  },
  {
    step: '05',
    title: 'Invoice Generation',
    desc: 'Create an invoice reflecting total package cost, applicable taxes, and milestone payment schedules.',
  },
  {
    step: '06',
    title: 'Payment Reconciliation',
    desc: 'Record advance deposits and balance payments. Monitor supplier payables and realize gross profit.',
  },
] as const;

export const FAQ_ITEMS = [
  {
    category: 'General',
    question: 'What is Your Travel Desk?',
    answer:
      'Your Travel Desk is a specialized B2B SaaS operating system built for small travel agencies, independent tour operators, and DMCs in India and worldwide. It consolidates trip planning, quotations, booking management, supplier rates, invoicing, and payment collections into one clean, connected platform.',
  },
  {
    category: 'General',
    question: 'Who is Your Travel Desk designed for?',
    answer:
      'It is designed for boutique travel agencies, customized holiday planners, outbound & inbound tour operators, and destination management companies looking to replace fragmented spreadsheets, disorganized WhatsApp chats, and disconnected invoicing tools.',
  },
  {
    category: 'Pricing & Trial',
    question: 'How does the 7-day free trial work?',
    answer:
      'You can sign up for the Starter plan with a full 7-day free trial. You get immediate access to all core travel management modules—no credit card or upfront payment required. After 7 days, you can choose to subscribe to Starter (₹499/mo) or Professional (₹999/mo).',
  },
  {
    category: 'Pricing & Trial',
    question: 'What are the limits on the Starter plan?',
    answer:
      'The Starter plan (₹499/mo or ₹4,999/yr) includes up to 20 trips, 20 quotations, and 20 bookings per month, with unlimited customers. For unlimited trips, quotes, bookings, and custom agency branding, you can upgrade to the Professional plan (₹999/mo or ₹9,999/yr).',
  },
  {
    category: 'Features & Workflow',
    question: 'Can I generate quotations directly from trips?',
    answer:
      'Yes. Once you define a trip itinerary and select hotels and vehicles, you can generate a professional quotation with automated pricing calculations and markups in seconds.',
  },
  {
    category: 'Features & Workflow',
    question: 'Can I track partial payments and installments?',
    answer:
      'Yes. Your Travel Desk includes a dedicated payment ledger. You can record advance deposits, schedule remaining installment due dates, and monitor outstanding receivables in real time.',
  },
  {
    category: 'Features & Workflow',
    question: 'Can I store contracted hotel and taxi rates?',
    answer:
      'Yes. You can build your own library of hotels, room categories, seasonal rates, vehicle tariffs, and sightseeing activities, making quotation assembly fast and accurate.',
  },
  {
    category: 'Onboarding & Support',
    question: 'How quickly can our agency get started?',
    answer:
      'You can be up and running in under 5 minutes. No complicated installations, server setup, or technical training required. Simply create your account, configure your agency workspace, and start creating trips.',
  },
  {
    category: 'Onboarding & Support',
    question: 'Can I schedule a live product demonstration?',
    answer:
      'Yes! You can click "Book a Demo" or visit our Request Demo page to submit your details. Our team will arrange a guided walkthrough tailored to your agency’s specific operational workflow.',
  },
] as const;
