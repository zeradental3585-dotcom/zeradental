import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, WA } from '@/lib/site';
import LeadForm from '@/components/LeadForm';
import { WhatsAppIcon } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Contact Zera Dental — WhatsApp +91 98351 02324' },
  description:
    'Get in touch with Zera Dental about a website for your dental clinic. Message us on WhatsApp at +91 98351 02324 or send your details and we will reply within a few working hours.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }])} />

      <section className="wrap py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[.9fr,1.1fr] lg:gap-16">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="h1 mt-3">Tell us about your clinic.</h1>
            <p className="lede mt-5">
              The fastest route is WhatsApp — you usually get a reply within a few working hours, from the person who
              would actually build your site. No call centre, no forms in triplicate.
            </p>

            <div className="mt-8 space-y-3">
              <a href={WA.general} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-ink/[.08] bg-white p-5 shadow-soft transition-all hover:border-[#25D366]/50 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#25D366]/10">
                  <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                </span>
                <span>
                  <span className="block text-[15px] font-bold text-ink">WhatsApp</span>
                  <span className="block text-[14px] text-ink-500">{SITE.phoneDisplay} · fastest reply</span>
                </span>
              </a>

              <a href={`tel:${SITE.phoneE164}`} className="flex items-center gap-4 rounded-2xl border border-ink/[.08] bg-white p-5 shadow-soft transition-all hover:border-mint-300 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint-50 text-lg">📞</span>
                <span>
                  <span className="block text-[15px] font-bold text-ink">Call</span>
                  <span className="block text-[14px] text-ink-500">{SITE.phoneDisplay} · Mon–Sat, 10am–7pm IST</span>
                </span>
              </a>

              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 rounded-2xl border border-ink/[.08] bg-white p-5 shadow-soft transition-all hover:border-mint-300 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mint-50 text-lg">✉️</span>
                <span>
                  <span className="block text-[15px] font-bold text-ink">Email</span>
                  <span className="block text-[14px] text-ink-500">{SITE.email}</span>
                </span>
              </a>
            </div>

            {/* Registered-entity details. Verification reviewers look for the legal
                name next to the contact details, not only in the footer. */}
            <div className="mt-8 rounded-2xl border border-ink/[.08] p-6">
              <h2 className="text-[15px] font-bold text-ink">Registered business</h2>
              <address className="mt-3 not-italic text-[14.5px] leading-relaxed text-ink-500">
                <strong className="font-semibold text-ink">{SITE.legalName}</strong>
                <br />
                {SITE.addressLines.join(', ')}
                <br />
                GSTIN: {SITE.gstin}
                <br />
                Udyam Registration Number: {SITE.udyam}
              </address>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-300">
                {SITE.name} is a trading name of {SITE.legalName}.{' '}
                <Link href="/business-information" className="underline underline-offset-2 hover:text-mint-600">
                  Full business information
                </Link>
                .
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-sand-50 p-6">
              <h2 className="text-[15px] font-bold text-ink">Useful things to include</h2>
              <ul className="mt-3 space-y-2 text-[14.5px] text-ink-500">
                <li>· Your clinic name and city</li>
                <li>· Your existing website, if you have one</li>
                <li>· The treatments you want more patients for</li>
                <li>· Roughly what budget you have in mind</li>
              </ul>
            </div>
          </div>

          <div>
            <LeadForm
              source="Contact page"
              heading="Or send your details here"
              sub="We'll reply on WhatsApp. Only name and number are required — the rest just helps us give you a better answer."
              cta="Send my enquiry"
            />
          </div>
        </div>
      </section>
    </>
  );
}
