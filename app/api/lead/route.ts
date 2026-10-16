import { NextResponse } from 'next/server';
import { LEAD_ENDPOINT } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Server-side proxy to the Google Apps Script lead sheet.
 *
 * WHY THIS EXISTS: the client used to POST to Apps Script directly with
 * mode:'no-cors'. That returns an opaque response, so fetch resolves even on a
 * 4xx/5xx — which once meant the form showed "success" while recording nothing at
 * all. Posting from the server gives us a real status code, so a broken endpoint
 * surfaces as an error to the visitor instead of silently losing the lead.
 */
export async function POST(req: Request) {
  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Bad request.' }, { status: 400 }); }

  const name = String(payload.name ?? '').trim();
  const phone = String(payload.phone ?? '').replace(/\D/g, '');
  if (name.length < 2) return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 });
  if (phone.length < 10) return NextResponse.json({ ok: false, error: 'Please enter a valid 10-digit phone number.' }, { status: 400 });

  if (!LEAD_ENDPOINT || LEAD_ENDPOINT.includes('REPLACE_ME')) {
    // Loud, not silent. If the env var is missing we want to know immediately.
    console.error('[lead] LEAD_ENDPOINT is not configured');
    return NextResponse.json({ ok: false, error: 'Our form is temporarily unavailable. Please message us on WhatsApp.' }, { status: 503 });
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 10_000);
  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      signal: ac.signal,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...payload, phone, serverReceivedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      console.error('[lead] Apps Script returned', res.status);
      return NextResponse.json({ ok: false, error: 'We could not save that. Please message us on WhatsApp.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[lead] post failed', e);
    return NextResponse.json({ ok: false, error: 'We could not save that. Please message us on WhatsApp.' }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
