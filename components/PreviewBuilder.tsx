'use client';
import { useEffect, useState } from 'react';
import { SITE, wa } from '@/lib/site';
import { WhatsAppIcon, Check, Arrow } from './Icons';

/* "See your clinic's website" — a dentist fills four fields and gets a real preview site on
 * sites.zeradental.in in about a minute. The lead also goes to the Zera Dental Leads sheet. */

const ENDPOINT = process.env.NEXT_PUBLIC_PREVIEW_ENDPOINT || 'https://sites.zeradental.in/api/public/preview';

const TREATMENTS: [string, string][] = [
  ['checkup-cleaning', 'Check-ups & cleaning'], ['root-canal', 'Root canal'], ['implants', 'Implants'],
  ['braces', 'Braces'], ['aligners', 'Clear aligners'], ['crowns-bridges', 'Crowns & bridges'],
  ['teeth-whitening', 'Teeth whitening'], ['smile-design', 'Smile design'], ['kids-dentistry', "Kids' dentistry"],
  ['dentures', 'Dentures'], ['extraction-wisdom', 'Extractions & wisdom teeth'], ['gum-treatment', 'Gum treatment'],
];
const DEFAULTS = ['checkup-cleaning', 'root-canal', 'implants', 'braces', 'crowns-bridges', 'extraction-wisdom'];
const STEPS = ['Reading your clinic details…', 'Writing your clinic introduction…', 'Designing your pages…', 'Adding your treatments…', 'Almost ready…'];

const inputCls =
  'mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-300/70 focus:border-mint-400 focus:ring-2 focus:ring-mint-100';

type Result = { url: string; clinic: string };

export default function PreviewBuilder({ source = 'Website preview builder' }: { source?: string }) {
  const [f, setF] = useState({ clinic: '', city: '', doctor: '', phone: '', maps: '', website: '' });
  const [picked, setPicked] = useState<string[]>(DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState<Result | null>(null);

  useEffect(() => {
    if (!busy) return;
    setStep(0);
    const t = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 7000);
    return () => window.clearInterval(t);
  }, [busy]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((x) => ({ ...x, [k]: e.target.value }));
  const toggle = (k: string) => setPicked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const phone = f.phone.replace(/\D/g, '').slice(-10);

  function logLead(message: string) {
    // Goes through our own /api/lead rather than straight to Apps Script with
    // mode:'no-cors'. An opaque response resolves even on a 4xx/5xx, which is how a
    // broken sheet once looked like success. Still fire-and-forget on the client:
    // the preview matters more than the log, but failures now show in the server logs.
    // name falls back to the clinic because the doctor field is optional here and
    // /api/lead requires a name.
    try {
      fetch('/api/lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: f.doctor.trim() || f.clinic.trim(), phone, clinic: f.clinic, city: f.city, source, message,
          page: window.location.pathname, referrer: document.referrer, timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch { /* the preview matters more than the log */ }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (f.clinic.trim().length < 3) return setErr("Please add your clinic's name.");
    if (f.city.trim().length < 2) return setErr('Please add your city.');
    if (!/^[6-9]\d{9}$/.test(phone)) return setErr('Please add a 10-digit WhatsApp number.');
    if (f.maps.trim() && !/^https:\/\//.test(f.maps.trim())) return setErr('The Google Maps link should start with https://. Or leave it empty.');
    setBusy(true);
    let r: { ok?: boolean; url?: string; error?: string; busy?: boolean } = {};
    // The copy promises "about a minute". Without a timeout a hung builder leaves the
    // dentist watching "Almost ready…" indefinitely with no error and no way out, so
    // we abort and fall through to the error branch, which offers the WhatsApp route.
    const ac = new AbortController();
    const timer = window.setTimeout(() => ac.abort(), 90_000);
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: ac.signal,
        body: JSON.stringify({ clinic: f.clinic, city: f.city, doctor: f.doctor, phone, maps_link: f.maps.trim(), treatments: picked, website: f.website }),
      });
      r = await res.json();
    } catch (e) {
      r = (e as Error)?.name === 'AbortError'
        ? { ok: false, error: 'Our builder is taking longer than usual.' }
        : { ok: false, error: "We couldn't reach our builder just now." };
    } finally {
      window.clearTimeout(timer);
    }
    setBusy(false);
    if (r.ok && r.url) {
      logLead(`Made a website preview: ${r.url}${f.maps.trim() ? ` | Maps: ${f.maps.trim()}` : ''}`);
      setDone({ url: r.url, clinic: f.clinic.trim() });
      return;
    }
    logLead(`Tried the website preview builder but it failed (${r.error ?? 'error'}). Make one by hand.${f.maps.trim() ? ` Maps: ${f.maps.trim()}` : ''}`);
    setErr(r.error ?? 'Something went wrong.');
  }

  if (done) {
    const goLive = wa(`Hi Zera Dental, I made a website preview for ${done.clinic}: ${done.url}\n\nI'd like to talk about putting it live.`);
    const change = wa(`Hi Zera Dental, I made a website preview for ${done.clinic}: ${done.url}\n\nCan you change a few things?`);
    return (
      <div className="card text-center" role="status">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-mint-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-4 font-display text-[26px] leading-tight tracking-[-.01em] text-ink">Your website is ready</h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-500">
          This is a real, working website for {done.clinic}. Open it on your phone, then tell us what you&apos;d like changed.
          We add your photos, timings and prices before it goes live.
        </p>
        <a href={done.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full sm:w-auto">
          Open my website <Arrow className="h-4 w-4" />
        </a>
        <div className="mt-3 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={goLive} target="_blank" rel="noopener noreferrer" className="btn-wa">
            <WhatsAppIcon className="h-4 w-4" /> Put it live on my own domain
          </a>
          <a href={change} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask for changes</a>
        </div>
        <p className="mt-5 text-[13px] text-ink-300">
          Live on your own domain from ₹14,999, one time. Domain and first-year hosting included. Pay only when you are happy with it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card" noValidate aria-busy={busy}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-[13px] font-semibold text-ink">
          Clinic name <span className="text-mint-600">*</span>
          <input className={inputCls} value={f.clinic} onChange={set('clinic')} placeholder="Smile Care Dental Clinic" maxLength={80} required />
        </label>
        <label className="block text-[13px] font-semibold text-ink">
          City <span className="text-mint-600">*</span>
          <input className={inputCls} value={f.city} onChange={set('city')} placeholder="Patna" maxLength={50} required />
        </label>
        <label className="block text-[13px] font-semibold text-ink">
          Doctor&apos;s name
          <input className={inputCls} value={f.doctor} onChange={set('doctor')} placeholder="Dr. Ananya Sharma" maxLength={60} autoComplete="name" />
        </label>
        <label className="block text-[13px] font-semibold text-ink">
          WhatsApp number <span className="text-mint-600">*</span>
          <input className={inputCls} value={f.phone} onChange={set('phone')} placeholder="98765 43210" type="tel" inputMode="numeric" autoComplete="tel" maxLength={16} required />
        </label>
        <label className="block text-[13px] font-semibold text-ink sm:col-span-2">
          Google Maps link of your clinic <span className="font-normal text-ink-300">(optional)</span>
          <input className={inputCls} value={f.maps} onChange={set('maps')} placeholder="https://maps.app.goo.gl/…" inputMode="url" autoCapitalize="none" spellCheck={false} maxLength={300} />
          <span className="mt-1 block text-[12.5px] font-normal text-ink-300">On Google Maps, open your clinic, tap Share, then Copy link.</span>
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[13px] font-semibold text-ink">Treatments you offer</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TREATMENTS.map(([k, label]) => {
            const on = picked.includes(k);
            return (
              <button
                key={k} type="button" onClick={() => toggle(k)} aria-pressed={on}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${on ? 'border-mint-400 bg-mint-50 text-mint-700' : 'border-ink/15 bg-white text-ink-500 hover:border-ink/30'}`}
              >
                {on ? '✓ ' : ''}{label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <input type="text" name="website" value={f.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

      {err && (
        <p className="mt-4 text-[14px] font-semibold text-red-600" role="alert">
          {err}{' '}
          <a href={wa(`Hi Zera Dental, I'd like a free website preview for my clinic${f.clinic ? ` (${f.clinic}, ${f.city})` : ''}.`)} target="_blank" rel="noopener noreferrer" className="underline">
            Message us on WhatsApp
          </a>
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-primary mt-5 w-full disabled:cursor-wait disabled:opacity-70">
        {busy ? STEPS[step] : 'Show me my website'}
      </button>
      {busy && <p className="mt-2 text-center text-[13px] text-ink-300" aria-live="polite">This takes about a minute. Please keep this page open.</p>}
      <p className="mt-3 text-center text-[12.5px] leading-relaxed text-ink-300">
        Free, no payment, no call. Only you get the preview link. Questions? WhatsApp {SITE.phoneDisplay}
      </p>
    </form>
  );
}
