'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { Skeleton, SkeletonRegion, FormCardSkeleton } from '@/components/Skeleton';
import PasswordField from '@/components/admin/PasswordField';
import { useLang } from '@/components/LanguageProvider';

const ERROR_KEY = {
  WRONG_CURRENT_PASSWORD: 'wrongCurrentPassword',
  PASSWORD_TOO_SHORT: 'passwordTooShort',
  PASSWORD_TOO_SIMPLE: 'passwordTooSimple'
};

export default function AdminAccount() {
  const { t } = useLang();
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [nameNote, setNameNote] = useState('');

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwNote, setPwNote] = useState('');
  const [pwError, setPwError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!res.ok) setError(data.error || 'ERROR');
        else {
          setMe(data.user);
          setName(data.user.name || '');
        }
      } catch {
        setError('NETWORK');
      }
    })();
  }, []);

  const saveName = async (e) => {
    e.preventDefault();
    setNameNote('');

    const res = await fetch('/api/admin/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });

    setNameNote(res.ok ? t('savedTick') : t('notSaved'));
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwNote('');
    setPwError('');

    if (pw.next !== pw.confirm) {
      setPwError(t('passwordsDontMatch'));
      return;
    }

    setBusy(true);

    try {
      const res = await fetch('/api/admin/account', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.next })
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setPw({ current: '', next: '', confirm: '' });
        setPwNote(t('passwordChangedNote'));
      } else {
        setPwError(ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : t('notDone'));
      }
    } catch {
      setPwError(t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  if (error) return <DbNotice error={error} />;
  if (!me) {
    return (
      <SkeletonRegion className="max-w-xl">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 mb-6 h-4 w-40" />
        <div className="space-y-5">
          <FormCardSkeleton />
          <FormCardSkeleton fields={3} />
        </div>
      </SkeletonRegion>
    );
  }

  return (
    <div className="max-w-xl">
      <header className="mb-6">
        <h1 className="text-2xl text-wood-900">{t('myAccount')}</h1>
        <p className="mt-1 text-sm text-muted">
          @{me.username} · {me.role === 'owner' ? t('roleOwner') : t('roleStaff')}
        </p>
      </header>

      <form onSubmit={saveName} className="card mb-5 p-5">
        <h2 className="font-semibold text-wood-900">{t('name')}</h2>
        <div className="mt-3">
          <label className="label" htmlFor="name">
            {t('yourName')}
          </label>
          <input id="name" className="field" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        {nameNote && <p className="mt-3 text-sm text-wood-700">{nameNote}</p>}
        <button type="submit" className="btn btn-outline mt-4">
          {t('save')}
        </button>
      </form>

      <form onSubmit={savePassword} className="card p-5">
        <h2 className="font-semibold text-wood-900">{t('changePassword')}</h2>

        <div className="mt-3 space-y-3">
          <PasswordField
            id="cur"
            label={t('currentPassword')}
            value={pw.current}
            onChange={(e) => setPw((p) => ({ ...p, current: e.target.value }))}
            autoComplete="current-password"
            required
          />
          <PasswordField
            id="next"
            label={t('newPassword')}
            hint={t('passwordHint')}
            value={pw.next}
            onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))}
            autoComplete="new-password"
            required
          />
          <PasswordField
            id="conf"
            label={t('newPasswordAgain')}
            value={pw.confirm}
            onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))}
            autoComplete="new-password"
            required
          />
        </div>

        {pwError && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{pwError}</p>}
        {pwNote && <p className="mt-3 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-800">{pwNote}</p>}

        <button type="submit" disabled={busy} className="btn btn-primary mt-4 disabled:opacity-60">
          <Icon name="shield" className="h-4 w-4" />
          {busy ? '...' : t('changePassword')}
        </button>
      </form>
    </div>
  );
}
