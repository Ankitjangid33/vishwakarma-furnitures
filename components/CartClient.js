'use client';

import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icons';
import ProductImage from './ProductImage';
import { useLang } from './LanguageProvider';
import { useCart } from './CartProvider';
import { formatPrice, UNIT_KEY } from '@/lib/i18n';
import { isValidName, isValidPhone, isValidEmail } from '@/lib/validate';
import { waLink } from '@/lib/site';

export default function CartClient() {
  const { t, pick, lang } = useLang();
  const { items, count, estimatedTotal, hasQuoteItems, setQty, removeItem, clear, ready } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    note: '',
    visitRequested: true,
    website: '' // honeypot
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null); // { orderNo, waText }

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const buildWaText = (orderNo) => {
    const lines = [
      lang === 'hi' ? `नमस्ते! मैंने वेबसाइट से ऑर्डर बुक किया है।` : `Hello! I booked an order on your website.`,
      `${t('orderNumber')}: ${orderNo}`,
      '',
      `${t('yourName')}: ${form.name}`,
      `${t('phoneNumber')}: ${form.phone}`,
      form.city ? `${t('city')}: ${form.city}` : '',
      '',
      ...items.map((i, n) => `${n + 1}. ${pick(i.name)} × ${i.qty}`),
      '',
      hasQuoteItems ? '' : `${t('estimate')}: ${formatPrice(estimatedTotal, lang)}`,
      form.note ? `${t('noteLabel')} ${form.note}` : ''
    ];
    return lines.filter((l) => l !== '').join('\n');
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;

    const er = {};
    if (!isValidName(form.name)) er.name = t('errName');
    if (!isValidPhone(form.phone)) er.phone = t('errPhone');
    if (!isValidEmail(form.email)) er.email = t('errName');
    if (items.length === 0) er.items = t('errEmpty');

    setErrors(er);
    if (Object.keys(er).length > 0) return;

    setBusy(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
            pincode: form.pincode
          },
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
          note: form.note,
          visitRequested: form.visitRequested,
          language: lang,
          website: form.website
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data?.error === 'INVALID_PHONE' ? t('errPhone') : t('error') });
        setBusy(false);
        return;
      }

      const waText = buildWaText(data.orderNo);
      setDone({ orderNo: data.orderNo, waText });
      clear();
    } catch {
      setErrors({ submit: t('error') });
    } finally {
      setBusy(false);
    }
  };

  /* ---------------- success ---------------- */
  if (done) {
    return (
      <section className="container-page py-16">
        <div className="card mx-auto max-w-xl p-8 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700">
            <Icon name="checkCircle" className="h-9 w-9" />
          </span>
          <h1 className="mt-5 text-2xl text-wood-900">{t('orderPlaced')}</h1>
          <p className="mt-2 text-muted">{t('orderPlacedSub')}</p>

          <div className="mt-6 rounded-2xl bg-wood-50 px-5 py-4">
            <p className="text-xs uppercase tracking-wider text-muted">{t('orderNumber')}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-wood-800">
              {done.orderNo}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(done.waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              {t('sendOnWhatsapp')}
            </a>
            <Link href="/" className="btn btn-outline">
              {t('backHome')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- empty ---------------- */
  if (ready && items.length === 0) {
    return (
      <section className="container-page py-16">
        <div className="card mx-auto max-w-lg p-10 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-wood-100 text-wood-500">
            <Icon name="cart" className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-xl text-wood-900">{t('cartEmpty')}</h1>
          <p className="mt-2 text-sm text-muted">{t('cartEmptyHint')}</p>
          <Link href="/products" className="btn btn-primary mt-6">
            {t('browseProducts')}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  /* ---------------- cart + form ---------------- */
  return (
    <section className="container-page py-10">
      {/* items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.slug} className="card flex items-center gap-4 p-3 sm:p-4">
            <Link href={`/products/${item.slug}`} className="shrink-0">
              <ProductImage
                src={item.image}
                alt={pick(item.name)}
                category={item.category}
                className="h-20 w-24 rounded-xl sm:h-24 sm:w-28"
                sizes="120px"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Link href={`/products/${item.slug}`}>
                <h3 className="line-clamp-2 font-semibold text-wood-900 hover:text-wood-600">
                  {pick(item.name)}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-muted">
                {item.priceType === 'quote' || !item.price ? (
                  t('onRequest')
                ) : (
                  <>
                    {formatPrice(item.price, lang)}{' '}
                    <span className="text-xs">{t(UNIT_KEY[item.unit] || 'perPiece')}</span>
                  </>
                )}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-wood-200 bg-white">
                  <button
                    type="button"
                    aria-label="-"
                    onClick={() => setQty(item.slug, item.qty - 1)}
                    className="grid h-9 w-9 place-items-center rounded-full text-wood-700 hover:bg-wood-50"
                  >
                    <Icon name="minus" className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                  <button
                    type="button"
                    aria-label="+"
                    onClick={() => setQty(item.slug, item.qty + 1)}
                    className="grid h-9 w-9 place-items-center rounded-full text-wood-700 hover:bg-wood-50"
                  >
                    <Icon name="plus" className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.slug)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  <Icon name="trash" className="h-4 w-4" />
                  {t('remove')}
                </button>
              </div>
            </div>

            {item.price > 0 && item.priceType !== 'quote' && (
              <div className="hidden shrink-0 text-right sm:block">
                <p className="font-[family-name:var(--font-display)] text-lg font-bold text-wood-800">
                  {formatPrice(item.price * item.qty, lang)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* form + summary */}
      <form onSubmit={submit} className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card p-6">
          <h2 className="text-xl text-wood-900">{t('bookingTitle')}</h2>
          <p className="mt-1.5 text-sm text-muted">{t('bookingSub')}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">
                {t('yourName')} *
              </label>
              <input
                id="name"
                className="field"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
                required
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="label" htmlFor="phone">
                {t('phoneNumber')} *
              </label>
              <input
                id="phone"
                className="field"
                value={form.phone}
                onChange={set('phone')}
                inputMode="numeric"
                autoComplete="tel"
                placeholder="9876543210"
                required
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="email">
                {t('emailOptional')}
              </label>
              <input
                id="email"
                type="email"
                className="field"
                value={form.email}
                onChange={set('email')}
                autoComplete="email"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="address">
                {t('address')}
              </label>
              <textarea
                id="address"
                className="field"
                rows={2}
                value={form.address}
                onChange={set('address')}
                autoComplete="street-address"
              />
            </div>

            <div>
              <label className="label" htmlFor="city">
                {t('city')}
              </label>
              <input id="city" className="field" value={form.city} onChange={set('city')} />
            </div>

            <div>
              <label className="label" htmlFor="pincode">
                {t('pincode')}
              </label>
              <input
                id="pincode"
                className="field"
                value={form.pincode}
                onChange={set('pincode')}
                inputMode="numeric"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="note">
                {t('noteLabel')}
              </label>
              <textarea
                id="note"
                className="field"
                rows={3}
                placeholder={t('notePlaceholder')}
                value={form.note}
                onChange={set('note')}
              />
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 sm:col-span-2">
              <input
                type="checkbox"
                checked={form.visitRequested}
                onChange={set('visitRequested')}
                className="mt-0.5 h-5 w-5 accent-[var(--color-wood-600)]"
              />
              <span className="text-sm text-wood-800">{t('visitRequest')}</span>
            </label>

            {/* honeypot — sirf bots ke liye */}
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
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-6">
            <h2 className="text-lg text-wood-900">{t('cartTitle')}</h2>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <dt>{t('itemsFound')}</dt>
                <dd className="font-semibold text-wood-800">{count}</dd>
              </div>
              <div className="flex justify-between border-t border-wood-100 pt-3">
                <dt className="font-semibold text-wood-800">{t('estimate')}</dt>
                <dd className="font-[family-name:var(--font-display)] text-xl font-bold text-wood-800">
                  {formatPrice(estimatedTotal, lang)}
                </dd>
              </div>
            </dl>

            <p className="mt-3 text-xs leading-relaxed text-muted">{t('estimateNote')}</p>
            {hasQuoteItems && (
              <p className="mt-2 rounded-xl bg-gold-500/10 px-3 py-2 text-xs text-wood-800">
                {t('quoteItemsNote')}
              </p>
            )}

            {errors.submit && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errors.submit}</p>
            )}
            {errors.items && (
              <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{errors.items}</p>
            )}

            <button type="submit" disabled={busy} className="btn btn-primary mt-5 w-full disabled:opacity-60">
              {busy ? t('sending') : t('placeOrder')}
              {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
            </button>

            <Link href="/products" className="btn btn-outline mt-3 w-full">
              {t('browseProducts')}
            </Link>
          </div>
        </aside>
      </form>
    </section>
  );
}
