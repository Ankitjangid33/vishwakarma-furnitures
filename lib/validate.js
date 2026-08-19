/** Form ki jaanch — server aur browser dono jagah use hoti hai */

export function cleanPhone(v = '') {
  return String(v).replace(/\D/g, '').slice(-10);
}

export function isValidPhone(v = '') {
  const p = cleanPhone(v);
  return /^[6-9]\d{9}$/.test(p);
}

export function isValidName(v = '') {
  return String(v).trim().length >= 2;
}

export function isValidEmail(v = '') {
  if (!v) return true; // email optional hai
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
}

/** Control characters hatakar text ko chhota kar deta hai */
export function sanitize(v = '', max = 500) {
  return String(v)
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s{3,}/g, '  ')
    .trim()
    .slice(0, max);
}

/** Ek hi IP se bahut saare requests na aayein (halka sa bachav) */
const hits = new Map();

export function rateLimit(key, { limit = 8, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  entry.count += 1;

  // purani entries hata dein
  if (hits.size > 500) {
    for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
  }

  if (entry.count > limit) return { ok: false, remaining: 0 };
  return { ok: true, remaining: limit - entry.count };
}

export function clientIp(request) {
  const h = request.headers;
  return h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
}
