'use client';

import { useEffect, useMemo, useState } from 'react';
import Icon from './Icons';
import ProductImage from './ProductImage';
import { useLang } from './LanguageProvider';
import { CATEGORIES } from '@/lib/categories';

export default function GalleryGrid({ items = [] }) {
  const { t, pick } = useLang();
  const [category, setCategory] = useState('');
  const [lightbox, setLightbox] = useState(null); // index

  const filtered = useMemo(
    () => (category ? items.filter((g) => g.category === category) : items),
    [items, category]
  );

  // Sirf un categories ke chips jinme kaam hai
  const usedCategories = useMemo(() => {
    const ids = new Set(items.map((g) => g.category));
    return CATEGORIES.filter((c) => ids.has(c.id));
  }, [items]);

  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
    };

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, filtered.length]);

  const current = lightbox !== null ? filtered[lightbox] : null;

  return (
    <div>
      {/* filters */}
      <div className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
        <button type="button" onClick={() => setCategory('')} className={`chip ${!category ? 'chip-active' : ''}`}>
          {t('all')}
        </button>
        {usedCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            className={`chip ${category === c.id ? 'chip-active' : ''}`}
          >
            <Icon name={c.icon} className="h-4 w-4" />
            {pick(c.name)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card px-6 py-16 text-center text-muted">{t('noGallery')}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g, i) => (
            <button
              key={g._id || i}
              type="button"
              onClick={() => setLightbox(i)}
              className="group relative block overflow-hidden rounded-2xl text-left"
            >
              <ProductImage
                src={g.image?.url}
                alt={pick(g.title)}
                category={g.category}
                label={pick(g.title)}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
                <span className="block text-sm font-semibold text-white">{pick(g.title)}</span>
                <span className="block text-xs text-white/75">
                  {[pick(g.location), g.year].filter(Boolean).join(' · ')}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label={t('close')}
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <Icon name="close" className="h-6 w-6" />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
                }}
                className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <Icon name="chevronLeft" className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((i) => (i + 1) % filtered.length);
                }}
                className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <Icon name="chevronRight" className="h-6 w-6" />
              </button>
            </>
          )}

          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <ProductImage
              src={current.image?.url}
              alt={pick(current.title)}
              category={current.category}
              label={pick(current.title)}
              className="aspect-[4/3] w-full rounded-2xl"
              sizes="90vw"
            />
            <figcaption className="mt-3 text-center text-white">
              <span className="block text-lg font-semibold">{pick(current.title)}</span>
              <span className="block text-sm text-white/70">
                {[pick(current.location), current.year].filter(Boolean).join(' · ')}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
