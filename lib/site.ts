export const SITE = {
  name: 'Zera Dental',
  /**
   * The registered entity. 'Zera Dental' is a trading brand, NOT a legal name —
   * having the brand here is what failed Meta business verification in Oct 2026
   * ("your legal business name must be present on the website"). Anything that
   * states who owns or operates this site must use legalName, never name.
   */
  legalName: 'Zera Technologies',
  parent: 'Zera Technologies',
  parentUrl: 'https://zeratech.io/',
  url: 'https://zeradental.in',
  domain: 'zeradental.in',
  email: 'hello@zeradental.in',
  phoneDisplay: '+91 98351 02324',
  phoneE164: '+919835102324',
  whatsappNumber: '919835102324',
  tagline: 'Dental websites that bring patients through the door.',
  description:
    'Zera Dental builds fast, SEO-first websites for dental clinics in India. Google-ready in 7 days, WhatsApp booking built in, from ₹14,999. Free clinic website audit.',
  founded: '2024',
  addressLocality: 'Madhepura',
  addressRegion: 'Bihar',
  addressCountry: 'IN',
  addressCountryName: 'India',
  /** Printed address used in the public business-identity block. */
  addressLines: ['Madhepura, Bihar', 'India'],
  /**
   * Udyam (MSME) registration number. Rendered only when non-empty, so the site
   * never displays a placeholder or an invented number. Fill this in and the
   * footer, /business-information and the schema all pick it up automatically.
   */
  udyam: 'UDYAM-BR-21-0036443',
} as const;

export function wa(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: wa("Hi Zera Dental, I'd like to talk about a website for my dental clinic."),
  audit: wa('Hi Zera Dental, I want the free website audit for my dental clinic.'),
  pricing: wa("Hi Zera Dental, I saw your pricing page. I'd like to discuss a package for my clinic."),
  demo: wa('Hi Zera Dental, I want to see a free demo homepage for my clinic.'),
  city: (city: string) =>
    wa(`Hi Zera Dental, I run a dental clinic in ${city} and I want a website. Can we talk?`),
  plan: (plan: string) =>
    wa(`Hi Zera Dental, I'm interested in the ${plan} package for my dental clinic.`),
} as const;

/** Replace with your deployed Google Apps Script Web App URL. */
export const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT || 'https://script.google.com/macros/s/REPLACE_ME/exec';
