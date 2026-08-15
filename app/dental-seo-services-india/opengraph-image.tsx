import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';

export const alt = 'Dental SEO services in India — from ₹8,999/month';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="For dental clinics in India"
        title="Dental SEO that puts your clinic in the Map Pack"
        footnote="From ₹8,999/month · no lock-in"
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
