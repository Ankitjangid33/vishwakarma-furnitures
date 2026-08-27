'use client';

import { useState } from 'react';
import Icon from '../Icons';
import ImageUploader from './ImageUploader';
import { useLang } from '../LanguageProvider';
import { CATEGORIES } from '@/lib/categories';
import { pick } from '@/lib/i18n';

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
  { v: 'piece', k: 'unitPiece' },
  { v: 'set', k: 'unitSet' },
  { v: 'sqft', k: 'unitSqft' },
  { v: 'runningft', k: 'unitRunningFt' }
];

const PRICE_TYPES = [
  { v: 'fixed', k: 'priceFixed' },
  { v: 'from', k: 'priceFrom' },
  { v: 'quote', k: 'priceQuote' }
];

const ERROR_KEY = {
  SLUG_EXISTS: 'slugExists',
  NAME_REQUIRED: 'nameRequired',
  INVALID_CATEGORY: 'invalidCategory',
  DB_NOT_CONNECTED: 'dbNotConnectedShort'
};

export default function ProductForm({ product, onClose, onSaved }) {
  const { t, lang } = useLang();
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
        setError(ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : data.message || t('saveFailed'));
        return;
      }

      onSaved(data.product);
    } catch {
      setError(t('somethingWrong'));
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
          <h2 className="text-xl text-wood-900">{isEdit ? t('editProduct') : t('addProduct')}</h2>
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
            <label className="label">{t('nameHi')} *</label>
            <input className="field" value={form.name.hi} onChange={set('name.hi')} required />
          </div>
          <div>
            <label className="label">{t('nameEn')} *</label>
            <input className="field" value={form.name.en} onChange={set('name.en')} required />
          </div>

          <div>
            <label className="label">{t('category')} *</label>
            <select className="field" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {pick(c.name, lang)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">{t('type')}</label>
            <select className="field" value={form.type} onChange={set('type')}>
              <option value="item">{t('singleItem')}</option>
              <option value="set">{t('fullSet')}</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="label">{t('descriptionHi')}</label>
            <textarea className="field" rows={3} value={form.description.hi} onChange={set('description.hi')} />
          </div>

          <div className="sm:col-span-2">
            <label className="label">{t('descriptionEn')}</label>
            <textarea className="field" rows={3} value={form.description.en} onChange={set('description.en')} />
          </div>

          <div>
            <label className="label">{t('price')} (₹)</label>
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
            <label className="label">{t('priceKind')}</label>
            <select className="field" value={form.priceType} onChange={set('priceType')}>
              {PRICE_TYPES.map((p) => (
                <option key={p.v} value={p.v}>
                  {t(p.k)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">{t('unit')}</label>
            <select className="field" value={form.unit} onChange={set('unit')}>
              {UNITS.map((u) => (
                <option key={u.v} value={u.v}>
                  {t(u.k)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">{t('deliveryDays')}</label>
            <input type="number" min="0" className="field" value={form.deliveryDays} onChange={set('deliveryDays')} />
          </div>

          <div>
            <label className="label">{t('materialHi')}</label>
            <input className="field" value={form.material.hi} onChange={set('material.hi')} />
          </div>

          <div>
            <label className="label">{t('materialEn')}</label>
            <input className="field" value={form.material.en} onChange={set('material.en')} />
          </div>

          <div>
            <label className="label">{t('size')}</label>
            <input className="field" value={form.size} onChange={set('size')} placeholder="6 x 6.5 ft" />
          </div>

          <div>
            <label className="label">
              Slug <span className="font-normal text-muted">{t('slugHint')}</span>
            </label>
            <input className="field" value={form.slug} onChange={set('slug')} placeholder="teak-double-bed" />
          </div>

          {/* set includes */}
          {form.type === 'set' && (
            <div className="sm:col-span-2">
              <span className="label">{t('setIncludes')}</span>
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
                  {t('addLine')}
                </button>
              </div>
            </div>
          )}

          <div className="sm:col-span-2">
            <ImageUploader
              label={t('photos')}
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
              {t('showOnHome')}
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input
                type="checkbox"
                checked={form.active}
                onChange={set('active')}
                className="h-5 w-5 accent-[var(--color-wood-600)]"
              />
              {t('liveOnSite')}
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-wood-800">
              {t('sortOrder')}
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
            {busy ? t('saving') : t('save')}
          </button>
          <button type="button" onClick={onClose} className="btn btn-outline">
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}
