import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HXC70K3RGX';

/**
 * Google Analytics 4 (gtag.js).
 * Loaded with strategy="afterInteractive" so it never blocks first paint
 * or hurts the mobile PageSpeed score we sell on.
 */
export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
