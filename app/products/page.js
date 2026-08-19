import PageHeader from '@/components/PageHeader';
import ProductsBrowser from '@/components/ProductsBrowser';
import { getProducts } from '@/lib/products';
import { CATEGORY_IDS } from '@/lib/categories';

export const revalidate = 60;

export const metadata = {
  title: 'Products / हमारा सामान',
  description:
    'Beds, wardrobes, sofas, modular kitchens, mandir, doors and full room sets — made to your size.'
};

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const category = CATEGORY_IDS.includes(sp?.category) ? sp.category : '';
  const type = ['item', 'set'].includes(sp?.type) ? sp.type : '';

  const products = await getProducts({});

  return (
    <>
      <PageHeader titleKey="productsTitle" subKey="productsSub" />
      <section className="container-page py-10">
        <ProductsBrowser products={products} initialCategory={category} initialType={type} />
      </section>
    </>
  );
}
