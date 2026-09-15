import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/features',
    '/how-it-works',
    '/pricing',
    '/about',
    '/faq',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const currentDate = new Date().toISOString();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
