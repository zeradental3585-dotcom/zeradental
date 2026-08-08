import type { Metadata } from 'next';
import Link from 'next/link';
import { CITIES } from '@/lib/cities';
import { CTABand } from '@/components/Sections';
import { Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Dental Website Design by City — 20 Indian Cities' },
  description:
    'Dental clinic website design across India — Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Jaipur, Lucknow, Patna, Indore and more. City-by-city competition breakdowns.',
  alternates: { canonical: '/locations' },
};

export default function Locations() {
  const regions = Array.from(new Set(CITIES.map((c) => c.region)));
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Cities', url: '/locations' }]),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Cities where Zera Dental builds dental clinic websites',
          itemListElement: CITIES.map((c, i) => ({
            '@type': 'ListItem', position: i + 1, name: `Dental website design in ${c.name}`,
            url: `https://zeradental.in/dental-website-design/${c.slug}`,
          })),
        },
      ]} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">Cities</span>
        <h1 className="h1 mt-3">Every city ranks differently</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          Ranking a clinic in Patna takes a fraction of the work it takes in Gurgaon. We publish an honest breakdown of
          the competition, the search behaviour and the fastest wins for each city we build in.
        </p>
      </section>

      <section className="wrap pb-8">
        {regions.map((region) => (
          <div key={region} className="mb-12">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-300">{region}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {CITIES.filter((c) => c.region === region).map((c) => (
                <Link key={c.slug} href={`/dental-website-design/${c.slug}`} className="group card transition-all hover:border-mint-300 hover:shadow-lift">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[17px] font-bold text-ink">{c.name}</h3>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/12 text-ink-500 transition-all group-hover:border-mint-400 group-hover:bg-mint-50 group-hover:text-mint-600">
                      <Arrow className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-ink-300">{c.state} · {c.language}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-500">{c.competitionNote}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="wrap my-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8 text-center">
          <h2 className="h3">Your city not listed?</h2>
          <p className="lede mt-3">
            We work entirely over WhatsApp and video call, so we build for clinics anywhere in India. Message us with
            your city and we will tell you honestly how competitive it is.
          </p>
          <Link href="/contact" className="btn-dark mt-6">Ask about your city <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <CTABand />
    </>
  );
}
