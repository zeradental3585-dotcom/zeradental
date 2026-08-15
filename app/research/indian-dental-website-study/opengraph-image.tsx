import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';

export const alt = 'Indian dental clinic website study 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Original research · 21 clinics"
        title="52% of Indian dental websites have no WhatsApp link"
        footnote="Free data · 7 cities measured"
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
