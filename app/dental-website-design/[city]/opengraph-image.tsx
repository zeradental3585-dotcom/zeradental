import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';
import { CITIES, getCity } from '@/lib/cities';

export const alt = 'Dental website design by Zera Dental';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export default async function Image({ params }: { params: { city: string } }) {
  const c = getCity(params.city);
  return new ImageResponse(
    (
      <OgCard
        eyebrow={c ? `${c.state} · India` : 'India'}
        title={c ? `Dental website design in ${c.name}` : 'Dental website design in India'}
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
