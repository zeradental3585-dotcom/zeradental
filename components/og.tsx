import fs from 'node:fs';
import path from 'node:path';
import { SITE } from '@/lib/site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const INK = '#0B1F33';
const MINT = '#12B48D';
const MINT_SOFT = '#A7EBDA';

/**
 * Fonts are read from the repo rather than fetched at build time.
 * next/og otherwise pulls a default font from a CDN, which makes the
 * build depend on an external host being up.
 */
const fontFile = (name: string) =>
  fs.readFileSync(path.join(process.cwd(), 'assets', 'fonts', name));

export const ogFonts = [
  { name: 'Jakarta', data: fontFile('plus-jakarta-sans-latin-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'Jakarta', data: fontFile('plus-jakarta-sans-latin-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
  // latin-ext carries U+20B9 (₹). Without it Satori renders the rupee sign as a
  // fallback box, which looks broken in a WhatsApp preview.
  { name: 'JakartaExt', data: fontFile('plus-jakarta-sans-latin-ext-700-normal.woff'), weight: 700 as const, style: 'normal' as const },
  { name: 'JakartaExt', data: fontFile('plus-jakarta-sans-latin-ext-800-normal.woff'), weight: 800 as const, style: 'normal' as const },
];

function Tooth({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M7.2 3.4C5 3.4 3.6 5.1 3.6 7.6c0 2 .5 3.3.9 5 .3 1.3.4 2.3.5 3.9.1 1.7.4 3.1.9 4 .4.7 1 1.1 1.6 1.1.9 0 1.4-.7 1.7-2 .3-1.2.4-2.6.7-3.7.2-.9.6-1.5 1.1-1.5s.9.6 1.1 1.5c.3 1.1.4 2.5.7 3.7.3 1.3.8 2 1.7 2 .6 0 1.2-.4 1.6-1.1.5-.9.8-2.3.9-4 .1-1.6.2-2.6.5-3.9.4-1.7.9-3 .9-5 0-2.5-1.4-4.2-3.6-4.2-1.4 0-2.3.5-3.8.5s-2.4-.5-3.8-.5Z"
        stroke="#04241C"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#04241C"
        fillOpacity="0.12"
      />
    </svg>
  );
}

/** Shared OG card. Satori: flexbox + inline styles only; multi-child nodes need display:flex. */
export function OgCard({ eyebrow, title, footnote }: { eyebrow: string; title: string; footnote?: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: INK,
        padding: '62px 72px',
        fontFamily: 'Jakarta, JakartaExt',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: -160,
          width: 660,
          height: 660,
          borderRadius: 660,
          background: 'radial-gradient(circle, rgba(18,180,141,0.40) 0%, rgba(18,180,141,0) 70%)',
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 17,
            backgroundColor: MINT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 18,
          }}
        >
          <Tooth />
        </div>
        <div style={{ display: 'flex', fontSize: 33, fontWeight: 800, color: '#FFFFFF', letterSpacing: -0.6 }}>
          Zera<span style={{ color: MINT_SOFT }}>Dental</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
        <div style={{ display: 'flex', fontSize: 21, fontWeight: 700, color: MINT, letterSpacing: 3, marginBottom: 22 }}>
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 72 ? 52 : title.length > 46 ? 62 : 72,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.12,
            letterSpacing: -1.8,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            backgroundColor: MINT,
            color: '#04241C',
            fontSize: 25,
            fontWeight: 800,
            padding: '15px 30px',
            borderRadius: 999,
          }}
        >
          {footnote || 'From ₹14,999 · live in 7 days'}
        </div>
        <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
          {SITE.domain}
        </div>
      </div>
    </div>
  );
}
