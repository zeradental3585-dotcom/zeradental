export const STUDY = {
  n: 21,
  cities: 7,
  attempted: 26,
  date: '15 August 2026',
  slug: 'indian-dental-website-study',
  title: 'We audited 21 Indian dental clinic websites. The results surprised us.',
  metaTitle: 'Indian Dental Clinic Website Study 2026 — Real Data on 21 Clinics',
  metaDesc:
    'Original research: we measured page weight, WhatsApp availability, treatment-page depth and booking paths across 21 independent dental clinic websites in 7 Indian cities. 52% had no WhatsApp link.',
} as const;

export type Metric = { label: string; pct: number; note: string; good: boolean };

export const METRICS: Metric[] = [
  { label: 'HTTPS / SSL', pct: 100, good: true, note: 'Universal. This is no longer a differentiator.' },
  { label: 'Mobile viewport tag', pct: 100, good: true, note: 'Every site is at least attempting to be mobile-friendly.' },
  { label: 'Click-to-call number', pct: 90, good: true, note: 'Nearly universal — Indian clinics understand the phone.' },
  { label: 'Schema markup', pct: 76, good: true, note: 'Mostly automatic, added by WordPress SEO plugins.' },
  { label: 'Booking language on page', pct: 67, good: false, note: '"Book appointment" wording present — not always a working system.' },
  { label: 'Google Map embed', pct: 67, good: false, note: 'A third make you hunt for the location.' },
  { label: 'Any enquiry form', pct: 67, good: false, note: 'A form is not a booking system, but it is a capture path.' },
  { label: 'WhatsApp link', pct: 48, good: false, note: 'The single biggest gap. In India. Where WhatsApp is the default.' },
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
  { site: 'rootsdentalcarelko.in', city: 'Lucknow', kb: 311, req: 23, tp: 0, words: 331, wa: false },
  { site: 'cosmodontdentalclinics.com', city: 'Lucknow', kb: 1707, req: 116, tp: 6, words: 1629, wa: true },
  { site: 'manomaydentalcare.in', city: 'Lucknow', kb: 1645, req: 243, tp: 4, words: 1271, wa: false },
  { site: 'realtooth.in', city: 'Lucknow', kb: 2639, req: 86, tp: 10, words: 342, wa: true },
  { site: 'infinitydental.in', city: 'Lucknow', kb: 708, req: 77, tp: 15, words: 566, wa: true },
  { site: 'prasaddentalclinic.com', city: 'Bhopal', kb: 644, req: 45, tp: 0, words: 2047, wa: false },
  { site: 'dentalprecisionbhopal.com', city: 'Bhopal', kb: 5112, req: 79, tp: 10, words: 992, wa: false },
  { site: 'smmsdc.com', city: 'Bhopal', kb: 1144, req: 81, tp: 0, words: 610, wa: true },
];

export const FAQS = [
  { q: 'How many dental websites did you test?', a: 'We attempted 26 independent clinic websites across seven Indian cities and got clean measurements from 21. Five rendered their content via JavaScript after our measurement point, so we excluded them rather than report misleading zeroes. This is round two — round one covered 13 clinics and we are continuing toward 100.' },
  { q: 'What exactly did you measure?', a: 'For each homepage: total transferred bytes and request count from the browser Resource Timing API, presence of HTTPS, a mobile viewport tag, a click-to-call link, a WhatsApp link, an enquiry form, booking language, a Google Map embed, JSON-LD schema markup, the number of distinct treatment pages linked from the homepage, and homepage word count. Everything is objectively verifiable from the public page source.' },
  { q: 'Why not use Google PageSpeed scores?', a: 'Lighthouse scores vary between runs and depend on test conditions, which makes them poor for comparing sites fairly. Transferred bytes and request counts are connection-independent and reproducible, so we used those instead.' },
  { q: 'Is 21 clinics enough to draw conclusions?', a: 'It is enough to identify a clear pattern, not enough to publish a precise national figure. The headline finding barely moved when we went from 13 clinics to 21 — 52% became 52% — which suggests it is stable. Treat these as directional findings from a growing sample.' },
  { q: 'Which clinics were included?', a: 'Independent, clinic-owned websites surfaced through ordinary Google searches for dental clinics in Patna, Indore, Bhopal, Nagpur, Coimbatore, Jaipur and Lucknow. We deliberately excluded large corporate chains, whose websites are built to a different standard and are not representative of independent practices.' },
];
