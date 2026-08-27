import { NextResponse } from 'next/server';
import AdminUser from '@/models/AdminUser';
import { guard, badRequest, serverError } from '@/lib/api-helpers';
import { hashPassword, passwordProblem } from '@/lib/password';
import { sanitize } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Saare admin users — sirf owner dekh sakta hai */
export async function GET() {
  const g = await guard({ role: 'owner' });
  if (g.error) return g.error;

  try {
    const users = await AdminUser.find({}).sort({ createdAt: 1 });
    return NextResponse.json({ users: users.map((u) => u.toSafeJSON()) });
  } catch (err) {
    return serverError(err);
  }
}

/** Naya admin user banata hai */
export async function POST(request) {
  const g = await guard({ role: 'owner' });
  if (g.error) return g.error;

  try {
    const body = await request.json().catch(() => ({}));
    const username = String(body.username || '').trim().toLowerCase();
    const password = String(body.password || '');
    const role = body.role === 'owner' ? 'owner' : 'staff';

    if (!/^[a-z0-9._-]{3,32}$/.test(username)) return badRequest('INVALID_USERNAME');

    const pwProblem = passwordProblem(password);
    if (pwProblem) return badRequest(pwProblem);

    const user = await AdminUser.create({
      username,
      name: sanitize(body.name || '', 60),
      passwordHash: await hashPassword(password),
      role,
      active: true
    });

    return NextResponse.json({ user: user.toSafeJSON() }, { status: 201 });
  } catch (err) {
    if (err.code === 11000) return NextResponse.json({ error: 'USERNAME_TAKEN' }, { status: 409 });
    return serverError(err);
  }
}
