'use client';

import Link from 'next/link';
import Icon from './Icons';
import ProductImage from './ProductImage';
import { useLang } from './LanguageProvider';
import { SITE } from '@/lib/site';

const PROMISES = ['aboutPromise1', 'aboutPromise2', 'aboutPromise3', 'aboutPromise4'];

const STEPS = [
  { icon: 'chat', title: 'step1Title', text: 'step1Text' },
  { icon: 'ruler', title: 'step2Title', text: 'step2Text' },
  { icon: 'box', title: 'step3Title', text: 'step3Text' },
  { icon: 'truck', title: 'step4Title', text: 'step4Text' }
];

export default function AboutClient({ gallery = [] }) {
  const { t, pick } = useLang();

  return (
    <>
      <section className="container-page grid gap-10 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <span className="eyebrow">{t('navAbout')}</span>
          <h1 className="section-title mt-2">{t('aboutTitle')}</h1>
          <p className="mt-5 leading-relaxed text-muted">{t('aboutP1')}</p>
          <p className="mt-4 leading-relaxed text-muted">{t('aboutP2')}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              [SITE.stats.years + '+', t('statYears')],
              [SITE.stats.homes + '+', t('statProjects')],
              [SITE.stats.warranty, t('statWarranty')]
            ].map(([n, label]) => (
              <div key={label} className="rounded-2xl border border-wood-100 bg-white px-3 py-4 text-center">
                <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-wood-700">{n}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-primary">
              {t('heroCta1')}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-outline">
              {t('navContact')}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(gallery.length ? gallery : Array.from({ length: 4 })).slice(0, 4).map((g, i) => (
            <ProductImage
              key={g?._id || i}
              src={g?.image?.url}
              alt={pick(g?.title) || 'Work'}
              category={g?.category || ['bedroom', 'kitchen', 'living', 'temple'][i]}
              label={pick(g?.title)}
              className={`w-full rounded-3xl ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      </section>

      {/* promise */}
      <section className="bg-wood-50 py-14">
        <div className="container-page">
          <h2 className="section-title !text-2xl">{t('aboutPromiseTitle')}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {PROMISES.map((k) => (
              <li key={k} className="flex items-start gap-3 rounded-2xl border border-wood-100 bg-white p-5">
                <Icon name="checkCircle" className="mt-0.5 h-5 w-5 shrink-0 text-wood-600" />
                <span className="text-sm font-medium leading-relaxed text-wood-800">{t(k)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* process */}
      <section className="container-page py-14">
        <h2 className="section-title text-center !text-2xl">{t('processTitle')}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-wood-100 bg-white p-6">
              <span className="absolute right-5 top-4 font-[family-name:var(--font-display)] text-4xl font-bold text-wood-100">
                {i + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500/15 text-gold-600">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-wood-900">{t(s.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(s.text)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
