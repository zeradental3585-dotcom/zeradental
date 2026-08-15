export const SEO_PAGE = {
  slug: 'dental-seo-services-india',
  h1: 'Dental SEO services for Indian clinics',
  metaTitle: 'Dental SEO Services India — Rank Your Clinic From ₹8,999/mo',
  metaDesc:
    'SEO built only for dental clinics in India. Map Pack rankings, treatment-keyword content, review systems and honest monthly reporting. Retainers from ₹8,999/month, month to month, no lock-in.',
} as const;

export type SeoPlan = {
  slug: string;
  name: string;
  price: string;
  best: string;
  popular?: boolean;
  includes: string[];
};

export const SEO_PLANS: SeoPlan[] = [
  {
    slug: 'foundation',
    name: 'Foundation',
    price: '₹8,999',
    best: 'Single-location clinics in tier-2 cities where competition is thin',
    includes: [
      'Google Business Profile managed weekly — posts, photos, Q&A, review replies',
      'Citation building and NAP cleanup across 20+ Indian directories',
      '1 new treatment or patient-education page each month',
      'Review generation system installed and monitored',
      'Technical fixes as Search Console surfaces them',
      'Monthly report on WhatsApp in plain English — rankings, impressions, enquiries',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth',
    price: '₹16,999',
    popular: true,
    best: 'Clinics in competitive metros, or anyone serious about one high-value treatment',
    includes: [
      'Everything in Foundation, plus:',
      '3 new pages a month — treatment pages, area pages or guides',
      'Area-level landing pages for the localities you actually serve',
      'Competitor tracking — we watch the three clinics beating you and tell you what changed',
      'Schema and FAQ markup so Google AI Overviews can quote you',
      'Conversion tracking: which page produced which enquiry',
      'Fortnightly check-in call if you want one',
    ],
  },
  {
    slug: 'multi-location',
    name: 'Multi-location',
    price: '₹29,999',
    best: 'Practices with two or more branches, or specialists competing city-wide',
    includes: [
      'Everything in Growth, plus:',
      'A managed Google Business Profile per branch',
      'Location pages with genuinely distinct content per branch',
      '6 new pages a month across the site',
      'Digital PR — earning links from Indian health and local publications',
      'Quarterly strategy review with a written 90-day plan',
    ],
  },
];

export const SEO_FAQS = [
  { q: 'How much does dental SEO cost in India?', a: 'Agencies in India typically charge between ₹8,000 and ₹50,000 a month for dental SEO, with most independent clinics landing in the ₹10,000–₹20,000 range. Our retainers start at ₹8,999 a month for a single-location clinic and go to ₹29,999 for multi-location practices. Everything is month to month — there is no lock-in and no setup fee.' },
  { q: 'How long before dental SEO produces patients?', a: 'Google Business Profile work often shows up first, within two to four weeks, because profile signals update quickly. Organic rankings for treatment keywords typically build over three to six months — faster in cities like Patna, Indore and Coimbatore where competition is thin, slower in Delhi, Mumbai and Bangalore. Anyone promising page-one rankings in 30 days is describing ads, not SEO.' },
  { q: 'Do I need a new website first?', a: 'Often not. If your existing site loads reasonably and has a sensible structure, we can add treatment pages and run SEO on top of it. We will tell you honestly after the free audit — we would rather do ₹9,000 of the right work than sell you a ₹30,000 rebuild you did not need.' },
  { q: 'What makes you different from other dental SEO agencies?', a: 'We publish our own measurement data. We audited 21 Indian dental clinic websites and released the full dataset, including the finding that 52% had no WhatsApp link. Most agencies assert that your site is broken; we can show you the benchmark and where you sit against it.' },
  { q: 'Can I cancel?', a: 'Any month, with no notice period and no penalty. If SEO is not producing results we would rather you stop paying than resent us. Everything we build — pages, profile, citations — stays yours.' },
  { q: 'Do you guarantee first-page rankings?', a: 'No, and treat anyone who does with suspicion. Google neither sells nor guarantees positions. What we commit to is that every controllable signal gets handled properly and that you see honest monthly reporting, including the months where numbers go sideways.' },
];

export const SEO_SECTIONS = [
  {
    h: 'Dental SEO is not general SEO',
    p: [
      'Most SEO agencies in India will happily take a dental client and run the same playbook they run for a real-estate developer or a coaching institute. It does not work, because dentistry has a search pattern almost nothing else shares.',
      'Nobody searches "dental clinic". They search "root canal cost", "braces near me", "dental implant price in Indore", "kids dentist Sunday open". These are treatment-level, cost-obsessed, urgency-driven queries, and they are overwhelmingly local. A single services page cannot answer them, and a generic content calendar will never produce them.',
      'The second difference is that the Google Maps three-pack decides more of your phone calls than your website does. In most Indian cities, a clinic that ranks first organically but sits outside the Map Pack gets fewer calls than the clinic ranked third on Maps. Any dental SEO worth paying for is Map Pack work first, website second.',
    ],
  },
  {
    h: 'What we actually do each month',
    p: [
      '**Google Business Profile, weekly.** Categories reviewed, services listed with descriptions, geo-tagged photos added, posts published, questions seeded and answered, and every review replied to within 48 hours. Google measurably favours profiles that show activity, and almost no Indian clinic maintains one properly.',
      '**Treatment pages, monthly.** One page per treatment you want to grow, each with an honest cost range, what the appointment involves, recovery expectations and the questions patients actually ask. This is the single structural change that decides whether you can rank for anything beyond your clinic name.',
      '**Citations and NAP consistency.** Your name, address and phone number made identical across Justdial, Practo, Sulekha, IndiaMART, Bing Places, Apple Maps and the rest. Tedious, unglamorous, and reliably effective.',
      '**Reviews, systematically.** A QR card at reception and a post-appointment WhatsApp template — not a reminder to your staff, an actual system. Clinics that install this typically add 20 to 40 reviews in the first month.',
      '**Reporting you can read.** One WhatsApp message a month: what moved, what did not, what we are doing next. No 40-page PDF designed to look like value.',
    ],
  },
  {
    h: 'Which cities are worth investing in first',
    p: [
      'Competition varies enormously across India, and the honest advice differs by city.',
      'In **Patna, Indore, Bhopal, Nagpur, Coimbatore and Lucknow**, online competition is genuinely thin. Most clinics rely on Justdial and have never claimed their Google profile. A clinic doing the basics properly can enter the Map Pack within one to three months. If you are in one of these cities, this is the cheapest customer acquisition available to you and it will not stay this cheap.',
      'In **Delhi, Mumbai, Bangalore, Hyderabad and Gurgaon**, expect four to eight months of consistent work. You are competing against clinics that have accumulated reviews and content for years. It is still worth doing — but anyone quoting you a 90-day timeline in Bangalore is guessing.',
    ],
  },
  {
    h: 'We publish our own data',
    p: [
      'Most agencies tell you your website is broken. We measured it.',
      'We audited independent dental clinic websites across six Indian cities, recording page weight, request counts, treatment-page depth, booking paths and WhatsApp availability — then published the full dataset, method and limitations.',
      'The headline: **52% had no WhatsApp link on the homepage**, 38% had no map embed and 38% had no enquiry form at all. Meanwhile 100% had HTTPS and a mobile viewport tag. The technical basics are solved; the commercial ones are not. That finding shaped how we sell, and it contradicted what we ourselves had assumed.',
    ],
  },
];
