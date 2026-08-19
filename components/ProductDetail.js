'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icons';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import ProductCard from './ProductCard';
import { useLang } from './LanguageProvider';
import { useCart } from './CartProvider';
import { getCategory } from '@/lib/categories';
import { waLink } from '@/lib/site';

export default function ProductDetail({ product, related = [] }) {
  const { t, pick, lang } = useLang();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  const name = pick(product.name);
  const cat = getCategory(product.category);
  const images = product.images || [];

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const waText =
    lang === 'hi'
      ? `नमस्ते! मुझे "${name}" के बारे में जानकारी और दाम चाहिए।`
      : `Hello! I want details and price for "${name}".`;

  return (
    <>
      <section className="container-page py-6">
        {/* breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href="/products" className="hover:text-wood-700">
            {t('navProducts')}
          </Link>
          <Icon name="chevronRight" className="h-3.5 w-3.5" />
          <Link href={`/products?category=${product.category}`} className="hover:text-wood-700">
            {pick(cat?.name)}
          </Link>
          <Icon name="chevronRight" className="h-3.5 w-3.5" />
          <span className="text-wood-800">{name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {/* ---------- images ---------- */}
          <div>
            <ProductImage
              src={images[activeImg]?.url}
              alt={name}
              category={product.category}
              label={name}
              priority
              className="aspect-[4/3] w-full rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {images.length > 1 && (
              <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={img.url + i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                      i === activeImg ? 'border-wood-600' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ProductImage
                      src={img.url}
                      alt={`${name} ${i + 1}`}
                      category={product.category}
                      className="h-full w-full"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------- info ---------- */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-wood-100 px-3 py-1 text-xs font-semibold text-wood-700">
                {pick(cat?.name)}
              </span>
              {product.type === 'set' && (
                <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-wood-900">
                  {t('typeSet')}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-3xl text-wood-900 md:text-4xl">{name}</h1>

            <p className="mt-4 leading-relaxed text-muted">{pick(product.description)}</p>

            <div className="mt-6">
              <PriceTag product={product} size="lg" />
              {product.priceType === 'from' && (
                <p className="mt-1.5 text-xs text-muted">{t('estimateNote')}</p>
              )}
            </div>

            {/* specs */}
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              {pick(product.material) && (
                <div className="rounded-2xl border border-wood-100 bg-white p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    <Icon name="box" className="h-4 w-4" />
                    {t('material')}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-wood-900">{pick(product.material)}</dd>
                </div>
              )}
              {product.size && (
                <div className="rounded-2xl border border-wood-100 bg-white p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    <Icon name="ruler" className="h-4 w-4" />
                    {t('size')}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-wood-900">{product.size}</dd>
                </div>
              )}
              {product.deliveryDays > 0 && (
                <div className="rounded-2xl border border-wood-100 bg-white p-4">
                  <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                    <Icon name="truck" className="h-4 w-4" />
                    {t('readyIn')}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-wood-900">
                    {product.deliveryDays} {t('days')}
                  </dd>
                </div>
              )}
            </dl>

            {/* set includes */}
            {product.includes?.length > 0 && (
              <div className="mt-6 rounded-2xl border border-wood-100 bg-wood-50 p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-wood-700">
                  {t('includesTitle')}
                </h2>
                <ul className="mt-3 space-y-2">
                  {product.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-wood-800">
                      <Icon name="checkCircle" className="mt-0.5 h-4 w-4 shrink-0 text-wood-600" />
                      {pick(inc)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-wood-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                  aria-label="-"
                  className="grid h-11 w-11 place-items-center rounded-full text-wood-700 hover:bg-wood-50"
                >
                  <Icon name="minus" className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-semibold text-wood-900">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((n) => Math.min(99, n + 1))}
                  aria-label="+"
                  className="grid h-11 w-11 place-items-center rounded-full text-wood-700 hover:bg-wood-50"
                >
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`btn ${added ? 'btn-outline !border-green-500 !text-green-700' : 'btn-primary'}`}
              >
                <Icon name={added ? 'check' : 'plus'} className="h-4 w-4" />
                {added ? t('added') : t('addToOrder')}
              </button>

              <Link href="/cart" className="btn btn-outline">
                {t('orderThis')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>

              <a
                href={waLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {t('askPrice')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- related ---------- */}
      {related.length > 0 && (
        <section className="container-page pb-16 pt-10">
          <h2 className="section-title !text-2xl">{t('relatedTitle')}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
