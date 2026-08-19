'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon, { Logo } from '../Icons';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.refresh();
        return;
      }

      const data = await res.json().catch(() => ({}));
      setError(
        data.error === 'NO_PASSWORD_SET'
          ? '.env.local me ADMIN_PASSWORD set nahi hai'
          : data.error === 'TOO_MANY'
            ? 'Bahut baar galat — thodi der baad koshish karein'
            : 'पासवर्ड गलत है / Wrong password'
      );
    } catch {
      setError('Kuch gadbad ho gayi');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-wood-50 px-4">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <div className="flex flex-col items-center text-center">
          <Logo className="h-14 w-14" />
          <h1 className="mt-4 text-xl text-wood-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-muted">विश्वकर्मा फर्नीचर</p>
        </div>

        <div className="mt-7">
          <label className="label" htmlFor="pass">
            पासवर्ड / Password
          </label>
          <input
            id="pass"
            type="password"
            className="field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </div>

        {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button type="submit" disabled={busy} className="btn btn-primary mt-5 w-full disabled:opacity-60">
          {busy ? '...' : 'लॉगिन / Login'}
          {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>

        <a href="/" className="mt-4 block text-center text-xs text-muted hover:text-wood-700">
          ← वेबसाइट पर वापस
        </a>
      </form>
    </div>
  );
}
