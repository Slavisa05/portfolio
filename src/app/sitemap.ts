import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://slavisadev.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://slavisadev.com/politika-privatnosti',
      lastModified: new Date('2026-11-08'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
