import type { Metadata } from 'next';
import Link from 'next/link';
import AuditTool from '@/components/AuditTool';
import { FAQ, CTABand } from '@/components/Sections';
import { Check, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { CHECK_META, BENCHMARK, type CheckId } from '@/lib/audit';

export const metadata: Metadata = {
  title: { absolute: 'Free Dental Website Audit — Score Your Clinic Site Instantly | Zera Dental' },
  description:
    'Already have a clinic website? Paste the address and get an instant score out of 100, benchmarked against 21 real Indian dental clinic websites we audited. No sign-up, no email required.',
  alternates: { canonical: '/free-website-audit' },
  openGraph: {
    siteName: SITE.name,
    locale: 'en_IN',
    title: 'Free Dental Website Audit — Instant Score for Indian Clinics',
    description:
      'Paste your website address. We read your homepage and score it on the same eight checks we ran across 21 Indian dental clinic sites. Free, instant, no sign-up.',
    url: `${SITE.url}/free-website-audit`,
  },
};

const FAQS = [
  {
    q: 'Is it really free, and do I have to give my email?',
    a: 'Free, and no. You paste your website address and the full result appears on screen — every check, every finding. You only give us your name and number if you want the written fix plan afterwards. If you never do, you have still had the whole audit.',
  },
  {
    q: 'What exactly does it check?',
    a: `Eight scored checks: HTTPS, mobile viewport tag, click-to-call link, WhatsApp link, enquiry form, appointment-booking wording, embedded Google Map, and structured data. Plus your page title, meta description, main heading, image alt text, how many treatment pages your homepage links to, and your homepage word count. The eight scored checks are the same ones we ran across ${BENCHMARK.n} clinic websites for our published study, so your score sits on the same scale as theirs.`,
  },
  {
    q: 'How is the score calculated?',
    a: 'The eight checks are weighted rather than counted equally, because they are not equally important. A missing WhatsApp link costs more than missing schema markup, because in India WhatsApp is how patients actually make contact. The weights are fixed and the same for every site.',
  },
  {
    q: 'My site scored badly. Does that mean it is bad?',
    a: 'Not necessarily. It means specific contact and discovery paths are missing from your homepage. A beautiful site with no WhatsApp link and no tappable number will score poorly here, and that is deliberate — this tool measures whether a patient can reach you, not whether the design is pretty.',
  },
  {
    q: 'It said my page returned almost no HTML. Why?',
    a: 'Some sites build their entire page with JavaScript after it loads. We read the HTML your server returns and do not run your scripts, so there is nothing for us to measure. It is a real limitation, we documented it in our study, and we would rather say so than report misleading zeroes.',
  },
  {
    q: 'Do you need my website login?',
    a: 'No, never. Everything we read is the public source of your homepage — exactly what any visitor or search engine receives. We will never ask you for a password.',
  },
  {
    q: 'Will you call and pressure me?',
    a: 'No. If you ask for the fix plan we send it on WhatsApp. If you want to talk after that, you tell us. We do not run a call centre and we do not chase.',
  },
  {
    q: 'What if the fix plan says I do not need a new website?',
    a: 'Then that is what it will say. Plenty of clinics need three fixes worth a few thousand rupees, not a rebuild worth fifty thousand. Telling you otherwise would be a bad way to earn a referral.',
  },
];

const ORDER: CheckId[] = ['whatsapp', 'tel', 'form', 'map', 'viewport', 'schema', 'booking', 'https'];

export default function AuditPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Free Website Audit', url: '/free-website-audit' }]),
        faqSchema(FAQS),
      ]} />

      <section className="relative overflow-hidden border-b border-ink/[.07] bg-gradient-to-b from-mint-50/70 to-white">
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-mint-700">
              For clinics that already have a website
            </span>
            <h1 className="h1 mt-5">Can a patient actually reach you from your website?</h1>
            <p className="lede mx-auto mt-5">
              Paste your clinic&apos;s address below. We load your homepage, read it, and score it out of 100 against the
              same checks we ran on {BENCHMARK.n} real Indian dental clinic websites. You see the whole result on screen —
              nothing held back for an email address.
            </p>
            <p className="mt-5 text-[14.5px] leading-relaxed text-ink-500">
              No website yet? This tool has nothing to read, so{' '}
              <Link href="/free-website-preview" className="font-semibold text-mint-600 underline underline-offset-2">
                build a free preview of your clinic&apos;s site
              </Link>{' '}
              instead — that is the one you want.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <AuditTool />
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-500">
            {['No login or password needed', 'No email required to see your score', 'Your data is never sold'].map((x) => (
              <span key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-mint-500" /> {x}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap my-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">What gets scored</span>
            <h2 className="h2 mt-2">Eight checks, weighted by what actually matters in India</h2>
            <p className="lede mt-4">
              These are the eight measurements from our{' '}
              <Link href={`/research/${BENCHMARK.studySlug}`} className="font-semibold text-mint-600 underline underline-offset-2">
                {BENCHMARK.n}-clinic study
              </Link>
              , which is why your score is comparable to theirs rather than a number we made up. The weight is shown
              against each one.
            </p>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-300">
              We also report your title tag, meta description, H1, image alt coverage, treatment-page count and word
              count — useful, but not scored, because the study did not measure them across all {BENCHMARK.n} sites.
            </p>
          </div>
          <ul className="grid gap-3 self-start">
            {ORDER.map((id) => (
              <li key={id} className="flex gap-4 rounded-xl border border-ink/[.07] bg-white p-4 shadow-soft">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-bold text-mint-200">
                  {CHECK_META[id].weight}
                </span>
                <span>
                  <span className="text-[15px] font-bold text-ink">{CHECK_META[id].label}</span>
                  <span className="mt-0.5 block text-[14px] leading-relaxed text-ink-500">{CHECK_META[id].why}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap my-20">
        <div className="grain relative overflow-hidden rounded-3xl bg-ink px-6 py-12 sm:px-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <span className="eyebrow !text-mint-400">Why we give this away</span>
            <h2 className="mt-2 font-display text-[28px] leading-tight tracking-[-.02em] text-white sm:text-[34px]">
              Because most clinics do not need what they are being sold.
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-white/70">
              <p>
                A large share of the clinic sites we measure do not need replacing. They need a WhatsApp link, a tappable
                phone number and three treatment pages. That is a few thousand rupees of work, not fifty thousand.
              </p>
              <p>
                So we built the tool to tell you that for free, with the actual findings on screen, rather than holding
                the result hostage for your phone number. If it turns out you do need a rebuild, you will be able to see
                exactly why.
              </p>
            </div>
            <Link href="/pricing" className="btn-primary mt-8">See what we charge when you do need us <Arrow className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} title="About the free audit" />
      <CTABand
        title="No website to check, or one the tool cannot read?"
        sub="Build a free preview of your clinic's site instead, or message us on WhatsApp with your clinic name and city and we will look at it by hand."
      />
    </>
  );
}
