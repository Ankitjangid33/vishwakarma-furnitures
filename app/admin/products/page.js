'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import ProductForm from '@/components/admin/ProductForm';
import { CATEGORIES, getCategory } from '@/lib/categories';
import { formatPrice } from '@/lib/i18n';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // product | 'new'
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (!res.ok) setError(data.error || 'ERROR');
      else {
        setProducts(data.products);
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
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!needle) return true;
      return [p.name?.hi, p.name?.en, p.slug].filter(Boolean).join(' ').toLowerCase().includes(needle);
    });
  }, [products, category, q]);

  const toggle = async (product, field) => {
    const res = await fetch(`/api/admin/products/${product._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [field]: !product[field] })
    });
    if (res.ok) {
      const { product: updated } = await res.json();
      setProducts((list) => list.map((p) => (p._id === updated._id ? updated : p)));
    }
  };

  const remove = async (product) => {
    if (!window.confirm(`"${product.name?.hi || product.name?.en}" हटाना है? यह वापस नहीं आएगा।`)) return;

    const res = await fetch(`/api/admin/products/${product._id}`, { method: 'DELETE' });
    if (res.ok) setProducts((list) => list.filter((p) => p._id !== product._id));
  };

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl text-wood-900">सामान / Products</h1>
          <p className="mt-1 text-sm text-muted">{products.length} चीज़ें वेबसाइट पर हैं</p>
        </div>
        <button type="button" onClick={() => setEditing('new')} className="btn btn-primary">
          <Icon name="plus" className="h-4 w-4" />
          नया सामान जोड़ें
        </button>
      </header>

      {error && <DbNotice error={error} />}

      {!error && (
        <>
          <div className="mb-4 flex flex-wrap gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-wood-400" />
              <input
                className="field !pl-10"
                placeholder="नाम से खोजें…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <select className="field !w-auto" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">सभी कमरे</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.hi}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-sm text-muted">लोड हो रहा है…</p>
          ) : filtered.length === 0 ? (
            <div className="card p-10 text-center text-sm text-muted">कोई सामान नहीं मिला</div>
          ) : (
            <div className="card divide-y divide-wood-100">
              {filtered.map((p) => {
                const cat = getCategory(p.category);
                return (
                  <div key={p._id} className="flex flex-wrap items-center gap-4 p-4">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-wood-100">
                      {p.images?.[0]?.url ? (
                        <Image src={p.images[0].url} alt="" fill sizes="80px" className="object-cover" />
                      ) : (
                        <span className="grid h-full w-full place-items-center text-wood-400">
                          <Icon name={cat?.icon || 'box'} className="h-6 w-6" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-wood-900">{p.name?.hi}</p>
                      <p className="text-sm text-muted">{p.name?.en}</p>
                      <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                        <span>{cat?.name?.hi}</span>
                        <span>{p.type === 'set' ? 'सेट' : 'अकेली चीज़'}</span>
                        <span>
                          {p.priceType === 'quote' ? 'दाम पूछें' : formatPrice(p.price)}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggle(p, 'featured')}
                        className={`chip !py-1.5 !text-xs ${p.featured ? 'chip-active' : ''}`}
                        title="होम पेज पर"
                      >
                        <Icon name="star" className="h-3.5 w-3.5" />
                        होम
                      </button>

                      <button
                        type="button"
                        onClick={() => toggle(p, 'active')}
                        className={`chip !py-1.5 !text-xs ${p.active ? 'chip-active' : ''}`}
                      >
                        {p.active ? 'चालू' : 'बंद'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditing(p)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-wood-200 text-wood-700 hover:bg-wood-50"
                        aria-label="Edit"
                      >
                        <Icon name="hammer" className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => remove(p)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {editing && (
        <ProductForm
          product={editing === 'new' ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}
