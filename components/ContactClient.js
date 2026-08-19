'use client';

import { useState } from 'react';
import Icon from './Icons';
import { useLang } from './LanguageProvider';
import { SITE, dialNumber, waLink } from '@/lib/site';
import { isValidName, isValidPhone, isValidEmail } from '@/lib/validate';

export default function ContactClient() {
  const { t, pick, lang } = useLang();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const er = {};
    if (!isValidName(form.name)) er.name = t('errName');
    if (!isValidPhone(form.phone)) er.phone = t('errPhone');
    if (!isValidEmail(form.email)) er.email = t('errName');
    if (form.message.trim().length < 3) er.message = t('errMessage');

    setErrors(er);
    if (Object.keys(er).length) return;

    setBusy(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: lang })
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data?.error === 'INVALID_PHONE' ? t('errPhone') : t('error') });
      } else {
        setSent(true);
        setForm({ name: '', phone: '', email: '', subject: '', message: '', website: '' });
      }
    } catch {
      setErrors({ submit: t('error') });
    } finally {
      setBusy(false);
    }
  };

  const cards = [
    {
      icon: 'phone',
      label: t('phoneLabel'),
      value: SITE.phone,
      href: `tel:${dialNumber()}`
    },
    {
      icon: 'whatsapp',
      label: t('whatsapp'),
      value: SITE.phone,
      href: waLink(lang === 'hi' ? 'नमस्ते! जानकारी चाहिए।' : 'Hello! I need some details.')
    },
    {
      icon: 'mail',
      label: t('emailLabel'),
      value: SITE.email,
      href: `mailto:${SITE.email}`
    },
    {
      icon: 'map',
      label: t('addressLabel'),
      value: pick(SITE.address)
    },
    {
      icon: 'clock',
      label: t('hoursLabel'),
      value: pick(SITE.hours)
    }
  ];

  return (
    <section className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
      {/* form */}
      <div className="card p-6 md:p-8">
        {sent ? (
          <div className="py-10 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
              <Icon name="checkCircle" className="h-9 w-9" />
            </span>
            <p className="mt-5 text-lg font-semibold text-wood-900">{t('messageSent')}</p>
            <button type="button" onClick={() => setSent(false)} className="btn btn-outline mt-6">
              {t('sendMessage')}
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 className="text-xl text-wood-900">{t('sendMessage')}</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="c-name">
                  {t('yourName')} *
                </label>
                <input id="c-name" className="field" value={form.name} onChange={set('name')} required />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="label" htmlFor="c-phone">
                  {t('phoneNumber')} *
                </label>
                <input
                  id="c-phone"
                  className="field"
                  value={form.phone}
                  onChange={set('phone')}
                  inputMode="numeric"
                  placeholder="9876543210"
                  required
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label className="label" htmlFor="c-email">
                  {t('emailOptional')}
                </label>
                <input id="c-email" type="email" className="field" value={form.email} onChange={set('email')} />
              </div>

              <div>
                <label className="label" htmlFor="c-subject">
                  {t('subjectLabel')}
                </label>
                <input id="c-subject" className="field" value={form.subject} onChange={set('subject')} />
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="c-message">
                  {t('messageLabel')} *
                </label>
                <textarea
                  id="c-message"
                  className="field"
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  required
                />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={set('website')}
                className="hidden"
                aria-hidden="true"
              />
            </div>

            {errors.submit && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errors.submit}</p>
            )}

            <button type="submit" disabled={busy} className="btn btn-primary mt-6 disabled:opacity-60">
              {busy ? t('sending') : t('sendMessage')}
              {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
            </button>
          </form>
        )}
      </div>

      {/* info */}
      <aside className="space-y-3">
        {cards.map((c) => {
          const inner = (
            <>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-wood-100 text-wood-700">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-muted">
                  {c.label}
                </span>
                <span className="mt-0.5 block break-words text-sm font-medium text-wood-900">{c.value}</span>
              </span>
            </>
          );

          return c.href ? (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="card flex items-start gap-3 p-4 transition hover:shadow-[var(--shadow-lift)]"
            >
              {inner}
            </a>
          ) : (
            <div key={c.label} className="card flex items-start gap-3 p-4">
              {inner}
            </div>
          );
        })}

        <div className="card overflow-hidden">
          <iframe
            src={SITE.mapEmbed}
            title="Map"
            className="h-64 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </aside>
    </section>
  );
}
