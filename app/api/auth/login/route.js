import { NextResponse } from 'next/server';
import { checkPassword, createToken, AUTH_COOKIE, AUTH_MAX_AGE } from '@/lib/auth';
import { rateLimit, clientIp } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const ip = clientIp(request);
  const limit = rateLimit(`login:${ip}`, { limit: 6, windowMs: 15 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'TOO_MANY' }, { status: 429 });
  }

  const { password } = await request.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'NO_PASSWORD_SET' }, { status: 500 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'WRONG_PASSWORD' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_MAX_AGE
  });

  return res;
}
