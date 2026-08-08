export type Service = {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  price: string;
  bullets: string[];
  body: { h: string; p: string[] }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: 'dental-website-design',
    title: 'Dental Website Design',
    h1: 'Dental website design built for Indian clinics',
    metaTitle: 'Dental Website Design India — Custom Clinic Websites From ₹14,999',
    metaDesc: 'Custom dental website design for Indian clinics. Mobile-first, sub-2-second load, WhatsApp booking, treatment pages and SEO built in. Live in 7 days from ₹14,999.',
    intro:
      'Not a template with your logo dropped on top. Every Zera Dental site is designed around the specific way patients in your city search, compare and book — then hand-coded so it loads before they lose patience.',
    price: 'From ₹14,999 one-time',
    bullets: [
      'Custom design — no recycled themes, no page builders',
      'Sub-2-second load on a 4G phone connection',
      'Treatment-level pages that each target a real keyword',
      'WhatsApp booking and click-to-call on every screen',
      'Written copy included — you approve, you do not write',
      'Domain and first-year hosting bundled in',
    ],
    body: [
      {
        h: 'Why most dental websites in India fail',
        p: [
          'Walk through the first page of Google results for "dental clinic" in almost any Indian city and you will find the same three problems repeating. The sites take five or six seconds to load on mobile. They have a single "Services" page listing fourteen treatments in a bullet list. And there is no way to contact the clinic except a phone number that goes unanswered after 7pm.',
          'Each of those is a conversion leak, and together they explain why a clinic can have a website for three years and never trace a single patient to it. A website is not a brochure you tick off a list. It is the thing standing between a patient searching at 9:40pm and a booked chair tomorrow morning.',
          'We design against those three failures specifically. Speed is engineered, not hoped for. Every treatment you want more of gets its own page with its own cost section and FAQ. And every page has a WhatsApp button that opens a chat with a message already written, because that removes the last bit of friction between interest and enquiry.',
        ],
      },
      {
        h: 'What the design process actually looks like',
        p: [
          'We start with your Google Business Profile and your three closest competitors, not with colours. That tells us which treatments are being searched in your area, which of your competitors are weak, and where the gap is. The sitemap comes out of that research.',
          'Then you get a live preview link — not a static image — so you can open it on your own phone, tap through it, and tell us what feels wrong. Design revisions are unlimited until you approve. We would rather spend an extra week getting it right than hand over something you are quietly unhappy with.',
          'Content is our job, not yours. We write every page in plain English (and Hindi or your regional language if you want it), you read it, you mark what to change. Most clinic owners spend under two hours total on the entire project.',
        ],
      },
      {
        h: 'Built to be fast, and to stay fast',
        p: [
          'Sites are built on Next.js and deployed on a global edge network, which means pages are served as pre-built HTML from a location close to your patient rather than assembled on a slow shared server in another country. In practice that is the difference between a 5.8-second load and a 1.3-second one.',
          'That matters for two reasons. Google uses mobile page experience as a ranking signal, so a slow site is quietly penalised. And every additional second of load time costs roughly 7% of conversions — which on a clinic doing thirty enquiries a month is two lost patients every single month, forever.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I see the design before I pay in full?', a: 'Yes. You pay 50% to start, we design and send you a live preview link you can open on your phone, and the remaining 50% is only due when you approve and we hand over the finished site. If you dislike the initial direction before development begins, we refund the advance in full.' },
      { q: 'Do I have to write the content?', a: 'No. Copywriting for every page is included in all packages. We interview you for about 30 minutes on WhatsApp or a call, then write it. You review and mark changes.' },
      { q: 'Will it work on all phones?', a: 'Yes. Every site is built mobile-first and tested across Android and iOS at multiple screen sizes, because more than 80% of dental searches in India happen on a phone.' },
      { q: 'Can I update the site myself later?', a: 'On the Growth and Authority packages you get a simple content editor for publishing blog posts and updating text and photos, with no coding. On Starter, edits are free for 30 days and then covered by Zera Care, or quoted individually.' },
    ],
  },
  {
    slug: 'local-seo-for-dentists',
    title: 'Local SEO for Dentists',
    h1: 'Local SEO that puts your clinic in the Google Map Pack',
    metaTitle: 'Local SEO for Dentists in India — Rank in the Google Map Pack',
    metaDesc: 'Local SEO built specifically for Indian dental clinics: Map Pack optimisation, citations, NAP consistency, treatment keyword targeting and review systems. Included from ₹29,999.',
    intro:
      'Three slots. That is what the Google Maps pack gives your entire locality. Local SEO is the discipline of taking one of them and keeping it.',
    price: 'Included from ₹29,999 · retainer from ₹8,999/mo',
    bullets: [
      'Google Business Profile optimisation and category strategy',
      '20+ Indian directory citations with consistent NAP data',
      'Location and treatment keyword mapping for your city',
      'Review generation system: QR card + automated WhatsApp ask',
      'Local schema markup so Google understands your service area',
      'Monthly rank tracking reported in plain English',
    ],
    body: [
      {
        h: 'Why the Map Pack decides your enquiry volume',
        p: [
          'When somebody searches "dentist near me" on a phone in India, the first thing that fills the screen is not a website. It is three Google Maps listings with star ratings, distance and a call button. A large majority of taps happen inside that block, before the searcher ever scrolls to organic results.',
          'This means your clinic can have a beautiful website and still get almost no traffic, simply because your Business Profile is incomplete, your categories are wrong, or you have eleven reviews to a competitor\'s ninety.',
          'Local SEO is the work of fixing exactly those signals: proximity we cannot change, but relevance and prominence we can engineer deliberately.',
        ],
      },
      {
        h: 'What we actually do, step by step',
        p: [
          'First, the profile itself. Correct primary category (usually "Dentist" or "Dental clinic", occasionally a specialist category that dramatically reduces competition), complete service list with prices where sensible, real geo-tagged photos, accurate hours including holidays, a booking link, and a description written with your city and treatments in it.',
          'Second, consistency. Your clinic name, address and phone number must match character-for-character across Google, Justdial, Practo, Sulekha, IndiaMART, Bing Places, Apple Maps and every other place you appear. Mismatches are one of the most common and most invisible reasons clinics fail to rank.',
          'Third, reviews. We install a system rather than nagging you to ask: a QR card at the reception desk that opens your review form in one tap, plus a WhatsApp message template that goes out after each appointment. Clinics that adopt this typically add 20 to 40 reviews in the first month.',
          'Fourth, content that proves service-area relevance — area pages, treatment pages and FAQ content that mention your locality naturally rather than being stuffed with keywords.',
        ],
      },
      {
        h: 'How long it takes, honestly',
        p: [
          'In a low-competition city — Patna, Indore, Bhopal, Nagpur, Kolkata, Coimbatore — clinics we work with commonly enter the Map Pack for their main treatment within one to three months.',
          'In Delhi, Mumbai, Bangalore or Gurgaon, expect four to eight months of consistent work, because you are competing against clinics that have been collecting reviews for years.',
          'Anyone who promises you a number-one position in thirty days is either misunderstanding how Google works or hoping you do not.',
        ],
      },
    ],
    faqs: [
      { q: 'Can you guarantee first-page rankings?', a: 'No, and you should be suspicious of anyone who does. Google does not sell or guarantee positions. What we guarantee is that every controllable signal — profile completeness, citation consistency, page speed, schema, treatment content and review velocity — is handled properly. In low-competition Indian cities that is usually enough to reach the Map Pack within a quarter.' },
      { q: 'Do I need the monthly retainer?', a: 'Not necessarily. The Growth and Authority packages include the full local SEO foundation as a one-time build. The retainer is for clinics in competitive cities who need ongoing content and review work to hold position against active competitors.' },
      { q: 'What if I have multiple clinic locations?', a: 'Each location needs its own Google Business Profile and its own page on your website with unique content — duplicating the same text across locations actively hurts you. That is included in the Authority Clinic package.' },
      { q: 'Will you write fake reviews?', a: 'Never. It violates Google policy, it is detectable, and profiles get suspended for it. We build systems that make it easy for real, happy patients to leave real reviews, which is both safer and more durable.' },
    ],
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile Setup',
    h1: 'Google Business Profile setup and optimisation for dental clinics',
    metaTitle: 'Google Business Profile for Dentists India — Setup & Optimisation',
    metaDesc: 'Claim, verify and optimise your dental clinic Google Business Profile. Categories, photos, services, hours, posts and review strategy. Included free with every Zera Dental website.',
    intro:
      'Your Business Profile drives more clinic phone calls than your website does. It is also the single cheapest thing to fix — and the one most Indian clinics have never properly claimed.',
    price: 'Included free with every website package',
    bullets: [
      'Claim and verify your listing (or recover a hijacked one)',
      'Primary and secondary category strategy',
      'Complete service list with treatment descriptions',
      'Geo-tagged clinic, team and equipment photos',
      'Hours, holiday hours, booking link and WhatsApp link',
      'Weekly post cadence and review reply templates',
    ],
    body: [
      {
        h: 'The listing you never claimed is already ranking against you',
        p: [
          'Google auto-generates listings for businesses it detects, which means your clinic almost certainly already has a profile whether you created one or not. Unclaimed profiles can be edited by members of the public — including competitors — and they carry none of the signals that make Google rank you.',
          'Claiming and completing that profile is frequently the single highest-return hour of work available to an Indian dental clinic. We have seen clinics go from invisible to appearing in the Map Pack purely from a profile clean-up, before a single line of website code changed.',
        ],
      },
      {
        h: 'Getting the categories right matters more than people think',
        p: [
          'Your primary category is the strongest relevance signal Google has. "Dentist" is the obvious choice, but in a saturated area a more precise primary category — "Dental implants periodontist", "Orthodontist", "Paediatric dentist", "Cosmetic dentist" — can move you from competing with sixty clinics to competing with six.',
          'Secondary categories then cover the rest of your treatments without diluting the primary signal. Getting this combination right is genuinely strategic work, and it is free to change.',
        ],
      },
      {
        h: 'Photos, posts and the activity signal',
        p: [
          'Google measurably favours profiles that show ongoing activity. That means fresh photos, weekly posts, answered questions and replied-to reviews.',
          'We set up a simple rhythm you can maintain in ten minutes a week — or we run it for you under Zera Care. Photos should be real: your actual reception, your actual chairs, your actual team. Stock images of a smiling American model in a dental chair are recognised instantly by Indian patients and read as a warning sign.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does verification take in India?', a: 'Postcard verification typically takes 5 to 14 days. Video verification, which Google now uses for many healthcare categories, can be completed in 48 to 72 hours. We walk you through whichever method Google assigns you.' },
      { q: 'Someone else claimed my clinic listing. Can that be fixed?', a: 'Yes. Google has a formal ownership-request and reclaim process. It takes longer than a fresh claim, usually two to four weeks, and we handle the paperwork and follow-ups for you.' },
      { q: 'Do I need a physical address?', a: 'For a dental clinic, yes — Google requires a real, staffed location for healthcare service categories. Home-based or virtual addresses are not eligible and attempting to use one risks suspension.' },
      { q: 'How many photos should I upload?', a: 'Start with at least 20: exterior with signage, reception, each operatory, sterilisation area, team portraits, and a few treatment-in-progress shots with patient consent. Then add two or three a month to keep the activity signal alive.' },
    ],
  },
  {
    slug: 'appointment-booking',
    title: 'Online Appointment Booking',
    h1: 'Online appointment booking that fills your chairs overnight',
    metaTitle: 'Online Appointment Booking for Dental Clinics India | Zera Dental',
    metaDesc: 'Add real online booking to your dental clinic website — calendar slots, WhatsApp confirmations, automated reminders and no-show reduction. Available from ₹49,999 or as an add-on.',
    intro:
      'A large share of dental enquiries happen after 8pm, when your clinic phone rings into an empty room. Booking is the difference between capturing that patient and donating them to a competitor.',
    price: 'Included in Authority ₹49,999 · WhatsApp booking in all packages',
    bullets: [
      'Real calendar slots synced to your clinic schedule',
      'Instant WhatsApp and SMS confirmation to the patient',
      'Automated reminders 24 hours and 2 hours before',
      'New-patient forms collected before they arrive',
      'Reschedule and cancel links to cut no-shows',
      'Optional consultation-fee collection online',
    ],
    body: [
      {
        h: 'The after-hours problem nobody measures',
        p: [
          'Search behaviour for healthcare peaks in the evening, because that is when people are at home, in pain, and finally have a moment to deal with it. Your clinic is closed. Your receptionist has gone home.',
          'If the only path forward on your website is a phone number, that patient has two choices: remember to call tomorrow during work hours, or tap back and try the next clinic that lets them act right now. Most take the second option, and you never learn it happened.',
        ],
      },
      {
        h: 'WhatsApp first, calendar second',
        p: [
          'In India, WhatsApp beats every other booking channel for one simple reason: there is nothing to learn. Every package we build puts a WhatsApp button on every page with a pre-written message, so a patient goes from reading about root canals to messaging your clinic in one tap.',
          'A full calendar booking system sits on top of that for clinics with enough volume to justify it. The patient picks a real slot, gets an instant confirmation, and your front desk sees it appear without answering a call.',
        ],
      },
      {
        h: 'Reminders are the highest-ROI feature in dentistry',
        p: [
          'No-shows are a quiet, continuous loss for Indian clinics — an empty chair costs the same as a booked one in rent, salary and electricity.',
          'Automated WhatsApp reminders at 24 hours and 2 hours before an appointment, with a one-tap reschedule link, reliably reduce no-shows. Patients who can easily move an appointment do so instead of silently vanishing, which lets you refill the slot.',
        ],
      },
    ],
    faqs: [
      { q: 'Does the booking system integrate with my clinic management software?', a: 'It depends on the software. Systems with an open API or calendar sync can usually be connected. For everything else we use a standalone calendar that your front desk manages, which works fine for most single and two-chair clinics.' },
      { q: 'Can I collect a consultation fee at booking?', a: 'Yes, on the Authority package. Online payment via UPI, cards and netbanking through a standard Indian gateway. Collecting even a small fee sharply reduces no-shows.' },
      { q: 'What if I do not want patients booking slots directly?', a: 'Many clinics prefer to control the schedule. In that case we use enquiry-based booking: the patient submits a preferred time, you confirm on WhatsApp. You keep control and still capture the after-hours patient.' },
      { q: 'Are there ongoing costs for WhatsApp messages?', a: 'Manual WhatsApp replies are free. Fully automated WhatsApp Business API messaging has per-message costs set by Meta, typically a few paise per message. We will lay out the numbers before you commit to anything.' },
    ],
  },
  {
    slug: 'website-redesign',
    title: 'Clinic Website Redesign',
    h1: 'Dental clinic website redesign, without losing your rankings',
    metaTitle: 'Dental Website Redesign India — Rebuild Without Losing Rankings',
    metaDesc: 'Redesign your existing dental clinic website with full SEO migration: redirects, speed rebuild, treatment pages and Google Business Profile clean-up. From ₹14,999.',
    intro:
      'Redesigns go wrong in one specific way: the site looks better and the traffic collapses. That happens when nobody plans the migration. We plan the migration first and design second.',
    price: 'From ₹14,999 · free audit before you commit',
    bullets: [
      'Full crawl and inventory of your existing pages',
      '301 redirect map so no ranking equity is lost',
      'Speed rebuild targeting 90+ mobile PageSpeed',
      'Content expanded into treatment-level pages',
      'Search Console migration and re-indexing',
      'Before-and-after performance report',
    ],
    body: [
      {
        h: 'First we tell you whether you actually need a redesign',
        p: [
          'Sometimes you do not. If your existing site has decent content and structure but loads slowly and lacks treatment pages, a targeted fix costs a fraction of a rebuild and delivers most of the gain.',
          'The free audit tells you which situation you are in. We would rather do ₹8,000 of the right work than ₹30,000 of unnecessary work and lose the referral you would have sent us.',
        ],
      },
      {
        h: 'The migration is the part that matters',
        p: [
          'Every URL on your current site that has any ranking or backlink value gets mapped to its new equivalent with a permanent 301 redirect. Pages that are being merged get pointed at the merged destination, not the homepage — a lazy blanket redirect to the homepage is the single most common way clinics lose rankings during a redesign.',
          'We snapshot your current Search Console data before launch so we have a baseline, submit the new sitemap on launch day, and monitor indexing for the following four weeks. If any page drops, we can see it immediately and fix it.',
        ],
      },
      {
        h: 'What usually changes for the better',
        p: [
          'Load time is the most dramatic shift — typical WordPress clinic sites in India load in five to eight seconds on mobile, and the rebuilt version lands between one and two.',
          'Structure is the second. Most existing clinic sites have three or four pages. The rebuild expands that into a page per treatment, doctor profiles, area pages and an FAQ section, which multiplies the number of searches you can plausibly rank for.',
          'And finally, conversion: WhatsApp buttons, click-to-call, visible pricing guidance and a booking path, none of which most existing clinic sites have.',
        ],
      },
    ],
    faqs: [
      { q: 'Will I lose my Google rankings during the redesign?', a: 'Not if the migration is done properly. With a complete 301 redirect map and a preserved URL structure where possible, rankings typically hold and then improve as speed and content improve. Expect a small fluctuation in the first two weeks while Google recrawls — that is normal and recovers.' },
      { q: 'Can you keep my existing domain and email?', a: 'Yes. Your domain stays exactly as it is, and business email is untouched by a website rebuild. We only change where the website itself is served from.' },
      { q: 'My site is on WordPress. Do I have to move off it?', a: 'We rebuild on Next.js because it is dramatically faster and more secure than a plugin-heavy WordPress install. You keep a simple content editor for publishing, so day-to-day use feels similar without the maintenance burden or security risk.' },
      { q: 'How long does a redesign take?', a: 'Usually the same as a new build — 7 to 21 days depending on package — plus a few days upfront for the crawl and redirect planning.' },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
