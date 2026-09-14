import type { MetadataRoute } from 'next';
import config from '@/config/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = config.meta.url || 'https://www.saisarthakmohapatra.site';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
