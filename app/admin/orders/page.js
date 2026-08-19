'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { formatPrice } from '@/lib/i18n';

const STATUSES = [
  { v: 'new', l: 'नया', color: 'bg-gold-500 text-wood-900' },
  { v: 'contacted', l: 'बात हुई', color: 'bg-blue-100 text-blue-800' },
  { v: 'confirmed', l: 'पक्का', color: 'bg-indigo-100 text-indigo-800' },
  { v: 'in_production', l: 'बन रहा है', color: 'bg-amber-100 text-amber-800' },
  { v: 'delivered', l: 'दे दिया', color: 'bg-green-100 text-green-800' },
  { v: 'cancelled', l: 'रद्द', color: 'bg-red-100 text-red-800' }
];

const statusInfo = (v) => STATUSES.find((s) => s.v === v) || STATUSES[0];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?status=${filter}`);
      const data = await res.json();
      if (!res.ok) setError(data.error || 'ERROR');
      else {
        setOrders(data.orders);
        setError('');
      }
    } catch {
      setError('NETWORK');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const setStatus = async (order, status) => {
    const res = await fetch(`/api/admin/orders/${order._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const { order: updated } = await res.json();
      setOrders((list) => list.map((o) => (o._id === updated._id ? updated : o)));
    }
  };

  const remove = async (order) => {
    if (!window.confirm(`ऑर्डर ${order.orderNo} हटाना है?`)) return;
    const res = await fetch(`/api/admin/orders/${order._id}`, { method: 'DELETE' });
    if (res.ok) setOrders((list) => list.filter((o) => o._id !== order._id));
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl text-wood-900">ऑर्डर / Orders</h1>
        <p className="mt-1 text-sm text-muted">वेबसाइट से आए सारे ऑर्डर यहाँ दिखते हैं</p>
      </header>

      {error && <DbNotice error={error} />}

      {!error && (
        <>
          <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
            <button type="button" onClick={() => setFilter('all')} className={`chip ${filter === 'all' ? 'chip-active' : ''}`}>
              सभी
            </button>
            {STATUSES.map((s) => (
              <button
                key={s.v}
                type="button"
                onClick={() => setFilter(s.v)}
                className={`chip ${filter === s.v ? 'chip-active' : ''}`}
              >
                {s.l}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-sm text-muted">लोड हो रहा है…</p>
          ) : orders.length === 0 ? (
            <div className="card p-10 text-center text-sm text-muted">कोई ऑर्डर नहीं मिला</div>
          ) : (
            <div className="space-y-3">
              {orders.map((o) => {
                const info = statusInfo(o.status);
                const isOpen = open === o._id;

                return (
                  <div key={o._id} className="card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : o._id)}
                      className="flex w-full flex-wrap items-center gap-3 p-4 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-wood-900">
                          {o.customer?.name}
                          <span className="ml-2 text-sm font-normal text-muted">{o.customer?.phone}</span>
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {o.orderNo} · {o.items?.length} चीज़ें ·{' '}
                          {new Date(o.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                      </span>

                      <span className="font-[family-name:var(--font-display)] font-bold text-wood-800">
                        {formatPrice(o.estimatedTotal)}
                        {o.hasQuoteItems && <span className="ml-1 text-xs font-normal text-muted">+ पूछना है</span>}
                      </span>

                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${info.color}`}>{info.l}</span>

                      <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} className="h-4 w-4 text-wood-400" />
                    </button>

                    {isOpen && (
                      <div className="border-t border-wood-100 bg-wood-50 p-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {/* items */}
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide text-muted">सामान</h3>
                            <ul className="mt-2 space-y-1.5">
                              {o.items?.map((it, i) => (
                                <li key={i} className="flex justify-between gap-3 text-sm text-wood-800">
                                  <span>
                                    {it.name?.hi || it.name?.en} × {it.qty}
                                  </span>
                                  <span className="shrink-0 font-semibold">
                                    {it.price ? formatPrice(it.price * it.qty) : 'दाम पूछें'}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* customer */}
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-wide text-muted">ग्राहक</h3>
                            <div className="mt-2 space-y-1 text-sm text-wood-800">
                              {o.customer?.email && <p>{o.customer.email}</p>}
                              {o.customer?.address && <p>{o.customer.address}</p>}
                              {(o.customer?.city || o.customer?.pincode) && (
                                <p>
                                  {o.customer.city} {o.customer.pincode}
                                </p>
                              )}
                              {o.visitRequested && (
                                <p className="inline-block rounded-full bg-gold-500/20 px-2.5 py-0.5 text-xs font-semibold text-wood-800">
                                  घर पर नाप चाहिए
                                </p>
                              )}
                              {o.note && (
                                <p className="mt-2 rounded-xl bg-white p-3 text-sm">
                                  <span className="block text-xs font-semibold text-muted">ग्राहक का संदेश</span>
                                  {o.note}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-wood-200 pt-4">
                          <a href={`tel:+91${o.customer?.phone}`} className="btn btn-outline !py-2 !text-xs">
                            <Icon name="phone" className="h-4 w-4" />
                            कॉल करें
                          </a>
                          <a
                            href={`https://wa.me/91${o.customer?.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp !py-2 !text-xs"
                          >
                            <Icon name="whatsapp" className="h-4 w-4" />
                            WhatsApp
                          </a>

                          <select
                            className="field !w-auto !py-2 !text-xs"
                            value={o.status}
                            onChange={(e) => setStatus(o, e.target.value)}
                          >
                            {STATUSES.map((s) => (
                              <option key={s.v} value={s.v}>
                                {s.l}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => remove(o)}
                            className="btn !border !border-red-200 !py-2 !text-xs !text-red-600 hover:!bg-red-50"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                            हटाएं
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
