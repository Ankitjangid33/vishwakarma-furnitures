'use client';

import Link from 'next/link';
import Icon from '../Icons';
import ProductCard from '../ProductCard';
import CategoryCard from '../CategoryCard';
import ProductImage from '../ProductImage';
import { useLang } from '../LanguageProvider';
import { CATEGORIES } from '@/lib/categories';
import { SITE, TESTIMONIALS, waLink } from '@/lib/site';

const WHY = [
  { icon: 'shield', title: 'why1Title', text: 'why1Text' },
  { icon: 'ruler', title: 'why2Title', text: 'why2Text' },
  { icon: 'truck', title: 'why3Title', text: 'why3Text' },
  { icon: 'hammer', title: 'why4Title', text: 'why4Text' }
];

const STEPS = [
  { icon: 'chat', title: 'step1Title', text: 'step1Text' },
  { icon: 'ruler', title: 'step2Title', text: 'step2Text' },
  { icon: 'box', title: 'step3Title', text: 'step3Text' },
  { icon: 'truck', title: 'step4Title', text: 'step4Text' }
];

export default function HomeClient({ featured = [], gallery = [], counts = {} }) {
  const { t, pick, lang } = useLang();

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-wood-50 to-cream">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="fade-up">
            <span className="eyebrow">{t('heroEyebrow')}</span>
            <h1 className="mt-3 text-4xl leading-tight text-wood-900 md:text-5xl lg:text-[3.4rem]">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t('heroSub')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary">
                {t('heroCta1')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <Link href="/cart" className="btn btn-outline">
                {t('heroCta2')}
              </Link>
              <a
                href={waLink(
                  lang === 'hi'
                    ? 'नमस्ते! मुझे फर्नीचर बनवाना है।'
                    : 'Hello! I want to get furniture made.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                {t('whatsapp')}
              </a>
            </div>

            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {[
                [SITE.stats.years + '+', t('statYears')],
                [SITE.stats.homes + '+', t('statProjects')],
                [SITE.stats.warranty, t('statWarranty')]
              ].map(([n, label]) => (
                <div key={label} className="rounded-2xl border border-wood-100 bg-white/70 px-3 py-4 text-center">
                  <dt className="font-[family-name:var(--font-display)] text-2xl font-bold text-wood-700 md:text-3xl">
                    {n}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* hero collage */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <ProductImage
              src={gallery[0]?.image?.url}
              alt={pick(gallery[0]?.title) || 'Work'}
              category={gallery[0]?.category || 'bedroom'}
              label={pick(gallery[0]?.title)}
              priority
              className="col-span-2 aspect-[16/10] w-full rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <ProductImage
              src={gallery[1]?.image?.url}
              alt={pick(gallery[1]?.title) || 'Work'}
              category={gallery[1]?.category || 'kitchen'}
              label={pick(gallery[1]?.title)}
              className="aspect-square w-full rounded-3xl"
              sizes="25vw"
            />
            <ProductImage
              src={gallery[2]?.image?.url}
              alt={pick(gallery[2]?.title) || 'Work'}
              category={gallery[2]?.category || 'living'}
              label={pick(gallery[2]?.title)}
              className="aspect-square w-full rounded-3xl"
              sizes="25vw"
            />
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="container-page py-16" id="rooms">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">{t('navProducts')}</span>
          <h2 className="section-title mt-2">{t('categoriesTitle')}</h2>
          <p className="mt-3 text-muted">{t('categoriesSub')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.id} category={c} count={counts[c.id] || 0} />
          ))}
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      {featured.length > 0 && (
        <section className="bg-wood-50 py-16">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="eyebrow">{t('featuredTitle')}</span>
                <h2 className="section-title mt-2">{t('featuredSub')}</h2>
              </div>
              <Link href="/products" className="btn btn-outline !py-2.5 !text-sm">
                {t('viewAll')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.slice(0, 8).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= WHY US ================= */}
      <section className="container-page py-16">
        <h2 className="section-title text-center">{t('whyTitle')}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="card p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-wood-100 text-wood-700">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-wood-900">{t(w.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(w.text)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OUR WORK ================= */}
      {gallery.length > 0 && (
        <section className="bg-wood-800 py-16 text-white">
          <div className="container-page">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <span className="eyebrow !text-gold-400">{t('navGallery')}</span>
                <h2 className="section-title mt-2 !text-white">{t('workTitle')}</h2>
                <p className="mt-3 text-wood-200">{t('workSub')}</p>
              </div>
              <Link
                href="/gallery"
                className="btn !border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
              >
                {t('viewAll')}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {gallery.slice(0, 6).map((g) => (
                <Link
                  key={g._id}
                  href="/gallery"
                  className="group relative block overflow-hidden rounded-2xl"
                >
                  <ProductImage
                    src={g.image?.url}
                    alt={pick(g.title)}
                    category={g.category}
                    label={pick(g.title)}
                    className="aspect-[4/3] w-full"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                    <span className="block text-sm font-semibold text-white">{pick(g.title)}</span>
                    {pick(g.location) && (
                      <span className="block text-xs text-white/70">
                        {pick(g.location)} · {g.year}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= PROCESS ================= */}
      <section className="container-page py-16">
        <h2 className="section-title text-center">{t('processTitle')}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-wood-50 py-16">
        <div className="container-page">
          <h2 className="section-title text-center">{t('testimonialsTitle')}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((r) => (
              <figure key={r.name} className="card p-6">
                <div className="flex gap-0.5 text-gold-500">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="star" className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-wood-800">
                  “{pick(r.text)}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-wood-100 pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-wood-100 text-wood-700">
                    <Icon name="user" className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-wood-900">{r.name}</span>
                    <span className="block text-xs text-muted">{pick(r.place)}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-page py-16">
        <div className="wood-texture relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white md:px-12">
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl">{t('ctaTitle')}</h2>
            <p className="mt-4 text-white/85">{t('ctaSub')}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn !bg-white !text-wood-800 hover:!bg-wood-50">
                {t('navContact')}
              </Link>
              <Link href="/products" className="btn !border-white/40 !bg-white/10 !text-white hover:!bg-white/20">
                {t('heroCta1')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
