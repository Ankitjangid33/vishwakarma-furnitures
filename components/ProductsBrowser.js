'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icons';
import ProductCard from './ProductCard';
import { useLang } from './LanguageProvider';
import { CATEGORIES } from '@/lib/categories';

export default function ProductsBrowser({ products = [], initialCategory = '', initialType = '' }) {
  const { t, pick } = useLang();
  const router = useRouter();

  const [category, setCategory] = useState(initialCategory);
  const [type, setType] = useState(initialType);
  const [q, setQ] = useState('');

  const changeCategory = (id) => {
    setCategory(id);
    const url = id ? `/products?category=${id}` : '/products';
    router.replace(url, { scroll: false });
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (type && p.type !== type) return false;
      if (!needle) return true;
      const hay = [
        p.name?.en,
        p.name?.hi,
        p.description?.en,
        p.description?.hi,
        p.material?.en,
        p.material?.hi,
        p.size
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [products, category, type, q]);

  const hasFilters = category || type || q;

  return (
    <div>
      {/* ---------- search ---------- */}
      <div className="relative mb-5">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-wood-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="field py-3 pl-12 text-base"
          aria-label={t('search')}
        />
      </div>

      {/* ---------- category chips ---------- */}
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1">
        <button
          type="button"
          onClick={() => changeCategory('')}
          className={`chip ${!category ? 'chip-active' : ''}`}
        >
          {t('all')}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => changeCategory(c.id)}
            className={`chip ${category === c.id ? 'chip-active' : ''}`}
          >
            <Icon name={c.icon} className="h-4 w-4" />
            {pick(c.name)}
          </button>
        ))}
      </div>

      {/* ---------- type chips ---------- */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{t('filterType')}:</span>
        <button type="button" onClick={() => setType('')} className={`chip py-1.5 text-xs ${!type ? 'chip-active' : ''}`}>
          {t('all')}
        </button>
        <button
          type="button"
          onClick={() => setType('item')}
          className={`chip py-1.5 text-xs ${type === 'item' ? 'chip-active' : ''}`}
        >
          {t('typeItem')}
        </button>
        <button
          type="button"
          onClick={() => setType('set')}
          className={`chip py-1.5 text-xs ${type === 'set' ? 'chip-active' : ''}`}
        >
          {t('typeSet')}
        </button>

        <span className="ml-auto text-sm text-muted">
          {filtered.length} {t('itemsFound')}
        </span>
      </div>

      {/* ---------- grid ---------- */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-wood-100 text-wood-500">
            <Icon name="search" className="h-7 w-7" />
          </span>
          <p className="text-lg font-semibold text-wood-800">{t('noProducts')}</p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQ('');
                setType('');
                changeCategory('');
              }}
              className="btn btn-outline py-2 text-sm"
            >
              {t('clearFilters')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
