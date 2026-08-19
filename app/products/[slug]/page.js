import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '@/lib/products';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Not found' };

  const title = `${product.name?.hi || ''} / ${product.name?.en || ''}`.replace(/^ \/ | \/ $/, '');

  return {
    title,
    description: product.description?.en || product.description?.hi || '',
    openGraph: {
      title,
      description: product.description?.hi || product.description?.en || '',
      images: product.images?.[0]?.url ? [product.images[0].url] : []
    }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(product, 4);

  return <ProductDetail product={product} related={related} />;
}
