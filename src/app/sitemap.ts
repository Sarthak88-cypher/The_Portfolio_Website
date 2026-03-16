import type { MetadataRoute } from 'next';
import config from '@/config/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.meta.url || 'https://saisarthakmohapatra.dev';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
