'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Icon, { Logo } from '../Icons';

const NAV = [
  { href: '/admin', icon: 'grid', label: 'डैशबोर्ड', sub: 'Dashboard' },
  { href: '/admin/products', icon: 'box', label: 'सामान', sub: 'Products' },
  { href: '/admin/gallery', icon: 'image', label: 'गैलरी', sub: 'Gallery' },
  { href: '/admin/orders', icon: 'cart', label: 'ऑर्डर', sub: 'Orders' },
  { href: '/admin/messages', icon: 'chat', label: 'संदेश', sub: 'Messages' }
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.refresh();
  };

  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  const nav = (
    <nav className="space-y-1">
      {NAV.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
            isActive(n.href) ? 'bg-wood-600 text-white' : 'text-wood-700 hover:bg-wood-100'
          }`}
        >
          <Icon name={n.icon} className="h-5 w-5" />
          <span>
            {n.label}
            <span className={`ml-1.5 text-[11px] font-normal ${isActive(n.href) ? 'text-white/70' : 'text-muted'}`}>
              {n.sub}
            </span>
          </span>
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
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-wood-200"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-b border-wood-100 bg-white px-4 py-3 lg:hidden">
          {nav}
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Icon name="logout" className="h-5 w-5" />
            लॉगआउट
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
                  Admin Panel
                </span>
                <span className="block text-[11px] text-muted">विश्वकर्मा फर्नीचर</span>
              </span>
            </Link>

            {nav}

            <div className="mt-6 space-y-1 border-t border-wood-200 pt-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-wood-700 hover:bg-wood-100"
              >
                <Icon name="globe" className="h-5 w-5" />
                वेबसाइट देखें
              </a>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Icon name="logout" className="h-5 w-5" />
                लॉगआउट
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
