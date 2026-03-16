import type { MetadataRoute } from 'next';
import config from '@/config/portfolio';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = config.meta.url || 'https://saisarthakmohapatra.dev';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
