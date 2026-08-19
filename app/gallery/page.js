import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import { getGallery } from '@/lib/products';

export const revalidate = 60;

export const metadata = {
  title: 'Our Work / हमारा किया हुआ काम',
  description:
    'Photos of bedroom sets, modular kitchens, wardrobes, mandirs and doors we have built and installed.'
};

export default async function GalleryPage() {
  const items = await getGallery({});

  return (
    <>
      <PageHeader titleKey="galleryTitle" subKey="gallerySub" />
      <section className="container-page py-10">
        <GalleryGrid items={items} />
      </section>
    </>
  );
}
