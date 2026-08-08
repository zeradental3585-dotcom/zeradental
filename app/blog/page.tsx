import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/posts';
import { CTABand } from '@/components/Sections';
import { Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Dental Clinic Growth Guides — SEO, Websites, Patients (India)' },
  description:
    'Practical guides for Indian dental clinics: website costs, local SEO, Google Business Profile, reviews, WhatsApp marketing and how to get more patients without ad spend.',
  alternates: { canonical: '/blog' },
};

export default function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Guides', url: '/blog' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Zera Dental Growth Guides',
          url: `${SITE.url}/blog`,
          publisher: { '@id': `${SITE.url}/#organization` },
          blogPost: POSTS.map((p) => ({
            '@type': 'BlogPosting', headline: p.title, datePublished: p.date,
            url: `${SITE.url}/blog/${p.slug}`, description: p.metaDesc,
          })),
        },
      ]} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">Growth guides</span>
        <h1 className="h1 mt-3">Everything we know, written down</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          No gated PDFs, no email walls. These are the same guides we work through with paying clients — written for
          Indian clinics, with Indian prices and Indian search behaviour.
        </p>
      </section>

      <section className="wrap">
        <Link href={`/blog/${featured.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/[.08] bg-gradient-to-br from-mint-50 to-white p-8 shadow-soft transition-all hover:shadow-lift sm:p-12">
          <div className="flex flex-wrap items-center gap-3 text-[12.5px]">
            <span className="rounded-full bg-ink px-3 py-1 font-bold uppercase tracking-wide text-mint-200">Latest</span>
            <span className="font-semibold text-mint-700">{featured.category}</span>
            <span className="text-ink-300">{featured.readMins} min read</span>
          </div>
          <h2 className="h2 mt-4 max-w-3xl">{featured.title}</h2>
          <p className="lede mt-4 max-w-2xl">{featured.excerpt}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-mint-600 group-hover:text-mint-700">
            Read the guide <Arrow className="h-4 w-4" />
          </span>
        </Link>
      </section>

      <section className="wrap mt-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group card flex flex-col transition-all hover:border-mint-300 hover:shadow-lift">
              <div className="flex items-center gap-3 text-[12px]">
                <span className="rounded-full bg-mint-50 px-2.5 py-1 font-bold uppercase tracking-wide text-mint-700">{p.category}</span>
                <span className="text-ink-300">{p.readMins} min</span>
              </div>
              <h2 className="mt-3.5 text-[17.5px] font-bold leading-snug text-ink">{p.title}</h2>
              <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-500">{p.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-mint-600 group-hover:text-mint-700">
                Read <Arrow className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title="Rather have us do it?"
        sub="Everything in these guides is what we implement for clinics. Take the free audit and we'll tell you which parts you actually need."
      />
    </>
  );
}
