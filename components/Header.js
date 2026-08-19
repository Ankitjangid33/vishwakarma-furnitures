'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon, { Logo } from './Icons';
import LanguageSwitch from './LanguageSwitch';
import { useLang } from './LanguageProvider';
import { useCart } from './CartProvider';
import { SITE, dialNumber, waLink } from '@/lib/site';

const NAV = [
  { href: '/', key: 'navHome' },
  { href: '/products', key: 'navProducts' },
  { href: '/gallery', key: 'navGallery' },
  { href: '/about', key: 'navAbout' },
  { href: '/contact', key: 'navContact' }
];

export default function Header() {
  const { t } = useLang();
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Page badalte hi mobile menu band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      {/* ---------- top strip ---------- */}
      <div className="hidden bg-wood-800 text-wood-100 md:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${dialNumber()}`} className="flex items-center gap-1.5 hover:text-white">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-white">
              <Icon name="mail" className="h-3.5 w-3.5" />
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="clock" className="h-3.5 w-3.5" />
            <span>{t('hoursLabel')}: 9 AM – 8 PM</span>
          </div>
        </div>
      </div>

      {/* ---------- main header ---------- */}
      <header
        className={`sticky top-0 z-40 border-b border-wood-100 bg-cream/95 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-[0_4px_16px_rgba(74,44,23,0.08)]' : ''
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-3 md:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Logo className="h-9 w-9 md:h-11 md:w-11" />
            <span className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-base font-bold text-wood-800 md:text-lg">
                {t('brand')}
              </span>
              <span className="hidden text-[11px] text-muted sm:block">{t('tagline')}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  isActive(n.href) ? 'bg-wood-100 text-wood-800' : 'text-wood-700 hover:bg-wood-50'
                }`}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LanguageSwitch size="sm" />
            </div>

            <Link
              href="/cart"
              aria-label={t('navCart')}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-wood-200 bg-white text-wood-700 transition hover:bg-wood-50"
            >
              <Icon name="cart" className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-wood-900">
                  {count}
                </span>
              )}
            </Link>

            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp hidden !px-4 !py-2 !text-sm md:inline-flex"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {t('whatsapp')}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-wood-200 bg-white text-wood-700 lg:hidden"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------- mobile menu ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-wood-900/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[84%] max-w-sm flex-col bg-cream shadow-xl">
            <div className="flex items-center justify-between border-b border-wood-100 px-5 py-4">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-wood-800">
                {t('brand')}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="grid h-9 w-9 place-items-center rounded-full border border-wood-200 bg-white text-wood-700"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold ${
                    isActive(n.href) ? 'bg-wood-100 text-wood-800' : 'text-wood-700'
                  }`}
                >
                  {t(n.key)}
                  <Icon name="chevronRight" className="h-4 w-4 opacity-50" />
                </Link>
              ))}
              <Link
                href="/cart"
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-wood-700"
              >
                {t('navCart')}
                {count > 0 && (
                  <span className="grid h-6 min-w-6 place-items-center rounded-full bg-gold-500 px-1.5 text-xs font-bold text-wood-900">
                    {count}
                  </span>
                )}
              </Link>
            </nav>

            <div className="space-y-3 border-t border-wood-100 px-5 py-4">
              <LanguageSwitch />
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:${dialNumber()}`} className="btn btn-outline !py-2.5 !text-sm">
                  <Icon name="phone" className="h-4 w-4" />
                  {t('callNow')}
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp !py-2.5 !text-sm"
                >
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {t('whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
