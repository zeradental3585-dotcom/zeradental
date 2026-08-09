import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';

export const alt = 'Zera Dental — dental website design for clinics across India';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Dental website design · India"
        title="Your next patient is on Google right now."
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
