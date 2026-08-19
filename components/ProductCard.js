'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icons';
import ProductImage from './ProductImage';
import PriceTag from './PriceTag';
import { useLang } from './LanguageProvider';
import { useCart } from './CartProvider';

export default function ProductCard({ product, priority = false }) {
  const { t, pick } = useLang();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const name = pick(product.name);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="card group flex flex-col transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage
          src={product.images?.[0]?.url}
          alt={name}
          category={product.category}
          label={name}
          priority={priority}
          className="aspect-[4/3] w-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.type === 'set' && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-500 px-2.5 py-1 text-[11px] font-bold text-wood-900 shadow">
            {t('typeSet')}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-base font-semibold text-wood-900 transition group-hover:text-wood-600">
            {name}
          </h3>
        </Link>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
          {pick(product.description)}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
          {pick(product.material) && (
            <span className="inline-flex items-center gap-1">
              <Icon name="box" className="h-3.5 w-3.5" />
              {pick(product.material)}
            </span>
          )}
          {product.size && (
            <span className="inline-flex items-center gap-1">
              <Icon name="ruler" className="h-3.5 w-3.5" />
              {product.size}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <PriceTag product={product} />

          <button
            type="button"
            onClick={handleAdd}
            className={`btn !px-3.5 !py-2 !text-xs ${justAdded ? 'btn-outline !border-green-500 !text-green-700' : 'btn-primary'}`}
          >
            {justAdded ? (
              <>
                <Icon name="check" className="h-4 w-4" />
                {t('added')}
              </>
            ) : (
              <>
                <Icon name="plus" className="h-4 w-4" />
                {t('addToOrder')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
