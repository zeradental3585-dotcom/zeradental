export const STUDY = {
  n: 13,
  cities: 6,
  attempted: 15,
  date: '9 August 2026',
  slug: 'indian-dental-website-study',
  title: 'We audited 13 Indian dental clinic websites. The results surprised us.',
  metaTitle: 'Indian Dental Clinic Website Study 2026 — Real Data on 13 Clinics',
  metaDesc:
    'Original research: we measured page weight, WhatsApp availability, treatment-page depth and booking paths across 13 independent dental clinic websites in 6 Indian cities. 54% had no WhatsApp link.',
} as const;

export type Metric = { label: string; pct: number; note: string; good: boolean };

export const METRICS: Metric[] = [
  { label: 'HTTPS / SSL', pct: 100, good: true, note: 'Universal. This is no longer a differentiator.' },
  { label: 'Mobile viewport tag', pct: 100, good: true, note: 'Every site is at least attempting to be mobile-friendly.' },
  { label: 'Click-to-call number', pct: 92, good: true, note: 'Nearly universal — Indian clinics understand the phone.' },
  { label: 'Schema markup', pct: 85, good: true, note: 'Mostly automatic, added by WordPress SEO plugins.' },
  { label: 'Booking language on page', pct: 69, good: false, note: '"Book appointment" wording present — not always a working system.' },
  { label: 'Google Map embed', pct: 62, good: false, note: 'Nearly 4 in 10 make you hunt for the location.' },
  { label: 'Any enquiry form', pct: 62, good: false, note: 'A form is not a booking system, but it is a capture path.' },
  { label: 'WhatsApp link', pct: 46, good: false, note: 'The single biggest gap. In India. Where WhatsApp is the default.' },
];

export const CLINICS = [
  { site: 'bestdentistinpatna.com', city: 'Patna', kb: 5672, req: 153, tp: 8, words: 1475, wa: true },
  { site: 'smylexl.com', city: 'Indore', kb: 716, req: 43, tp: 15, words: 583, wa: false },
  { site: 'dentalclinicindore.com', city: 'Indore', kb: 609, req: 18, tp: 0, words: 463, wa: true },
  { site: 'smilearchdental.com', city: 'Bhopal', kb: 468, req: 44, tp: 0, words: 79, wa: false },
  { site: 'nagpurdentist.com', city: 'Nagpur', kb: 536, req: 29, tp: 9, words: 449, wa: true },
  { site: 'aayushdentalclinic.com', city: 'Nagpur', kb: 138, req: 12, tp: 4, words: 585, wa: false },
  { site: 'denticanagpur.in', city: 'Nagpur', kb: 76, req: 8, tp: 4, words: 268, wa: false },
  { site: 'omdentalnagpur.com', city: 'Nagpur', kb: 172, req: 23, tp: 5, words: 748, wa: false },
  { site: 'smilekraftnagpur.com', city: 'Nagpur', kb: 2987, req: 24, tp: 6, words: 433, wa: false },
  { site: 'nandhinidentalcare.com', city: 'Coimbatore', kb: 165, req: 39, tp: 3, words: 343, wa: false },
  { site: 'drruchidental.com', city: 'Coimbatore', kb: 84, req: 7, tp: 10, words: 809, wa: true },
  { site: 'marudhardentalclinic.com', city: 'Jaipur', kb: 839, req: 55, tp: 5, words: 1730, wa: true },
  { site: 'vivandental.com', city: 'Jaipur', kb: 1434, req: 17, tp: 8, words: 931, wa: true },
];

export const FAQS = [
  { q: 'How many dental websites did you test?', a: 'We attempted 15 independent clinic websites across six Indian cities and got clean measurements from 13. Two sites rendered their content via JavaScript after our measurement point, so we excluded them rather than report misleading zeroes. This is round one — we are expanding the sample toward 100.' },
  { q: 'What exactly did you measure?', a: 'For each homepage: total transferred bytes and request count from the browser Resource Timing API, presence of HTTPS, a mobile viewport tag, a click-to-call link, a WhatsApp link, an enquiry form, booking language, a Google Map embed, JSON-LD schema markup, the number of distinct treatment pages linked from the homepage, and homepage word count. Everything is objectively verifiable from the public page source.' },
  { q: 'Why not use Google PageSpeed scores?', a: 'Lighthouse scores vary between runs and depend on test conditions, which makes them poor for comparing sites fairly. Transferred bytes and request counts are connection-independent and reproducible, so we used those instead.' },
  { q: 'Is 13 clinics enough to draw conclusions?', a: 'It is enough to identify a pattern, not enough to publish a precise national figure. Treat these as directional findings from a first sample. We have been explicit about the sample size everywhere rather than rounding it up into a headline.' },
  { q: 'Which clinics were included?', a: 'Independent, clinic-owned websites surfaced through ordinary Google searches for dental clinics in Patna, Indore, Bhopal, Nagpur, Coimbatore and Jaipur. We deliberately excluded large corporate chains, whose websites are built to a different standard and are not representative of independent practices.' },
];
