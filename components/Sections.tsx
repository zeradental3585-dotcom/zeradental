'use client';
import Link from 'next/link';
import { useState } from 'react';
import { WA } from '@/lib/site';
import { Check, Arrow, WhatsAppIcon } from './Icons';

export function CTABand({
  title = 'Ready to stop losing patients to Google?',
  sub = 'Take the free 2-minute clinic audit, or message us on WhatsApp and talk to a human today.',
  waLink = WA.general,
}: { title?: string; sub?: string; waLink?: string }) {
  return (
    <section className="wrap my-20">
      <div className="grain relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-12">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-mint-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-mint-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-[28px] leading-tight tracking-[-.02em] text-white sm:text-[38px]">{title}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-white/70">{sub}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/free-website-audit" className="btn-primary">Get my free clinic audit <Arrow className="h-4 w-4" /></Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn !bg-white/10 !text-white ring-1 ring-inset ring-white/20 hover:!bg-white/[.16]">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
            </a>
          </div>
          <p className="mt-5 text-[13px] text-white/45">Replies within a few working hours · No obligation · No cold calls</p>
        </div>
      </div>
    </section>
  );
}

export function FAQ({ items, title = 'Questions dentists ask us' }: { items: { q: string; a: string }[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="wrap my-20">
      <div className="mx-auto max-w-3xl">
        <span className="eyebrow">FAQ</span>
        <h2 className="h2 mt-2">{title}</h2>
        <div className="mt-8 divide-y divide-ink/[.08] border-y border-ink/[.08]">
          {items.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="text-[16.5px] font-semibold leading-snug text-ink">{f.q}</span>
                <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-500 transition-transform ${open === i ? 'rotate-45' : ''}`}>
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
              </button>
              {open === i && <p className="-mt-1 max-w-2xl pb-6 text-[15.5px] leading-relaxed text-ink-500">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[34px] leading-none tracking-[-.02em] text-ink sm:text-[42px]">{value}</div>
      <div className="mt-2 text-[13px] font-medium leading-snug text-ink-300">{label}</div>
    </div>
  );
}

export function Proof() {
  const facts = [
    { n: '6', l: 'live properties we built, wrote and ranked ourselves' },
    { n: '0', l: 'rupees of ad spend behind any of them' },
    { n: 'EN + HI', l: 'bilingual content engineering, in-house' },
    { n: '7 days', l: 'from kickoff to a live, indexed clinic site' },
  ];
  return (
    <section className="wrap my-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Straight answer</span>
        <h2 className="h2 mt-2">We are new to dentistry. We are not new to ranking.</h2>
        <p className="lede mt-4">
          Plenty of agencies will show you a wall of five-star quotes. We would rather tell you exactly what we have
          done and let you check it yourself.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr,.9fr]">
        <div className="card">
          <h3 className="h3">What we have actually built</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-500">
            Zera Technologies runs its own portfolio of search-driven websites across India — land records, education,
            parenting, civic information. Every one of them was designed, written and ranked in-house, on organic search
            alone. They are all live right now and you can open any of them.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-5 border-t border-ink/[.07] pt-6 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.l}>
                <div className="font-display text-[26px] leading-none tracking-[-.02em] text-ink">{f.n}</div>
                <div className="mt-1.5 text-[12.5px] leading-snug text-ink-300">{f.l}</div>
              </div>
            ))}
          </div>
          <Link href="/portfolio" className="btn-ghost mt-6 !px-5 !py-2.5 !text-sm">
            See every live site <Arrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl border border-mint-200 bg-mint-50/60 p-6 sm:p-7">
          <span className="eyebrow">Founding clinics</span>
          <h3 className="h3 mt-2">The first ten clinics get founding terms</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
            We are building our dental portfolio, and being early is worth something. The first ten clinics we work with
            get:
          </p>
          <div className="mt-5">
            <CheckList items={[
              'Founding pricing, locked for life on any future package',
              'Direct WhatsApp access to the person building your site',
              'Double the standard free-edit window',
              'A written 90-day plan, so you can hold us to something specific',
            ]} />
          </div>
          <p className="mt-5 text-[13.5px] leading-relaxed text-ink-300">
            In exchange we ask one thing: if the site works, let us show it as a case study.
          </p>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-mint-100 text-mint-600">
            <Check className="h-2.5 w-2.5" />
          </span>
          <span className="text-[15px] leading-relaxed text-ink-700/90">{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Process() {
  const steps = [
    { n: '01', t: 'Free audit & call', d: 'We look at your Google listing, your current site and your top three local competitors, then tell you exactly where the patients are leaking. Takes 20 minutes on WhatsApp or a call.' },
    { n: '02', t: 'Content & keyword plan', d: 'We map the treatments you actually want more of to the words patients in your city are typing. That map becomes your sitemap — no guesswork, no filler pages.' },
    { n: '03', t: 'Design & build', d: 'Hand-coded, mobile-first, and fast. You see a live preview link before anything goes public, and you get unlimited revisions on the design until it feels like your clinic.' },
    { n: '04', t: 'Launch & Google setup', d: 'We connect Search Console and Analytics, submit your sitemap, optimise your Business Profile, and make sure your name, address and phone match everywhere online.' },
    { n: '05', t: 'Grow', d: 'Reviews start coming in through the system we set up, articles get published, rankings climb. You get a plain-English report on WhatsApp every month if you are on Zera Care.' },
  ];
  return (
    <section className="wrap my-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">How it works</span>
        <h2 className="h2 mt-2">From first message to first patient</h2>
        <p className="lede mt-4">No jargon, no long agency onboarding. Most clinics go live inside two weeks.</p>
      </div>
      <ol className="mx-auto mt-12 max-w-3xl">
        {steps.map((s, i) => (
          <li key={s.n} className="relative flex gap-5 pb-9 last:pb-0">
            {i < steps.length - 1 && <span className="absolute left-[19px] top-11 h-[calc(100%-2.75rem)] w-px bg-ink/10" />}
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-bold text-mint-200">{s.n}</span>
            <div className="pt-1">
              <h3 className="text-[17px] font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-500">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
