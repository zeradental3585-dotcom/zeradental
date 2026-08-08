'use client';
import { useMemo, useState } from 'react';
import { LEAD_ENDPOINT } from '@/lib/site';
import { Check, WhatsAppIcon, Arrow } from './Icons';

type Q = {
  id: string;
  q: string;
  help: string;
  weight: number;
  options: { label: string; score: number; note?: string }[];
};

const QUESTIONS: Q[] = [
  {
    id: 'hasSite', q: 'Does your clinic have a website right now?', weight: 14,
    help: '71% of patients look you up online before they call. No website means they find someone else.',
    options: [
      { label: 'Yes, and we update it', score: 100 },
      { label: 'Yes, but it is old and untouched', score: 45, note: 'An outdated site can hurt more than no site — patients read "neglected" as "neglectful".' },
      { label: 'Only a Facebook / Instagram page', score: 20, note: 'Social pages do not rank on Google for "dentist near me". You are invisible to searchers.' },
      { label: 'No website at all', score: 0, note: 'Every "dentist near me" search in your area is currently going to a competitor.' },
    ],
  },
  {
    id: 'mobile', q: 'Does your site load fast and look right on a phone?', weight: 12,
    help: 'Over 80% of dental searches in India happen on a mobile phone.',
    options: [
      { label: 'Yes, loads in 1-2 seconds', score: 100 },
      { label: 'It works but feels slow', score: 40, note: 'Every extra second of load time costs roughly 7% of your enquiries.' },
      { label: 'Hard to read / need to pinch and zoom', score: 10, note: 'Google actively demotes sites that fail mobile usability.' },
      { label: 'No site / not sure', score: 0 },
    ],
  },
  {
    id: 'gbp', q: 'Is your Google Business Profile claimed and complete?', weight: 15,
    help: 'The Google Maps 3-pack drives more clinic calls than any other single channel in India.',
    options: [
      { label: 'Claimed, verified, photos and hours updated', score: 100 },
      { label: 'Claimed but rarely updated', score: 50, note: 'Google ranks active profiles higher. Stale profiles quietly slide down.' },
      { label: 'Exists but I never claimed it', score: 15, note: 'An unclaimed profile can be edited by anyone — including competitors.' },
      { label: 'No profile / not sure', score: 0, note: 'This is the single fastest win available to you.' },
    ],
  },
  {
    id: 'reviews', q: 'How many Google reviews does your clinic have?', weight: 12,
    help: 'Clinics with 50+ recent reviews dominate the Map Pack in almost every Indian city.',
    options: [
      { label: '100+', score: 100 },
      { label: '30 to 99', score: 70 },
      { label: 'Under 30', score: 30, note: 'You are being filtered out before patients even read your name.' },
      { label: 'Almost none', score: 0, note: 'A simple review-request system usually adds 20-40 reviews in the first month.' },
    ],
  },
  {
    id: 'booking', q: 'Can a patient book or enquire without calling you?', weight: 11,
    help: 'A large share of dental enquiries happen after 8pm, when nobody picks up the clinic phone.',
    options: [
      { label: 'Yes — online booking with time slots', score: 100 },
      { label: 'WhatsApp button or enquiry form', score: 70 },
      { label: 'Only a phone number listed', score: 25, note: 'Every after-hours searcher is a lost appointment.' },
      { label: 'Nothing / not sure', score: 0 },
    ],
  },
  {
    id: 'treatments', q: 'Do you have a separate page for each treatment?', weight: 11,
    help: 'People do not search "dental clinic". They search "root canal cost", "braces near me", "dental implant".',
    options: [
      { label: 'Yes — implants, braces, RCT, whitening etc. each have a page', score: 100 },
      { label: 'One page listing all services', score: 35, note: 'One combined page can realistically rank for one keyword. Ten pages can rank for ten.' },
      { label: 'Just a short services list', score: 15 },
      { label: 'No / not sure', score: 0 },
    ],
  },
  {
    id: 'content', q: 'Do you publish patient-education content (blog / FAQs)?', weight: 8,
    help: 'Google AI answers now pull directly from clinic FAQ and article content.',
    options: [
      { label: 'Yes, regularly', score: 100 },
      { label: 'A few old posts', score: 40 },
      { label: 'No, but I want to', score: 10 },
      { label: 'No', score: 0 },
    ],
  },
  {
    id: 'photos', q: 'Are there real photos of your clinic, team and results?', weight: 7,
    help: 'Stock photos are the fastest way to lose trust with an Indian patient comparing three clinics.',
    options: [
      { label: 'Yes — clinic, doctors and before/after gallery', score: 100 },
      { label: 'Some clinic photos only', score: 45 },
      { label: 'Mostly stock images', score: 10, note: 'Patients recognise stock photos instantly and read them as "hiding something".' },
      { label: 'None', score: 0 },
    ],
  },
  {
    id: 'ranking', q: 'When you search your main treatment + your city, do you appear on page 1?', weight: 10,
    help: 'Page 2 of Google gets under 1% of clicks. Page 1 or invisible — there is no middle ground.',
    options: [
      { label: 'Yes, top 3', score: 100 },
      { label: 'Somewhere on page 1', score: 65 },
      { label: 'Page 2 or beyond', score: 15, note: 'Fixable. Most page-2 clinics have a technical problem, not a content problem.' },
      { label: 'Cannot find us at all', score: 0 },
    ],
  },
];

const MAX = QUESTIONS.reduce((s, q) => s + q.weight, 0);

export default function AuditTool() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [lead, setLead] = useState({ name: '', clinic: '', phone: '', city: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const total = QUESTIONS.length;
  const inQuiz = step < total;
  const showGate = step === total;
  const current = QUESTIONS[step];

  const score = useMemo(() => {
    const earned = QUESTIONS.reduce((s, q) => s + ((answers[q.id] ?? 0) / 100) * q.weight, 0);
    return Math.round((earned / MAX) * 100);
  }, [answers]);

  const weakest = useMemo(
    () =>
      QUESTIONS.map((q) => ({ q, s: answers[q.id] ?? 0 }))
        .filter((x) => x.s < 70)
        .sort((a, b) => a.s * a.q.weight - b.s * b.q.weight)
        .slice(0, 4),
    [answers]
  );

  const band =
    score >= 80
      ? { label: 'Strong', tone: 'text-mint-600', bg: 'bg-mint-500', verdict: 'Your clinic is ahead of most in India. The remaining gaps are small but they are exactly where your competitors will attack.' }
      : score >= 55
      ? { label: 'Average', tone: 'text-amber-600', bg: 'bg-amber-500', verdict: 'You are visible but leaking patients. Clinics in this band typically add 30-60% more enquiries within one quarter by fixing three or four things.' }
      : score >= 30
      ? { label: 'Weak', tone: 'text-orange-600', bg: 'bg-orange-500', verdict: 'Patients in your area are searching and finding someone else. The good news: at this level, improvements show up in weeks, not months.' }
      : { label: 'Critical', tone: 'text-red-600', bg: 'bg-red-500', verdict: 'Your clinic is effectively invisible on Google. Every "dentist near me" search in your area is currently a gift to a competitor.' };

  function answer(qid: string, s: number) {
    setAnswers((a) => ({ ...a, [qid]: s }));
    setTimeout(() => setStep((v) => v + 1), 180);
  }

  const valid = lead.name.trim().length > 1 && /^[0-9]{10}$/.test(lead.phone.replace(/\D/g, '').slice(-10));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setErr('');
    const detail = QUESTIONS.map((q) => {
      const s = answers[q.id] ?? 0;
      const opt = q.options.find((o) => o.score === s);
      return `${q.q} → ${opt?.label ?? 'skipped'}`;
    }).join(' | ');

    try {
      await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...lead,
          source: 'Free Website Audit',
          auditScore: score,
          auditBand: band.label,
          auditAnswers: detail,
          topGaps: weakest.map((w) => w.q.q).join(' | '),
          page: window.location.pathname,
          referrer: document.referrer,
          timestamp: new Date().toISOString(),
        }),
      });
      setSent(true);
      const msg =
        `Hi Zera Dental, I completed the free clinic website audit.%0A%0A` +
        `Name: ${lead.name}%0AClinic: ${lead.clinic || '-'}%0ACity: ${lead.city || '-'}%0A` +
        `My score: ${score}/100 (${band.label})%0A%0APlease send me the full report and fix plan.`;
      setTimeout(() => window.open(`https://wa.me/919835102324?text=${msg}`, '_blank'), 700);
    } catch {
      setErr('Could not submit. Please message us on WhatsApp instead.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="audit" className="scroll-mt-24 overflow-hidden rounded-3xl border border-ink/[.08] bg-white shadow-lift">
      {/* progress */}
      <div className="h-1.5 w-full bg-sand-100">
        <div
          className="h-full bg-mint-500 transition-all duration-500"
          style={{ width: `${(Math.min(step, total) / total) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-9">
        {inQuiz && (
          <>
            <div className="flex items-center justify-between">
              <span className="eyebrow">Question {step + 1} of {total}</span>
              {step > 0 && (
                <button onClick={() => setStep((v) => v - 1)} className="text-[13px] font-medium text-ink-300 hover:text-ink">
                  ← Back
                </button>
              )}
            </div>
            <h3 className="mt-3 font-display text-[23px] leading-snug tracking-[-.01em] sm:text-[27px]">{current.q}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-500">{current.help}</p>

            <div className="mt-5 grid gap-2.5">
              {current.options.map((o) => {
                const active = answers[current.id] === o.score;
                return (
                  <button
                    key={o.label}
                    onClick={() => answer(current.id, o.score)}
                    className={`group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                      active ? 'border-mint-500 bg-mint-50' : 'border-ink/12 hover:border-mint-400 hover:bg-mint-50/40'
                    }`}
                  >
                    <span className="text-[15px] font-medium text-ink">{o.label}</span>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors ${active ? 'border-mint-500 bg-mint-500 text-white' : 'border-ink/20 text-transparent group-hover:border-mint-400'}`}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {showGate && !sent && (
          <>
            <div className="flex flex-col items-center text-center">
              <span className="eyebrow">Your clinic&apos;s online score</span>
              <ScoreDial score={score} tone={band.bg} />
              <p className={`mt-1 text-[15px] font-bold ${band.tone}`}>{band.label}</p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-500">{band.verdict}</p>
            </div>

            {weakest.length > 0 && (
              <div className="mt-7 rounded-2xl bg-sand-50 p-5">
                <h4 className="text-[13px] font-bold uppercase tracking-wider text-ink">
                  Your {weakest.length} biggest gaps
                </h4>
                <ul className="mt-3 space-y-3">
                  {weakest.map(({ q, s }) => {
                    const opt = q.options.find((o) => o.score === s);
                    return (
                      <li key={q.id} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange-400" />
                        <div>
                          <p className="text-[14.5px] font-semibold text-ink">{q.q.replace(/\?$/, '')}</p>
                          <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-500">
                            {opt?.note || q.help}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="mt-7 rounded-2xl border border-mint-200 bg-mint-50/60 p-5 sm:p-6">
              <h4 className="font-display text-xl">Want the full report?</h4>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">
                We&apos;ll hand-check your actual Google listing, your site speed and your top 3 local competitors,
                then send you a prioritised fix plan on WhatsApp. Free, no obligation, no sales call unless you ask for one.
              </p>
              <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2" noValidate>
                <In label="Your name *" value={lead.name} onChange={(v) => setLead({ ...lead, name: v })} placeholder="Dr. Ananya Sharma" />
                <In label="WhatsApp number *" value={lead.phone} onChange={(v) => setLead({ ...lead, phone: v })} placeholder="98765 43210" type="tel" />
                <In label="Clinic name" value={lead.clinic} onChange={(v) => setLead({ ...lead, clinic: v })} placeholder="Smile Care Dental" />
                <In label="City" value={lead.city} onChange={(v) => setLead({ ...lead, city: v })} placeholder="Pune" />
                <div className="sm:col-span-2">
                  <button type="submit" disabled={!valid || sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                    {sending ? 'Sending…' : 'Send my full audit report'} <Arrow className="h-4 w-4" />
                  </button>
                  {err && <p className="mt-2 text-center text-[13.5px] text-red-600">{err}</p>}
                  <p className="mt-2.5 text-center text-[12.5px] text-ink-300">
                    We never sell your data. Reports go out on WhatsApp within a few working hours.
                  </p>
                </div>
              </form>
            </div>
          </>
        )}

        {sent && (
          <div className="py-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mint-500 text-white">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-2xl">Your audit is on its way, {lead.name.split(' ')[0]}.</h3>
            <p className="mx-auto mt-2.5 max-w-md text-[15px] leading-relaxed text-ink-500">
              Score recorded: <strong className="text-ink">{score}/100 ({band.label})</strong>. We&apos;re reviewing your
              clinic&apos;s listing and competitors by hand — your report lands on WhatsApp shortly.
            </p>
            <a
              href={`https://wa.me/919835102324?text=${encodeURIComponent(`Hi Zera Dental, I completed the audit. My score is ${score}/100. Please send my report.`)}`}
              target="_blank" rel="noopener noreferrer" className="btn-wa mt-6"
            >
              <WhatsAppIcon className="h-4 w-4" /> Message us now to jump the queue
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreDial({ score, tone }: { score: number; tone: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mt-3 h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-sand-100" />
        <circle
          cx="60" cy="60" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          stroke="currentColor" className={tone.replace('bg-', 'text-')}
          strokeDasharray={c} strokeDashoffset={c - (c * score) / 100}
          style={{ transition: 'stroke-dashoffset 900ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-4xl leading-none">{score}</div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-300">out of 100</div>
        </div>
      </div>
    </div>
  );
}

function In({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-ink">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-[15px] outline-none transition-colors placeholder:text-ink-300/70 focus:border-mint-400 focus:ring-2 focus:ring-mint-100"
      />
    </div>
  );
}
