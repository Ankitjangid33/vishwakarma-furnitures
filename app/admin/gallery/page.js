'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import ImageUploader from '@/components/admin/ImageUploader';
import { CATEGORIES, getCategory } from '@/lib/categories';

const EMPTY = {
  title: { hi: '', en: '' },
  location: { hi: '', en: '' },
  category: 'bedroom',
  image: { url: '', publicId: '' },
  year: new Date().getFullYear(),
  featured: false,
  active: true,
  sortOrder: 100
};

function GalleryForm({ item, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(item || {}) }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isEdit = Boolean(item?._id);

  const set = (path) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => {
      const next = { ...f };
      const [a, b] = path.split('.');
      if (b) next[a] = { ...next[a], [b]: value };
      else next[a] = value;
      return next;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const res = await fetch(isEdit ? `/api/admin/gallery/${item._id}` : '/api/admin/gallery', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: Number(form.year) || new Date().getFullYear() })
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error === 'TITLE_REQUIRED' ? 'नाम ज़रूरी है' : data.message || 'सेव नहीं हुआ');
        return;
      }
      onSaved();
    } catch {
      setError('कुछ गड़बड़ हो गई');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-wood-900/40 p-4">
      <form onSubmit={submit} className="mx-auto my-4 w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl text-wood-900">{isEdit ? 'काम बदलें' : 'नया काम जोड़ें'}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-wood-200"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">काम का नाम (हिंदी) *</label>
            <input className="field" value={form.title.hi} onChange={set('title.hi')} required />
          </div>
          <div>
            <label className="label">Title (English) *</label>
            <input className="field" value={form.title.en} onChange={set('title.en')} required />
          </div>
          <div>
            <label className="label">जगह (हिंदी)</label>
            <input className="field" value={form.location.hi} onChange={set('location.hi')} placeholder="मालवीय नगर" />
          </div>
          <div>
            <label className="label">Location (English)</label>
            <input className="field" value={form.location.en} onChange={set('location.en')} placeholder="Malviya Nagar" />
          </div>
          <div>
            <label className="label">कमरा / Category</label>
            <select className="field" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.hi} / {c.name.en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">साल / Year</label>
            <input type="number" className="field" value={form.year} onChange={set('year')} />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              images={form.image?.url ? [form.image] : []}
              onChange={(imgs) => setForm((f) => ({ ...f, image: imgs[0] || { url: '', publicId: '' } }))}
              max={1}
              label="काम की फोटो"
            />
          </div>

          <div className="flex flex-wrap gap-5 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} className="h-5 w-5 accent-[var(--color-wood-600)]" />
              होम पेज पर दिखाएं
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input type="checkbox" checked={form.active} onChange={set('active')} className="h-5 w-5 accent-[var(--color-wood-600)]" />
              वेबसाइट पर चालू
            </label>
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button type="submit" disabled={busy} className="btn btn-primary disabled:opacity-60">
            {busy ? 'सेव हो रहा है…' : 'सेव करें'}
          </button>
          <button type="button" onClick={onClose} className="btn btn-outline">
            रद्द करें
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/gallery');
      const data = await res.json();
      if (!res.ok) setError(data.error || 'ERROR');
      else {
        setItems(data.items);
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

  const remove = async (item) => {
    if (!window.confirm('यह फोटो हटानी है?')) return;
    const res = await fetch(`/api/admin/gallery/${item._id}`, { method: 'DELETE' });
    if (res.ok) setItems((list) => list.filter((i) => i._id !== item._id));
  };

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl text-wood-900">गैलरी / हमारा काम</h1>
          <p className="mt-1 text-sm text-muted">{items.length} फोटो वेबसाइट पर हैं</p>
        </div>
        <button type="button" onClick={() => setEditing('new')} className="btn btn-primary">
          <Icon name="plus" className="h-4 w-4" />
          नया काम जोड़ें
        </button>
      </header>

      {error && <DbNotice error={error} />}

      {!error &&
        (loading ? (
          <p className="text-sm text-muted">लोड हो रहा है…</p>
        ) : items.length === 0 ? (
          <div className="card p-10 text-center text-sm text-muted">
            अभी कोई फोटो नहीं — “नया काम जोड़ें” दबाएं
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const cat = getCategory(item.category);
              return (
                <div key={item._id} className="card overflow-hidden">
                  <div className="relative aspect-[4/3] bg-wood-100">
                    {item.image?.url ? (
                      <Image src={item.image.url} alt="" fill sizes="300px" className="object-cover" />
                    ) : (
                      <span className="grid h-full w-full place-items-center text-wood-400">
                        <Icon name={cat?.icon || 'image'} className="h-8 w-8" />
                      </span>
                    )}
                    {!item.active && (
                      <span className="absolute left-2 top-2 rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                        बंद
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="font-semibold text-wood-900">{item.title?.hi}</p>
                    <p className="text-sm text-muted">{item.title?.en}</p>
                    <p className="mt-1 text-xs text-muted">
                      {[item.location?.hi, item.year, cat?.name?.hi].filter(Boolean).join(' · ')}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => setEditing(item)} className="btn btn-outline !py-2 !text-xs">
                        <Icon name="hammer" className="h-4 w-4" />
                        बदलें
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item)}
                        className="btn !border !border-red-200 !py-2 !text-xs !text-red-600 hover:!bg-red-50"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                        हटाएं
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

      {editing && (
        <GalleryForm
          item={editing === 'new' ? null : editing}
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
