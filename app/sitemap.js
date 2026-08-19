import { getAllProductSlugs } from '@/lib/products';
import { SITE } from '@/lib/site';

export default async function sitemap() {
  const base = SITE.url.replace(/\/$/, '');
  const now = new Date();

  const pages = ['', '/products', '/gallery', '/about', '/contact'].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8
  }));

  const slugs = await getAllProductSlugs();
  const products = slugs.map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...pages, ...products];
}
