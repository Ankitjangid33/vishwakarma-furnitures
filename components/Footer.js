'use client';

import Link from 'next/link';
import Icon, { Logo } from './Icons';
import LanguageSwitch from './LanguageSwitch';
import { useLang } from './LanguageProvider';
import { CATEGORIES } from '@/lib/categories';
import { SITE, dialNumber, waLink } from '@/lib/site';

export default function Footer() {
  const { t, pick } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-wood-900 text-wood-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <Logo className="h-11 w-11" />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
              {t('brand')}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-wood-200">{t('footerAbout')}</p>
          <div className="mt-5 flex gap-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
            </a>
            <a
              href={`tel:${dialNumber()}`}
              aria-label={t('callNow')}
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <Icon name="phone" className="h-5 w-5" />
            </a>
            {SITE.social.instagram && (
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Icon name="instagram" className="h-5 w-5" />
              </a>
            )}
            {SITE.social.facebook && (
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <Icon name="facebook" className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* quick links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">{t('quickLinks')}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              ['/', 'navHome'],
              ['/products', 'navProducts'],
              ['/gallery', 'navGallery'],
              ['/about', 'navAbout'],
              ['/contact', 'navContact'],
              ['/cart', 'navCart']
            ].map(([href, key]) => (
              <li key={href}>
                <Link href={href} className="text-wood-200 transition hover:text-white">
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* categories */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">{t('ourWork')}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/products?category=${c.id}`}
                  className="text-wood-200 transition hover:text-white"
                >
                  {pick(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400">{t('reachUs')}</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-wood-200">
            <li className="flex gap-2.5">
              <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{pick(SITE.address)}</span>
            </li>
            <li className="flex gap-2.5">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${dialNumber()}`} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>{pick(SITE.hours)}</span>
            </li>
          </ul>
          <div className="mt-5">
            <LanguageSwitch size="sm" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-wood-300 sm:flex-row">
          <p>
            © {year} {t('brand')}. {t('rights')}
          </p>
          <Link href="/admin" className="text-wood-400 transition hover:text-wood-200">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
