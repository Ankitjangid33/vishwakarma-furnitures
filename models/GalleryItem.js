import mongoose from 'mongoose';
import { CATEGORY_IDS } from '../lib/categories.js';

const Bilingual = new mongoose.Schema(
  { en: { type: String, default: '' }, hi: { type: String, default: '' } },
  { _id: false }
);

/** Aapka kiya hua kaam — photos ke saath */
const GalleryItemSchema = new mongoose.Schema(
  {
    title: { type: Bilingual, required: true },
    location: { type: Bilingual, default: () => ({}) },
    category: { type: String, enum: CATEGORY_IDS, default: 'custom', index: true },
    image: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' }
    },
    year: { type: Number, default: () => new Date().getFullYear() },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 100 }
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);
