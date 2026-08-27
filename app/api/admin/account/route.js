import { NextResponse } from 'next/server';
import AdminUser from '@/models/AdminUser';
import { guard, badRequest, serverError } from '@/lib/api-helpers';
import { createToken, AUTH_COOKIE, AUTH_MAX_AGE } from '@/lib/auth';
import { hashPassword, verifyPassword, passwordProblem } from '@/lib/password';
import { sanitize } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Apna khud ka naam / password badalna.
 * Password badalne ke liye purana password dena zaroori hai.
 */
export async function PATCH(request) {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const body = await request.json().catch(() => ({}));
    const user = await AdminUser.findById(g.user._id).select('+passwordHash');
    if (!user) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    if (typeof body.name === 'string') user.name = sanitize(body.name, 60);

    let passwordChanged = false;

    if (body.newPassword) {
      const okOld = await verifyPassword(body.currentPassword, user.passwordHash);
      if (!okOld) return NextResponse.json({ error: 'WRONG_CURRENT_PASSWORD' }, { status: 401 });

      const pwProblem = passwordProblem(body.newPassword);
      if (pwProblem) return badRequest(pwProblem);

      user.passwordHash = await hashPassword(body.newPassword);
      user.passwordChangedAt = new Date();
      passwordChanged = true;
    }

    await user.save();

    const res = NextResponse.json({ user: user.toSafeJSON() });

    // password badalne se purana token bekaar ho jaata hai —
    // isliye khud ke liye naya cookie set kar dete hain (logout na ho)
    if (passwordChanged) {
      res.cookies.set(AUTH_COOKIE, createToken(user), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: AUTH_MAX_AGE
      });
    }

    return res;
  } catch (err) {
    return serverError(err);
  }
}
