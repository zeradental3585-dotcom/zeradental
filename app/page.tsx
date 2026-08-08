import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/cities';
import { PLANS } from '@/lib/pricing';
import { WA, SITE } from '@/lib/site';
import { CTABand, FAQ, Process, Stat, Testimonials, CheckList } from '@/components/Sections';
import { Arrow, WhatsAppIcon, Check, Star } from '@/components/Icons';
import { JsonLd, faqSchema, serviceSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Dental Website Design India — Clinic Websites From ₹14,999 | Zera Dental',
  description:
    'Zera Dental builds fast, SEO-first websites for dental clinics across India. Live in 7 days, WhatsApp booking built in, Google Business Profile setup included. Packages from ₹14,999. Free clinic website audit.',
  alternates: { canonical: '/' },
};

const FAQS = [
  { q: 'How much does a dental website cost in India?', a: 'A professional dental clinic website in India typically costs between ₹15,000 and ₹1,50,000 depending on page count, booking features and SEO depth. Zera Dental packages start at ₹14,999 for a 5-page Starter Clinic site, ₹29,999 for a 12-page Growth Practice site with local SEO, and ₹49,999 for a multi-location Authority Clinic build with online booking. Domain and first-year hosting are included in every package.' },
  { q: 'How long does it take to build my clinic website?', a: 'Starter Clinic sites go live in 7 days, Growth Practice in about 12 days, and Authority Clinic in around 21 days, counted from the day you send us your content and photos. Rush delivery in 72 hours is available as an add-on for ₹6,999.' },
  { q: 'Will my website actually rank on Google?', a: 'Ranking depends on your city, your competition and how consistently you collect reviews — no honest agency can promise a number-one position. What we can promise is that every technical and on-page factor Google measures will be handled: page speed, mobile usability, schema markup, treatment-level pages, internal linking, Business Profile consistency and a review system. In lower-competition cities like Patna, Indore, Bhopal, Nagpur and Kolkata, clinics we build for typically enter the Map Pack within one to three months.' },
  { q: 'Do I need to provide content and photos?', a: 'No. We write all page copy for you as part of every package — you only need to approve it. Photos of your actual clinic and team help a lot, and we will give you a simple shot list you can follow on a phone. If you have nothing yet, we launch with clean illustration-led design and swap photos in later at no cost.' },
  { q: 'What happens after the website goes live?', a: 'Every package includes free edits after launch — 30 days on Starter, 90 days on Growth, 6 months on Authority. After that, Zera Care at ₹1,999 per month covers hosting, domain renewal, unlimited small edits, security updates, a monthly SEO article, a Google Business Profile post and a monthly performance report on WhatsApp. It is optional and you can cancel anytime.' },
  { q: 'Do you work with clinics outside major cities?', a: 'Yes, and honestly tier-2 and tier-3 cities are where the biggest wins are. Competition online is far lower in cities like Patna, Bhopal, Indore, Nagpur, Coimbatore and Lucknow, so a well-built site can outrank the entire local market in a single quarter. We work entirely over WhatsApp and video call, so location is never a limitation.' },
  { q: 'Who owns the website and the domain?', a: 'You do, completely. The domain is registered in your name, and you receive full admin access to the site and every account we create for you — Google Business Profile, Search Console and Analytics included. There is no lock-in, and you can move the site elsewhere at any time.' },
  { q: 'Is there a monthly fee I am locked into?', a: 'No. The build fee is one time. Zera Care is optional and month to month with no contract. Most clinics take it because it bundles hosting, edits and content, but the site keeps working perfectly if you do not.' },
];

export default function Home() {
  return (
    <>
      <JsonLd data={[
        faqSchema(FAQS),
        serviceSchema('Dental Website Design in India', SITE.description, '/', 14999),
      ]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mint-50/70 via-white to-white" />
        <div className="grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="wrap relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr,.95fr] lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mint-200 bg-white/80 px-3.5 py-1.5 text-[12.5px] font-semibold text-mint-700 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-500" />
              </span>
              Now building for clinics in 20+ Indian cities
            </div>

            <h1 className="h1 mt-5">
              Your next patient is on Google right now.
              <span className="block text-mint-600">Make sure they find you.</span>
            </h1>

            <p className="lede mt-6 max-w-xl">
              Zera Dental builds fast, search-optimised websites for dental clinics across India — the kind that turn
              &ldquo;dentist near me&rdquo; searches into WhatsApp bookings. Live in 7 days. From <strong className="font-semibold text-ink">₹14,999</strong>, one time.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-website-audit" className="btn-primary">
                Get my free clinic audit <Arrow className="h-4 w-4" />
              </Link>
              <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Talk on WhatsApp
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-500">
              {['No advance for the audit', 'Domain + hosting included', 'You own everything'].map((x) => (
                <span key={x} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-mint-500" /> {x}
                </span>
              ))}
            </div>
          </div>

          {/* Phone mock */}
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="absolute -inset-6 rounded-[3rem] bg-mint-200/30 blur-2xl" />
            <div className="relative rounded-[2.2rem] border border-ink/10 bg-white p-3 shadow-lift">
              <div className="overflow-hidden rounded-[1.6rem] bg-sand-50">
                <div className="flex items-center gap-1.5 border-b border-ink/[.07] bg-white px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-mint-400" />
                  <span className="ml-2 flex-1 truncate rounded-md bg-sand-100 px-2 py-1 text-[10px] text-ink-300">
                    google.com/search?q=dentist+near+me
                  </span>
                </div>
                <div className="space-y-2.5 p-4">
                  <div className="rounded-xl border-2 border-mint-400 bg-white p-3.5 shadow-soft">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[13px] font-bold text-ink">Your Clinic Name</div>
                        <div className="mt-1 flex items-center gap-1">
                          <span className="flex gap-0.5 text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-2.5 w-2.5" />)}
                          </span>
                          <span className="text-[10.5px] text-ink-300">4.9 · 148 reviews</span>
                        </div>
                        <div className="mt-1 text-[10.5px] text-ink-300">Dental clinic · Open until 8 pm</div>
                      </div>
                      <span className="rounded-full bg-mint-100 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-mint-700">#1</span>
                    </div>
                    <div className="mt-2.5 flex gap-1.5">
                      <span className="flex-1 rounded-md bg-mint-500 py-1.5 text-center text-[10px] font-semibold text-white">Book now</span>
                      <span className="flex-1 rounded-md border border-ink/12 py-1.5 text-center text-[10px] font-semibold text-ink-500">Directions</span>
                    </div>
                  </div>
                  {[
                    { n: 'Competitor Dental Care', r: '3.8 · 21 reviews' },
                    { n: 'City Dental Point', r: '4.1 · 12 reviews' },
                  ].map((c) => (
                    <div key={c.n} className="rounded-xl border border-ink/[.07] bg-white/70 p-3 opacity-60">
                      <div className="text-[12px] font-semibold text-ink-500">{c.n}</div>
                      <div className="mt-0.5 text-[10px] text-ink-300">{c.r}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-ink/[.08] bg-white px-3.5 py-2.5 shadow-lift">
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              <div>
                <div className="text-[11px] font-bold leading-tight text-ink">New booking</div>
                <div className="text-[10px] leading-tight text-ink-300">via WhatsApp · just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-ink/[.07] bg-sand-50 py-10">
        <div className="wrap grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat value="71%" label="of patients research a dentist online before booking" />
          <Stat value="80%+" label="of dental searches in India happen on a mobile phone" />
          <Stat value="3" label="Map Pack slots your city has. That is the whole game." />
          <Stat value="7 days" label="from kickoff to a live, indexed clinic website" />
        </div>
      </section>

      {/* PROBLEM */}
      <section className="wrap my-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">The real problem</span>
            <h2 className="h2 mt-2">You are not competing on clinical skill. You are competing on findability.</h2>
            <p className="lede mt-5">
              The dentist ranking above you in your area is not necessarily better than you. They just have a faster
              website, a complete Google profile and more reviews. That is a solvable engineering problem — and it is
              the one we solve.
            </p>
            <div className="mt-7">
              <CheckList items={[
                'A patient searches "dentist near me" at 9:40pm and picks from the three clinics Google shows on Maps.',
                'They tap the top result, land on the site, and decide in about eight seconds whether you look trustworthy.',
                'If your page loads slowly, looks dated, or has no way to book without calling, they hit back and choose the next clinic.',
                'That entire sequence happens dozens of times a week in your locality, and you never see any of it.',
              ]} />
            </div>
          </div>

          <div className="grid gap-4 self-start sm:grid-cols-2">
            {[
              { t: 'No website', d: 'You are invisible for every "near me" search. Justdial and a Facebook page do not rank.', bad: true },
              { t: 'Slow, old website', d: 'Loads in 6 seconds. Google demotes it, patients abandon it. Worse than nothing.', bad: true },
              { t: 'One "Services" page', d: 'Cannot rank for implants, braces, RCT or whitening. One page, one keyword, at best.', bad: true },
              { t: 'Phone number only', d: 'Every after-hours enquiry — and most of them are after hours — disappears.', bad: true },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-red-100 bg-red-50/50 p-5">
                <div className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">✕</span>
                  <h3 className="text-[15px] font-bold text-ink">{c.t}</h3>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">What you get</span>
          <h2 className="h2 mt-2">A website engineered to book appointments, not to win design awards</h2>
          <p className="lede mt-4">
            Every element below exists because it moves one of two numbers: how many patients find you, and how many of
            them contact you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '⚡', t: 'Sub-2-second load on 4G', d: 'Hand-coded on Next.js, not a bloated page builder. We target 90+ on Google PageSpeed for mobile, which is where your patients actually are.' },
            { icon: '📍', t: 'Google Maps 3-Pack setup', d: 'Business Profile claimed, categorised, geo-tagged photos, service list, opening hours, and NAP consistency across directories. This is what drives clinic calls in India.' },
            { icon: '💬', t: 'WhatsApp booking built in', d: 'A floating WhatsApp button with a pre-filled message on every page, plus click-to-call. Indian patients book on WhatsApp — so we remove every step between reading and messaging.' },
            { icon: '🦷', t: 'A page per treatment', d: 'Implants, braces, aligners, RCT, whitening, paediatric, full-mouth rehab. Each one is its own page with its own keyword, FAQ and cost section, because that is how people search.' },
            { icon: '⭐', t: 'Review engine', d: 'A QR card for your reception desk plus an automated WhatsApp review request. Reviews are the single strongest local ranking factor and the cheapest one to improve.' },
            { icon: '🔍', t: 'Schema for AI search', d: 'Dentist, MedicalClinic, Physician, FAQ and Review markup so Google AI Overviews can quote your clinic directly instead of a competitor.' },
            { icon: '🌐', t: 'Bilingual when it matters', d: 'Hindi, Marathi, Tamil, Telugu, Bengali or Gujarati alongside English. In cities like Patna, Lucknow and Nagpur this alone is a ranking advantage.' },
            { icon: '📅', t: 'Real online booking', d: 'Calendar slots, confirmation messages and automated reminders on the Authority package — so patients book at midnight and you wake up to a full chair.' },
            { icon: '📊', t: 'Tracking from day one', d: 'Search Console, Analytics, call tracking and conversion events wired before launch, so you know exactly which page brought which patient.' },
          ].map((f) => (
            <div key={f.t} className="card transition-shadow hover:shadow-lift">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint-50 text-xl">{f.icon}</div>
              <h3 className="mt-4 text-[16.5px] font-bold text-ink">{f.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing</span>
          <h2 className="h2 mt-2">Fixed prices. No hourly billing, no surprise invoices.</h2>
          <p className="lede mt-4">One-time build fee. Domain and first year of hosting included in every package.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.slug} className={`relative flex flex-col rounded-2xl border p-6 ${p.popular ? 'border-mint-500 bg-white shadow-lift ring-1 ring-mint-500' : 'border-ink/[.08] bg-white shadow-soft'}`}>
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-mint-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Most chosen
                </span>
              )}
              <h3 className="text-[15px] font-bold uppercase tracking-wide text-ink-500">{p.name}</h3>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-[38px] leading-none tracking-[-.02em]">{p.priceLabel}</span>
                {p.strike && <span className="pb-1 text-[15px] text-ink-300 line-through">{p.strike}</span>}
              </div>
              <p className="mt-1 text-[13px] font-medium text-mint-600">{p.timeline} · one-time</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{p.best}</p>
              <div className="mt-5 flex-1">
                <CheckList items={p.features.slice(0, 6)} />
                {p.features.length > 6 && (
                  <p className="mt-3 pl-[30px] text-[13.5px] font-medium text-ink-300">
                    + {p.features.length - 6} more inclusions
                  </p>
                )}
              </div>
              <a href={WA.plan(p.name)} target="_blank" rel="noopener noreferrer" className={`mt-6 w-full ${p.popular ? 'btn-primary' : 'btn-dark'}`}>
                <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/pricing" className="btn-ghost">See full comparison &amp; add-ons <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <Process />
      <Testimonials />

      {/* CITIES */}
      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Where we work</span>
          <h2 className="h2 mt-2">Dental website design, city by city</h2>
          <p className="lede mt-4">
            Every city ranks differently. We publish a dedicated breakdown of the competition, search behaviour and
            fastest wins for each one.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {CITIES.map((c) => (
            <Link
              key={c.slug}
              href={`/dental-website-design/${c.slug}`}
              className="rounded-full border border-ink/12 bg-white px-4 py-2 text-[14px] font-medium text-ink-500 transition-all hover:border-mint-400 hover:bg-mint-50 hover:text-mint-700"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <FAQ items={FAQS} />
      <CTABand />
    </>
  );
}
