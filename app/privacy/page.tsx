import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Zera Dental collects, uses and protects the information you share through this website.',
  alternates: { canonical: '/privacy' },
};

export default function Privacy() {
  return (
    <article className="wrap py-14 sm:py-20">
      <div className="mx-auto max-w-3xl prose-z">
        <h1 className="font-display text-4xl tracking-[-.02em]">Privacy Policy</h1>
        <p className="text-[14px] text-ink-300">Last updated: 1 August 2026</p>

        <p>
          This website, {SITE.domain}, is owned and operated by {SITE.name}, a property of{' '}
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">Zera Technologies</a>. Zera Technologies is
          the data controller for information collected through this site. This policy explains what we collect, why, and
          what you can do about it.
        </p>

        <h2>What we collect</h2>
        <p>We only collect information you actively give us, plus basic anonymous analytics.</p>
        <ul>
          <li><strong>Information you submit:</strong> your name, WhatsApp or phone number, clinic name, city, existing website URL, your answers to the free website audit, and any message you type into a form.</li>
          <li><strong>Automatically collected:</strong> anonymised page views, approximate region, device type, and referring source, through privacy-respecting analytics. We do not use this to identify individuals.</li>
          <li><strong>We do not collect:</strong> patient health information, clinical records, payment card details, or any special category personal data. Please never send us patient information.</li>
        </ul>

        <h2>Why we collect it</h2>
        <ul>
          <li>To prepare and send you the free clinic website audit you requested.</li>
          <li>To reply to your enquiry on WhatsApp, phone or email.</li>
          <li>To prepare quotations and deliver services if you engage us.</li>
          <li>To understand, in aggregate, which pages are useful so we can improve the site.</li>
        </ul>

        <h2>Where your information is stored</h2>
        <p>
          Form submissions are transmitted over an encrypted connection and stored in a private Google Sheets workspace
          accessible only to authorised Zera Technologies personnel. WhatsApp conversations are stored within WhatsApp
          under Meta&apos;s own encryption and policies. We retain enquiry data for up to 24 months, after which it is
          deleted unless you have become a client and we are required to retain records for accounting purposes.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We do not sell, rent or trade your information. We share it only with service providers strictly necessary to
          operate this site — hosting and analytics providers — and only to the extent required. We may disclose
          information if compelled by valid legal process under Indian law.
        </p>

        <h2>Cookies</h2>
        <p>
          This site uses minimal cookies, limited to what is required for the site to function and for anonymous
          analytics. We do not use advertising or cross-site tracking cookies, and we do not run retargeting pixels. You
          can block cookies in your browser settings without breaking the site.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask us at any time to tell you what data we hold about you, correct it, or delete it entirely. Email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or message {SITE.phoneDisplay} on WhatsApp and we will action
          it within 30 days. You do not need to give a reason.
        </p>

        <h2>Marketing</h2>
        <p>
          We do not run automated marketing sequences and we do not add you to a mailing list without you asking. If you
          submit an enquiry we will reply about that enquiry. If you would rather we stop contacting you, say so once and
          we will.
        </p>

        <h2>Children</h2>
        <p>
          This site is intended for dental professionals and business owners. It is not directed at children and we do
          not knowingly collect information from anyone under 18.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes materially we will update the date at the top of this page. Continued use of the site
          after a change constitutes acceptance of the revised policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or WhatsApp {SITE.phoneDisplay}.
          {SITE.name} is a property of{' '}
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">Zera Technologies</a>.
        </p>
      </div>
    </article>
  );
}
