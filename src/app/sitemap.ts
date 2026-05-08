import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.homeenergyconstruction.com'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: baseUrl + '/windows', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/windows-offer', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/roofing', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/hvac', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/insulation', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/outdoor', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/estimate', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/offer', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
