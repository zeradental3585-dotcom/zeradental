import type { Metadata } from 'next';
import Link from 'next/link';
import { CTABand } from '@/components/Sections';
import { Arrow } from '@/components/Icons';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

/**
 * Public business-identity page — the single place every verification reviewer is
 * pointed at (Meta business verification, Google Ads advertiser verification,
 * payment gateways, app stores).
 *
 * Meta rejected verification in Oct 2026 with "your legal business name must be
 * present on the website", because the site named the brand everywhere and the
 * registered entity only as a footer attribution. Rules for editing this page:
 *   - the legal name must appear verbatim, as printed on the registration document
 *   - never replace SITE.legalName with SITE.name here
 *   - this page must stay indexable; a noindex page cannot be used as evidence
 *   - claim nothing that cannot be checked against a document
 */
export const metadata: Metadata = {
  title: { absolute: `Business Information — ${SITE.legalName} (${SITE.name})` },
  description: `Legal and registration details for ${SITE.legalName}, the registered business operating ${SITE.domain} as ${SITE.name}. Udyam registration, location and contact details.`,
  alternates: { canonical: '/business-information' },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE.name,
    locale: 'en_IN',
    title: `Business Information — ${SITE.legalName}`,
    description: `Registered business details for ${SITE.legalName}, operator of ${SITE.domain}.`,
    url: `${SITE.url}/business-information`,
  },
};

const ROWS: { label: string; value: React.ReactNode }[] = [
  { label: 'Legal business name', value: <strong className="font-semibold text-ink">{SITE.legalName}</strong> },
  { label: 'Trading name', value: `${SITE.name}` },
  { label: 'Website operated', value: <a href={SITE.url} className="text-mint-600 underline underline-offset-2">{SITE.domain}</a> },
  { label: 'Business type', value: 'Web design and development studio' },
  { label: 'GSTIN', value: <span className="font-mono text-[14.5px] font-semibold text-ink">{SITE.gstin}</span> },
  { label: 'Udyam Registration Number', value: <span className="font-mono text-[14.5px] font-semibold text-ink">{SITE.udyam}</span> },
  {
    label: 'Registered office address',
    value: (
      <span className="block whitespace-pre-line">{SITE.addressLines.join('\n')}</span>
    ),
  },
  { label: 'Email', value: <a href={`mailto:${SITE.email}`} className="text-mint-600 underline underline-offset-2">{SITE.email}</a> },
  { label: 'Telephone', value: <a href={`tel:${SITE.phoneE164}`} className="text-mint-600 underline underline-offset-2">{SITE.phoneDisplay}</a> },
  { label: 'Date of Udyam registration', value: SITE.udyamRegisteredOn },
  { label: 'Registered activity', value: 'Web-page designing (NIC 62012); computer consultancy and facilities management (NIC 62020)' },
];

const PROPERTIES = [
  { name: 'Zera Dental', url: SITE.url, d: 'Websites and local SEO for dental clinics in India.' },
  { name: 'BighaWala.com', url: 'https://www.bighawala.com/', d: 'Land information and conversion tools for Bihar.' },
  { name: 'SafalBalak.com', url: 'https://www.safalbalak.com/', d: 'Parenting and child-development publication.' },
  { name: 'Udakishunganj.com', url: 'https://www.udakishunganj.com/', d: 'Hyperlocal civic information portal.' },
  { name: 'KosiEducationTimes.com', url: 'https://kosieducationtimes.com/', d: 'Education news for the Kosi division.' },
  { name: 'AivantisGlobal.com', url: 'https://aivantisglobal.com/', d: 'Technology explainers and comparisons.' },
];

export default function BusinessInformationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Business Information', url: '/business-information' },
      ])} />

      <section className="wrap py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Business information</span>
          <h1 className="h1 mt-3">{SITE.legalName}</h1>
          <p className="lede mt-5">
            This website, <strong className="font-semibold text-ink">{SITE.domain}</strong>, is owned and operated by{' '}
            <strong className="font-semibold text-ink">{SITE.legalName}</strong>, a registered business in{' '}
            {SITE.addressLocality}, {SITE.addressRegion}, {SITE.addressCountryName}. <strong className="font-semibold text-ink">{SITE.name}</strong>{' '}
            is a trading name of {SITE.legalName}.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            This page exists so that anyone — a client, a platform reviewing an advertising or payment
            account, or a regulator — can confirm who stands behind this website without having to ask.
          </p>
        </div>
      </section>

      <section className="wrap pb-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-ink/[.08]">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Registered business details for {SITE.legalName}</caption>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label} className={i % 2 ? 'bg-sand-50' : 'bg-white'}>
                  <th scope="row" className="w-[46%] border-b border-ink/[.06] px-5 py-3.5 align-top text-[13.5px] font-semibold uppercase tracking-wide text-ink-300 sm:w-[38%]">
                    {r.label}
                  </th>
                  <td className="border-b border-ink/[.06] px-5 py-3.5 text-[15px] text-ink-500">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-[13.5px] leading-relaxed text-ink-300">
          The GSTIN can be verified on the Government of India&apos;s GST portal, and the Udyam number on the Ministry of
          MSME&apos;s Udyam Registration portal. Both are public registers, so anyone can confirm these details
          independently.
        </p>
      </section>

      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">What we do</span>
          <h2 className="h2 mt-2">Websites for dental clinics, built and run in India</h2>
          <p className="lede mt-5">
            {SITE.legalName} builds and operates websites. Under the {SITE.name} brand we design, build and host
            websites for dental clinics across India, and provide local search optimisation for them. Work is
            quoted up front as a one-time fee, with optional ongoing care. Our prices are published openly on our{' '}
            <Link href="/pricing" className="font-semibold text-mint-600 underline underline-offset-2">pricing page</Link>.
          </p>
        </div>
      </section>

      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Other properties</span>
          <h2 className="h2 mt-2">Websites operated by {SITE.legalName}</h2>
          <p className="lede mt-4">
            {SITE.name} is one of several websites this business builds and runs. All of them are live and publicly
            accessible.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {PROPERTIES.map((p) => (
              <li key={p.name} className="rounded-xl border border-ink/[.07] bg-white p-4 shadow-soft">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[15px] font-bold text-ink hover:text-mint-700">
                  {p.name}
                </a>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-500">{p.d}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[14.5px] leading-relaxed text-ink-500">
            The parent brand site is{' '}
            <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-mint-600 underline underline-offset-2">
              zeratech.io
            </a>
            .
          </p>
        </div>
      </section>

      <section className="wrap my-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-ink/[.08] bg-sand-50 p-8 sm:p-11">
          <span className="eyebrow">Contact</span>
          <h2 className="h2 mt-2">Reaching {SITE.legalName}</h2>
          <address className="mt-5 not-italic text-[16px] leading-relaxed text-ink-500">
            <strong className="font-semibold text-ink">{SITE.legalName}</strong>
            <br />
            {SITE.addressLines.map((l) => (
              <span key={l}>{l}<br /></span>
            ))}
            <br />
            Email: <a href={`mailto:${SITE.email}`} className="text-mint-600 underline underline-offset-2">{SITE.email}</a>
            <br />
            Telephone and WhatsApp:{' '}
            <a href={`tel:${SITE.phoneE164}`} className="text-mint-600 underline underline-offset-2">{SITE.phoneDisplay}</a>
          </address>
          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-300">
            We reply on WhatsApp and email. We do not operate a call centre and we do not make unsolicited sales
            calls.
          </p>
          <Link href="/contact" className="btn-dark mt-7">Go to the contact page <Arrow className="h-4 w-4" /></Link>
        </div>
      </section>

      <CTABand
        title="Want to talk about a website for your clinic?"
        sub="Message us on WhatsApp with your clinic name and city, and we will reply with honest advice before any quote."
      />
    </>
  );
}
