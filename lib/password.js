import { randomBytes, scrypt as _scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

/**
 * Password hashing — Node ke built-in scrypt se (koi extra package nahi).
 * Database me sirf hash jaata hai, asli password kabhi nahi.
 *
 * Stored format:  scrypt$<N>$<r>$<p>$<salt-hex>$<hash-hex>
 */

const scrypt = promisify(_scrypt);

const N = 16384; // CPU/memory cost
const R = 8;
const P = 1;
const KEYLEN = 32;

export const PASSWORD_MIN = 8;

/** Password kaafi mazboot hai ya nahi */
export function passwordProblem(password) {
  const p = String(password || '');
  if (p.length < PASSWORD_MIN) return 'PASSWORD_TOO_SHORT';
  if (p.length > 200) return 'PASSWORD_TOO_LONG';
  if (!/[a-zA-Z]/.test(p) || !/\d/.test(p)) return 'PASSWORD_TOO_SIMPLE';
  return null;
}

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(String(password), salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  if (!stored || typeof stored !== 'string') return false;

  const parts = stored.split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const [, n, r, p, saltHex, hashHex] = parts;
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  if (!salt.length || !expected.length) return false;

  let key;
  try {
    key = await scrypt(String(password), salt, expected.length, {
      N: Number(n),
      r: Number(r),
      p: Number(p),
      // bade N ke liye Node ki default memory limit badhani padti hai
      maxmem: 256 * 1024 * 1024
    });
  } catch {
    return false;
  }

  return key.length === expected.length && timingSafeEqual(key, expected);
}
