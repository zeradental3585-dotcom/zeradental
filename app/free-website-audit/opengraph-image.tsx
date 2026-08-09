import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';

export const alt = 'Free dental clinic website audit — score your clinic in 2 minutes';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Free · 2 minutes · no card"
        title="How findable is your dental clinic, really?"
        footnote="Instant score out of 100"
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
