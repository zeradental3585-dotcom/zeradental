import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';

export const alt = "See your dental clinic's website in 60 seconds — free";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Free · 60 seconds · no payment"
        title="See your clinic's new website before you pay a rupee."
        footnote="Made for dentists in India"
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
