import type { Metadata } from 'next';
import Link from 'next/link';
import PreviewBuilder from '@/components/PreviewBuilder';
import { FAQ, CTABand } from '@/components/Sections';
import { Check, Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: "Free Dental Clinic Website Preview — See Yours in 60 Seconds | Zera Dental" },
  description:
    "See your dental clinic's new website before you pay anything. Enter your clinic name and city and get a real, working preview with your treatments, WhatsApp booking and Google Maps. Free, no call.",
  alternates: { canonical: '/free-website-preview' },
  openGraph: {
    siteName: SITE.name,
    locale: 'en_IN',
    title: "See Your Dental Clinic's New Website in 60 Seconds — Free",
    description: 'A real, working website preview for your clinic, made in about a minute. Free, no payment, no sales call.',
    url: `${SITE.url}/free-website-preview`,
  },
};

const FAQS = [
  { q: 'Is the website preview really free?', a: 'Yes. There is no payment and no card. You see a real, working website for your clinic. You pay only if you decide to put it live on your own domain, from ₹14,999 one time with the domain and first-year hosting included.' },
  { q: 'What does the preview include?', a: 'A mobile-first website with your clinic name, city, doctor, treatments, a WhatsApp and call button on every page, a Google Maps section and an enquiry form. The headline and clinic introduction are written for your clinic. Photos, timings and prices are added when we put it live.' },
  { q: 'Who can see my preview?', a: 'Only people you share the link with. Previews are not listed on Google. When you go live, the site moves to your own domain, such as yourclinicname.in.' },
  { q: 'Can I change the design and the text?', a: 'Yes, all of it. Tell us on WhatsApp what you would like changed: colours, wording, treatments, photos, prices. Changes before launch are free, and every package includes free edits after launch too.' },
  { q: 'Why do you ask for my WhatsApp number?', a: 'So we can send you the link again and answer questions about your site. We reply on WhatsApp, we do not make sales calls, and your number is never sold or shared.' },
  { q: 'What if I already have a website?', a: 'Make a preview anyway and compare it with your current site on your phone. If yours is already fast and brings enquiries, keep it. We would rather tell you that than sell you something you do not need.' },
];

const STEPS = [
  { t: 'Tell us your clinic', d: 'Clinic name, city, doctor and WhatsApp number. Your Google Maps link helps but is optional.' },
  { t: 'We build your preview', d: 'Pages, treatments, WhatsApp booking, Google Maps and a clinic introduction written for you, in about a minute.' },
  { t: 'Open it on your phone', d: 'Look at it the way your patients will. Ask for any change on WhatsApp.' },
  { t: 'Go live when you are ready', d: 'Your own domain, your photos and timings, Google Business Profile setup. From ₹14,999, one time.' },
];

export default function PreviewPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Free Website Preview', url: '/free-website-preview' }]),
        faqSchema(FAQS),
      ]} />

      <section className="relative overflow-hidden border-b border-ink/[.07] bg-gradient-to-b from-mint-50/70 to-white">
        <div className="grain pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint-200 bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-mint-700">
              Free · about 60 seconds · no payment
            </span>
            <h1 className="h1 mt-5">See your clinic&apos;s new website before you pay a rupee</h1>
            <p className="lede mx-auto mt-5">
              Enter your clinic name and city. In about a minute you get a real, working website for your clinic, with your
              treatments, WhatsApp booking and Google Maps, ready to open on your phone.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <PreviewBuilder />
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-ink-500">
            {['Made only for dental clinics', 'We reply on WhatsApp, not by phone', 'Your number is never sold'].map((x) => (
              <span key={x} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-mint-500" /> {x}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap my-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="h2 mt-2">From your clinic name to a working website, in four steps</h2>
        </div>
        <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.t} className="rounded-2xl border border-ink/[.07] bg-white p-5 shadow-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[12px] font-bold text-mint-200">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-[16px] font-semibold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href="/pricing" className="btn-ghost">See prices for going live <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <FAQ items={FAQS} title="About the free website preview" />
      <CTABand
        title="Rather have us make it for you?"
        sub="Send your clinic name and city on WhatsApp and we will make your preview by hand and send you the link."
      />
    </>
  );
}
