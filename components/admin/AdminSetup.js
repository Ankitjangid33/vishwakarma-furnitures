'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon, { Logo } from '../Icons';
import LanguageSwitch from '../LanguageSwitch';
import { useLang } from '../LanguageProvider';
import PasswordField from './PasswordField';

const ERROR_KEY = {
  INVALID_USERNAME: 'invalidUsername',
  PASSWORD_TOO_SHORT: 'passwordTooShort',
  PASSWORD_TOO_LONG: 'passwordTooLong',
  PASSWORD_TOO_SIMPLE: 'passwordTooSimple',
  USERNAME_TAKEN: 'usernameTaken',
  SETUP_DONE: 'setupDone',
  DB_NOT_CONNECTED: 'dbNotConnectedShort'
};

/** Pehli baar — database me koi admin nahi hai, to yahi screen aati hai */
export default function AdminSetup() {
  const router = useRouter();
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError(t('passwordsDontMatch'));
      return;
    }

    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, username: form.username, password: form.password })
      });

      if (res.ok) {
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));

      if (data.error === 'TOO_MANY') {
        const mins = Math.ceil((data.retryAfter || 900) / 60);
        setError(`${t('tooManyIn')} ${mins} ${t(mins === 1 ? 'minute' : 'minutes')}`);
      } else {
        setError(ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : t('somethingWrong'));
      }
    } catch {
      setError(t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-wood-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-3 flex justify-center">
          <LanguageSwitch size="sm" />
        </div>

        <form onSubmit={submit} className="card p-8">
          <div className="flex flex-col items-center text-center">
            <Logo className="h-14 w-14" />
            <h1 className="mt-4 text-xl text-wood-900">{t('setupTitle')}</h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{t('setupIntro')}</p>
          </div>

          <div className="mt-7">
            <label className="label" htmlFor="name">
              {t('yourName')}
            </label>
            <input id="name" type="text" className="field" value={form.name} onChange={set('name')} />
          </div>

          <div className="mt-4">
            <label className="label" htmlFor="username">
              {t('username')}
            </label>
            <input
              id="username"
              type="text"
              className="field"
              value={form.username}
              onChange={set('username')}
              autoComplete="username"
              autoCapitalize="none"
              placeholder="e.g. akshay"
              required
            />
            <p className="mt-1 text-[11px] text-muted">{t('usernameHint')}</p>
          </div>

          <PasswordField
            id="password"
            label={t('password')}
            className="mt-4"
            hint={t('passwordHint')}
            value={form.password}
            onChange={set('password')}
            autoComplete="new-password"
            required
          />

          <PasswordField
            id="confirm"
            label={t('confirmPassword')}
            className="mt-4"
            value={form.confirm}
            onChange={set('confirm')}
            autoComplete="new-password"
            required
          />

          {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={busy} className="btn btn-primary mt-5 w-full disabled:opacity-60">
            {busy ? '...' : t('createAccount')}
            {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
