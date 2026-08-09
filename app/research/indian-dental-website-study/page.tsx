import type { Metadata } from 'next';
import Link from 'next/link';
import { STUDY, METRICS, CLINICS, FAQS } from '@/lib/study';
import { SITE, WA } from '@/lib/site';
import { CTABand, FAQ } from '@/components/Sections';
import { Arrow, WhatsAppIcon } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema, articleSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: STUDY.metaTitle },
  description: STUDY.metaDesc,
  alternates: { canonical: `/research/${STUDY.slug}` },
  openGraph: {
    type: 'article',
    siteName: SITE.name,
    locale: 'en_IN',
    title: STUDY.metaTitle,
    description: STUDY.metaDesc,
    url: `${SITE.url}/research/${STUDY.slug}`,
  },
};

const maxKb = Math.max(...CLINICS.map((c) => c.kb));

export default function StudyPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Research', url: `/research/${STUDY.slug}` }]),
        faqSchema(FAQS),
        articleSchema({ title: STUDY.title, description: STUDY.metaDesc, slug: STUDY.slug, date: '2026-08-09' }),
        {
          '@context': 'https://schema.org',
          '@type': 'Dataset',
          name: 'Indian dental clinic website audit, round 1',
          description: STUDY.metaDesc,
          creator: { '@id': `${SITE.url}/#organization` },
          license: 'https://creativecommons.org/licenses/by/4.0/',
          temporalCoverage: '2026-08',
          spatialCoverage: { '@type': 'Country', name: 'India' },
        },
      ]} />

      <article>
        <header className="border-b border-ink/[.07] bg-gradient-to-b from-mint-50/60 to-white">
          <div className="wrap py-12 sm:py-16">
            <span className="eyebrow">Original research · {STUDY.date}</span>
            <h1 className="h1 mt-3 max-w-4xl">{STUDY.title}</h1>
            <p className="lede mt-5 max-w-2xl">
              We measured {STUDY.n} independent dental clinic websites across {STUDY.cities} Indian cities. We expected to
              find broken, slow, insecure sites. That is not what the data says — and the real gap is somewhere nobody
              is looking.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {[`${STUDY.n} clinics measured`, `${STUDY.cities} cities`, 'Reproducible method', 'Raw data published'].map((t) => (
                <span key={t} className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-500">{t}</span>
              ))}
            </div>
          </div>
        </header>

        {/* headline */}
        <section className="wrap my-14">
          <div className="grain relative overflow-hidden rounded-3xl bg-ink px-6 py-12 sm:px-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint-500/20 blur-3xl" />
            <div className="relative">
              <span className="eyebrow !text-mint-400">The headline finding</span>
              <p className="mt-3 font-display text-[46px] leading-none tracking-[-.03em] text-white sm:text-[76px]">54%</p>
              <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
                of the dental clinic websites we measured had <strong className="text-white">no WhatsApp link anywhere on the
                homepage</strong>. In India. In a country where WhatsApp is how people talk to businesses, more than half of
                these clinics force a patient to pick up the phone during clinic hours or fill in a form and hope.
              </p>
            </div>
          </div>
        </section>

        {/* what we expected vs found */}
        <section className="wrap my-14">
          <div className="mx-auto max-w-3xl prose-z">
            <h2>What we expected to find</h2>
            <p>
              The received wisdom in Indian web design — including, until this week, on this very website — is that dental
              clinic sites are slow, insecure, not mobile-friendly, and stuck in 2014. We went looking for evidence.
            </p>
            <p><strong>We did not find it.</strong> Every single site we measured used HTTPS. Every single one had a mobile
              viewport tag. 92% had a click-to-call link and 85% carried schema markup. On basic technical hygiene, Indian
              dental websites in 2026 are broadly fine.</p>
            <p>
              That was genuinely surprising, and it means the standard agency sales pitch — <em>&ldquo;your site is slow and
              outdated&rdquo;</em> — is now usually wrong. Being honest about that matters more to us than having a scarier
              statistic.
            </p>
          </div>
        </section>

        {/* metrics chart */}
        <section className="wrap my-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2">What we found, feature by feature</h2>
            <p className="lede mt-3">Percentage of the {STUDY.n} clinic homepages carrying each element.</p>
            <div className="mt-8 space-y-5">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[15px] font-semibold text-ink">{m.label}</span>
                    <span className={`text-[15px] font-bold ${m.good ? 'text-mint-600' : 'text-orange-600'}`}>{m.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-sand-100">
                    <div className={`h-full rounded-full ${m.good ? 'bg-mint-500' : 'bg-orange-400'}`} style={{ width: `${m.pct}%` }} />
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-300">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* weight */}
        <section className="wrap my-14">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2">Page weight: a median that lies</h2>
            <p className="lede mt-3">
              Median homepage weight was <strong className="font-semibold text-ink">536 KB</strong> — perfectly respectable.
              The mean was <strong className="font-semibold text-ink">1,069 KB</strong>, double that. One clinic dragged the
              whole average up on its own.
            </p>
            <div className="mt-8 space-y-2">
              {[...CLINICS].sort((a, b) => b.kb - a.kb).map((c) => (
                <div key={c.site} className="flex items-center gap-3">
                  <span className="w-[190px] shrink-0 truncate text-[13px] text-ink-500" title={c.site}>{c.site}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-sand-100">
                    <div
                      className={`h-full rounded ${c.kb > 2048 ? 'bg-red-400' : c.kb > 1024 ? 'bg-orange-400' : 'bg-mint-500'}`}
                      style={{ width: `${Math.max(2, (c.kb / maxKb) * 100)}%` }}
                    />
                  </div>
                  <span className="w-[78px] shrink-0 text-right text-[13px] font-semibold text-ink">{c.kb.toLocaleString()} KB</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-ink-300">
              The heaviest site — the top-ranking dentist in Patna — served <strong className="text-ink">5.5 MB across 153
              requests</strong> on its homepage. On a mid-range Android over patchy 4G, that is a genuinely painful wait.
              But it is an outlier, not the norm, and pretending otherwise would be dishonest.
            </p>
          </div>
        </section>

        {/* the real gap */}
        <section className="wrap my-14">
          <div className="mx-auto max-w-3xl prose-z">
            <h2>The real gap is conversion, not code</h2>
            <p>
              Put the findings together and a clear pattern emerges. These clinics have solved the <em>technical</em>
              problem and ignored the <em>commercial</em> one.
            </p>
            <ul>
              <li><strong>54% have no WhatsApp link</strong> — the single most-used contact channel in India.</li>
              <li><strong>38% have no map embed</strong>, so a patient cannot see whether the clinic is near them.</li>
              <li><strong>38% have no enquiry form at all</strong> — a phone number is the entire conversion path.</li>
              <li><strong>3 of 13 offer neither WhatsApp nor any booking language</strong>. If you find them at 10pm, there is genuinely nothing to do but remember to ring tomorrow.</li>
              <li><strong>5 of 13 link fewer than five treatment pages</strong>, and two link none at all — so they cannot rank for &ldquo;root canal cost&rdquo; or &ldquo;braces near me&rdquo; no matter how fast the site loads.</li>
              <li><strong>46% have homepages under 500 words</strong>, with the thinnest at 79 words.</li>
            </ul>
            <p>
              A fast website that gives a motivated patient nowhere to click is not a technical failure. It is a business
              one, and it is invisible in every speed-test report an agency will show you.
            </p>

            <h2>Method, and what we would not claim</h2>
            <p>
              We loaded each clinic homepage in a real Chrome browser and recorded transferred bytes and request counts
              from the Resource Timing API, then inspected the DOM for each feature. Bytes and request counts are
              connection-independent, so they compare fairly between sites — unlike Lighthouse scores, which move between
              runs.
            </p>
            <p>
              We attempted {STUDY.attempted} sites and report {STUDY.n}. Two rendered their content via JavaScript after our
              measurement point; rather than record them as empty, we dropped them. We did not measure load time as a
              headline figure, because our connection is not your patient&apos;s connection.
            </p>
            <p>
              <strong>Thirteen clinics is a pattern, not a national statistic.</strong> We are expanding this toward 100
              sites and will publish the fuller dataset. Until then, please treat these as directional findings from a
              first sample — that is how we treat them ourselves.
            </p>
          </div>
        </section>

        {/* data table */}
        <section className="wrap my-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="h2">The raw data</h2>
            <p className="lede mt-3">Published in full so anyone can check our arithmetic or repeat the method.</p>
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
                <thead>
                  <tr className="border-b border-ink/12">
                    <th className="py-3 pr-4 font-bold text-ink">Clinic site</th>
                    <th className="py-3 pr-4 font-bold text-ink">City</th>
                    <th className="py-3 pr-4 text-right font-bold text-ink">Weight</th>
                    <th className="py-3 pr-4 text-right font-bold text-ink">Requests</th>
                    <th className="py-3 pr-4 text-right font-bold text-ink">Treatment pages</th>
                    <th className="py-3 pr-4 text-right font-bold text-ink">Words</th>
                    <th className="py-3 font-bold text-ink">WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="text-ink-500">
                  {CLINICS.map((c) => (
                    <tr key={c.site} className="border-b border-ink/[.06]">
                      <td className="py-3 pr-4 font-medium text-ink">{c.site}</td>
                      <td className="py-3 pr-4">{c.city}</td>
                      <td className="py-3 pr-4 text-right">{c.kb.toLocaleString()} KB</td>
                      <td className="py-3 pr-4 text-right">{c.req}</td>
                      <td className="py-3 pr-4 text-right">{c.tp}</td>
                      <td className="py-3 pr-4 text-right">{c.words.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={c.wa ? 'font-semibold text-mint-600' : 'font-semibold text-orange-600'}>
                          {c.wa ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[13px] text-ink-300">
              Measured {STUDY.date}. Corporate chains excluded. Data free to reuse with attribution to{' '}
              <Link href="/" className="underline underline-offset-2 hover:text-mint-600">Zera Dental</Link>.
            </p>
          </div>
        </section>

        <section className="wrap my-14">
          <div className="mx-auto max-w-3xl rounded-3xl border border-mint-200 bg-mint-50/60 p-8 sm:p-10">
            <h2 className="h3">Want to know where your clinic sits in this data?</h2>
            <p className="lede mt-3">
              The free audit measures your clinic against the same checks used in this study, and tells you which of these
              gaps you have. It takes two minutes and costs nothing.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-website-audit" className="btn-primary">Check my clinic <Arrow className="h-4 w-4" /></Link>
              <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Ask us about the data
              </a>
            </div>
          </div>
        </section>
      </article>

      <FAQ items={FAQS} title="About this study" />
      <CTABand title="We publish what we measure." sub="If you spot an error in this data, tell us and we will correct it publicly." />
    </>
  );
}
