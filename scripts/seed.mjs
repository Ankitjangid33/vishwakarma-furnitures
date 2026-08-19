/**
 * Database me shuruaati data daalne ke liye:
 *
 *    npm run seed
 *
 * Ye purana data delete nahi karta — sirf jo nahi hai wo jodta hai.
 * Sab kuch dobara set karna ho to:  npm run seed -- --fresh
 */

import mongoose from 'mongoose';
import Product from '../models/Product.js';
import GalleryItem from '../models/GalleryItem.js';
import { SEED_PRODUCTS, SEED_GALLERY } from '../lib/seed-data.js';

const FRESH = process.argv.includes('--fresh');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('\n❌  MONGODB_URI nahi mila. .env.local file me apna MongoDB Atlas link daalein.\n');
    process.exit(1);
  }

  console.log('\n⏳  MongoDB se jud rahe hain...');
  await mongoose.connect(uri);
  console.log('✅  Connected\n');

  if (FRESH) {
    await Product.deleteMany({});
    await GalleryItem.deleteMany({});
    console.log('🗑️   Purana products + gallery data hata diya (--fresh)\n');
  }

  let added = 0;
  let skipped = 0;

  for (const p of SEED_PRODUCTS) {
    const exists = await Product.findOne({ slug: p.slug });
    if (exists) {
      skipped++;
      continue;
    }
    await Product.create(p);
    added++;
    console.log(`   + ${p.name.hi}  (${p.name.en})`);
  }

  console.log(`\n📦  Products: ${added} naye jode, ${skipped} pehle se the\n`);

  let gAdded = 0;
  let gSkipped = 0;

  for (const [i, g] of SEED_GALLERY.entries()) {
    const exists = await GalleryItem.findOne({ 'title.en': g.title.en });
    if (exists) {
      gSkipped++;
      continue;
    }
    await GalleryItem.create({ ...g, sortOrder: i });
    gAdded++;
  }

  console.log(`🖼️   Gallery: ${gAdded} naye jode, ${gSkipped} pehle se the\n`);
  console.log('🎉  Seed poora hua! Ab "npm run dev" chalayein.\n');

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (err) => {
  console.error('\n❌  Seed fail hua:', err.message, '\n');
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
