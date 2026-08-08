import { SITE } from '@/lib/site';

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: 'Zera Dental Web Studio',
  url: SITE.url,
  description: SITE.description,
  telephone: SITE.phoneE164,
  email: SITE.email,
  priceRange: '₹₹',
  parentOrganization: { '@type': 'Organization', name: 'Zera Technologies', url: SITE.parentUrl },
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: 'IN',
  },
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: ['dental website design', 'local SEO for dentists', 'Google Business Profile optimisation', 'dental clinic marketing'],
  sameAs: [SITE.parentUrl],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-IN',
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.url}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, url: string, price?: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE.url}${url}`,
    serviceType: name,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    audience: { '@type': 'Audience', audienceType: 'Dental clinics and dentists in India' },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price: String(price),
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            url: `${SITE.url}/pricing`,
          },
        }
      : {}),
  };
}

export function articleSchema(a: { title: string; description: string; slug: string; date: string; updated?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated || a.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${a.slug}` },
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-IN',
  };
}
