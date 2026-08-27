import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import AdminUser from '@/models/AdminUser';
import { connectDB } from './db';

/**
 * Admin login — username + password, dono MongoDB me (AdminUser collection).
 * Cookie me sirf ek signed token jaata hai; asli jaanch har request pe DB se hoti hai,
 * isliye user ko band (deactivate) karte hi uska session turant khatam ho jaata hai.
 *
 * Token: <userId>.<passwordChangedAt>.<expiry>.<hmac-signature>
 */

const COOKIE_NAME = 'vf_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 din

function secret() {
  return process.env.AUTH_SECRET || 'vf-dev-secret-change-me';
}

function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

export function createToken(user) {
  const exp = Date.now() + MAX_AGE * 1000;
  const pv = new Date(user.passwordChangedAt || 0).getTime();
  const payload = `${user._id}.${pv}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

/** Sirf signature/expiry ki jaanch (DB ko haath nahi lagata) */
export function readToken(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 4) return null;

  const [id, pv, exp, sig] = parts;
  if (!/^[a-f\d]{24}$/i.test(id)) return null;
  if (!Number(exp) || Number(exp) < Date.now()) return null;

  const expected = sign(`${id}.${pv}.${exp}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  return { id, pv: Number(pv) };
}

/**
 * Abhi jo login hai wo user — warna null.
 * DB band ho to bhi null (admin panel bina DB ke chalta hi nahi).
 */
export async function currentUser() {
  const store = await cookies();
  const claim = readToken(store.get(COOKIE_NAME)?.value);
  if (!claim) return null;

  try {
    await connectDB();
  } catch {
    return null;
  }

  const user = await AdminUser.findById(claim.id);
  if (!user || !user.active) return null;

  // password badal gaya to purana token bekaar
  if (new Date(user.passwordChangedAt || 0).getTime() !== claim.pv) return null;

  return user;
}

export async function isAdmin() {
  return Boolean(await currentUser());
}

/** Ek bhi admin bana hai ya nahi — pehli baar setup screen dikhane ke liye */
export async function hasAnyAdmin() {
  await connectDB();
  return (await AdminUser.estimatedDocumentCount()) > 0;
}

export const AUTH_COOKIE = COOKIE_NAME;
export const AUTH_MAX_AGE = MAX_AGE;
