import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Analytics from '@/components/Analytics';
import SiteChrome from '@/components/SiteChrome';
import { JsonLd, orgSchema, websiteSchema } from '@/components/JsonLd';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Dental Website Design India — Clinic Websites From ₹14,999 | Zera Dental',
    template: '%s | Zera Dental',
  },
  description: SITE.description,
  keywords: [
    'dental website design India', 'dentist website development', 'dental clinic website',
    'website for dentists India', 'dental website design cost', 'local SEO for dentists',
    'dental clinic website design', 'Google Business Profile for dentists',
  ],
  authors: [{ name: 'Zera Technologies', url: SITE.parentUrl }],
  creator: 'Zera Technologies',
  publisher: 'Zera Technologies',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Dental Website Design India — Clinic Websites From ₹14,999',
    description: SITE.description,
  },
  // No title/description here on purpose — Next then falls back to each page's
  // own title/description instead of stamping the homepage one on every share.
  twitter: { card: 'summary_large_image' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  category: 'Web design for healthcare',
};

export const viewport: Viewport = {
  themeColor: '#0B1F33',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={[orgSchema, websiteSchema]} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteChrome header={<Header />} footer={<Footer />} float={<WhatsAppFloat />}>
          {children}
        </SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
