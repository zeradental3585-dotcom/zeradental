/**
 * Fixture tests for the audit's HTML inspection.
 *
 * Run:  npx tsc --outDir /tmp/zt --module nodenext --target es2022 --skipLibCheck \
 *         lib/audit-inspect.ts lib/audit.ts lib/study.ts tests/audit-inspect.test.ts \
 *       && node /tmp/zt/tests/audit-inspect.test.js
 *
 * These exist because the inspection is regex-based, which is fine for
 * presence/absence but easy to get subtly wrong (a site search box counting as an
 * enquiry form, say). Each fixture states its expected result so a regression is
 * obvious rather than silently changing a dentist's score.
 */
import assert from 'node:assert/strict';
import { inspect } from '../lib/audit-inspect';

const U = (s = 'https://clinic.example') => new URL(s);
let passed = 0;
const t = (name: string, fn: () => void) => {
  try { fn(); passed++; console.log(`  ok   ${name}`); }
  catch (e) { console.error(`  FAIL ${name}\n       ${(e as Error).message}`); process.exitCode = 1; }
};
const ids = (r: ReturnType<typeof inspect>) => r.checks.filter((c) => c.pass).map((c) => c.id).sort();

console.log('audit-inspect fixtures');

// ---------------------------------------------------------------- full-marks site
const good = `<!doctype html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Smile Care Dental Clinic, Indore — Implants &amp; Braces</title>
<meta name="description" content="Smile Care is a dental clinic in Vijay Nagar, Indore offering implants, braces and root canal treatment.">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Dentist","name":"Smile Care"}</script>
</head><body>
<h1>Dental care in Vijay Nagar, Indore</h1>
<a href="tel:+919876543210">Call us</a>
<a href="https://wa.me/919876543210">WhatsApp</a>
<a href="/treatments/dental-implants">Implants</a>
<a href="/treatments/braces-and-aligners">Braces</a>
<a href="/treatments/root-canal-treatment">Root canal</a>
<a href="/about">About</a>
<p>Book an appointment with our team today. We have served Indore families for fifteen years.</p>
<form><input type="text" name="name"><input type="tel" name="phone"><textarea name="msg"></textarea><button>Send</button></form>
<iframe src="https://www.google.com/maps/embed?pb=xyz"></iframe>
<img src="/a.jpg" alt="Our clinic"><img src="/b.jpg" alt="Reception">
</body></html>`;

t('a site with everything scores 100 and passes all eight', () => {
  const r = inspect(good, U());
  assert.equal(r.score, 100, `score was ${r.score}, failing: ${r.checks.filter(c => !c.pass).map(c => c.id)}`);
  assert.equal(r.checks.filter((c) => c.pass).length, 8);
});

t('treatment pages are counted and de-duplicated by path', () => {
  const r = inspect(good, U());
  assert.equal(r.extras.treatmentPages, 3);
});

t('extras pick up title, description, h1 and alt coverage', () => {
  const r = inspect(good, U());
  assert.match(r.extras.title!, /Smile Care Dental Clinic/);
  assert.ok(r.extras.metaDescriptionLength > 50);
  assert.match(r.extras.h1!, /Vijay Nagar/);
  assert.equal(r.extras.images, 2);
  assert.equal(r.extras.imagesWithAlt, 2);
});

// ---------------------------------------------------------------- bare site
const bare = `<!doctype html><html><head><title>Clinic</title></head><body>
<p>Dr Sharma, Indore. Phone 9876543210.</p></body></html>`;

t('a bare page passes only HTTPS', () => {
  const r = inspect(bare, U());
  assert.deepEqual(ids(r), ['https']);
  assert.equal(r.score, 10);
});

t('http-only URL fails the HTTPS check', () => {
  const r = inspect(bare, U('http://clinic.example'));
  assert.deepEqual(ids(r), []);
  assert.equal(r.score, 0);
});

t('a plain-text phone number is not a click-to-call link', () => {
  const r = inspect(bare, U());
  assert.equal(r.checks.find((c) => c.id === 'tel')!.pass, false);
});

// ---------------------------------------------------------------- false positives
t('a site-search box does NOT count as an enquiry form', () => {
  const html = `<html><body><form role="search"><input type="search" name="s"><button>Go</button></form></body></html>`;
  const r = inspect(html, U());
  assert.equal(r.checks.find((c) => c.id === 'form')!.pass, false);
});

t('a WordPress-style search form with name="s" does NOT count', () => {
  const html = `<html><body><form><input type="text" name="s" placeholder="Search"></form></body></html>`;
  const r = inspect(html, U());
  assert.equal(r.checks.find((c) => c.id === 'form')!.pass, false);
});

t('a real enquiry form with a textarea DOES count', () => {
  const html = `<html><body><form><input type="text" name="name"><textarea name="m"></textarea></form></body></html>`;
  const r = inspect(html, U());
  assert.equal(r.checks.find((c) => c.id === 'form')!.pass, true);
});

t('booking wording is not triggered by the word "appointment" alone', () => {
  const r = inspect(`<html><body><p>Appointments available.</p></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'booking')!.pass, false);
});

t('booking wording IS triggered by "Book an appointment"', () => {
  const r = inspect(`<html><body><a href="/x">Book an Appointment</a></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'booking')!.pass, true);
});

t('booking wording in Hindi is recognised', () => {
  const r = inspect(`<html><body><p>अपॉइंटमेंट बुक करें</p></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'booking')!.pass, true);
});

t('text inside <script> is ignored for booking wording', () => {
  const r = inspect(`<html><body><script>var s="book an appointment";</script></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'booking')!.pass, false);
});

// ---------------------------------------------------------------- variants
t('api.whatsapp.com links are detected', () => {
  const r = inspect(`<html><body><a href="https://api.whatsapp.com/send?phone=919876543210">Chat</a></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'whatsapp')!.pass, true);
});

t('a Maps JS API embed counts as a map', () => {
  const r = inspect(`<html><body><script src="https://maps.googleapis.com/maps/api/js?key=x"></script></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'map')!.pass, true);
});

t('microdata schema.org counts even without JSON-LD', () => {
  const r = inspect(`<html><body><div itemscope itemtype="https://schema.org/Dentist"></div></body></html>`, U());
  assert.equal(r.checks.find((c) => c.id === 'schema')!.pass, true);
});

t('non-dental JSON-LD passes the check but says so in the finding', () => {
  const html = `<html><head><script type="application/ld+json">{"@type":"WebSite"}</script></head><body></body></html>`;
  const r = inspect(html, U());
  const c = r.checks.find((x) => x.id === 'schema')!;
  assert.equal(c.pass, true);
  assert.match(c.found, /nothing identifying you as a dental practice/);
});

t('external treatment-looking links are not counted as your pages', () => {
  const html = `<html><body><a href="https://other.example/dental-implants">Implants elsewhere</a></body></html>`;
  const r = inspect(html, U());
  assert.equal(r.extras.treatmentPages, 0);
});

t('www and apex are treated as the same host', () => {
  const html = `<html><body><a href="https://www.clinic.example/braces">Braces</a></body></html>`;
  const r = inspect(html, U('https://clinic.example'));
  assert.equal(r.extras.treatmentPages, 1);
});

t('word count excludes script and style content', () => {
  const html = `<html><head><style>.a{color:red;font-size:12px;margin:0}</style></head><body><p>One two three four five.</p><script>var a=1,b=2,c=3,d=4,e=5,f=6;</script></body></html>`;
  const r = inspect(html, U());
  assert.ok(r.extras.words <= 6, `expected ~5 words, got ${r.extras.words}`);
});

t('HTML entities in title, description and H1 are decoded', () => {
  const html = `<html><head><title>Dr. Ruchi&#39;s Dental Care &amp; Implants</title>
    <meta name="description" content="Caring &quot;family&quot; dentistry &mdash; Coimbatore">
    </head><body><h1>Best Dental &amp; Implant Clinic</h1></body></html>`;
  const r = inspect(html, U());
  assert.equal(r.extras.title, "Dr. Ruchi's Dental Care & Implants");
  assert.match(r.extras.metaDescription!, /Caring "family" dentistry \u2014 Coimbatore/);
  assert.equal(r.extras.h1, 'Best Dental & Implant Clinic');
});

t('a double-encoded ampersand does not decode twice', () => {
  const r = inspect(`<html><head><title>A &amp;#39; B</title></head><body></body></html>`, U());
  assert.equal(r.extras.title, "A &#39; B");
});

t('weights sum to 100 across the eight checks', () => {
  const r = inspect(good, U());
  assert.equal(r.checks.reduce((s, c) => s + c.weight, 0), 100);
});

t('every check carries a study benchmark percentage', () => {
  const r = inspect(good, U());
  for (const c of r.checks) assert.ok(c.benchmarkPct > 0 && c.benchmarkPct <= 100, `${c.id} benchmark ${c.benchmarkPct}`);
});

console.log(`\n${passed} passed${process.exitCode ? ', SOME FAILED' : ''}`);
