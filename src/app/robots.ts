import { MetadataRoute } from 'next';
import { SITE_URL, CANONICAL_SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  const isPreviewOrStaging =
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
    SITE_URL.includes('staging') ||
    SITE_URL.includes('preview') ||
    SITE_URL.includes('localhost');

  if (isPreviewOrStaging) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`,
  };
}
