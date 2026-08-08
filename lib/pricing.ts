export type Plan = {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  strike?: string;
  timeline: string;
  best: string;
  popular?: boolean;
  features: string[];
  notIncluded?: string[];
};

export const PLANS: Plan[] = [
  {
    slug: 'starter',
    name: 'Starter Clinic',
    price: 14999,
    priceLabel: '₹14,999',
    strike: '₹24,999',
    timeline: 'Live in 7 days',
    best: 'Single-doctor clinics getting online for the first time',
    features: [
      '5 pages — Home, About, Services, Gallery, Contact',
      'Mobile-first custom design (no templates)',
      'Click-to-call + WhatsApp booking button',
      'Google Maps embed + directions link',
      'Appointment enquiry form → your email & WhatsApp',
      'Google Business Profile setup or clean-up',
      'On-page SEO for your clinic + city keywords',
      'Free .in domain for year 1 + 1 year hosting',
      'SSL certificate & 90+ PageSpeed score',
      'Google Search Console + Analytics connected',
      '30 days of free edits after launch',
    ],
    notIncluded: ['Blog / CMS', 'Multi-location pages', 'Online payments'],
  },
  {
    slug: 'growth',
    name: 'Growth Practice',
    price: 29999,
    priceLabel: '₹29,999',
    strike: '₹44,999',
    timeline: 'Live in 12 days',
    best: 'Established clinics that want to rank for "dentist near me"',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Up to 12 pages — one page per treatment',
      'Treatment pages for implants, braces, RCT, whitening, kids',
      'Local SEO build: 20+ citations, NAP consistency, Maps optimisation',
      'Google review-collection system (QR card + auto WhatsApp ask)',
      'Blog / CMS so you can publish without a developer',
      'Before-and-after case gallery with consent workflow',
      'Doctor profile pages with schema markup',
      'Bilingual ready (English + Hindi or regional language)',
      'FAQ schema so you show up in Google AI answers',
      '3 SEO articles written and published for you',
      '90 days of free edits after launch',
    ],
    notIncluded: ['Online payments', 'Patient portal'],
  },
  {
    slug: 'authority',
    name: 'Authority Clinic',
    price: 49999,
    priceLabel: '₹49,999',
    strike: '₹79,999',
    timeline: 'Live in 21 days',
    best: 'Multi-chair, multi-location or specialist practices',
    features: [
      'Everything in Growth, plus:',
      'Unlimited pages + multi-location location pages',
      'Real online appointment booking with calendar slots',
      'Automated WhatsApp + SMS appointment reminders',
      'Online payment / consultation-fee collection',
      'Patient education content hub (20+ articles planned)',
      'Video embeds, virtual clinic tour, doctor intro reels',
      'Advanced schema: Dentist, MedicalClinic, Physician, FAQ, Review',
      'Competitor gap analysis for your city',
      'Conversion tracking + monthly rank report for 3 months',
      '6 months of free edits after launch',
    ],
  },
];

export const CARE_PLAN = {
  name: 'Zera Care',
  price: 1999,
  priceLabel: '₹1,999',
  period: '/month',
  features: [
    'Hosting, domain renewal, SSL and daily backups',
    'Unlimited small content edits (text, photos, offers)',
    'Security patches and uptime monitoring',
    'Monthly Google Business Profile post + photo upload',
    '1 new SEO blog article every month',
    'Monthly ranking and enquiry report on WhatsApp',
    'Priority WhatsApp support, same-day response',
  ],
};

export const ADDONS = [
  { name: 'Extra language (Hindi / Marathi / Tamil / Telugu / Bengali)', price: '₹4,999' },
  { name: 'Professional clinic photoshoot direction + editing (you shoot, we polish)', price: '₹3,999' },
  { name: 'Logo + clinic brand kit', price: '₹5,999' },
  { name: 'Google Ads landing page (single, conversion-built)', price: '₹7,999' },
  { name: 'Monthly SEO growth retainer (content + links + reporting)', price: '₹8,999/mo' },
  { name: 'Rush delivery (site live in 72 hours)', price: '₹6,999' },
];
