import { SITE } from '@/lib/site';

export default function robots() {
  const base = SITE.url.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/cart']
      }
    ],
    sitemap: `${base}/sitemap.xml`
  };
}
