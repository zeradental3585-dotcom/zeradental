import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPost } from '@/lib/posts';
import { SITE, WA } from '@/lib/site';
import { CTABand, FAQ } from '@/components/Sections';
import { RichText } from '@/components/RichText';
import { Arrow, Check, WhatsAppIcon } from '@/components/Icons';
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDesc,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: 'article',
      title: p.metaTitle,
      description: p.metaDesc,
      url: `${SITE.url}/blog/${p.slug}`,
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
    },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        articleSchema({ title: p.title, description: p.metaDesc, slug: p.slug, date: p.date, updated: p.updated }),
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Guides', url: '/blog' }, { name: p.title, url: `/blog/${p.slug}` }]),
        faqSchema(p.faqs),
      ]} />

      <article>
        <header className="border-b border-ink/[.07] bg-gradient-to-b from-mint-50/50 to-white">
          <div className="wrap py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="text-[13px] text-ink-300">
              <Link href="/" className="hover:text-mint-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-mint-600">Guides</Link>
            </nav>
            <div className="mt-5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-[12.5px]">
                <span className="rounded-full bg-mint-50 px-2.5 py-1 font-bold uppercase tracking-wide text-mint-700">{p.category}</span>
                <span className="text-ink-300">{p.readMins} min read</span>
                <span className="text-ink-300">·</span>
                <time dateTime={p.date} className="text-ink-300">{fmt(p.date)}</time>
              </div>
              <h1 className="h1 mt-4">{p.title}</h1>
              <p className="lede mt-5">{p.excerpt}</p>
            </div>
          </div>
        </header>

        <div className="wrap grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr),320px] lg:gap-16">
          <div className="min-w-0">
            {/* Takeaways */}
            <aside className="rounded-2xl border border-mint-200 bg-mint-50/60 p-6">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-mint-700">Key takeaways</h2>
              <ul className="mt-3.5 space-y-2.5">
                {p.takeaways.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-mint-500 text-white">
                      <Check className="h-2.5 w-2.5" />
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-ink-700/90">{t}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Body */}
            <div className="prose-z mt-10">
              {p.sections.map((s) => (
                <section key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p.map((para, i) => (
                    <p key={i}><RichText text={para} /></p>
                  ))}
                </section>
              ))}
            </div>

            {/* Inline CTA */}
            <div className="mt-12 rounded-2xl bg-ink p-7 sm:p-9">
              <h2 className="font-display text-2xl text-white">Want this done for your clinic?</h2>
              <p className="mt-3 max-w-lg text-[15.5px] leading-relaxed text-white/70">
                We build search-optimised websites for dental clinics across India, from ₹14,999. Start with the free
                audit — it tells you which parts of this article actually apply to you.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/free-website-audit" className="btn-primary">Free clinic audit <Arrow className="h-4 w-4" /></Link>
                <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn !bg-white/10 !text-white ring-1 ring-inset ring-white/20 hover:!bg-white/[.16]">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              source={`Blog — ${p.title}`}
              heading="Free clinic audit"
              sub="Score your clinic's online presence and get a prioritised fix plan on WhatsApp."
              cta="Get my free audit"
            />
            <div className="mt-6 rounded-2xl border border-ink/[.08] bg-sand-50 p-6">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink">In this guide</h2>
              <ul className="mt-3 space-y-2">
                {p.sections.map((s) => (
                  <li key={s.h} className="text-[14px] leading-snug text-ink-500">· {s.h}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      <FAQ items={p.faqs} title="Frequently asked" />

      <section className="wrap my-16">
        <h2 className="h3">Keep reading</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/blog/${r.slug}`} className="group card transition-all hover:border-mint-300 hover:shadow-lift">
              <span className="text-[12px] font-bold uppercase tracking-wide text-mint-700">{r.category}</span>
              <h3 className="mt-2 text-[16px] font-bold leading-snug text-ink">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{r.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
