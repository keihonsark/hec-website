import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.homeenergyconstruction.com'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: baseUrl + '/windows', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/windows/fresno', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/windows/clovis', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/windows/visalia', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/windows/hanford', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/windows/madera', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/windows/tulare', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: baseUrl + '/roofing', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/roofing/replacement', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/roofing/repair', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/roofing/gutters', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/roofing/inspection', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/hvac', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/insulation', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/outdoor', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/paint', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/about', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/reviews', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/financing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/estimate', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/offer', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
