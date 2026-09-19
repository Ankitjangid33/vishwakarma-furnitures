'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { TextCardGridSkeleton } from '@/components/Skeleton';
import { useLang } from '@/components/LanguageProvider';
import { useDialog } from '@/components/DialogProvider';
import { pick } from '@/lib/i18n';

const EMPTY = {
  name: '',
  place: { hi: '', en: '' },
  text: { hi: '', en: '' },
  stars: 5,
  active: true,
  sortOrder: 100
};

function Stars({ count, className = 'h-4 w-4' }) {
  return (
    <span className="flex gap-0.5 text-gold-500">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className={className} />
      ))}
    </span>
  );
}

function TestimonialForm({ item, onClose, onSaved }) {
  const { t } = useLang();
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

    if (!form.text.hi.trim() && !form.text.en.trim()) {
      setError(t('reviewRequired'));
      return;
    }

    setBusy(true);
    setError('');

    try {
      const res = await fetch(isEdit ? `/api/admin/testimonials/${item._id}` : '/api/admin/testimonials', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, stars: Number(form.stars), sortOrder: Number(form.sortOrder) || 100 })
      });
      const data = await res.json();

      if (!res.ok) {
        const known = { NAME_REQUIRED: 'nameRequired', TEXT_REQUIRED: 'reviewRequired' };
        setError(known[data.error] ? t(known[data.error]) : data.message || t('saveFailed'));
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
          <h2 className="text-xl text-wood-900">{isEdit ? t('editReview') : t('addReview')}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-wood-200"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">{t('customerName')} *</label>
            <input className="field" value={form.name} onChange={set('name')} placeholder="Rajesh Sharma" required />
          </div>
          <div>
            <label className="label">{t('placeHi')}</label>
            <input className="field" value={form.place.hi} onChange={set('place.hi')} placeholder="जयपुर" />
          </div>
          <div>
            <label className="label">{t('placeEn')}</label>
            <input className="field" value={form.place.en} onChange={set('place.en')} placeholder="Jaipur" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">{t('reviewHi')}</label>
            <textarea className="field min-h-24" value={form.text.hi} onChange={set('text.hi')} maxLength={600} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">{t('reviewEn')}</label>
            <textarea className="field min-h-24" value={form.text.en} onChange={set('text.en')} maxLength={600} />
          </div>
          <div>
            <label className="label">{t('stars')}</label>
            <select className="field" value={form.stars} onChange={set('stars')}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {'★'.repeat(n)} ({n})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">{t('sortOrder')}</label>
            <input type="number" className="field" value={form.sortOrder} onChange={set('sortOrder')} />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-wood-800 sm:col-span-2">
            <input type="checkbox" checked={form.active} onChange={set('active')} className="h-5 w-5 accent-[var(--color-wood-600)]" />
            {t('liveOnSite')}
          </label>
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

export default function AdminTestimonials() {
  const { t, lang } = useLang();
  const dialog = useDialog();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
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

  const remove = (item) =>
    dialog.confirm({
      tone: 'danger',
      title: t('deleteReviewQ'),
      detail: item.name,
      message: t('cannotUndo'),
      onConfirm: async () => {
        const res = await fetch(`/api/admin/testimonials/${item._id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(t('notDone'));
        setItems((list) => list.filter((i) => i._id !== item._id));
      }
    });

  return (
    <div>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl text-wood-900">{t('testimonialsTitle')}</h1>
          <p className="mt-1 text-sm text-muted">{t('testimonialsSubtitle')}</p>
        </div>
        <button type="button" onClick={() => setEditing('new')} className="btn btn-primary self-start sm:self-auto">
          <Icon name="plus" className="h-4 w-4" />
          {t('addReview')}
        </button>
      </header>

      {error && <DbNotice error={error} />}

      {!error &&
        (loading ? (
          <TextCardGridSkeleton />
        ) : items.length === 0 ? (
          <div className="card p-10 text-center text-sm text-muted">{t('noReviewsYet')}</div>
        ) : (
          <>
            <p className="mb-4 text-xs text-muted">{t('homeShowsSix')}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div key={item._id} className="card flex flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Stars count={item.stars} />
                    {!item.active && (
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[11px] font-bold text-white">
                        {t('inactive')}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-wood-800">“{pick(item.text, lang)}”</p>

                  <div className="mt-auto pt-4">
                    <p className="font-semibold text-wood-900">{item.name}</p>
                    <p className="text-xs text-muted">
                      {[pick(item.place, lang), `#${item.sortOrder}`].filter(Boolean).join(' · ')}
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
              ))}
            </div>
          </>
        ))}

      {editing && (
        <TestimonialForm
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
