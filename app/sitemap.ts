import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { CITIES } from '@/lib/cities';
import { SERVICES } from '@/lib/services';
import { POSTS } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/free-website-audit`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${SITE.url}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE.url}/locations`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE.url}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const services: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85,
  }));

  const cities: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: `${SITE.url}/dental-website-design/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.9,
  }));

  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated || p.date),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...core, ...services, ...cities, ...posts];
}
