import { sanitize } from './validate';

/** Naam se apne aap slug bana deta hai: "Teak Bed" -> "teak-bed" */
export function slugify(v = '') {
  return String(v)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

/** Admin form se aaye data ko database ke saanche me dhalta hai */
export function buildProductPayload(body = {}) {
  const nameEn = sanitize(body?.name?.en, 120);
  const nameHi = sanitize(body?.name?.hi, 120);

  return {
    slug: slugify(body.slug || nameEn || nameHi),
    category: body.category,
    type: body.type === 'set' ? 'set' : 'item',
    name: { en: nameEn, hi: nameHi },
    description: {
      en: sanitize(body?.description?.en, 1500),
      hi: sanitize(body?.description?.hi, 1500)
    },
    price: Math.max(0, Number(body.price) || 0),
    priceType: ['fixed', 'from', 'quote'].includes(body.priceType) ? body.priceType : 'fixed',
    unit: ['piece', 'set', 'sqft', 'runningft'].includes(body.unit) ? body.unit : 'piece',
    material: {
      en: sanitize(body?.material?.en, 120),
      hi: sanitize(body?.material?.hi, 120)
    },
    size: sanitize(body.size, 80),
    deliveryDays: Math.max(0, Number(body.deliveryDays) || 0),
    includes: Array.isArray(body.includes)
      ? body.includes
          .slice(0, 20)
          .map((i) => ({ en: sanitize(i?.en, 120), hi: sanitize(i?.hi, 120) }))
          .filter((i) => i.en || i.hi)
      : [],
    images: Array.isArray(body.images)
      ? body.images
          .slice(0, 10)
          .map((i) => ({
            url: sanitize(i?.url, 500),
            publicId: sanitize(i?.publicId, 200),
            alt: sanitize(i?.alt, 150)
          }))
          .filter((i) => i.url)
      : [],
    featured: Boolean(body.featured),
    active: body.active !== false,
    sortOrder: Number(body.sortOrder) || 100
  };
}

/** Gallery item ka payload */
export function buildGalleryPayload(body = {}) {
  return {
    title: { en: sanitize(body?.title?.en, 120), hi: sanitize(body?.title?.hi, 120) },
    location: { en: sanitize(body?.location?.en, 120), hi: sanitize(body?.location?.hi, 120) },
    category: body.category,
    image: {
      url: sanitize(body?.image?.url, 500),
      publicId: sanitize(body?.image?.publicId, 200)
    },
    year: Number(body.year) || new Date().getFullYear(),
    featured: Boolean(body.featured),
    active: body.active !== false,
    sortOrder: Number(body.sortOrder) || 100
  };
}
