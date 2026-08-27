'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icons';
import DbNotice from '@/components/admin/DbNotice';
import { useLang } from '@/components/LanguageProvider';

const STATUS_KEY = { new: 'msgNew', read: 'msgRead', replied: 'msgReplied' };

export default function AdminMessages() {
  const { t } = useLang();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (!res.ok) setError(data.error || 'ERROR');
      else {
        setMessages(data.messages);
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

  const setStatus = async (msg, status) => {
    const res = await fetch(`/api/admin/messages/${msg._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      const { message: updated } = await res.json();
      setMessages((list) => list.map((m) => (m._id === updated._id ? updated : m)));
    }
  };

  const remove = async (msg) => {
    if (!window.confirm(t('deleteMessageQ'))) return;
    const res = await fetch(`/api/admin/messages/${msg._id}`, { method: 'DELETE' });
    if (res.ok) setMessages((list) => list.filter((m) => m._id !== msg._id));
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl text-wood-900">{t('messagesTitle')}</h1>
        <p className="mt-1 text-sm text-muted">{t('messagesSubtitle')}</p>
      </header>

      {error && <DbNotice error={error} />}

      {!error &&
        (loading ? (
          <p className="text-sm text-muted">{t('loading')}</p>
        ) : messages.length === 0 ? (
          <div className="card p-10 text-center text-sm text-muted">{t('noMessagesYet')}</div>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <article key={m._id} className={`card p-4 ${m.status === 'new' ? 'border-gold-500/50 bg-gold-500/5' : ''}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-wood-900">
                      {m.name}
                      <span className="ml-2 text-sm font-normal text-muted">{m.phone}</span>
                    </p>
                    <p className="text-xs text-muted">
                      {m.email && `${m.email} · `}
                      {new Date(m.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <span className="rounded-full bg-wood-100 px-2.5 py-1 text-xs font-semibold text-wood-700">
                    {t(STATUS_KEY[m.status])}
                  </span>
                </div>

                {m.subject && <p className="mt-3 text-sm font-semibold text-wood-800">{m.subject}</p>}
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-wood-800">{m.message}</p>

                <div className="mt-4 flex flex-wrap gap-2 border-t border-wood-100 pt-3">
                  <a href={`tel:+91${m.phone}`} className="btn btn-outline py-2 text-xs">
                    <Icon name="phone" className="h-4 w-4" />
                    {t('call')}
                  </a>
                  <a
                    href={`https://wa.me/91${m.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp py-2 text-xs"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    WhatsApp
                  </a>
                  {m.status !== 'read' && (
                    <button type="button" onClick={() => setStatus(m, 'read')} className="btn btn-outline py-2 text-xs">
                      <Icon name="check" className="h-4 w-4" />
                      {t('markRead')}
                    </button>
                  )}
                  {m.status !== 'replied' && (
                    <button type="button" onClick={() => setStatus(m, 'replied')} className="btn btn-outline py-2 text-xs">
                      {t('markReplied')}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(m)}
                    className="btn border border-red-200 py-2 text-xs text-red-600 hover:bg-red-50"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    {t('delete')}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ))}
    </div>
  );
}
