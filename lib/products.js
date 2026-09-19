import { connectDB, toPlain } from './db';
import Product from '@/models/Product';
import GalleryItem from '@/models/GalleryItem';
import Testimonial from '@/models/Testimonial';
import { SEED_PRODUCTS, SEED_GALLERY } from './seed-data';
import { TESTIMONIALS } from './site';

/**
 * Data padhne ke helpers.
 *
 * Agar MongoDB abhi set nahi hua (ya connect nahi ho paaya), to website
 * band nahi hoti — seed-data.js ka saman dikhta rehta hai. Isse aap bina
 * database ke bhi site preview kar sakte hain.
 */

let warned = false;

async function dbReady() {
  try {
    await connectDB();
    return true;
  } catch (err) {
    if (!warned) {
      warned = true;
      console.warn('[vf] MongoDB not connected — showing demo data.', err.message);
    }
    return false;
  }
}

function fallbackProducts() {
  return SEED_PRODUCTS.map((p, i) => ({
    ...p,
    _id: `demo-${p.slug}`,
    images: p.images || [],
    includes: p.includes || [],
    active: true,
    sortOrder: p.sortOrder ?? i,
    isDemo: true
  }));
}

function fallbackGallery() {
  return SEED_GALLERY.map((g, i) => ({
    ...g,
    _id: `demo-g-${i}`,
    image: g.image || { url: '', publicId: '' },
    active: true,
    sortOrder: i,
    isDemo: true
  }));
}

function sortProducts(list) {
  return [...list].sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100));
}

/** Saare active products (filters ke saath) */
export async function getProducts({ category, type, featured, limit } = {}) {
  if (await dbReady()) {
    // Database khali ho (seed nahi chalaya) to demo data par chale jaate hain
    const total = await Product.countDocuments({ active: true });
    if (total > 0) {
      const query = { active: true };
      if (category) query.category = category;
      if (type) query.type = type;
      if (featured) query.featured = true;

      let q = Product.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();
      if (limit) q = q.limit(limit);
      return toPlain(await q);
    }
  }

  let out = fallbackProducts();
  if (category) out = out.filter((p) => p.category === category);
  if (type) out = out.filter((p) => p.type === type);
  if (featured) out = out.filter((p) => p.featured);
  out = sortProducts(out);
  if (limit) out = out.slice(0, limit);
  return out;
}

export async function getProductBySlug(slug) {
  if (await dbReady()) {
    const doc = await Product.findOne({ slug, active: true }).lean();
    if (doc) return toPlain(doc);
  }
  return fallbackProducts().find((p) => p.slug === slug) || null;
}

export async function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  const list = await getProducts({ category: product.category });
  return list.filter((p) => p.slug !== product.slug).slice(0, limit);
}

/** Har category me kitna saman hai */
export async function getCategoryCounts() {
  const list = await getProducts({});
  return list.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
}

export async function getGallery({ category, limit } = {}) {
  if (await dbReady()) {
    const total = await GalleryItem.countDocuments({ active: true });
    if (total > 0) {
      const query = { active: true };
      if (category) query.category = category;
      let q = GalleryItem.find(query).sort({ sortOrder: 1, createdAt: -1 }).lean();
      if (limit) q = q.limit(limit);
      return toPlain(await q);
    }
  }

  let out = fallbackGallery();
  if (category) out = out.filter((g) => g.category === category);
  if (limit) out = out.slice(0, limit);
  return out;
}

/** Home page ke reviews — admin me ek bhi na ho to site.js wale demo reviews */
export async function getTestimonials({ limit } = {}) {
  if (await dbReady()) {
    const total = await Testimonial.countDocuments({ active: true });
    if (total > 0) {
      let q = Testimonial.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
      if (limit) q = q.limit(limit);
      return toPlain(await q);
    }
  }

  const out = TESTIMONIALS.map((r, i) => ({ ...r, _id: `demo-t-${i}`, isDemo: true }));
  return limit ? out.slice(0, limit) : out;
}

/** Sitemap ke liye */
export async function getAllProductSlugs() {
  const list = await getProducts({});
  return list.map((p) => p.slug);
}
