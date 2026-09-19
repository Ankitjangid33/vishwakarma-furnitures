import HomeClient from '@/components/home/HomeClient';
import { getProducts, getGallery, getCategoryCounts, getTestimonials } from '@/lib/products';

// Naya saman admin se jodte hi home page par dikhe
export const revalidate = 60;

export default async function HomePage() {
  const [featured, gallery, counts, testimonials] = await Promise.all([
    getProducts({ featured: true, limit: 8 }),
    getGallery({ limit: 6 }),
    getCategoryCounts(),
    getTestimonials({ limit: 6 })
  ]);

  return <HomeClient featured={featured} gallery={gallery} counts={counts} testimonials={testimonials} />;
}
