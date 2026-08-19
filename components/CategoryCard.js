'use client';

import Link from 'next/link';
import Icon from './Icons';
import { useLang } from './LanguageProvider';

export default function CategoryCard({ category, count = 0 }) {
  const { pick, t } = useLang();

  return (
    <Link
      href={`/products?category=${category.id}`}
      className="card group flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-wood-100 text-wood-700 transition group-hover:bg-wood-600 group-hover:text-white">
        <Icon name={category.icon} className="h-7 w-7" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-wood-900">{pick(category.name)}</span>
          <Icon
            name="chevronRight"
            className="h-4 w-4 shrink-0 text-wood-400 transition group-hover:translate-x-0.5 group-hover:text-wood-700"
          />
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{pick(category.desc)}</span>
        {count > 0 && (
          <span className="mt-2 inline-block rounded-full bg-wood-50 px-2.5 py-0.5 text-xs font-semibold text-wood-700">
            {count} {t('itemsFound')}
          </span>
        )}
      </span>
    </Link>
  );
}
