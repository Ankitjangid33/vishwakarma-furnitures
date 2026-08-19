'use client';

import { useLang } from './LanguageProvider';
import { formatPrice, UNIT_KEY } from '@/lib/i18n';

/** "शुरू ₹42,000 / नग"  |  "दाम पूछें" */
export default function PriceTag({ product, size = 'md', className = '' }) {
  const { t, lang } = useLang();

  const big = size === 'lg';

  if (!product || product.priceType === 'quote' || !product.price) {
    return (
      <span className={`font-semibold text-wood-700 ${big ? 'text-xl' : 'text-base'} ${className}`}>
        {t('onRequest')}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      {product.priceType === 'from' && (
        <span className={`text-muted ${big ? 'text-sm' : 'text-xs'}`}>{t('from')}</span>
      )}
      <span
        className={`font-bold text-wood-800 ${big ? 'text-3xl' : 'text-lg'} font-[family-name:var(--font-display)]`}
      >
        {formatPrice(product.price, lang)}
      </span>
      <span className={`text-muted ${big ? 'text-sm' : 'text-xs'}`}>
        {t(UNIT_KEY[product.unit] || 'perPiece')}
      </span>
    </span>
  );
}
