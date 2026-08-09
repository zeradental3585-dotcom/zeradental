import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/lib/services';
import { PLANS } from '@/lib/pricing';
import { WA, SITE } from '@/lib/site';
import { CheckList, CTABand, FAQ } from '@/components/Sections';
import { WhatsAppIcon, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/JsonLd';
import LeadForm from '@/components/LeadForm';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDesc,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { siteName: SITE.name, locale: 'en_IN', title: s.metaTitle, description: s.metaDesc, url: `${SITE.url}/services/${s.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: s.title, url: `/services/${s.slug}` }]),
        faqSchema(s.faqs),
        serviceSchema(s.title, s.metaDesc, `/services/${s.slug}`),
      ]} />

      <section className="border-b border-ink/[.07] bg-gradient-to-b from-mint-50/60 to-white">
        <div className="wrap py-12 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-[13px] text-ink-300">
            <Link href="/" className="hover:text-mint-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-mint-600">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-500">{s.title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr,.85fr] lg:gap-14">
            <div>
              <h1 className="h1">{s.h1}</h1>
              <p className="lede mt-5">{s.intro}</p>
              <p className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-mint-200">{s.price}</p>
              <div className="mt-7">
                <CheckList items={s.bullets} />
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <WhatsAppIcon className="h-4 w-4" /> Discuss on WhatsApp
                </a>
                <Link href="/pricing" className="btn-ghost">See pricing <Arrow className="h-4 w-4" /></Link>
              </div>
            </div>

            <div className="lg:pt-4">
              <LeadForm
                source={`Service page — ${s.title}`}
                heading="Free clinic audit"
                sub="Tell us your clinic and city. We'll check your Google listing and site, then send a fix plan on WhatsApp. No cost, no obligation."
                cta="Send me my free audit"
              />
            </div>
          </div>
        </div>
      </section>

      <article className="wrap my-16">
        <div className="mx-auto max-w-3xl prose-z">
          {s.body.map((b) => (
            <section key={b.h}>
              <h2>{b.h}</h2>
              {b.p.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}
        </div>
      </article>

      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8">
          <h2 className="h3">Which package includes this?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.slug} className="rounded-2xl bg-white p-5 shadow-soft">
                <div className="text-[13px] font-bold uppercase tracking-wide text-ink-300">{p.name}</div>
                <div className="mt-1.5 font-display text-2xl">{p.priceLabel}</div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{p.timeline}</p>
              </div>
            ))}
          </div>
          <Link href="/pricing" className="btn-dark mt-6">Compare packages <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <FAQ items={s.faqs} title={`${s.title} — common questions`} />

      <section className="wrap my-16">
        <h2 className="h3 text-center">Other things we do</h2>
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {others.map((o) => (
            <Link key={o.slug} href={`/services/${o.slug}`} className="rounded-full border border-ink/12 bg-white px-4 py-2 text-[14px] font-medium text-ink-500 hover:border-mint-400 hover:bg-mint-50 hover:text-mint-700">
              {o.title}
            </Link>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
