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
          // Contact-intent clicks (WhatsApp / phone / email) reported as GA4 events.
          document.addEventListener('click', function (e) {
            var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!a) return;
            var h = a.getAttribute('href') || '';
            var name = /wa\\.me|api\\.whatsapp\\.com|whatsapp:\\/\\//i.test(h) ? 'whatsapp_click'
              : /^tel:/i.test(h) ? 'phone_click'
              : /^mailto:/i.test(h) ? 'email_click' : '';
            if (name) gtag('event', name, { link_url: h.split('?')[0], page_path: location.pathname });
          }, true);
        `}
      </Script>
    </>
  );
}
