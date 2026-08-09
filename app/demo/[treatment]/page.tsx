import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TREATMENTS, getTreatment, CLINIC } from '@/lib/demo';
import { DEMO_WA } from '@/components/DemoChrome';
import { WhatsAppIcon, Arrow, Check } from '@/components/Icons';

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ treatment: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ treatment: string }> }): Promise<Metadata> {
  const { treatment } = await params;
  const t = getTreatment(treatment);
  return { title: { absolute: t ? `${t.name} — demo clinic site by Zera Dental` : 'Demo' } };
}

export default async function TreatmentPage({ params }: { params: Promise<{ treatment: string }> }) {
  const { treatment } = await params;
  const t = getTreatment(treatment);
  if (!t) notFound();
  const others = TREATMENTS.filter((x) => x.slug !== t.slug);

  return (
    <>
      <section className="bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <nav className="text-[13px] text-slate-500">
            <Link href="/demo" className="hover:text-sky-700">{CLINIC.name}</Link>
            <span className="mx-2">/</span>
            <span>{t.name}</span>
          </nav>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr,.9fr]">
            <div>
              <h1 className="font-display text-[34px] leading-tight tracking-tight text-slate-900 sm:text-[42px]">
                {t.name} in {CLINIC.area}, {CLINIC.city}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-600">{t.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-sky-700 shadow-sm">{t.price}</span>
                <span className="rounded-full bg-white px-4 py-2 text-[14px] text-slate-600 shadow-sm">{t.duration}</span>
              </div>
              <a href={DEMO_WA} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-sky-700">
                <WhatsAppIcon className="h-4 w-4" /> Ask about {t.name.toLowerCase()}
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-[16px] font-bold text-slate-900">What it costs here</h2>
              <p className="mt-2 text-[26px] font-bold text-sky-700">{t.price}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                We quote before we begin. No treatment is added mid-appointment without asking you first.
              </p>
              <ul className="mt-4 space-y-2">
                {['Written estimate before starting', 'EMI available over 3–12 months', 'Follow-up visits included'].map((x) => (
                  <li key={x} className="flex gap-2.5 text-[14px] text-slate-600">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-sky-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14">
        <h2 className="font-display text-[28px] tracking-tight text-slate-900">What actually happens</h2>
        <ol className="mt-7">
          {t.steps.map((s, i) => (
            <li key={s.h} className="relative flex gap-5 pb-8 last:pb-0">
              {i < t.steps.length - 1 && <span className="absolute left-[17px] top-10 h-[calc(100%-2.5rem)] w-px bg-slate-200" />}
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-600 text-[13px] font-bold text-white">{i + 1}</span>
              <div className="pt-1">
                <h3 className="text-[17px] font-bold text-slate-900">{s.h}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{s.p}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-12 font-display text-[28px] tracking-tight text-slate-900">Questions patients ask</h2>
        <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          {t.faqs.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="text-[16px] font-semibold text-slate-900">{f.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-6">
        <h2 className="font-display text-[24px] tracking-tight text-slate-900">Other treatments</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/demo/${o.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md">
              <h3 className="text-[16px] font-bold text-slate-900">{o.name}</h3>
              <p className="mt-1.5 text-[14px] text-slate-600">{o.short}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-ink px-6 py-10 text-center sm:px-12">
          <h2 className="font-display text-[24px] leading-tight tracking-tight text-white sm:text-[30px]">
            Every treatment you offer deserves a page like this.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[15.5px] leading-relaxed text-white/70">
            It is how patients search, and it is why one combined services page cannot compete.
          </p>
          <Link href="/free-website-audit" className="btn-primary mt-6">See what your clinic is missing <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>
    </>
  );
}
