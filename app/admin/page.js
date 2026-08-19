'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { formatPrice } from '@/lib/i18n';

const CARDS = [
  { key: 'newOrders', label: 'नए ऑर्डर', sub: 'New orders', icon: 'cart', href: '/admin/orders', accent: true },
  { key: 'newMessages', label: 'नए संदेश', sub: 'New messages', icon: 'chat', href: '/admin/messages', accent: true },
  { key: 'activeProducts', label: 'सामान', sub: 'Live products', icon: 'box', href: '/admin/products' },
  { key: 'gallery', label: 'गैलरी फोटो', sub: 'Gallery photos', icon: 'image', href: '/admin/gallery' }
];

const STATUS_LABEL = {
  new: 'नया',
  contacted: 'बात हुई',
  confirmed: 'पक्का',
  in_production: 'बन रहा है',
  delivered: 'दे दिया',
  cancelled: 'रद्द'
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        if (!res.ok) setError(json.error || 'ERROR');
        else setData(json);
      } catch {
        setError('NETWORK');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl text-wood-900">डैशबोर्ड</h1>
        <p className="mt-1 text-sm text-muted">आपकी वेबसाइट का पूरा हाल एक जगह</p>
      </header>

      {error && <DbNotice error={error} />}

      {loading && <p className="text-sm text-muted">लोड हो रहा है…</p>}

      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c) => {
              const value = data.stats[c.key] ?? 0;
              return (
                <Link
                  key={c.key}
                  href={c.href}
                  className={`card p-5 transition hover:shadow-[var(--shadow-lift)] ${
                    c.accent && value > 0 ? 'border-gold-500/50 bg-gold-500/5' : ''
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-wood-100 text-wood-700">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    {c.accent && value > 0 && (
                      <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[11px] font-bold text-wood-900">
                        नया
                      </span>
                    )}
                  </span>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold text-wood-800">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-wood-800">{c.label}</p>
                  <p className="text-xs text-muted">{c.sub}</p>
                </Link>
              );
            })}
          </div>

          {/* recent orders */}
          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-wood-900">हाल के ऑर्डर</h2>
              <Link href="/admin/orders" className="text-sm font-semibold text-wood-600 hover:text-wood-800">
                सभी देखें →
              </Link>
            </div>

            {data.recentOrders?.length ? (
              <div className="card divide-y divide-wood-100">
                {data.recentOrders.map((o) => (
                  <div key={o._id} className="flex flex-wrap items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-wood-900">
                        {o.customer?.name}{' '}
                        <span className="text-sm font-normal text-muted">· {o.customer?.phone}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {o.orderNo} · {o.items?.length} चीज़ें ·{' '}
                        {new Date(o.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <span className="font-semibold text-wood-800">{formatPrice(o.estimatedTotal)}</span>
                    <span className="rounded-full bg-wood-100 px-2.5 py-1 text-xs font-semibold text-wood-700">
                      {STATUS_LABEL[o.status] || o.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center text-sm text-muted">अभी कोई ऑर्डर नहीं आया</div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
