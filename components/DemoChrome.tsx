'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CLINIC } from '@/lib/demo';
import { TREATMENTS } from '@/lib/demo';
import { WhatsAppIcon } from './Icons';

const DEMO_WA =
  'https://wa.me/919835102324?text=' +
  encodeURIComponent("Hi Zera Dental, I'm looking at the demo clinic site. I'd like something like this for my clinic.");

export function DemoBanner() {
  return (
    <div className="sticky top-0 z-[60] bg-ink px-4 py-2.5 text-center text-[13px] text-white">
      <span className="font-semibold text-amber-300">Demo site.</span>{' '}
      <span className="text-white/75">
        Sunrise Dental Studio is not a real clinic — this is a sample build by{' '}
      </span>
      <Link href="/" className="font-semibold text-mint-200 underline underline-offset-2">
        Zera Dental
      </Link>
      <span className="text-white/75">. Do not use it to seek treatment.</span>
    </div>
  );
}

export function DemoHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-[41px] z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[66px] max-w-6xl items-center justify-between px-5">
        <Link href="/demo" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-600 text-[15px] font-bold text-white">S</span>
          <span className="text-[16px] font-bold tracking-tight text-slate-900">{CLINIC.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {TREATMENTS.map((t) => (
            <Link key={t.slug} href={`/demo/${t.slug}`} className="text-[14.5px] text-slate-600 hover:text-sky-700">
              {t.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:+919876543210`} className="hidden rounded-full border border-slate-300 px-4 py-2 text-[14px] font-semibold text-slate-700 sm:inline-block">
            Call
          </a>
          <a href={DEMO_WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-sky-700">
            <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
          </a>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-300 md:hidden" aria-label="Menu">
            <span className="text-slate-700">☰</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-5 py-3">
            {TREATMENTS.map((t) => (
              <Link key={t.slug} href={`/demo/${t.slug}`} onClick={() => setOpen(false)} className="block py-2.5 text-[15px] text-slate-700">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export function DemoFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="text-[15px] font-bold text-slate-900">{CLINIC.name}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
              12 Scheme No. 54, {CLINIC.area},<br />{CLINIC.city}, Madhya Pradesh 452010
            </p>
            <p className="mt-2 text-[14px] text-slate-600">{CLINIC.hours}</p>
          </div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-900">Treatments</div>
            <ul className="mt-3 space-y-2 text-[14px] text-slate-600">
              {TREATMENTS.map((t) => (
                <li key={t.slug}><Link href={`/demo/${t.slug}`} className="hover:text-sky-700">{t.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[13px] font-bold uppercase tracking-wide text-slate-900">Book</div>
            <a href={DEMO_WA} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[14px] font-semibold text-white">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us
            </a>
            <p className="mt-3 text-[13.5px] text-slate-500">Replies within a few hours, seven days a week.</p>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-[13px] text-slate-500">
          <p>
            <strong className="text-slate-700">This is a demonstration website.</strong> Sunrise Dental Studio does not
            exist. Every detail — the doctor, the address, the reviews, the prices — is illustrative. Built by{' '}
            <Link href="/" className="underline underline-offset-2 hover:text-sky-700">Zera Dental</Link>, a property of{' '}
            <a href="https://zeratech.io/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-sky-700">
              Zera Technologies
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function DemoFloat() {
  return (
    <a href={DEMO_WA} target="_blank" rel="noopener noreferrer"
       className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white shadow-lg">
      <WhatsAppIcon className="h-5 w-5" /> <span className="hidden sm:inline">Book appointment</span>
    </a>
  );
}

export { DEMO_WA };
