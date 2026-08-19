import mongoose from 'mongoose';
import { CATEGORY_IDS } from '../lib/categories.js';

const BilingualSchema = new mongoose.Schema(
  {
    en: { type: String, default: '' },
    hi: { type: String, default: '' }
  },
  { _id: false }
);

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    alt: { type: String, default: '' }
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true, trim: true, lowercase: true },
    category: { type: String, required: true, enum: CATEGORY_IDS, index: true },

    // "item" = ek alag cheez (bed, kapat) | "set" = poore room ka set
    type: { type: String, enum: ['item', 'set'], default: 'item' },

    name: { type: BilingualSchema, required: true },
    description: { type: BilingualSchema, default: () => ({}) },

    price: { type: Number, default: 0, min: 0 },
    // fixed = pakka daam | from = "shuru" daam | quote = daam poochhna padega
    priceType: { type: String, enum: ['fixed', 'from', 'quote'], default: 'fixed' },
    unit: { type: String, enum: ['piece', 'set', 'sqft', 'runningft'], default: 'piece' },

    material: { type: BilingualSchema, default: () => ({}) },
    size: { type: String, default: '' },
    deliveryDays: { type: Number, default: 10, min: 0 },

    // set ke andar kya kya aata hai
    includes: { type: [BilingualSchema], default: [] },

    images: { type: [ImageSchema], default: [] },

    featured: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 100 }
  },
  { timestamps: true }
);

ProductSchema.index({ 'name.en': 'text', 'name.hi': 'text', 'description.en': 'text', 'description.hi': 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
