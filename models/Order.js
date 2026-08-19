import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    slug: { type: String, default: '' },
    name: {
      en: { type: String, default: '' },
      hi: { type: String, default: '' }
    },
    price: { type: Number, default: 0 },
    priceType: { type: String, default: 'fixed' },
    unit: { type: String, default: 'piece' },
    qty: { type: Number, default: 1, min: 1 }
  },
  { _id: false }
);

export const ORDER_STATUSES = ['new', 'contacted', 'confirmed', 'in_production', 'delivered', 'cancelled'];

const OrderSchema = new mongoose.Schema(
  {
    orderNo: { type: String, required: true, unique: true, index: true },

    customer: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, default: '', trim: true, lowercase: true },
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      pincode: { type: String, default: '' }
    },

    items: { type: [OrderItemSchema], default: [] },

    // sirf estimate — final daam baat karke tay hoga
    estimatedTotal: { type: Number, default: 0 },
    hasQuoteItems: { type: Boolean, default: false },

    note: { type: String, default: '' },
    visitRequested: { type: Boolean, default: false },
    language: { type: String, enum: ['hi', 'en'], default: 'hi' },

    status: { type: String, enum: ORDER_STATUSES, default: 'new', index: true },
    adminNote: { type: String, default: '' }
  },
  { timestamps: true }
);

/** VF-260819-4821 jaisa order number */
export function makeOrderNo() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `VF-${yy}${mm}${dd}-${rand}`;
}

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
