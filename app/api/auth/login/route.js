import { NextResponse } from 'next/server';
import AdminUser from '@/models/AdminUser';
import { createToken, AUTH_COOKIE, AUTH_MAX_AGE } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { rateLimit, clearRateLimit, clientIp } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ip = clientIp(request);
  const limitKey = `login:${ip}`;
  const limit = rateLimit(limitKey, { limit: 10, windowMs: 15 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'TOO_MANY', retryAfter: limit.retryAfter }, { status: 429 });
  }

  const { username, password } = await request.json().catch(() => ({}));

  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ error: 'DB_NOT_CONNECTED', message: err.message }, { status: 503 });
  }

  const uname = String(username || '').trim().toLowerCase();
  const user = uname
    ? await AdminUser.findOne({ username: uname }).select('+passwordHash')
    : null;

  // username galat ho ya password — dono me ek jaisa jawab, taaki
  // username hai ya nahi ye pata na chale
  const ok = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!ok || !user.active) {
    return NextResponse.json(
      { error: user && ok && !user.active ? 'ACCOUNT_DISABLED' : 'WRONG_LOGIN' },
      { status: 401 }
    );
  }

  // sahi password aa gaya — ginti saaf, warna roz login karne wale
  // apne hi ghar ke bahar taale me phans jaate hain
  clearRateLimit(limitKey);

  user.lastLoginAt = new Date();
  await user.save();

  const res = NextResponse.json({ ok: true, user: user.toSafeJSON() });
  res.cookies.set(AUTH_COOKIE, createToken(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_MAX_AGE
  });

  return res;
}
