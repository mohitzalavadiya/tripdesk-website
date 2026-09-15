export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.tripdesk.com';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tripdesk.com';

export const APP_SIGNUP_URL = `${APP_URL}/signup`;
export const APP_LOGIN_URL = `${APP_URL}/login`;

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_PRODUCT_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'How It Works', href: '/how-it-works' },
] as const;

export const FOOTER_COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_RESOURCE_LINKS = [
  { label: 'FAQ', href: '/faq' },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
] as const;

export const PRODUCT_AREAS = [
  {
    title: 'Customers',
    description: 'Keep customer and traveler information organized, with trip histories linked to each profile.',
  },
  {
    title: 'Trips',
    description: 'Centralize itineraries, travel dates, travelers, hotel details, and activities in one place.',
  },
  {
    title: 'Hotels & Rates',
    description: 'Manage supplier rates, room categories, seasons, and contracts effortlessly.',
  },
  {
    title: 'Quotations',
    description: 'Build structured, professional travel proposals directly from trip details in seconds.',
  },
  {
    title: 'Bookings',
    description: 'Keep confirmed bookings, room allocations, and service vouchers organized and connected.',
  },
  {
    title: 'Invoices & Payments',
    description: 'Generate invoices for confirmed bookings, record multiple installments, and monitor balances.',
  },
  {
    title: 'Vehicles & Activities',
    description: 'Coordinate transfers, driver assignments, day tours, and excursions seamlessly.',
  },
  {
    title: 'Customer Experience',
    description: 'Deliver structured itineraries, clear travel documents, and consistent service.',
  },
] as const;

export const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Add Your Customer',
    description: 'Create customer profiles with contact and traveler details.',
  },
  {
    number: '02',
    title: 'Create a Trip',
    description: 'Set dates, destinations, travelers, and itinerary structure.',
  },
  {
    number: '03',
    title: 'Create a Quotation',
    description: 'Add hotels and services with clear, automated pricing.',
  },
  {
    number: '04',
    title: 'Confirm the Booking',
    description: 'Lock in confirmed services and generate booking records.',
  },
  {
    number: '05',
    title: 'Create an Invoice',
    description: 'Generate professional invoices directly from the booking.',
  },
  {
    number: '06',
    title: 'Track Payments',
    description: 'Record partial and full payments with real-time balance tracking.',
  },
] as const;

export const BRAND = {
  name: 'TripDesk',
  tagline: 'Run Your Entire Travel Agency in One Place.',
  eyebrow: 'Travel Agency Operating System',
  description:
    'TripDesk helps travel agencies manage customers, trips, quotations, bookings, invoices, payments, and day-to-day travel operations from one simple platform.',
  primaryCta: 'Start 7-Day Free Trial',
  secondaryCta: 'Book a Demo',
  supportingText: 'No complicated setup. Start managing your agency with TripDesk.',
} as const;

export const HOMEPAGE_FAQ = [
  {
    question: 'What is TripDesk?',
    answer:
      'TripDesk is a Travel Agency Operating System built to help travel agencies, tour operators, and DMCs manage customers, trips, quotations, bookings, invoices, and payments in one unified platform.',
  },
  {
    question: 'Who is TripDesk for?',
    answer:
      'TripDesk is designed for small and medium-sized travel agencies, tour operators, Destination Management Companies (DMCs), and independent travel businesses seeking to streamline their daily operations.',
  },
  {
    question: 'Can I try TripDesk before paying?',
    answer:
      'Yes, you can start with a 7-day free trial with full access to all features. No credit card is required to begin exploring the platform.',
  },
  {
    question: 'What can I manage with TripDesk?',
    answer:
      'You can manage customer profiles, trips, hotel databases & supplier rates, quotation generation, booking confirmations, invoices, partial & full payments, vehicles, and activities.',
  },
  {
    question: 'Can one customer have multiple trips?',
    answer:
      'Yes. Every customer record maintains a complete travel history, allowing you to attach multiple past, current, and upcoming trips to the same client.',
  },
  {
    question: 'Can I create quotations?',
    answer:
      'Yes. You can build professional quotations directly from trip details, automatically calculate pricing, and export clear proposals for your clients.',
  },
  {
    question: 'Can I create invoices and track payments?',
    answer:
      'Yes. TripDesk allows you to generate invoices for confirmed bookings, record partial or full installment payments, and track outstanding balances in real time.',
  },
  {
    question: 'Do I need technical knowledge to use TripDesk?',
    answer:
      'No. TripDesk is built with an intuitive, clean interface designed specifically for travel agents and operations teams without steep learning curves.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Click "Start 7-Day Free Trial" to create your agency account and start setting up your customers and trips in minutes.',
  },
  {
    question: 'Can I book a demo?',
    answer:
      'Yes. Click "Book a Demo" to visit our contact page and request a personalized walkthrough of the platform tailored to your agency workflow.',
  },
] as const;
