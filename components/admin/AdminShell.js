'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon, { Logo } from '../Icons';
import LanguageSwitch from '../LanguageSwitch';
import { useLang } from '../LanguageProvider';

const NAV = [
  { href: '/admin', icon: 'grid', key: 'navDashboard' },
  { href: '/admin/products', icon: 'box', key: 'navProducts' },
  { href: '/admin/gallery', icon: 'image', key: 'navGallery' },
  { href: '/admin/orders', icon: 'cart', key: 'navOrders' },
  { href: '/admin/messages', icon: 'chat', key: 'navMessages' },
  // users sirf owner ko dikhta hai
  { href: '/admin/users', icon: 'user', key: 'navUsers', ownerOnly: true }
];

export default function AdminShell({ user, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const items = NAV.filter((n) => !n.ownerOnly || user?.role === 'owner');

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  const account = (
    <Link
      href="/admin/account"
      onClick={() => setOpen(false)}
      className="flex items-center gap-3 rounded-xl border border-wood-200 px-3 py-2.5 transition hover:bg-wood-100"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-wood-600 text-sm font-bold text-white">
        {(user?.name || user?.username || '?').charAt(0).toUpperCase()}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-semibold text-wood-800">
          {user?.name || user?.username}
        </span>
        <span className="block text-[11px] text-muted">
          @{user?.username} · {user?.role === 'owner' ? t('roleOwner') : t('roleStaff')}
        </span>
      </span>
    </Link>
  );

  const nav = (
    <nav className="space-y-1">
      {items.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
            isActive(n.href) ? 'bg-wood-600 text-white' : 'text-wood-700 hover:bg-wood-100'
          }`}
        >
          <Icon name={n.icon} className="h-5 w-5" />
          <span>{t(n.key)}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-wood-50">
      {/* mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-wood-100 bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <span className="font-semibold text-wood-800">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitch size="sm" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-wood-200"
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-wood-100 bg-white px-4 py-3 lg:hidden">
          <div className="mb-3">{account}</div>
          {nav}
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Icon name="logout" className="h-5 w-5" />
            {t('logout')}
          </button>
        </div>
      )}

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        {/* sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-6">
            <Link href="/admin" className="mb-6 flex items-center gap-2.5">
              <Logo className="h-10 w-10" />
              <span className="leading-tight">
                <span className="block font-[family-name:var(--font-display)] font-bold text-wood-800">
                  {t('panel')}
                </span>
                <span className="block text-[11px] text-muted">विश्वकर्मा फर्नीचर</span>
              </span>
            </Link>

            {nav}

            <div className="mt-6 border-t border-wood-200 pt-4">{account}</div>

            <div className="mt-2 space-y-1">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-wood-700 hover:bg-wood-100"
              >
                <Icon name="globe" className="h-5 w-5" />
                {t('viewWebsite')}
              </a>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Icon name="logout" className="h-5 w-5" />
                {t('logout')}
              </button>
            </div>

            <div className="mt-4 border-t border-wood-200 pt-4">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wide text-muted">
                {t('language')}
              </span>
              <LanguageSwitch size="sm" />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
