import type { Metadata } from 'next';
import Link from 'next/link';
import { SEO_PAGE, SEO_PLANS, SEO_FAQS, SEO_SECTIONS } from '@/lib/seo-service';
import { STUDY } from '@/lib/study';
import { SITE, WA, wa } from '@/lib/site';
import { CheckList, CTABand, FAQ } from '@/components/Sections';
import { RichText } from '@/components/RichText';
import { Arrow, WhatsAppIcon, Check } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: { absolute: SEO_PAGE.metaTitle },
  description: SEO_PAGE.metaDesc,
  alternates: { canonical: `/${SEO_PAGE.slug}` },
  openGraph: {
    siteName: SITE.name,
    locale: 'en_IN',
    title: SEO_PAGE.metaTitle,
    description: SEO_PAGE.metaDesc,
    url: `${SITE.url}/${SEO_PAGE.slug}`,
  },
};

export default function DentalSeoPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Dental SEO services', url: `/${SEO_PAGE.slug}` }]),
        faqSchema(SEO_FAQS),
        serviceSchema('Dental SEO services in India', SEO_PAGE.metaDesc, `/${SEO_PAGE.slug}`),
        {
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: 'Dental SEO retainers',
          itemListElement: SEO_PLANS.map((p, i) => ({
            '@type': 'Offer',
            position: i + 1,
            name: p.name,
            price: p.price.replace(/[^0-9]/g, ''),
            priceCurrency: 'INR',
            description: p.best,
            url: `${SITE.url}/${SEO_PAGE.slug}`,
          })),
        },
      ]} />

      {/* hero */}
      <section className="relative overflow-hidden border-b border-ink/[.07] bg-gradient-to-b from-mint-50/60 to-white">
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-300">
            <Link href="/" className="hover:text-mint-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-500">Dental SEO services</span>
          </nav>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr,.9fr] lg:gap-14">
            <div>
              <h1 className="h1">{SEO_PAGE.h1}</h1>
              <p className="lede mt-5">
                Search engine optimisation built for one industry only. Map Pack rankings, treatment-level content, a
                review system that runs itself, and a monthly report you can actually read. From{' '}
                <strong className="font-semibold text-ink">₹8,999/month</strong>, month to month, cancel any time.
              </p>
              <div className="mt-7">
                <CheckList items={[
                  'We work with dental clinics and nothing else',
                  'Month to month — no lock-in, no setup fee, no notice period',
                  'We publish our own measurement data instead of asserting things',
                  'We tell you when you do not need us',
                ]} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={wa('Hi Zera Dental, I want to talk about SEO for my dental clinic.')} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <WhatsAppIcon className="h-4 w-4" /> Talk about SEO
                </a>
                <Link href="/free-website-audit" className="btn-ghost">Free clinic audit first <Arrow className="h-4 w-4" /></Link>
              </div>
            </div>
            <div className="lg:pt-2">
              <LeadForm
                source="Dental SEO services page"
                heading="Where does your clinic rank now?"
                sub="We'll check your Google listing, your rankings and your three nearest competitors, then send the findings on WhatsApp. Free."
                cta="Send my free SEO audit"
                extra={{ interest: 'Dental SEO retainer' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* body */}
      <article className="wrap my-16">
        <div className="mx-auto max-w-3xl prose-z">
          {SEO_SECTIONS.map((s) => (
            <section key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((p, i) => <p key={i}><RichText text={p} /></p>)}
              {s.h === 'We publish our own data' && (
                <p>
                  <Link href={`/research/${STUDY.slug}`}>Read the full study, with the raw data →</Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* plans */}
      <section className="wrap my-16">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Retainers</span>
          <h2 className="h2 mt-2">Monthly SEO, priced openly</h2>
          <p className="lede mt-4">No setup fee. No minimum term. Cancel in any month and everything we built stays yours.</p>
        </div>
        <div className="mt-11 grid gap-5 lg:grid-cols-3">
          {SEO_PLANS.map((p) => (
            <div key={p.slug} className={`relative flex flex-col rounded-3xl border p-7 ${p.popular ? 'border-mint-500 shadow-lift ring-1 ring-mint-500' : 'border-ink/[.08] shadow-soft'}`}>
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-mint-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Most chosen</span>
              )}
              <h3 className="text-[15px] font-bold uppercase tracking-wide text-ink-500">{p.name}</h3>
              <div className="mt-3 flex items-end gap-1.5">
                <span className="font-display text-[38px] leading-none tracking-[-.02em]">{p.price}</span>
                <span className="pb-1.5 text-[14px] text-ink-300">/month</span>
              </div>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500">
                <span className="font-semibold text-ink">Best for: </span>{p.best}
              </p>
              <div className="mt-6 flex-1 border-t border-ink/[.07] pt-6">
                <CheckList items={p.includes} />
              </div>
              <a
                href={wa(`Hi Zera Dental, I'm interested in the ${p.name} SEO retainer for my clinic.`)}
                target="_blank" rel="noopener noreferrer"
                className={`mt-7 w-full ${p.popular ? 'btn-primary' : 'btn-dark'}`}
              >
                <WhatsAppIcon className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[13.5px] text-ink-300">
          Need a website before SEO makes sense? <Link href="/pricing" className="underline underline-offset-2 hover:text-mint-600">Builds start at ₹14,999</Link>.
        </p>
      </section>

      {/* honesty block */}
      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8 sm:p-10">
          <span className="eyebrow">Before you pay anyone</span>
          <h2 className="h2 mt-2">Three questions worth asking every SEO agency</h2>
          <div className="mt-6 space-y-5">
            {[
              ['“What exactly will you do in month one?”', 'A vague answer means a vague plan. You should get a specific list — profile fixes, which pages, which citations.'],
              ['“Can I see a client’s Search Console?”', 'Not a screenshot. Live access, or a client who will speak to you. Rankings are easy to fake in a PDF.'],
              ['“What happens if I cancel?”', 'Everything built for you should remain yours — pages, profile, citations. If leaving means losing your content, you are renting, not investing.'],
            ].map(([q, a]) => (
              <div key={q} className="flex gap-4">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-700"><Check className="h-3 w-3" /></span>
                <div>
                  <p className="text-[15.5px] font-semibold text-ink">{q}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-ink-500">{a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[14px] leading-relaxed text-ink-300">
            Ask us the same three. We would rather lose a client to a good question than win one who never asked.
          </p>
        </div>
      </section>

      {/* related */}
      <section className="wrap my-16">
        <h2 className="h3 text-center">Related</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {[
            ['/services/local-seo-for-dentists', 'Local SEO & the Map Pack'],
            ['/services/google-business-profile', 'Google Business Profile setup'],
            [`/research/${STUDY.slug}`, 'Our clinic website study'],
            ['/blog/local-seo-for-dentists-india', 'Local SEO guide'],
            ['/blog/why-dental-website-not-ranking', 'Why your site is not ranking'],
            ['/pricing', 'Website build pricing'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="rounded-full border border-ink/12 bg-white px-4 py-2 text-[14px] font-medium text-ink-500 hover:border-mint-400 hover:bg-mint-50 hover:text-mint-700">
              {label}
            </Link>
          ))}
        </div>
      </section>

      <FAQ items={SEO_FAQS} title="Dental SEO — straight answers" />
      <CTABand
        title="Find out where you actually rank."
        sub="The free audit checks your Google listing, your rankings and your three closest competitors. No cost, no call unless you want one."
        waLink={wa('Hi Zera Dental, I want to talk about SEO for my dental clinic.')}
      />
    </>
  );
}
