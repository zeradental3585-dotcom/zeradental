import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, WA } from '@/lib/site';
import { CTABand, Stat } from '@/components/Sections';
import { WhatsAppIcon, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'About Zera Dental — Websites for Indian Dental Clinics' },
  description:
    'Zera Dental is the dental division of Zera Technologies, an engineering-first web studio in India. We build search-optimised websites for dental clinics and grow them on organic search, not ad spend.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }])} />

      <section className="wrap py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">About us</span>
          <h1 className="h1 mt-3">We are engineers who got tired of watching good dentists lose to bad websites.</h1>
          <p className="lede mt-6">
            Zera Dental is the dental division of Zera Technologies, a web and app studio that builds and runs its own
            search-driven properties across India. We do not buy traffic for our own products and we do not build
            ad-dependent websites for clients. Everything we know about ranking, we learned by ranking our own sites first.
          </p>
        </div>
      </section>

      <section className="border-y border-ink/[.07] bg-sand-50 py-10">
        <div className="wrap grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Stat value="8+" label="Live digital products built and run in-house" />
          <Stat value="20+" label="Indian cities we build clinic websites for" />
          <Stat value="100%" label="Organic-search growth, zero ad spend" />
          <Stat value="EN + HI" label="Bilingual engineering, built in" />
        </div>
      </section>

      <article className="wrap my-16">
        <div className="mx-auto max-w-3xl prose-z">
          <h2>Why dentistry specifically</h2>
          <p>
            Dentistry in India sits in an unusual position. Demand is genuinely high and rising, patients almost always
            search online before they book, and yet the vast majority of clinics either have no website or have one built
            years ago by someone who never came back. The gap between what patients do and what clinics offer online is
            wider in dentistry than in almost any other local service category.
          </p>
          <p>
            That gap is also unusually fixable. A dental clinic does not need a hundred pages or a complex platform. It
            needs to load fast, appear on Google Maps, list its treatments properly, collect reviews, and let a patient
            message on WhatsApp without thinking about it. Five things, done properly, executed once.
          </p>

          <h2>How we are different from an agency</h2>
          <p>
            We publish our prices, which most Indian agencies refuse to do. We give away a genuinely useful free audit,
            including when the honest conclusion is that you do not need us yet. We hand over full ownership of your
            domain, your site and every Google account we create in your name. And we do not lock anyone into a retainer
            — the monthly plan exists because it is useful, not because the website stops working without it.
          </p>
          <p>
            We also do not sell things we are not good at. No social media management, no printing, no paid ads. Our
            entire model is organic search, because it compounds instead of stopping the day you pause the budget.
          </p>

          <h2>How we work</h2>
          <p>
            Everything runs on WhatsApp and video calls, which means we work with clinics in Patna and Coimbatore as
            easily as in Delhi. Most clinic owners spend under two hours total across an entire project — a short
            interview, one round of feedback on the preview link, and approval.
          </p>
          <p>
            Sites are hand-coded on Next.js and deployed to a global edge network. There is no page builder, no plugin
            stack to maintain, and nothing that breaks silently six months after launch.
          </p>

          <h2>Ownership</h2>
          <p>
            Zera Dental (zeradental.in) is a property of{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">Zera Technologies</a>, which designs,
            develops and operates the site. All client work is delivered under the Zera Technologies umbrella, and every
            website we build is registered in the client&apos;s own name with full admin access handed over at launch.
          </p>
        </div>
      </article>

      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8 text-center sm:p-12">
          <h2 className="h3">Talk to the person who will actually build your site</h2>
          <p className="lede mx-auto mt-3 max-w-lg">
            No account managers, no sales team. You message us, we reply.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
            <Link href="/free-website-audit" className="btn-ghost">Get the free audit first <Arrow className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
