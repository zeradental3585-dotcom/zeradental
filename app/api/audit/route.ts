import { NextResponse } from 'next/server';
import dns from 'node:dns/promises';
import net from 'node:net';
import { BENCHMARK, type AuditResponse } from '@/lib/audit';
import { inspect } from '@/lib/audit-inspect';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BYTES = 2_500_000;
const TIMEOUT_MS = 9_000;
const MAX_HOPS = 4;

/**
 * SECURITY: this endpoint fetches a URL supplied by an anonymous visitor, which is
 * a textbook SSRF vector. Everything below exists to stop it being used to probe
 * the host's own network:
 *   - http/https only
 *   - hostname resolved and every resolved IP checked against private ranges
 *   - redirects followed manually so each hop is re-validated (a public host can
 *     redirect to 169.254.169.254)
 *   - response size and time both capped
 * Do not replace the manual redirect loop with redirect:'follow'.
 */
function isPrivateIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number);
    if (p[0] === 10) return true;
    if (p[0] === 127) return true;
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true;          // link-local / cloud metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] >= 224) return true;                            // multicast / reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === '::1' || v === '::') return true;
    if (v.startsWith('fe80') || v.startsWith('fc') || v.startsWith('fd')) return true;
    // IPv4-mapped (::ffff:10.0.0.1) — unwrap and re-check
    const m = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (m) return isPrivateIp(m[1]);
    return false;
  }
  return true; // unparseable → refuse
}

async function assertPublicHost(hostname: string) {
  const bad = /^(localhost|.*\.local|.*\.internal|.*\.localhost)$/i;
  if (bad.test(hostname)) throw new Error('blocked-host');
  if (net.isIP(hostname) && isPrivateIp(hostname)) throw new Error('blocked-host');
  if (!net.isIP(hostname)) {
    const addrs = await dns.lookup(hostname, { all: true });
    if (!addrs.length) throw new Error('dns');
    for (const a of addrs) if (isPrivateIp(a.address)) throw new Error('blocked-host');
  }
}

function normaliseUrl(raw: string): URL {
  const trimmed = raw.trim();
  // Reject a non-http scheme up front, otherwise "ftp://x.com" would get https://
  // glued on the front and fail later with a confusing "couldn't reach it" message.
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) throw new Error('scheme');
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const u = new URL(withScheme);
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new Error('scheme');
  u.hash = '';
  return u;
}

/** Follows redirects by hand, validating every hop. Returns the final response + URL. */
async function safeFetch(start: URL) {
  let current = start;
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    await assertPublicHost(current.hostname);
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await fetch(current.toString(), {
        redirect: 'manual',
        signal: ac.signal,
        headers: {
          // Identify ourselves honestly. A clinic's admin should be able to see who did this.
          'User-Agent': 'ZeraDentalAudit/1.0 (+https://zeradental.in/free-website-audit)',
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-IN,en;q=0.9',
        },
      });
    } finally {
      clearTimeout(timer);
    }

    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get('location');
      if (!loc) throw new Error('redirect');
      current = new URL(loc, current);
      if (current.protocol !== 'http:' && current.protocol !== 'https:') throw new Error('scheme');
      continue;
    }
    return { res, finalUrl: current };
  }
  throw new Error('too-many-redirects');
}

async function readCapped(res: Response): Promise<string> {
  const len = Number(res.headers.get('content-length') || 0);
  if (len && len > MAX_BYTES) throw new Error('too-large');
  const buf = await res.arrayBuffer();
  const sliced = buf.byteLength > MAX_BYTES ? buf.slice(0, MAX_BYTES) : buf;
  return new TextDecoder('utf-8', { fatal: false }).decode(sliced);
}

const fail = (error: string, detail?: string, status = 400) =>
  NextResponse.json<AuditResponse>({ ok: false, error, detail }, { status });

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return fail('Could not read that request.'); }
  const raw = (body as { url?: unknown })?.url;
  if (typeof raw !== 'string' || !raw.trim()) return fail('Please enter your website address.');
  if (raw.length > 300) return fail('That address is too long.');

  let target: URL;
  try { target = normaliseUrl(raw); }
  catch (e) {
    if ((e as Error).message === 'scheme') return fail('Only http:// and https:// addresses can be audited.');
    return fail("That doesn't look like a website address.", 'Try something like smilecare.in');
  }

  let res: Response, finalUrl: URL;
  try { ({ res, finalUrl } = await safeFetch(target)); }
  catch (e) {
    const m = (e as Error).message;
    if (m === 'blocked-host') return fail('That address cannot be audited.', 'Only public websites can be checked.');
    if (m === 'dns') return fail("We couldn't find that domain.", 'Check the spelling and try again.');
    if (m === 'too-many-redirects') return fail('That site redirects too many times for us to follow.');
    return fail("We couldn't reach that site.", 'It may be down, or blocking automated requests. Try again in a minute.');
  }

  if (!res.ok) {
    return fail(`The site returned an error (HTTP ${res.status}).`,
      res.status === 403 ? 'The site is blocking automated requests, so we cannot audit it.' : 'Nothing to audit until it responds normally.');
  }

  const ctype = res.headers.get('content-type') || '';
  if (!/text\/html|application\/xhtml/i.test(ctype)) {
    return fail("That address didn't return a web page.", `The server sent ${ctype.split(';')[0] || 'an unknown type'}.`);
  }

  let html: string;
  try { html = await readCapped(res); }
  catch { return fail('That page is too large for us to audit.'); }

  if (html.replace(/\s/g, '').length < 400) {
    return fail('That page returned almost no HTML.',
      'Sites that build themselves entirely in JavaScript cannot be measured this way — the same limitation we noted in our study.');
  }

  const { checks, score, extras } = inspect(html, finalUrl);

  return NextResponse.json<AuditResponse>(
    {
      ok: true,
      url: target.toString(),
      finalUrl: finalUrl.toString(),
      score, checks, extras,
      benchmark: BENCHMARK,
      measuredAt: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export function GET() {
  return NextResponse.json({ ok: false, error: 'POST a JSON body of { url } to this endpoint.' }, { status: 405 });
}
