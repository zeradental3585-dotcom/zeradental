import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';
import { CTABand, Process } from '@/components/Sections';
import { Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Dental Clinic Services — Websites, Local SEO, Booking | Zera Dental' },
  description:
    'Everything Zera Dental does for Indian dental clinics: custom website design, local SEO and Map Pack ranking, Google Business Profile setup, online appointment booking and website redesign.',
  alternates: { canonical: '/services' },
};

export default function Services() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">Services</span>
        <h1 className="h1 mt-3">Five things that decide whether patients find you</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          We do not sell social media management, printing, or anything else that is not directly tied to more patients
          finding and booking your clinic. This is the whole list.
        </p>
      </section>

      <section className="wrap">
        <Link
          href="/dental-seo-services-india"
          className="group mb-5 flex flex-col gap-4 rounded-3xl border border-mint-300 bg-mint-50/60 p-7 transition-all hover:shadow-lift sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="eyebrow">Monthly retainer</span>
            <h2 className="h3 mt-1.5">Dental SEO services</h2>
            <p className="mt-2 max-w-2xl text-[15.5px] leading-relaxed text-ink-500">
              Ongoing Map Pack rankings, treatment-keyword content and review systems — for clinics that want patients
              every month, not just a website. From ₹8,999/month, no lock-in.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-[14.5px] font-semibold text-white">
            See retainers <Arrow className="h-4 w-4" />
          </span>
        </Link>
        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`group card flex flex-col transition-all hover:border-mint-300 hover:shadow-lift ${i === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="h3">{s.title}</h2>
                  <p className="mt-1 text-[13px] font-semibold text-mint-600">{s.price}</p>
                </div>
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/12 text-ink-500 transition-all group-hover:border-mint-400 group-hover:bg-mint-50 group-hover:text-mint-600">
                  <Arrow className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-[15.5px] leading-relaxed text-ink-500">{s.intro}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.bullets.slice(0, i === 0 ? 6 : 3).map((b) => (
                  <li key={b} className="rounded-full bg-sand-50 px-3 py-1.5 text-[12.5px] font-medium text-ink-500">
                    {b}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <Process />
      <CTABand />
    </>
  );
}
