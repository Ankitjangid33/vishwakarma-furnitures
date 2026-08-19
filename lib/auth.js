import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Simple admin login — sirf ek password (.env ka ADMIN_PASSWORD).
 * Cookie ko AUTH_SECRET se sign karte hain taaki koi banawati cookie na bana sake.
 */

const COOKIE_NAME = 'vf_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 din

function secret() {
  return process.env.AUTH_SECRET || 'vf-dev-secret-change-me';
}

function sign(value) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

export function createToken() {
  const exp = Date.now() + MAX_AGE * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [role, exp, sig] = parts;
  if (role !== 'admin') return false;
  if (!Number(exp) || Number(exp) < Date.now()) return false;

  const expected = sign(`${role}.${exp}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

/** Password check — timing attack se bachne ke liye */
export function checkPassword(input) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real) return false;

  const a = Buffer.from(String(input || ''));
  const b = Buffer.from(real);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export const AUTH_COOKIE = COOKIE_NAME;
export const AUTH_MAX_AGE = MAX_AGE;
