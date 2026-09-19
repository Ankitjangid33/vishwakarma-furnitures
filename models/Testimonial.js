import mongoose from 'mongoose';

const Bilingual = new mongoose.Schema(
  { en: { type: String, default: '' }, hi: { type: String, default: '' } },
  { _id: false }
);

/** Grahakon ki rai — home page ke "What customers say" me dikhti hai */
const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    place: { type: Bilingual, default: () => ({}) },
    text: { type: Bilingual, required: true },
    stars: { type: Number, min: 1, max: 5, default: 5 },
    active: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 100 }
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
