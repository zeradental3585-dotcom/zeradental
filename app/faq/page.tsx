import type { Metadata } from 'next';
import { FAQ, CTABand } from '@/components/Sections';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: { absolute: 'Dental Website FAQ India — Cost, Timelines, SEO | Zera Dental' },
  description:
    'Straight answers on dental website cost in India, timelines, SEO expectations, ownership, payment terms, content, hosting and what happens after launch.',
  alternates: { canonical: '/faq' },
};

const GROUPS = [
  {
    title: 'Cost and payment',
    items: [
      { q: 'How much does a dental website cost in India?', a: 'Market rates run from about ₹15,000 to ₹1,50,000 depending on scope. Zera Dental charges ₹14,999 for a 5-page Starter Clinic site, ₹29,999 for a 12-page Growth Practice site with local SEO, and ₹49,999 for an Authority Clinic build with online booking and multi-location support. Domain and first-year hosting are included in all three.' },
      { q: 'Are there hidden or recurring costs?', a: 'No hidden costs. From year two you pay domain renewal and hosting, roughly ₹3,000-₹4,000 a year if you manage it yourself. The optional Zera Care plan at ₹1,999 a month bundles that with unlimited edits, a monthly article and reporting. Nothing is compulsory.' },
      { q: 'Can I pay in instalments?', a: 'Yes. Standard terms are 50% to start and 50% on handover of the live site. Larger Authority builds can be split three ways. GST invoicing where applicable.' },
      { q: 'Do you offer refunds?', a: 'If you are unhappy with the initial design direction before development begins, your advance is refunded in full. After development starts, the advance covers work already delivered, but design revisions continue until you approve.' },
    ],
  },
  {
    title: 'Timeline and process',
    items: [
      { q: 'How fast can my site go live?', a: 'Starter in 7 days, Growth in about 12, Authority in about 21 — counted from when you send content and photos. Rush delivery in 72 hours is a ₹6,999 add-on.' },
      { q: 'How much of my time will this take?', a: 'Usually under two hours in total: a 30-minute interview so we can write your copy, one round of feedback on the live preview link, and final approval.' },
      { q: 'Do I need to write the content?', a: 'No. Copywriting for every page is included. You review and mark changes rather than writing from scratch.' },
      { q: 'What about photos?', a: 'Real photos of your clinic and team help significantly. We send a simple shot list you can follow with a phone camera, and we handle the editing. If you have nothing ready, we launch with clean illustration-led design and swap photos in later at no charge.' },
    ],
  },
  {
    title: 'SEO and results',
    items: [
      { q: 'Will my clinic rank number one on Google?', a: 'Nobody can promise that, and you should be wary of anyone who does — Google neither sells nor guarantees positions. What is controllable is handled completely: speed, mobile usability, schema, treatment pages, internal linking, Business Profile completeness, citation consistency and a review system. In lower-competition Indian cities that combination commonly reaches the Map Pack within one to three months.' },
      { q: 'How long before I see enquiries?', a: 'Direct traffic and Google Business Profile calls often improve within weeks, because profile fixes work fast. Organic rankings for treatment keywords typically build over three to six months, faster in tier-2 and tier-3 cities.' },
      { q: 'Do you run Google Ads?', a: 'No. We are an organic-search studio and we do not run paid campaigns for ourselves or for clients. Ads stop the day the budget stops; organic rankings compound.' },
      { q: 'Will you write fake reviews for me?', a: 'Never. It breaches Google policy, it is detectable, and it gets profiles suspended. We build a system that makes it effortless for genuinely satisfied patients to review you.' },
    ],
  },
  {
    title: 'Ownership and technical',
    items: [
      { q: 'Who owns the website and domain?', a: 'You do, entirely. The domain is registered in your name and you get full admin access to the site plus every account we create for you — Google Business Profile, Search Console and Analytics. No lock-in, and you can migrate elsewhere at any time.' },
      { q: 'Can I update the site myself?', a: 'On Growth and Authority packages you get a simple content editor for posts, text and photos with no coding. Starter includes 30 days of free edits, after which edits are covered by Zera Care or quoted individually.' },
      { q: 'What technology do you build on?', a: 'Next.js, deployed to a global edge network. That means pre-built pages served from close to your patient, rather than a plugin-heavy install on a slow shared server. It is faster, more secure and has almost no maintenance burden.' },
      { q: 'Is my patient data safe?', a: 'Enquiry forms send data over an encrypted connection to a private spreadsheet only you and we can access. We never store clinical records, and we recommend keeping all patient health information inside your clinic management software, not on the website.' },
    ],
  },
];

export default function FAQPage() {
  const all = GROUPS.flatMap((g) => g.items);
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]),
        faqSchema(all),
      ]} />

      <section className="wrap py-14 text-center sm:py-20">
        <span className="eyebrow">FAQ</span>
        <h1 className="h1 mt-3">Straight answers, no sales language</h1>
        <p className="lede mx-auto mt-5 max-w-2xl">
          Everything dentists ask us before hiring, including the awkward questions about guarantees and refunds.
        </p>
      </section>

      {GROUPS.map((g) => <FAQ key={g.title} items={g.items} title={g.title} />)}

      <CTABand />
    </>
  );
}
