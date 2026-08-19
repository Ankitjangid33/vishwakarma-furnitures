import AboutClient from '@/components/AboutClient';
import { getGallery } from '@/lib/products';

export const revalidate = 60;

export const metadata = {
  title: 'About Us / हमारे बारे में',
  description:
    'A family carpentry workshop making custom wooden furniture — free measurement at home, fixed price and fitting included.'
};

export default async function AboutPage() {
  const gallery = await getGallery({ limit: 4 });
  return <AboutClient gallery={gallery} />;
}
