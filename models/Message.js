import mongoose from 'mongoose';

/** Contact form se aane wale sandesh */
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    language: { type: String, enum: ['hi', 'en'], default: 'hi' },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new', index: true }
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
