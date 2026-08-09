import type { Metadata } from 'next';
import Link from 'next/link';
import { CLINIC, TREATMENTS } from '@/lib/demo';
import { DEMO_WA } from '@/components/DemoChrome';
import { Check, Star, WhatsAppIcon, Arrow } from '@/components/Icons';

export const metadata: Metadata = {
  title: { absolute: 'Demo clinic site — built by Zera Dental' },
  description: 'A sample dental clinic website built to the standard Zera Dental delivers. Sunrise Dental Studio is a fictional clinic.',
};

export default function DemoHome() {
  return (
    <>
      {/* hero */}
      <section className="bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr,.95fr] lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-sky-700 shadow-sm">
              <span className="flex gap-0.5 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5" />)}</span>
              {CLINIC.rating} from {CLINIC.reviews} Google reviews
            </div>
            <h1 className="mt-5 font-display text-[36px] leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              {CLINIC.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-600">
              {CLINIC.doctor} and team have looked after families in {CLINIC.area} for {CLINIC.years} years. We explain
              what we are doing, we tell you the cost before we start, and we never sell you treatment you do not need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={DEMO_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-sky-700">
                <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
              </a>
              <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-[15px] font-semibold text-slate-700 hover:bg-slate-50">
                Call {CLINIC.phoneDisplay}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-slate-600">
              {['Open until 8pm', 'Same-day emergency slots', 'EMI available'].map((x) => (
                <span key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-sky-600" /> {x}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-[17px] font-bold text-slate-900">Request an appointment</h2>
            <p className="mt-1.5 text-[14px] text-slate-600">We confirm on WhatsApp, usually within the hour.</p>
            <div className="mt-5 space-y-3">
              {['Your name', 'Mobile number', 'Which treatment?'].map((p) => (
                <div key={p} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-400">{p}</div>
              ))}
              <div className="rounded-xl bg-sky-600 px-4 py-3 text-center text-[14px] font-semibold text-white">Request appointment</div>
            </div>
            <p className="mt-3 text-center text-[12px] text-slate-400">Form is illustrative on this demo.</p>
          </div>
        </div>
      </section>

      {/* treatments */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-display text-[30px] tracking-tight text-slate-900">Treatments we are known for</h2>
        <p className="mt-3 max-w-2xl text-[16px] text-slate-600">
          Each treatment has its own page with real costs, what the appointment involves, and the questions patients
          actually ask. That is how people search — and how they decide.
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {TREATMENTS.map((t) => (
            <Link key={t.slug} href={`/demo/${t.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
              <h3 className="text-[18px] font-bold text-slate-900">{t.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">{t.short}</p>
              <p className="mt-4 text-[14px] font-semibold text-sky-700">{t.price}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-sky-700">
                Read more <Arrow className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* trust */}
      <section className="border-y border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 lg:grid-cols-4">
          {[[`${CLINIC.years} yrs`, 'Serving Vijay Nagar'], [CLINIC.reviews, 'Google reviews'], ['6,400+', 'Treatments completed'], ['Same day', 'Emergency appointments']].map(([a, b]) => (
            <div key={String(b)} className="text-center">
              <div className="font-display text-[30px] tracking-tight text-slate-900">{a}</div>
              <div className="mt-1 text-[13px] text-slate-500">{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* location */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[30px] tracking-tight text-slate-900">Finding us</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-slate-600">
              12 Scheme No. 54, {CLINIC.area}, {CLINIC.city} — opposite the C21 Mall entrance, second floor above the
              pharmacy. Free parking in the building basement.
            </p>
            <p className="mt-4 text-[15px] text-slate-600"><strong className="text-slate-900">Hours:</strong> {CLINIC.hours}</p>
            <p className="mt-1 text-[15px] text-slate-600"><strong className="text-slate-900">Phone:</strong> {CLINIC.phoneDisplay}</p>
          </div>
          <div className="grid min-h-[220px] place-items-center rounded-2xl border border-slate-200 bg-slate-100 text-[14px] text-slate-500">
            Google Map embed sits here on a live build
          </div>
        </div>
      </section>

      {/* back to Zera */}
      <section className="mx-auto max-w-6xl px-5 pb-6">
        <div className="rounded-3xl bg-ink px-6 py-10 text-center sm:px-12">
          <h2 className="font-display text-[26px] leading-tight tracking-tight text-white sm:text-[32px]">
            This is what your clinic&apos;s website could look like.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/70">
            Sunrise Dental Studio is invented — but the build is real. Treatment pages, WhatsApp booking, sub-2-second
            load, schema markup. From ₹14,999, live in 7 days.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-website-audit" className="btn-primary">Get my free clinic audit <Arrow className="h-4 w-4" /></Link>
            <Link href="/pricing" className="btn !bg-white/10 !text-white ring-1 ring-inset ring-white/20 hover:!bg-white/[.16]">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
