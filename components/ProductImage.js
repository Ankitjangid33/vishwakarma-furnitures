'use client';

import Image from 'next/image';
import Icon from './Icons';
import { getCategory } from '@/lib/categories';
import { useLang } from './LanguageProvider';

/**
 * Photo dikhata hai. Agar photo abhi upload nahi hui to lakdi jaisa
 * sundar placeholder dikhata hai — website kabhi khali nahi lagti.
 */
export default function ProductImage({
  src,
  alt = '',
  category = 'custom',
  label = '',
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false
}) {
  const { t } = useLang();
  const cat = getCategory(category);

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-wood-100 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className={`wood-texture relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 grid place-items-center p-4 text-center text-white">
        <div>
          <Icon name={cat?.icon || 'box'} className="mx-auto h-10 w-10 opacity-90" />
          {label && <p className="mt-2 line-clamp-2 text-sm font-semibold drop-shadow">{label}</p>}
          <p className="mt-1 text-[11px] uppercase tracking-wider text-white/70">{t('photoComing')}</p>
        </div>
      </div>
    </div>
  );
}
