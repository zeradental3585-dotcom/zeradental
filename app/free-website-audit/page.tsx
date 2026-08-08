import type { Metadata } from 'next';
import Link from 'next/link';
import AuditTool from '@/components/AuditTool';
import { FAQ, CTABand } from '@/components/Sections';
import { Check, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Free Dental Clinic Website Audit — Score Your Clinic | Zera Dental' },
  description:
    'Free 2-minute audit for Indian dental clinics. Score your website, Google Business Profile, reviews and local ranking out of 100, and get a prioritised fix plan on WhatsApp. No cost, no obligation.',
  alternates: { canonical: '/free-website-audit' },
  openGraph: {
    title: 'Free Dental Clinic Website Audit — Score Your Clinic in 2 Minutes',
    description: 'Find out exactly why patients are choosing the clinic down the road. 9 questions, instant score, free fix plan on WhatsApp.',
    url: `${SITE.url}/free-website-audit`,
  },
};

const FAQS = [
  { q: 'Is the audit really free?', a: 'Yes, entirely. There is no card, no advance and no obligation. We do it because roughly one in five clinics we audit eventually hires us, and the other four get something useful for free. That is a trade we are happy with.' },
  { q: 'What do I actually receive?', a: 'A written report on WhatsApp covering: your Google Business Profile gaps, your current mobile load speed with the actual number, which treatment keywords you are missing, how your review count compares to your three closest competitors, and a prioritised list of fixes ordered by impact versus effort. Most reports run two to three pages.' },
  { q: 'How long does the report take?', a: 'The instant score is immediate — you see it as soon as you finish the nine questions. The hand-checked report follows on WhatsApp, usually within a few working hours and always within one working day.' },
  { q: 'Will you call and pressure me?', a: 'No. We reply on WhatsApp with the report. If you want to talk, you tell us. We do not run a call centre and we do not chase.' },
  { q: 'What if the audit says my site is fine?', a: 'Then we tell you that and you have lost nothing but two minutes. It happens, and we would rather say so than invent problems to sell a rebuild.' },
  { q: 'Do you need my website login?', a: 'No. Everything we check is publicly visible — your Google listing, your site speed, your reviews, your competitors. We never ask for passwords.' },
];

const CHECKS = [
  'Google Business Profile completeness and category strategy',
  'Actual mobile load speed, measured, with the number',
  'Whether you rank for your main treatment in your city',
  'Review count and rating versus your 3 nearest competitors',
  'Missing treatment pages patients are actively searching for',
  'Mobile usability, booking path and WhatsApp accessibility',
  'Schema markup and whether Google AI can quote your clinic',
  'NAP consistency across Indian directories',
];

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
              100% free · 2 minutes · no card, no call
            </span>
            <h1 className="h1 mt-5">How findable is your dental clinic, really?</h1>
            <p className="lede mx-auto mt-5">
              Nine questions. An instant score out of 100. Then a hand-checked report on WhatsApp showing exactly why
              patients in your area are picking the clinic down the road — and what to fix first.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <AuditTool />
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-500">
            {['No login or password needed', 'We reply on WhatsApp, not by phone', 'Your data is never sold'].map((x) => (
              <span key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-mint-500" /> {x}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap my-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">What we check by hand</span>
            <h2 className="h2 mt-2">Eight things, checked on your actual clinic</h2>
            <p className="lede mt-4">
              The score you get instantly is based on your answers. The report that follows is based on us opening
              Google and looking at your real listing, your real speed and your real competitors.
            </p>
          </div>
          <ul className="grid gap-3 self-start">
            {CHECKS.map((c, i) => (
              <li key={c} className="flex gap-4 rounded-xl border border-ink/[.07] bg-white p-4 shadow-soft">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[12px] font-bold text-mint-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[15px] leading-relaxed text-ink-700/90">{c}</span>
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
                A large share of the clinics we audit do not need a new website. They need their Google listing claimed,
                thirty more reviews and three treatment pages. That is a few thousand rupees of work, not fifty thousand.
              </p>
              <p>
                We tell them that. Some of them come back a year later when they have grown and genuinely need the
                rebuild, and they send us other dentists in the meantime. That is a better business than talking someone
                into something they do not need today.
              </p>
            </div>
            <Link href="/pricing" className="btn-primary mt-8">See what we charge when you do need us <Arrow className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} title="About the free audit" />
      <CTABand
        title="Rather just talk to someone?"
        sub="Skip the form. Message us on WhatsApp with your clinic name and city and we will look you up manually."
      />
    </>
  );
}
