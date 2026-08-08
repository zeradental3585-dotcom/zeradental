export const SITE = {
  name: 'Zera Dental',
  legalName: 'Zera Dental',
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
  addressLocality: 'Patna',
  addressRegion: 'Bihar',
  addressCountry: 'IN',
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
