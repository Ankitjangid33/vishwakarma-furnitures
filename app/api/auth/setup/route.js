import { NextResponse } from 'next/server';
import AdminUser from '@/models/AdminUser';
import { createToken, AUTH_COOKIE, AUTH_MAX_AGE } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { hashPassword, passwordProblem } from '@/lib/password';
import { rateLimit, clientIp, sanitize } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Sabse pehla admin banata hai — sirf tab jab database me ek bhi admin na ho.
 * Ek baar admin ban jaane ke baad ye route hamesha 403 deta hai.
 */
export async function POST(request) {
  const ip = clientIp(request);

  try {
    await connectDB();
  } catch (err) {
    return NextResponse.json({ error: 'DB_NOT_CONNECTED', message: err.message }, { status: 503 });
  }

  if ((await AdminUser.estimatedDocumentCount()) > 0) {
    return NextResponse.json({ error: 'SETUP_DONE' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const username = String(body.username || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
    return NextResponse.json({ error: 'INVALID_USERNAME' }, { status: 400 });
  }

  const pwProblem = passwordProblem(password);
  if (pwProblem) return NextResponse.json({ error: pwProblem }, { status: 400 });

  // rate limit ab yahan — upar wali galtiyan (kamzor password waghairah)
  // attempt kharch nahi karti, warna apna hi account banate waqt lock ho jayein
  const limit = rateLimit(`setup:${ip}`, { limit: 10, windowMs: 15 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'TOO_MANY', retryAfter: limit.retryAfter }, { status: 429 });
  }

  try {
    const user = await AdminUser.create({
      username,
      name: sanitize(body.name || '', 60),
      passwordHash: await hashPassword(password),
      role: 'owner',
      active: true
    });

    const res = NextResponse.json({ ok: true, user: user.toSafeJSON() });
    res.cookies.set(AUTH_COOKIE, createToken(user), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: AUTH_MAX_AGE
    });
    return res;
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: 'USERNAME_TAKEN' }, { status: 409 });
    console.error('[vf] setup error:', err);
    return NextResponse.json({ error: 'SERVER_ERROR', message: err.message }, { status: 500 });
  }
}
