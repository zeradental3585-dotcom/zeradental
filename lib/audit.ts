import { CLINICS, STUDY } from './study';

/**
 * Shared contract between the audit API route and the client tool.
 *
 * The eight SCORED checks are deliberately the same eight measurements as the
 * published 21-clinic study (lib/study.ts), so "you vs the 21 clinics we audited"
 * is a like-for-like comparison rather than a marketing line. Anything we can see
 * in the HTML but did NOT measure in the study goes in `extras` and is reported
 * without affecting the score.
 *
 * We do not call Lighthouse / PageSpeed. The study's own methodology section says
 * Lighthouse scores vary between runs and are poor for comparing sites, so using
 * them here would contradict our own published position.
 */

export type CheckId =
  | 'https' | 'viewport' | 'tel' | 'whatsapp' | 'form' | 'booking' | 'map' | 'schema';

export type CheckResult = {
  id: CheckId;
  label: string;
  pass: boolean;
  /** What we actually found, in plain language. */
  found: string;
  /** Why a dentist should care. No scare tactics, no invented statistics. */
  why: string;
  weight: number;
  /** Share of the 21 audited clinics that passed this same check. */
  benchmarkPct: number;
};

export type Extras = {
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1: string | null;
  treatmentPages: number;
  words: number;
  htmlKb: number;
  referencedRequests: number;
  images: number;
  imagesWithAlt: number;
};

export type AuditSuccess = {
  ok: true;
  url: string;
  finalUrl: string;
  score: number;
  checks: CheckResult[];
  extras: Extras;
  benchmark: Benchmark;
  measuredAt: string;
};

export type AuditFailure = { ok: false; error: string; detail?: string };
export type AuditResponse = AuditSuccess | AuditFailure;

/** Weights total 100. WhatsApp carries the most because it was the study's biggest gap. */
export const CHECK_META: Record<CheckId, { label: string; weight: number; why: string }> = {
  whatsapp: {
    label: 'WhatsApp link',
    weight: 18,
    why: 'In India WhatsApp is how people actually make contact. A patient who will happily send a message at 10pm will not always ring a clinic.',
  },
  tel: {
    label: 'Click-to-call number',
    weight: 14,
    why: 'A phone number that is only text means the patient has to copy it out by hand. A tel: link turns it into one tap.',
  },
  form: {
    label: 'Enquiry form',
    weight: 13,
    why: 'Not every patient wants to speak to someone straight away. Without a form, those visitors leave no trace at all.',
  },
  map: {
    label: 'Google Map embed',
    weight: 12,
    why: 'An embedded map gives one-tap directions. Without it, a patient who is already sold still has to go and find you.',
  },
  viewport: {
    label: 'Mobile viewport tag',
    weight: 12,
    why: 'Most dental searches in India happen on a phone. Without this tag the page renders at desktop width and has to be pinched and zoomed.',
  },
  schema: {
    label: 'Structured data (schema)',
    weight: 11,
    why: 'Schema markup tells Google you are a dental practice rather than leaving it to guess from your text.',
  },
  booking: {
    label: 'Booking wording',
    weight: 10,
    why: 'Clear "book an appointment" wording tells the visitor what to do next. A page without it leaves the next step to them.',
  },
  https: {
    label: 'HTTPS / SSL',
    weight: 10,
    why: 'Without it browsers show a "Not secure" warning next to your name, which is the worst possible first impression for a clinic.',
  },
};

/** Pass rates from the published study, keyed to our check ids. */
export const STUDY_PASS_PCT: Record<CheckId, number> = {
  https: 100,
  viewport: 100,
  tel: 90,
  schema: 76,
  booking: 67,
  map: 67,
  form: 67,
  whatsapp: 48,
};

export type Benchmark = {
  n: number;
  cities: number;
  studyDate: string;
  studySlug: string;
  medianTreatmentPages: number;
  medianWords: number;
  whatsappPct: number;
};

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
};

/** Derived from the real dataset rather than hardcoded, so it stays true if the study grows. */
export const BENCHMARK: Benchmark = {
  n: STUDY.n,
  cities: STUDY.cities,
  studyDate: STUDY.date,
  studySlug: STUDY.slug,
  medianTreatmentPages: median(CLINICS.map((c) => c.tp)),
  medianWords: median(CLINICS.map((c) => c.words)),
  whatsappPct: STUDY_PASS_PCT.whatsapp,
};

export function verdict(score: number) {
  if (score >= 85) return { band: 'Strong', note: 'Better than almost every independent clinic site we measured.' };
  if (score >= 65) return { band: 'Decent', note: 'The basics are there. The gaps below are the cheap wins.' };
  if (score >= 40) return { band: 'Weak', note: 'Working, but leaking enquiries in ways that are straightforward to fix.' };
  return { band: 'Poor', note: 'Most of the paths a patient would use to contact you are missing.' };
}
