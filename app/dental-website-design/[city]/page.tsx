import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CITIES, getCity } from '@/lib/cities';
import { PLANS } from '@/lib/pricing';
import { SITE, WA } from '@/lib/site';
import { CheckList, CTABand, FAQ, Process, Testimonials } from '@/components/Sections';
import { WhatsAppIcon, Arrow, Check } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const title = `Dental Website Design in ${c.name} — Clinic Websites From ₹14,999`;
  const description = `Website design for dental clinics in ${c.name}, ${c.state}. Mobile-first, Google Map Pack optimised, WhatsApp booking built in. Live in 7 days from ₹14,999. Free clinic audit.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/dental-website-design/${c.slug}` },
    openGraph: { title, description, url: `${SITE.url}/dental-website-design/${c.slug}` },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const others = CITIES.filter((x) => x.slug !== c.slug).slice(0, 8);

  const faqs = [
    { q: `How much does a dental website cost in ${c.name}?`, a: `Agencies in ${c.name} typically quote between ₹15,000 and ₹1,50,000 for a dental clinic website. Zera Dental publishes fixed prices: ₹14,999 for a 5-page Starter Clinic site, ₹29,999 for a 12-page Growth Practice site with full local SEO for ${c.name}, and ₹49,999 for an Authority Clinic build with online booking. Domain and first-year hosting are included in every package.` },
    { q: `How competitive is dental SEO in ${c.name}?`, a: `${c.competitionNote} Practically, that means clinics here should expect ${['Delhi', 'Mumbai', 'Bangalore', 'Gurgaon', 'Hyderabad'].includes(c.name) ? 'four to eight months of consistent work to reach the Map Pack for a main treatment keyword' : 'one to three months to enter the Map Pack for a main treatment keyword, provided reviews are being collected'}.` },
    { q: `Do you work with clinics across all of ${c.name}?`, a: `Yes. We build for clinics throughout ${c.name} including ${c.areas.slice(0, 4).join(', ')} and ${c.areas[4]}. Area-level pages are included on the Growth and Authority packages, which matters because patients search by locality, not by city.` },
    { q: `Do you offer content in ${c.language.split(' + ')[c.language.split(' + ').length - 1]}?`, a: `Yes. We build bilingual sites for ${c.name} in ${c.language}. In markets where a large share of patients search in the local language, this alone is a meaningful ranking advantage because almost no competing clinic has done it.` },
    { q: `Do I need to meet you in person in ${c.name}?`, a: `No, and most clients never do. Everything runs on WhatsApp and video call — the interview, the preview link, the revisions and the handover. It keeps the project fast and keeps our prices where they are.` },
    { q: `What are patients in ${c.name} actually searching for?`, a: `Typical high-intent searches in ${c.name} include ${c.searchNote}. Each of those deserves its own page rather than one combined services page, which is exactly what the Growth Practice package builds.` },
  ];

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Cities', url: '/locations' },
          { name: c.name, url: `/dental-website-design/${c.slug}` },
        ]),
        faqSchema(faqs),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Dental website design in ${c.name}`,
          serviceType: 'Website design for dental clinics',
          provider: { '@id': `${SITE.url}/#organization` },
          areaServed: { '@type': 'City', name: c.name, containedInPlace: { '@type': 'AdministrativeArea', name: c.state } },
          url: `${SITE.url}/dental-website-design/${c.slug}`,
          offers: { '@type': 'Offer', price: '14999', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        },
      ]} />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/[.07] bg-gradient-to-b from-mint-50/60 to-white">
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-300">
            <Link href="/" className="hover:text-mint-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-mint-600">Cities</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-500">{c.name}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr,.9fr] lg:gap-14">
            <div>
              <h1 className="h1">Dental website design in {c.name}</h1>
              <p className="lede mt-5">{c.angle}</p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink-500">
                Zera Dental builds fast, Map-Pack-optimised websites for dental clinics across {c.name}, {c.state} —
                including {c.areas.slice(0, 3).join(', ')} and {c.areas[3]}. Live in 7 days, from{' '}
                <strong className="font-semibold text-ink">₹14,999</strong>.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={WA.city(c.name)} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp us from {c.name}
                </a>
                <Link href="/free-website-audit" className="btn-ghost">Free clinic audit <Arrow className="h-4 w-4" /></Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-ink-500">
                {[`Serving all of ${c.name}`, c.language, 'Live in 7 days'].map((x) => (
                  <span key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-mint-500" /> {x}</span>
                ))}
              </div>
            </div>

            <div className="lg:pt-2">
              <LeadForm
                source={`City page — ${c.name}`}
                heading={`Free audit for your ${c.name} clinic`}
                sub={`We'll check your Google listing, your site speed and your three nearest competitors in ${c.name}, then send a fix plan on WhatsApp.`}
                cta="Send my free audit"
                extra={{ cityPage: c.name }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CITY INTEL */}
      <section className="wrap my-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card">
            <span className="eyebrow">Competition</span>
            <h2 className="h3 mt-2">How hard is {c.name}?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{c.competitionNote}</p>
          </div>
          <div className="card">
            <span className="eyebrow">Search behaviour</span>
            <h2 className="h3 mt-2">What patients type</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              High-intent searches in {c.name} look like: <em className="not-italic font-medium text-ink">{c.searchNote}</em>. Each of these needs its own page.
            </p>
          </div>
          <div className="card">
            <span className="eyebrow">Language</span>
            <h2 className="h3 mt-2">{c.language}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              We build bilingual for {c.name} when it helps. Very few competing clinics have done this, which makes it one
              of the cheapest ranking advantages available here.
            </p>
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="wrap my-16">
        <div className="rounded-3xl border border-ink/[.08] bg-sand-50 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Areas we build for</span>
              <h2 className="h2 mt-2">Patients search by locality, not by city</h2>
              <p className="lede mt-4">
                Almost nobody searches &ldquo;dentist in {c.name}&rdquo;. They search &ldquo;dentist in{' '}
                {c.areas[0]}&rdquo;. A single city-level page cannot win those searches — area-level content can, and it
                is included from the Growth Practice package onward.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {c.areas.map((a) => (
                  <span key={a} className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-ink-500">{a}</span>
                ))}
                <span className="rounded-full border border-mint-200 bg-mint-50 px-3.5 py-1.5 text-[13.5px] font-medium text-mint-700">
                  + everywhere else in {c.name}
                </span>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-7 shadow-soft">
              <h3 className="text-[16px] font-bold text-ink">What a {c.name} clinic site includes</h3>
              <div className="mt-4">
                <CheckList items={[
                  `Homepage optimised for "dentist in ${c.name}" and near-me searches`,
                  'A separate page for each treatment you want more of',
                  `Google Business Profile setup with ${c.name} geo-tagged photos`,
                  `Area pages for ${c.areas.slice(0, 3).join(', ')} and more`,
                  'WhatsApp booking button on every single page',
                  `Local schema markup naming ${c.name} as your service area`,
                  `Citations on Indian directories with consistent ${c.name} address data`,
                  'Review collection system for your reception desk',
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="wrap my-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing in {c.name}</span>
          <h2 className="h2 mt-2">Same fixed prices, anywhere in India</h2>
          <p className="lede mt-4">
            We do not charge {c.name} clinics more because of the pin code. One-time build fee, domain and first-year
            hosting included.
          </p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.slug} className={`flex flex-col rounded-2xl border p-6 ${p.popular ? 'border-mint-500 shadow-lift ring-1 ring-mint-500' : 'border-ink/[.08] shadow-soft'}`}>
              <h3 className="text-[14px] font-bold uppercase tracking-wide text-ink-500">{p.name}</h3>
              <div className="mt-2.5 font-display text-[34px] leading-none tracking-[-.02em]">{p.priceLabel}</div>
              <p className="mt-1 text-[13px] font-semibold text-mint-600">{p.timeline}</p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-500">{p.best}</p>
              <a href={WA.plan(`${p.name} (${c.name})`)} target="_blank" rel="noopener noreferrer" className={`mt-5 w-full ${p.popular ? 'btn-primary' : 'btn-dark'}`}>
                <WhatsAppIcon className="h-4 w-4" /> Enquire
              </a>
            </div>
          ))}
        </div>
        <div className="mt-7 text-center">
          <Link href="/pricing" className="btn-ghost">Full package comparison <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <Process />
      <Testimonials />
      <FAQ items={faqs} title={`Dental websites in ${c.name} — your questions`} />

      {/* OTHER CITIES */}
      <section className="wrap my-16">
        <h2 className="h3 text-center">We also build in</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {others.map((o) => (
            <Link key={o.slug} href={`/dental-website-design/${o.slug}`} className="rounded-full border border-ink/12 bg-white px-4 py-2 text-[14px] font-medium text-ink-500 hover:border-mint-400 hover:bg-mint-50 hover:text-mint-700">
              {o.name}
            </Link>
          ))}
          <Link href="/locations" className="rounded-full border border-mint-200 bg-mint-50 px-4 py-2 text-[14px] font-semibold text-mint-700 hover:bg-mint-100">
            All 20 cities →
          </Link>
        </div>
      </section>

      <CTABand
        title={`Ready to own "dentist near me" in ${c.name}?`}
        sub={`Take the free audit or message us from ${c.name}. We'll tell you exactly where you stand against your three nearest competitors.`}
        waLink={WA.city(c.name)}
      />
    </>
  );
}
