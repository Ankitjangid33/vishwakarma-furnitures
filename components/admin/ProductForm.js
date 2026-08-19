'use client';

import { useState } from 'react';
import Icon from '../Icons';
import ImageUploader from './ImageUploader';
import { CATEGORIES } from '@/lib/categories';

const EMPTY = {
  slug: '',
  category: 'bedroom',
  type: 'item',
  name: { hi: '', en: '' },
  description: { hi: '', en: '' },
  price: 0,
  priceType: 'from',
  unit: 'piece',
  material: { hi: '', en: '' },
  size: '',
  deliveryDays: 10,
  includes: [],
  images: [],
  featured: false,
  active: true,
  sortOrder: 100
};

const UNITS = [
  { v: 'piece', l: 'नग / piece' },
  { v: 'set', l: 'सेट / set' },
  { v: 'sqft', l: 'वर्ग फुट / sq.ft' },
  { v: 'runningft', l: 'रनिंग फुट / running ft' }
];

const PRICE_TYPES = [
  { v: 'fixed', l: 'पक्का दाम / Fixed' },
  { v: 'from', l: 'शुरू ... से / From' },
  { v: 'quote', l: 'दाम पूछें / On request' }
];

export default function ProductForm({ product, onClose, onSaved }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...(product || {}) }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isEdit = Boolean(product?._id);

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

  const setIncludes = (i, key, value) => {
    setForm((f) => {
      const includes = [...(f.includes || [])];
      includes[i] = { ...includes[i], [key]: value };
      return { ...f, includes };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const res = await fetch(isEdit ? `/api/admin/products/${product._id}` : '/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price) || 0,
          deliveryDays: Number(form.deliveryDays) || 0,
          sortOrder: Number(form.sortOrder) || 100
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          {
            SLUG_EXISTS: 'यह slug पहले से है — दूसरा नाम/slug रखें',
            NAME_REQUIRED: 'नाम ज़रूरी है',
            INVALID_CATEGORY: 'कमरा (category) चुनें',
            DB_NOT_CONNECTED: 'MongoDB juda nahi hai'
          }[data.error] || data.message || 'सेव नहीं हुआ'
        );
        return;
      }

      onSaved(data.product);
    } catch {
      setError('कुछ गड़बड़ हो गई');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-wood-900/40 p-4">
      <form
        onSubmit={submit}
        className="mx-auto my-4 w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl text-wood-900">
            {isEdit ? 'सामान बदलें' : 'नया सामान जोड़ें'}
            <span className="ml-2 text-sm font-normal text-muted">
              {isEdit ? 'Edit product' : 'Add product'}
            </span>
          </h2>
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
            <label className="label">नाम (हिंदी) *</label>
            <input className="field" value={form.name.hi} onChange={set('name.hi')} required />
          </div>
          <div>
            <label className="label">Name (English) *</label>
            <input className="field" value={form.name.en} onChange={set('name.en')} required />
          </div>

          <div>
            <label className="label">कमरा / Category *</label>
            <select className="field" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.hi} / {c.name.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">प्रकार / Type</label>
            <select className="field" value={form.type} onChange={set('type')}>
              <option value="item">अकेली चीज़ / Single item</option>
              <option value="set">पूरा सेट / Full set</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="label">जानकारी (हिंदी)</label>
            <textarea className="field" rows={3} value={form.description.hi} onChange={set('description.hi')} />
          </div>

          <div className="sm:col-span-2">
            <label className="label">Description (English)</label>
            <textarea className="field" rows={3} value={form.description.en} onChange={set('description.en')} />
          </div>

          <div>
            <label className="label">दाम / Price (₹)</label>
            <input
              type="number"
              min="0"
              className="field"
              value={form.price}
              onChange={set('price')}
              disabled={form.priceType === 'quote'}
            />
          </div>

          <div>
            <label className="label">दाम कैसा है</label>
            <select className="field" value={form.priceType} onChange={set('priceType')}>
              {PRICE_TYPES.map((p) => (
                <option key={p.v} value={p.v}>
                  {p.l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">इकाई / Unit</label>
            <select className="field" value={form.unit} onChange={set('unit')}>
              {UNITS.map((u) => (
                <option key={u.v} value={u.v}>
                  {u.l}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">कितने दिन में तैयार</label>
            <input type="number" min="0" className="field" value={form.deliveryDays} onChange={set('deliveryDays')} />
          </div>

          <div>
            <label className="label">लकड़ी / सामग्री (हिंदी)</label>
            <input className="field" value={form.material.hi} onChange={set('material.hi')} />
          </div>

          <div>
            <label className="label">Material (English)</label>
            <input className="field" value={form.material.en} onChange={set('material.en')} />
          </div>

          <div>
            <label className="label">नाप / Size</label>
            <input className="field" value={form.size} onChange={set('size')} placeholder="6 x 6.5 ft" />
          </div>

          <div>
            <label className="label">
              Slug <span className="font-normal text-muted">(खाली छोड़ें तो अपने आप बन जाएगा)</span>
            </label>
            <input className="field" value={form.slug} onChange={set('slug')} placeholder="teak-double-bed" />
          </div>

          {/* set includes */}
          {form.type === 'set' && (
            <div className="sm:col-span-2">
              <span className="label">सेट में क्या-क्या आता है</span>
              <div className="space-y-2">
                {(form.includes || []).map((inc, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="field"
                      placeholder="हिंदी"
                      value={inc.hi || ''}
                      onChange={(e) => setIncludes(i, 'hi', e.target.value)}
                    />
                    <input
                      className="field"
                      placeholder="English"
                      value={inc.en || ''}
                      onChange={(e) => setIncludes(i, 'en', e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, includes: f.includes.filter((_, n) => n !== i) }))}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-wood-200 text-red-600"
                    >
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, includes: [...(f.includes || []), { hi: '', en: '' }] }))}
                  className="btn btn-outline !py-2 !text-xs"
                >
                  <Icon name="plus" className="h-4 w-4" />
                  लाइन जोड़ें
                </button>
              </div>
            </div>
          )}

          <div className="sm:col-span-2">
            <ImageUploader
              images={form.images || []}
              onChange={(images) => setForm((f) => ({ ...f, images }))}
              max={6}
            />
          </div>

          <div className="flex flex-wrap gap-5 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={set('featured')}
                className="h-5 w-5 accent-[var(--color-wood-600)]"
              />
              होम पेज पर दिखाएं
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input
                type="checkbox"
                checked={form.active}
                onChange={set('active')}
                className="h-5 w-5 accent-[var(--color-wood-600)]"
              />
              वेबसाइट पर चालू
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-wood-800">
              क्रम
              <input
                type="number"
                className="field !w-24 !py-1.5"
                value={form.sortOrder}
                onChange={set('sortOrder')}
              />
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
