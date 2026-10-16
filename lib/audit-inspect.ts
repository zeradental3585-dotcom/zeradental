import {
  CHECK_META, STUDY_PASS_PCT,
  type CheckId, type CheckResult, type Extras,
} from './audit';

/**
 * Pure HTML inspection, deliberately separated from the fetching/SSRF layer in
 * app/api/audit/route.ts so it can be unit-tested against fixtures without a network.
 * Everything here must stay side-effect free.
 */

// ---------- HTML inspection (regex, not a DOM — we only need presence/absence) ----------

/**
 * Minimal HTML entity decoder for the short strings we surface verbatim (title,
 * meta description, H1). Without this a real title renders as
 * "Dr. Ruchi&#39;s Dental Care" on the results page.
 */
const decodeEntities = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/gi, ' ')
    .replace(/&(quot|apos|lsquo|rsquo|ldquo|rdquo|ndash|mdash|hellip);/gi, (_, n) =>
      ({ quot: '"', apos: "'", lsquo: '\u2018', rsquo: '\u2019', ldquo: '\u201c', rdquo: '\u201d', ndash: '\u2013', mdash: '\u2014', hellip: '\u2026' } as Record<string, string>)[n.toLowerCase()] ?? _)
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&') // last, so "&amp;#39;" does not double-decode
    .trim();

const strip = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ');

const TREATMENT_WORDS = [
  'implant', 'braces', 'aligner', 'invisalign', 'root-canal', 'root_canal', 'rootcanal', 'endodont',
  'crown', 'bridge', 'veneer', 'whitening', 'bleaching', 'extraction', 'wisdom', 'denture',
  'orthodont', 'periodont', 'pedodont', 'paediatric', 'pediatric', 'scaling', 'cleaning',
  'smile-design', 'smile_design', 'smiledesign', 'filling', 'cosmetic', 'prosthodont', 'surgery',
];

export function inspect(html: string, finalUrl: URL) {
  const text = strip(html);
  const lower = html.toLowerCase();

  const attrUrls = (re: RegExp) => {
    const out: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(html))) out.push(m[1]);
    return out;
  };

  const hrefs = attrUrls(/<a\b[^>]*href\s*=\s*["']([^"']+)["']/gi);
  const iframes = attrUrls(/<iframe\b[^>]*src\s*=\s*["']([^"']+)["']/gi);

  // --- the eight scored checks ---
  const tel = hrefs.some((h) => /^tel:\s*\+?[\d\s()-]{6,}/i.test(h));
  const whatsapp = hrefs.some((h) => /(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:\/\/)/i.test(h))
    || /(wa\.me\/|api\.whatsapp\.com\/send)/i.test(lower);
  const map = iframes.some((s) => /(google\.[a-z.]+\/maps|maps\.google|google\.com\/maps\/embed)/i.test(s))
    || /maps\.googleapis\.com\/maps\/api\/js/i.test(lower);
  const viewport = /<meta[^>]+name\s*=\s*["']viewport["'][^>]*>/i.test(html);
  const https = finalUrl.protocol === 'https:';

  const formBlocks = html.match(/<form\b[\s\S]*?<\/form>/gi) || [];
  const form = formBlocks.some((f) => {
    const isSearchOnly = /type\s*=\s*["']search["']/i.test(f)
      || (/name\s*=\s*["'](s|q|search)["']/i.test(f) && !/textarea|type\s*=\s*["']tel["']|type\s*=\s*["']email["']/i.test(f));
    const hasRealInput = /<textarea|type\s*=\s*["'](tel|email|text)["']/i.test(f);
    return hasRealInput && !isSearchOnly;
  });

  const booking = /(book\s+(an\s+)?appointment|book\s+now|schedule\s+(an\s+)?appointment|request\s+(an\s+)?appointment|appointment\s+booking|अपॉइंटमेंट)/i.test(text);

  const ldBlocks = html.match(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || [];
  const schema = ldBlocks.length > 0 || /itemtype\s*=\s*["']https?:\/\/schema\.org/i.test(html);
  const dentalSchema = ldBlocks.some((b) => /"@type"\s*:\s*"?(Dentist|DentalClinic|MedicalBusiness|MedicalClinic|LocalBusiness|HealthAndBeautyBusiness)/i.test(b));

  // --- extras (reported, not scored) ---
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? decodeEntities(titleM[1].replace(/\s+/g, ' ')) || null : null;
  const descM = html.match(/<meta[^>]+name\s*=\s*["']description["'][^>]+content\s*=\s*["']([^"']*)["']/i)
    || html.match(/<meta[^>]+content\s*=\s*["']([^"']*)["'][^>]+name\s*=\s*["']description["']/i);
  const metaDescription = descM ? decodeEntities(descM[1].replace(/\s+/g, ' ')) || null : null;
  const h1M = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1M ? decodeEntities(h1M[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')) || null : null;

  const sameHost = (h: string) => {
    try {
      const u = new URL(h, finalUrl);
      return u.hostname.replace(/^www\./, '') === finalUrl.hostname.replace(/^www\./, '');
    } catch { return false; }
  };
  const treatmentPages = new Set(
    hrefs
      .filter(sameHost)
      .map((h) => { try { return new URL(h, finalUrl).pathname.toLowerCase().replace(/\/+$/, ''); } catch { return ''; } })
      .filter((p) => p && p !== '/' && TREATMENT_WORDS.some((w) => p.includes(w))),
  ).size;

  const visible = text.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  const words = visible.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  const imagesWithAlt = imgTags.filter((t) => /\balt\s*=\s*["'][^"']+["']/i.test(t)).length;

  const referencedRequests =
    (html.match(/<script\b[^>]*\bsrc\s*=/gi) || []).length +
    (html.match(/<link\b[^>]*\brel\s*=\s*["']stylesheet["']/gi) || []).length +
    imgTags.length + iframes.length;

  const extras: Extras = {
    title, titleLength: title?.length ?? 0,
    metaDescription, metaDescriptionLength: metaDescription?.length ?? 0,
    h1, treatmentPages, words,
    htmlKb: Math.round(Buffer.byteLength(html, 'utf8') / 1024),
    referencedRequests,
    images: imgTags.length,
    imagesWithAlt,
  };

  const raw: Record<CheckId, { pass: boolean; found: string }> = {
    whatsapp: { pass: whatsapp, found: whatsapp ? 'A WhatsApp link is on the page.' : 'No WhatsApp link anywhere on the homepage.' },
    tel: { pass: tel, found: tel ? 'Your number is a tap-to-call link.' : 'No tel: link — the number is not tappable.' },
    form: { pass: form, found: form ? 'An enquiry form is present.' : 'No enquiry form (a search box does not count).' },
    map: { pass: map, found: map ? 'A Google Map is embedded.' : 'No embedded map on the homepage.' },
    viewport: { pass: viewport, found: viewport ? 'Mobile viewport tag present.' : 'No viewport tag — the page will render at desktop width on phones.' },
    schema: {
      pass: schema,
      found: schema
        ? (dentalSchema ? 'Schema markup present, and it identifies a dental or medical business.' : 'Schema markup present, but nothing identifying you as a dental practice.')
        : 'No structured data found.',
    },
    booking: { pass: booking, found: booking ? 'Clear appointment-booking wording found.' : 'No clear "book an appointment" wording.' },
    https: { pass: https, found: https ? 'Served over HTTPS.' : 'Not served over HTTPS — browsers will show "Not secure".' },
  };

  const checks: CheckResult[] = (Object.keys(CHECK_META) as CheckId[]).map((id) => ({
    id,
    label: CHECK_META[id].label,
    why: CHECK_META[id].why,
    weight: CHECK_META[id].weight,
    benchmarkPct: STUDY_PASS_PCT[id],
    pass: raw[id].pass,
    found: raw[id].found,
  }));

  const score = checks.reduce((s, c) => s + (c.pass ? c.weight : 0), 0);
  return { checks, score, extras };
}
