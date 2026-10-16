'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, WhatsAppIcon, Arrow } from './Icons';
import { verdict, type AuditResponse, type AuditSuccess } from '@/lib/audit';

/**
 * The real lead magnet: the visitor pastes their clinic's URL and we do the work.
 *
 * Design rule — the full result is shown BEFORE any contact details are asked for.
 * Gating the score behind a form is what turned the previous version of this page
 * into a contact form that nobody filled in. The value has to land first.
 */

const Cross = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className={className}>
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);

function ScoreRing({ score }: { score: number }) {
  const r = 52, c = 2 * Math.PI * r;
  const tone = score >= 85 ? 'text-mint-500' : score >= 65 ? 'text-mint-600' : score >= 40 ? 'text-amber-500' : 'text-rose-500';
  return (
    <div className="relative h-[136px] w-[136px] shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="11" className="text-ink/[.07]" />
        <circle
          cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * score) / 100} className={tone}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-[34px] font-extrabold leading-none tracking-tight text-ink">{score}</div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-ink-300">out of 100</div>
        </div>
      </div>
    </div>
  );
}

function FixPlan({ result }: { result: AuditSuccess }) {
  const [form, setForm] = useState({ name: '', phone: '', clinic: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [err, setErr] = useState('');

  const failed = result.checks.filter((c) => !c.pass);
  const valid = form.name.trim().length > 1 && form.phone.replace(/\D/g, '').length >= 10;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || state === 'sending') return;
    setState('sending'); setErr('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          website: result.finalUrl,
          source: 'instant-audit',
          auditScore: result.score,
          auditFailed: failed.map((f) => f.label).join(', ') || 'none',
          page: window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });
      const json = await res.json().catch(() => ({ ok: false, error: 'Unexpected response.' }));
      if (!res.ok || !json.ok) { setErr(json.error || 'Something went wrong.'); setState('error'); return; }
      setState('done');
    } catch {
      setErr('Network problem. Please message us on WhatsApp instead.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-2xl border border-mint-200 bg-mint-50 p-7 text-center">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-mint-500 text-white">
          <Check className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display text-xl">Thanks, {form.name.split(' ')[0]}.</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
          We have your score of {result.score} and your site address. You&apos;ll get the written fix plan on WhatsApp,
          usually within a few working hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink/[.08] bg-sand-50 p-7">
      <h3 className="h3">Want the fixes written out?</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
        We&apos;ll send a short written plan for the {failed.length === 0 ? 'few remaining improvements' : `${failed.length} ${failed.length === 1 ? 'gap' : 'gaps'}`} above —
        what to change and roughly what it costs — whether you hire us or hand it to your own developer.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <input
          value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your name" aria-label="Your name"
          className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-mint-500"
        />
        <input
          value={form.clinic} onChange={(e) => setForm((f) => ({ ...f, clinic: e.target.value }))}
          placeholder="Clinic name (optional)" aria-label="Clinic name"
          className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-mint-500"
        />
        <input
          value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="WhatsApp number" inputMode="numeric" aria-label="WhatsApp number"
          className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none focus:border-mint-500"
        />
      </div>
      {state === 'error' && <p className="mt-3 text-[14px] font-medium text-rose-600">{err}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!valid || state === 'sending'} className="btn-primary disabled:opacity-40">
          {state === 'sending' ? 'Sending…' : 'Send me the fix plan'} <Arrow className="h-4 w-4" />
        </button>
        <span className="text-[13.5px] text-ink-300">No newsletter. We will not pass your number on.</span>
      </div>
    </form>
  );
}

export default function AuditTool() {
  const [url, setUrl] = useState('');
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<AuditSuccess | null>(null);
  const [error, setError] = useState<{ error: string; detail?: string } | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || state === 'running') return;
    setState('running'); setError(null); setResult(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json: AuditResponse = await res.json();
      if (!json.ok) { setError({ error: json.error, detail: json.detail }); setState('error'); return; }
      setResult(json); setState('done');
    } catch {
      setError({ error: 'Something went wrong on our side.', detail: 'Please try again in a moment.' });
      setState('error');
    }
  }

  const v = result ? verdict(result.score) : null;
  const waMsg = result
    ? `https://wa.me/919835102324?text=${encodeURIComponent(
        `Hi Zera Dental, I ran the audit on ${result.finalUrl} and scored ${result.score}/100. I'd like to talk about fixing it.`,
      )}`
    : '';

  return (
    <div>
      {/* ---- input ---- */}
      <form onSubmit={run} className="rounded-2xl border border-ink/[.08] bg-white p-6 shadow-lift sm:p-7">
        <label htmlFor="audit-url" className="block text-[14px] font-bold uppercase tracking-wide text-ink-500">
          Your clinic&apos;s website
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="audit-url" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="smilecaredental.in" inputMode="url" autoComplete="url" spellCheck={false}
            className="flex-1 rounded-xl border border-ink/15 px-4 py-3.5 text-[16px] outline-none focus:border-mint-500"
          />
          <button type="submit" disabled={!url.trim() || state === 'running'} className="btn-primary shrink-0 disabled:opacity-40">
            {state === 'running' ? 'Checking…' : 'Check my site'} <Arrow className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-300">
          We load your homepage and check eleven things in it. No sign-up, no email needed, and you see everything we
          find. Takes about ten seconds.
        </p>
      </form>

      {state === 'running' && (
        <div className="mt-6 rounded-2xl border border-ink/[.08] bg-sand-50 p-7 text-center">
          <p className="text-[15px] font-medium text-ink-500">Loading your homepage and reading the source…</p>
        </div>
      )}

      {state === 'error' && error && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-7">
          <p className="text-[16px] font-bold text-ink">{error.error}</p>
          {error.detail && <p className="mt-2 text-[15px] leading-relaxed text-ink-500">{error.detail}</p>}
          <a href="https://wa.me/919835102324" target="_blank" rel="noopener noreferrer" className="btn-wa mt-5">
            <WhatsAppIcon className="h-4 w-4" /> Ask us to check it by hand
          </a>
        </div>
      )}

      {/* ---- results ---- */}
      {state === 'done' && result && v && (
        <div className="mt-7 space-y-6">
          <div className="rounded-2xl border border-ink/[.08] bg-white p-7 shadow-lift">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              <ScoreRing score={result.score} />
              <div className="min-w-0 text-center sm:text-left">
                <span className="eyebrow">{v.band}</span>
                <h2 className="h2 mt-1.5 break-words">{new URL(result.finalUrl).hostname}</h2>
                <p className="lede mt-3">{v.note}</p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 border-t border-ink/[.07] pt-6 sm:grid-cols-3">
              <div className="rounded-xl bg-sand-50 p-4">
                <div className="text-[12px] font-bold uppercase tracking-wide text-ink-300">Treatment pages linked</div>
                <div className="mt-1.5 text-[22px] font-extrabold text-ink">{result.extras.treatmentPages}</div>
                <div className="mt-1 text-[13px] text-ink-500">Median of the {result.benchmark.n} clinics: {result.benchmark.medianTreatmentPages}</div>
              </div>
              <div className="rounded-xl bg-sand-50 p-4">
                <div className="text-[12px] font-bold uppercase tracking-wide text-ink-300">Homepage words</div>
                <div className="mt-1.5 text-[22px] font-extrabold text-ink">{result.extras.words.toLocaleString('en-IN')}</div>
                <div className="mt-1 text-[13px] text-ink-500">Median of the {result.benchmark.n} clinics: {result.benchmark.medianWords}</div>
              </div>
              <div className="rounded-xl bg-sand-50 p-4">
                <div className="text-[12px] font-bold uppercase tracking-wide text-ink-300">Checks passed</div>
                <div className="mt-1.5 text-[22px] font-extrabold text-ink">
                  {result.checks.filter((c) => c.pass).length}<span className="text-ink-300">/8</span>
                </div>
                <div className="mt-1 text-[13px] text-ink-500">Weighted, not a simple count</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-ink/[.08] bg-white p-7">
            <h3 className="h3">What we found</h3>
            <p className="mt-2 text-[14.5px] text-ink-500">
              The same eight checks we ran across {result.benchmark.n} clinic websites in {result.benchmark.cities} cities
              for our{' '}
              <Link href={`/research/${result.benchmark.studySlug}`} className="font-semibold text-mint-600 underline underline-offset-2">
                published study
              </Link>
              , so the comparison is like for like.
            </p>
            <ul className="mt-6 divide-y divide-ink/[.07]">
              {[...result.checks].sort((a, b) => Number(a.pass) - Number(b.pass) || b.weight - a.weight).map((c) => (
                <li key={c.id} className="flex gap-4 py-4">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${c.pass ? 'bg-mint-100 text-mint-700' : 'bg-rose-100 text-rose-600'}`}>
                    {c.pass ? <Check className="h-3.5 w-3.5" /> : <Cross className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2.5">
                      <span className="text-[15.5px] font-bold text-ink">{c.label}</span>
                      <span className="text-[12.5px] font-medium text-ink-300">{c.benchmarkPct}% of the {result.benchmark.n} clinics had this</span>
                    </div>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-ink-500">{c.found}</p>
                    {!c.pass && <p className="mt-1.5 text-[14px] leading-relaxed text-ink-300">{c.why}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/[.08] bg-white p-7">
            <h3 className="h3">Also worth knowing</h3>
            <ul className="mt-4 space-y-2.5 text-[14.5px] leading-relaxed text-ink-500">
              <li>
                <strong className="text-ink">Page title:</strong>{' '}
                {result.extras.title
                  ? <>&ldquo;{result.extras.title}&rdquo; ({result.extras.titleLength} characters{result.extras.titleLength > 60 ? ' — Google will cut this off' : result.extras.titleLength < 25 ? ' — short enough to be wasting space' : ''})</>
                  : 'missing entirely.'}
              </li>
              <li>
                <strong className="text-ink">Meta description:</strong>{' '}
                {result.extras.metaDescription
                  ? `present, ${result.extras.metaDescriptionLength} characters${result.extras.metaDescriptionLength > 165 ? ' — will be truncated in results' : ''}.`
                  : 'missing, so Google will invent one from your page text.'}
              </li>
              <li>
                <strong className="text-ink">Main heading (H1):</strong>{' '}
                {result.extras.h1 ? <>&ldquo;{result.extras.h1.slice(0, 110)}{result.extras.h1.length > 110 ? '…' : ''}&rdquo;</> : 'no H1 on the page.'}
              </li>
              <li>
                <strong className="text-ink">Images:</strong> {result.extras.images} on the homepage,{' '}
                {result.extras.imagesWithAlt} with alt text
                {result.extras.images > 0 && result.extras.imagesWithAlt < result.extras.images
                  ? ` — ${result.extras.images - result.extras.imagesWithAlt} are invisible to Google and to screen readers.`
                  : '.'}
              </li>
              <li>
                <strong className="text-ink">Homepage HTML:</strong> {result.extras.htmlKb} KB, referencing{' '}
                {result.extras.referencedRequests} other files (scripts, stylesheets, images, embeds).
              </li>
            </ul>
            <p className="mt-5 text-[13.5px] leading-relaxed text-ink-300">
              Measured {new Date(result.measuredAt).toLocaleString('en-IN')} from your homepage only. We read the HTML your
              server returns — we do not run your JavaScript, so anything added to the page by a script after it loads will
              not be counted here. That is the same limitation we documented in the study.
            </p>
          </div>

          <FixPlan result={result} />

          <div className="rounded-2xl border border-ink/[.08] bg-ink p-7 text-center">
            <h3 className="font-display text-[22px] text-white">Would rather just talk?</h3>
            <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">
              Send us the score and we&apos;ll tell you honestly whether it is worth rebuilding or just fixing.
            </p>
            <a href={waMsg} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp us the result
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
