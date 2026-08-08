'use client';
import { useState } from 'react';
import { LEAD_ENDPOINT, WA } from '@/lib/site';
import { WhatsAppIcon, Check } from './Icons';

type Props = {
  source: string;
  compact?: boolean;
  heading?: string;
  sub?: string;
  cta?: string;
  extra?: Record<string, string | number>;
};

export default function LeadForm({ source, compact, heading, sub, cta = 'Get my free audit', extra }: Props) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', clinic: '', phone: '', city: '', website: '', message: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.name.trim().length > 1 && /^[0-9]{10}$/.test(form.phone.replace(/\D/g, '').slice(-10));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || state === 'sending') return;
    setState('sending');
    const payload = {
      ...form,
      ...extra,
      source,
      page: typeof window !== 'undefined' ? window.location.pathname : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setState('done');
      const msg = `Hi Zera Dental, I just submitted the form on your website.%0A%0AName: ${form.name}%0AClinic: ${form.clinic || '-'}%0ACity: ${form.city || '-'}%0AI'd like to discuss my clinic website.`;
      setTimeout(() => window.open(`https://wa.me/919835102324?text=${msg}`, '_blank'), 600);
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-mint-200 bg-mint-50 p-7 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl">Got it, {form.name.split(' ')[0]}.</h3>
        <p className="mt-2 text-[15px] text-ink-500">
          Your details are with us. We&apos;ll send your report on WhatsApp within a few working hours — usually much sooner.
        </p>
        <a href={WA.general} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5">
          <WhatsAppIcon className="h-4 w-4" /> Open WhatsApp now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? '' : 'card'} noValidate>
      {heading && <h3 className="h3">{heading}</h3>}
      {sub && <p className="mt-2 text-[15px] text-ink-500">{sub}</p>}

      <div className={`grid gap-3 ${heading ? 'mt-5' : ''} sm:grid-cols-2`}>
        <Field label="Your name" required value={form.name} onChange={set('name')} placeholder="Dr. Ananya Sharma" autoComplete="name" />
        <Field label="WhatsApp number" required value={form.phone} onChange={set('phone')} placeholder="98765 43210" type="tel" inputMode="numeric" autoComplete="tel" />
        <Field label="Clinic name" value={form.clinic} onChange={set('clinic')} placeholder="Smile Care Dental" />
        <Field label="City" value={form.city} onChange={set('city')} placeholder="Pune" />
        <div className="sm:col-span-2">
          <Field label="Existing website (if any)" value={form.website} onChange={set('website')} placeholder="www.yourclinic.com — leave blank if none" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-[13px] font-semibold text-ink">What do you need? <span className="font-normal text-ink-300">(optional)</span></label>
          <textarea
            value={form.message}
            onChange={set('message')}
            rows={3}
            placeholder="e.g. New website for a 2-chair clinic, want to rank for implants in my area."
            className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-300/70 focus:border-mint-400 focus:ring-2 focus:ring-mint-100"
          />
        </div>
      </div>

      <button type="submit" disabled={!valid || state === 'sending'} className="btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50">
        {state === 'sending' ? 'Sending…' : cta}
      </button>

      {state === 'error' && (
        <p className="mt-3 text-center text-[13.5px] text-red-600">
          Something went wrong. Please{' '}
          <a href={WA.general} target="_blank" rel="noopener noreferrer" className="underline">message us on WhatsApp</a> instead.
        </p>
      )}

      <p className="mt-3 text-center text-[12.5px] leading-relaxed text-ink-300">
        No spam, no cold calls. We reply on WhatsApp. Your details are never sold or shared.
      </p>
    </form>
  );
}

function Field({
  label, required, ...props
}: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-ink">
        {label} {required && <span className="text-mint-600">*</span>}
      </label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-300/70 focus:border-mint-400 focus:ring-2 focus:ring-mint-100"
      />
    </div>
  );
}
