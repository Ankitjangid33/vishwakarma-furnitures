'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { ListSkeleton } from '@/components/Skeleton';
import PasswordField from '@/components/admin/PasswordField';
import { useLang } from '@/components/LanguageProvider';
import { useDialog } from '@/components/DialogProvider';

const ERROR_KEY = {
  INVALID_USERNAME: 'invalidUsername',
  PASSWORD_TOO_SHORT: 'passwordTooShort',
  PASSWORD_TOO_SIMPLE: 'passwordTooSimple',
  USERNAME_TAKEN: 'usernameTaken',
  LAST_OWNER: 'lastOwner',
  CANNOT_DELETE_SELF: 'cannotDeleteSelf',
  FORBIDDEN: 'ownerOnly'
};

const EMPTY = { name: '', username: '', password: '', role: 'staff' };

export default function AdminUsers() {
  const { t } = useLang();
  const dialog = useDialog();
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);
  const [resetFor, setResetFor] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [uRes, meRes] = await Promise.all([fetch('/api/admin/users'), fetch('/api/auth/me')]);
      const data = await uRes.json();

      if (!uRes.ok) {
        setError(data.error || 'ERROR');
      } else {
        setUsers(data.users);
        setError('');
      }

      if (meRes.ok) setMe((await meRes.json()).user);
    } catch {
      setError('NETWORK');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const create = async (e) => {
    e.preventDefault();
    setBusy(true);
    setFormError('');

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setUsers((list) => [...list, data.user]);
        setForm(EMPTY);
      } else {
        setFormError(ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : t('somethingWrong'));
      }
    } catch {
      setFormError(t('somethingWrong'));
    } finally {
      setBusy(false);
    }
  };

  const patch = async (user, body) => {
    const res = await fetch(`/api/admin/users/${user._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      await dialog.alert({
        tone: 'error',
        title: t('notDone'),
        message: ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : t('somethingWrong')
      });
      return false;
    }

    setUsers((list) => list.map((u) => (u._id === data.user._id ? data.user : u)));
    return true;
  };

  const remove = (user) =>
    dialog.confirm({
      tone: 'danger',
      title: t('deleteUserQ'),
      detail: `${user.name || user.username} · @${user.username}`,
      message: t('cannotUndo'),
      onConfirm: async () => {
        const res = await fetch(`/api/admin/users/${user._id}`, { method: 'DELETE' });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(ERROR_KEY[data.error] ? t(ERROR_KEY[data.error]) : t('notDone'));
        }
        setUsers((list) => list.filter((u) => u._id !== user._id));
      }
    });

  const resetPassword = async (e, user) => {
    e.preventDefault();
    const password = new FormData(e.target).get('password');

    if (await patch(user, { password })) {
      setResetFor(null);
      await dialog.alert({ tone: 'success', title: t('passwordChangedFor'), detail: `@${user.username}` });
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl text-wood-900">{t('usersTitle')}</h1>
        <p className="mt-1 text-sm text-muted">{t('usersSubtitle')}</p>
      </header>

      {error && <DbNotice error={error} />}

      {!error && (
        <>
          <form onSubmit={create} className="card mb-6 p-5">
            <h2 className="font-semibold text-wood-900">{t('addUser')}</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="label" htmlFor="u-name">
                  {t('name')}
                </label>
                <input id="u-name" className="field" value={form.name} onChange={set('name')} />
              </div>
              <div>
                <label className="label" htmlFor="u-username">
                  {t('username')}
                </label>
                <input
                  id="u-username"
                  className="field"
                  value={form.username}
                  onChange={set('username')}
                  autoCapitalize="none"
                  required
                />
              </div>
              <PasswordField
                id="u-password"
                label={t('password')}
                value={form.password}
                onChange={set('password')}
                autoComplete="new-password"
                required
              />
              <div>
                <label className="label" htmlFor="u-role">
                  {t('role')}
                </label>
                <select id="u-role" className="field" value={form.role} onChange={set('role')}>
                  <option value="staff">{t('roleStaff')}</option>
                  <option value="owner">{t('roleOwner')}</option>
                </select>
              </div>
            </div>

            {formError && (
              <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{formError}</p>
            )}

            <button type="submit" disabled={busy} className="btn btn-primary mt-4 disabled:opacity-60">
              <Icon name="plus" className="h-4 w-4" />
              {busy ? '...' : t('createUser')}
            </button>
          </form>

          {loading ? (
            <ListSkeleton rows={3} />
          ) : (
            <div className="space-y-3">
              {users.map((u) => {
                const isMe = me && me._id === u._id;

                return (
                  <article key={u._id} className={`card p-4 ${u.active ? '' : 'opacity-60'}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-wood-900">
                          {u.name || u.username}
                          <span className="ml-2 text-sm font-normal text-muted">@{u.username}</span>
                          {isMe && (
                            <span className="ml-2 rounded-full bg-wood-100 px-2 py-0.5 text-[11px] font-semibold text-wood-700">
                              {t('you')}
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-muted">
                          {u.role === 'owner' ? t('roleOwner') : t('roleStaff')}
                          {' · '}
                          {u.lastLoginAt
                            ? `${t('lastLogin')}: ${new Date(u.lastLoginAt).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })}`
                            : t('neverLoggedIn')}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          u.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {u.active ? t('active') : t('inactive')}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-wood-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setResetFor(resetFor === u._id ? null : u._id)}
                        className="btn btn-outline py-2 text-xs"
                      >
                        <Icon name="shield" className="h-4 w-4" />
                        {t('changePassword')}
                      </button>

                      {!isMe && (
                        <>
                          <button
                            type="button"
                            onClick={() => patch(u, { active: !u.active })}
                            className="btn btn-outline py-2 text-xs"
                          >
                            {u.active ? t('disable') : t('enable')}
                          </button>
                          <button
                            type="button"
                            onClick={() => patch(u, { role: u.role === 'owner' ? 'staff' : 'owner' })}
                            className="btn btn-outline py-2 text-xs"
                          >
                            {u.role === 'owner' ? t('makeStaff') : t('makeOwner')}
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(u)}
                            className="btn border border-red-200 py-2 text-xs text-red-600 hover:bg-red-50"
                          >
                            <Icon name="trash" className="h-4 w-4" />
                            {t('delete')}
                          </button>
                        </>
                      )}
                    </div>

                    {resetFor === u._id && (
                      <form
                        onSubmit={(e) => resetPassword(e, u)}
                        className="mt-3 flex flex-wrap items-end gap-2 rounded-xl bg-wood-50 p-3"
                      >
                        <PasswordField
                          id={`pw-${u._id}`}
                          name="password"
                          label={t('newPassword')}
                          className="min-w-[200px] flex-1"
                          autoComplete="new-password"
                          required
                        />
                        <button type="submit" className="btn btn-primary py-2.5 text-xs">
                          {t('save')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setResetFor(null)}
                          className="btn btn-outline py-2.5 text-xs"
                        >
                          {t('cancel')}
                        </button>
                      </form>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
