'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { MediaCardGridSkeleton } from '@/components/Skeleton';
import ImageUploader from '@/components/admin/ImageUploader';
import { useLang } from '@/components/LanguageProvider';
import { CATEGORIES, getCategory } from '@/lib/categories';
import { pick } from '@/lib/i18n';

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
  const { t, lang } = useLang();
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
        setError(data.error === 'TITLE_REQUIRED' ? t('titleRequired') : data.message || t('saveFailed'));
        return;
      }
      onSaved();
    } catch {
      setError(t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-wood-900/40 p-4">
      <form onSubmit={submit} className="mx-auto my-4 w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl text-wood-900">{isEdit ? t('editWork') : t('addWork')}</h2>
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
            <label className="label">{t('workNameHi')} *</label>
            <input className="field" value={form.title.hi} onChange={set('title.hi')} required />
          </div>
          <div>
            <label className="label">{t('workNameEn')} *</label>
            <input className="field" value={form.title.en} onChange={set('title.en')} required />
          </div>
          <div>
            <label className="label">{t('placeHi')}</label>
            <input className="field" value={form.location.hi} onChange={set('location.hi')} placeholder="मालवीय नगर" />
          </div>
          <div>
            <label className="label">{t('placeEn')}</label>
            <input className="field" value={form.location.en} onChange={set('location.en')} placeholder="Malviya Nagar" />
          </div>
          <div>
            <label className="label">{t('category')}</label>
            <select className="field" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {pick(c.name, lang)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">{t('year')}</label>
            <input type="number" className="field" value={form.year} onChange={set('year')} />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              images={form.image?.url ? [form.image] : []}
              onChange={(imgs) => setForm((f) => ({ ...f, image: imgs[0] || { url: '', publicId: '' } }))}
              max={1}
              label={t('workPhoto')}
            />
          </div>

          <div className="flex flex-wrap gap-5 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input type="checkbox" checked={form.featured} onChange={set('featured')} className="h-5 w-5 accent-[var(--color-wood-600)]" />
              {t('showOnHome')}
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800">
              <input type="checkbox" checked={form.active} onChange={set('active')} className="h-5 w-5 accent-[var(--color-wood-600)]" />
              {t('liveOnSite')}
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

export default function AdminGallery() {
  const { t, lang } = useLang();
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
    if (!window.confirm(t('deletePhotoQ'))) return;
    const res = await fetch(`/api/admin/gallery/${item._id}`, { method: 'DELETE' });
    if (res.ok) setItems((list) => list.filter((i) => i._id !== item._id));
  };

  return (
    <div>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl text-wood-900">{t('galleryTitle')}</h1>
          <p className="mt-1 text-sm text-muted">
            {items.length} {t('photosCount')}
          </p>
        </div>
        <button type="button" onClick={() => setEditing('new')} className="btn btn-primary self-start sm:self-auto">
          <Icon name="plus" className="h-4 w-4" />
          {t('addWork')}
        </button>
      </header>

      {error && <DbNotice error={error} />}

      {!error &&
        (loading ? (
          <MediaCardGridSkeleton />
        ) : items.length === 0 ? (
          <div className="card p-10 text-center text-sm text-muted">{t('noPhotosYet')}</div>
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
                        {t('inactive')}
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="font-semibold text-wood-900">{pick(item.title, lang)}</p>
                    <p className="text-sm text-muted">{lang === 'hi' ? item.title?.en : item.title?.hi}</p>
                    <p className="mt-1 text-xs text-muted">
                      {[pick(item.location, lang), item.year, pick(cat?.name, lang)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button type="button" onClick={() => setEditing(item)} className="btn btn-outline py-2 text-xs">
                        <Icon name="hammer" className="h-4 w-4" />
                        {t('edit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(item)}
                        className="btn border border-red-200 py-2 text-xs text-red-600 hover:bg-red-50"
                      >
                        <Icon name="trash" className="h-4 w-4" />
                        {t('delete')}
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
