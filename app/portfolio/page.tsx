import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABand } from '@/components/Sections';
import { Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Our Work — Live Websites Built by Zera Technologies' },
  description:
    'Real, live websites built and run by Zera Technologies, the studio behind Zera Dental. Every project below is a working site you can visit today, grown entirely on organic search.',
  alternates: { canonical: '/portfolio' },
};

const WORK = [
  { name: 'BighaWala.com', url: 'https://www.bighawala.com/', tag: 'Regional Utility Platform',
    d: "Bihar's land-information portal with bigha/katha/dhur conversion, land-cost and registry calculators, and Hindi guides for dakhil kharij and apna khata.",
    stats: ['38 districts covered', '6 free calculators'] },
  { name: 'SafalBalak.com', url: 'https://www.safalbalak.com/', tag: 'Bilingual Content Network',
    d: 'A parenting and child-development publication with growth guides and city-by-city nursery admission guides, written in parallel Hindi and English.',
    stats: ['6-city admission network', 'Hindi + English parallel'] },
  { name: 'Udakishunganj.com', url: 'https://www.udakishunganj.com/', tag: 'Hyperlocal Civic Portal',
    d: 'A block-level civic information site rebuilt with Hindi as the default language for a near-100% Hindi-speaking audience.',
    stats: ['Hindi at root URL', '10 hyperlocal guides'] },
  { name: 'KosiEducationTimes.com', url: 'https://kosieducationtimes.com/', tag: 'Education News',
    d: 'Bihar Board exam results, admissions and scholarship-scheme coverage for students across the Kosi division.',
    stats: ['Exam & scheme coverage', 'Kosi-division focus'] },
  { name: 'AivantisGlobal.com', url: 'https://aivantisglobal.com/', tag: 'Tech Publication',
    d: 'Explainers and comparisons on AI tools and emerging technology, written for a global English-speaking audience.',
    stats: ['8+ launch articles', 'Global audience'] },
  { name: 'ProSitesHub.com', url: 'https://prositeshub.com/', tag: 'Small-Business Guides',
    d: 'Practical guides on website builders and digital tools for small businesses getting online for the first time.',
    stats: ['8+ launch guides', 'SMB audience'] },
];

export default function Portfolio() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Portfolio', url: '/portfolio' }])} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">Our work</span>
        <h1 className="h1 mt-3">We do not show mockups.</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          Every site below is live right now and was built, written and ranked in-house by Zera Technologies — the studio
          behind Zera Dental. All of them grew on organic search with zero ad spend, which is the same method we apply to
          clinic websites.
        </p>
      </section>

      <section className="wrap">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WORK.map((w) => (
            <a key={w.name} href={w.url} target="_blank" rel="noopener noreferrer" className="group card flex flex-col transition-all hover:border-mint-300 hover:shadow-lift">
              <span className="self-start rounded-full bg-mint-50 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wide text-mint-700">{w.tag}</span>
              <h2 className="mt-4 text-[18px] font-bold text-ink">{w.name}</h2>
              <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-500">{w.d}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {w.stats.map((s) => (
                  <li key={s} className="rounded-full bg-sand-50 px-2.5 py-1 text-[12px] font-medium text-ink-500">{s}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-mint-600 group-hover:text-mint-700">
                Visit site <Arrow className="h-4 w-4" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap my-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8 sm:p-12">
          <span className="eyebrow">Being straight with you</span>
          <h2 className="h2 mt-2">No dental case studies yet</h2>
          <p className="lede mt-5">
            We are early in dentistry. Rather than dress that up, here is the honest version: the sites above are ours,
            they are live, and they rank on organic search with no ad spend behind them. That is the skill we are
            bringing to your clinic.
          </p>
          <p className="lede mt-4">
            What we can show you instead is a demo clinic site built to the exact standard yours would be — real
            structure, real treatment pages, real speed — plus a written plan for your city before you pay anything.
            Ask on WhatsApp and we will send both.
          </p>
          <p className="mt-5 text-[14px] leading-relaxed text-ink-300">
            When clinics do come on board, we publish them as case studies only with written permission, and never next
            to a direct competitor in the same city.
          </p>
          <Link href="/contact" className="btn-dark mt-7">Ask for the demo and a plan <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="wrap my-16 text-center">
        <p className="text-[14px] text-ink-300">
          All projects designed and developed by{' '}
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-mint-600">Zera Technologies</a>.
        </p>
      </section>

      <CTABand />
    </>
  );
}
