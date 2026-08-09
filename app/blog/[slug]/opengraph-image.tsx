import { ImageResponse } from 'next/og';
import { OgCard, OG_SIZE, OG_CONTENT_TYPE, ogFonts } from '@/components/og';
import { POSTS, getPost } from '@/lib/posts';

export const alt = 'Zera Dental growth guide';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  return new ImageResponse(
    (
      <OgCard
        eyebrow={p ? `Guide · ${p.category}` : 'Growth guide'}
        title={p ? p.title : 'Zera Dental growth guides'}
        footnote={p ? `${p.readMins} min read · free` : 'Free to read'}
      />
    ),
    { ...size, fonts: ogFonts }
  );
}
