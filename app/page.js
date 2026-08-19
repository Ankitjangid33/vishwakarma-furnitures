import HomeClient from '@/components/home/HomeClient';
import { getProducts, getGallery, getCategoryCounts } from '@/lib/products';

// Naya saman admin se jodte hi home page par dikhe
export const revalidate = 60;

export default async function HomePage() {
  const [featured, gallery, counts] = await Promise.all([
    getProducts({ featured: true, limit: 8 }),
    getGallery({ limit: 6 }),
    getCategoryCounts()
  ]);

  return <HomeClient featured={featured} gallery={gallery} counts={counts} />;
}
