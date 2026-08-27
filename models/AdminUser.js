import mongoose from 'mongoose';

/**
 * Admin panel ke login users.
 * Password kabhi plain text me save nahi hota — sirf scrypt hash (lib/password.js).
 *
 * role:
 *   owner  → sab kuch, users bhi bana/hata sakta hai
 *   staff  → products/gallery/orders/messages sambhal sakta hai, users nahi
 */
const AdminUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 32,
      match: /^[a-z0-9._-]+$/
    },
    name: { type: String, default: '', trim: true, maxlength: 60 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['owner', 'staff'], default: 'staff', index: true },
    active: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
    // password badalne par purane login sessions apne aap band ho jaate hain
    passwordChangedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

AdminUserSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    _id: String(this._id),
    username: this.username,
    name: this.name,
    role: this.role,
    active: this.active,
    lastLoginAt: this.lastLoginAt,
    createdAt: this.createdAt
  };
};

export default mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
