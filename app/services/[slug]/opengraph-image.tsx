import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';
import { SERVICES, getService } from '@/lib/services';

export const alt = 'Zera Dental service';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return new ImageResponse(
    (
      <OgCard
        eyebrow="For dental clinics in India"
        title={s ? s.h1 : 'Dental website design in India'}
        footnote={s ? s.price : undefined}
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
