import type { Metadata } from 'next';
import Link from 'next/link';
import { PLANS, CARE_PLAN, ADDONS } from '@/lib/pricing';
import { WA } from '@/lib/site';
import { CheckList, CTABand, FAQ } from '@/components/Sections';
import { WhatsAppIcon, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Dental Website Cost in India 2026 — ₹14,999 to ₹49,999' },
  description:
    'Transparent dental website pricing for Indian clinics. Starter ₹14,999, Growth ₹29,999, Authority ₹49,999 — one time, domain and hosting included. Compare packages, add-ons and the ₹1,999/month care plan.',
  alternates: { canonical: '/pricing' },
};

const FAQS = [
  { q: 'Is ₹14,999 the real total, or are there hidden costs?', a: 'It is the real total for the Starter Clinic package. Domain registration for year one, hosting for year one, SSL, design, copywriting, Google Business Profile setup and 30 days of edits are all inside that number. From year two, domain and hosting cost roughly ₹3,000-₹4,000 per year if you manage them yourself, or they are bundled into Zera Care at ₹1,999 per month.' },
  { q: 'Can I pay in instalments?', a: 'Yes. The standard split is 50% to start and 50% on the day we hand over the live site. For Authority Clinic builds we can split it three ways across the project. We invoice properly with GST where applicable.' },
  { q: 'Which package do most clinics choose?', a: 'Growth Practice at ₹29,999 is the most common choice, because treatment-level pages and local SEO are what actually move enquiry volume. Starter makes sense if you have no site at all and want to get online quickly. Authority is for multi-location practices or specialists who need real appointment booking.' },
  { q: 'What if I already have a website?', a: 'We will audit it first, free. Sometimes the honest answer is that your existing site only needs speed fixes, treatment pages and a Business Profile clean-up — which costs far less than a rebuild. We will tell you that instead of selling you a new site you do not need.' },
  { q: 'Is Zera Care compulsory?', a: 'No. It is month to month with no contract and you can cancel any time. Your website works fine without it — you just handle hosting renewal and edits yourself.' },
  { q: 'Do you offer refunds?', a: 'If you are unhappy with the initial design direction before development begins, we refund your advance in full, no questions. Once development has started the advance covers work already delivered, but we keep revising the design until you approve it.' },
];

export default function Pricing() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }]),
        faqSchema(FAQS),
        {
          '@context': 'https://schema.org',
          '@type': 'OfferCatalog',
          name: 'Dental website design packages in India',
          itemListElement: PLANS.map((p, i) => ({
            '@type': 'Offer',
            position: i + 1,
            name: p.name,
            price: String(p.price),
            priceCurrency: 'INR',
            description: p.best,
            url: 'https://zeradental.in/pricing',
          })),
        },
      ]} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">Pricing</span>
        <h1 className="h1 mt-3">What a dental website costs in India</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          Most Indian agencies quote between ₹15,000 and ₹1,50,000 and refuse to publish a number. We publish ours.
          One-time build fee, domain and first-year hosting included, no hourly billing.
        </p>
      </section>

      <section className="wrap">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.slug} className={`relative flex flex-col rounded-3xl border p-7 ${p.popular ? 'border-mint-500 shadow-lift ring-1 ring-mint-500' : 'border-ink/[.08] shadow-soft'}`}>
              {p.popular && (
                <span className="absolute -top-3 left-7 rounded-full bg-mint-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">Most chosen</span>
              )}
              <h2 className="text-[15px] font-bold uppercase tracking-wide text-ink-500">{p.name}</h2>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-[42px] leading-none tracking-[-.02em]">{p.priceLabel}</span>
                {p.strike && <span className="pb-1.5 text-[15px] text-ink-300 line-through">{p.strike}</span>}
              </div>
              <p className="mt-1.5 text-[13px] font-semibold text-mint-600">{p.timeline} · one-time payment</p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ink-500">
                <span className="font-semibold text-ink">Best for: </span>{p.best}
              </p>
              <div className="mt-6 flex-1 border-t border-ink/[.07] pt-6">
                <CheckList items={p.features} />
                {p.notIncluded && (
                  <ul className="mt-5 space-y-2 border-t border-ink/[.07] pt-4">
                    {p.notIncluded.map((n) => (
                      <li key={n} className="flex gap-3 text-[14px] text-ink-300">
                        <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-sand-100 text-[10px]">✕</span>
                        {n}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a href={WA.plan(p.name)} target="_blank" rel="noopener noreferrer" className={`mt-7 w-full ${p.popular ? 'btn-primary' : 'btn-dark'}`}>
                <WhatsAppIcon className="h-4 w-4" /> Get {p.name}
              </a>
              <p className="mt-3 text-center text-[12.5px] text-ink-300">50% to start · 50% on handover</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARE PLAN */}
      <section className="wrap my-20">
        <div className="grid items-center gap-10 rounded-3xl border border-ink/[.08] bg-sand-50 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <span className="eyebrow">Optional, month to month</span>
            <h2 className="h2 mt-2">{CARE_PLAN.name}</h2>
            <div className="mt-4 flex items-end gap-1.5">
              <span className="font-display text-[40px] leading-none tracking-[-.02em]">{CARE_PLAN.priceLabel}</span>
              <span className="pb-1.5 text-[15px] text-ink-300">{CARE_PLAN.period}</span>
            </div>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ink-500">
              A website that nobody touches slowly stops working. Zera Care keeps yours fast, current and climbing — for
              less than the cost of two consultations a month. Cancel any time.
            </p>
            <a href={WA.plan('Zera Care')} target="_blank" rel="noopener noreferrer" className="btn-dark mt-6">
              <WhatsAppIcon className="h-4 w-4" /> Ask about Zera Care
            </a>
          </div>
          <div className="rounded-2xl bg-white p-7 shadow-soft">
            <CheckList items={CARE_PLAN.features} />
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Add-ons</span>
          <h2 className="h2 mt-2">Bolt anything on, any time</h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/[.08] border-y border-ink/[.08]">
          {ADDONS.map((a) => (
            <div key={a.name} className="flex items-center justify-between gap-6 py-4">
              <span className="text-[15px] text-ink-700/90">{a.name}</span>
              <span className="shrink-0 text-[15px] font-bold text-ink">{a.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Honest comparison</span>
          <h2 className="h2 mt-2">Zera Dental vs. the other options</h2>
        </div>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="py-3 pr-4 font-bold text-ink"></th>
                <th className="py-3 pr-4 font-bold text-mint-700">Zera Dental</th>
                <th className="py-3 pr-4 font-bold text-ink-500">DIY builder</th>
                <th className="py-3 pr-4 font-bold text-ink-500">Local freelancer</th>
                <th className="py-3 font-bold text-ink-500">Full-service agency</th>
              </tr>
            </thead>
            <tbody className="text-ink-500">
              {[
                ['Typical cost', '₹14,999 – ₹49,999 one time', '₹500-₹1,500/mo forever', '₹8,000 – ₹20,000', '₹75,000 – ₹2,50,000'],
                ['Built for dental search', 'Yes, exclusively', 'No', 'Rarely', 'Sometimes'],
                ['Mobile speed', '90+ PageSpeed target', 'Usually 40-60', 'Varies wildly', 'Usually good'],
                ['Google Profile setup', 'Included', 'Not included', 'Extra', 'Included'],
                ['Treatment-level pages', 'Included on Growth+', 'You build them', 'Extra cost', 'Included'],
                ['Support after launch', '30 days – 6 months free', 'Help articles', 'Often disappears', 'Retainer required'],
                ['Who owns it', 'You, fully', 'Platform owns hosting', 'You', 'Often the agency'],
                ['Time to launch', '7 – 21 days', 'Weeks of your time', '2 – 6 weeks', '6 – 12 weeks'],
              ].map((r) => (
                <tr key={r[0]} className="border-b border-ink/[.06]">
                  <td className="py-3.5 pr-4 font-semibold text-ink">{r[0]}</td>
                  <td className="py-3.5 pr-4 font-medium text-mint-700">{r[1]}</td>
                  <td className="py-3.5 pr-4">{r[2]}</td>
                  <td className="py-3.5 pr-4">{r[3]}</td>
                  <td className="py-3.5">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 text-center text-[13px] text-ink-300">
          Ranges for other options are typical market rates in India as of 2026 and will vary by city and provider.
        </p>
      </section>

      <FAQ items={FAQS} title="Pricing questions, answered plainly" />

      <section className="wrap my-14 text-center">
        <p className="lede mx-auto max-w-xl">
          Not sure which package fits? Take the free audit — it tells you exactly what your clinic is missing before you
          spend anything.
        </p>
        <Link href="/free-website-audit" className="btn-primary mt-6">Start the free audit <Arrow className="h-4 w-4" /></Link>
      </section>

      <CTABand title="Pick a package, or just ask us what you need." sub="Message us on WhatsApp with your clinic name and city. We will tell you honestly which package makes sense — including if the answer is the cheapest one." waLink={WA.pricing} />
    </>
  );
}
