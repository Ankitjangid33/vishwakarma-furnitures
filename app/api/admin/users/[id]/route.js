import { NextResponse } from 'next/server';
import AdminUser from '@/models/AdminUser';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';
import { hashPassword, passwordProblem } from '@/lib/password';
import { sanitize } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Aakhri owner galti se hat/band na ho jaaye */
async function isLastOwner(user) {
  if (user.role !== 'owner') return false;
  const owners = await AdminUser.countDocuments({ role: 'owner', active: true });
  return owners <= 1;
}

/** Naam, role, active status ya password badalna */
export async function PATCH(request, { params }) {
  const g = await guard({ role: 'owner' });
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const user = await AdminUser.findById(id);
    if (!user) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    const body = await request.json().catch(() => ({}));

    if (typeof body.name === 'string') user.name = sanitize(body.name, 60);

    if (body.role === 'owner' || body.role === 'staff') {
      if (body.role !== user.role && (await isLastOwner(user))) return badRequest('LAST_OWNER');
      user.role = body.role;
    }

    if (typeof body.active === 'boolean') {
      if (!body.active && (await isLastOwner(user))) return badRequest('LAST_OWNER');
      user.active = body.active;
    }

    if (body.password) {
      const pwProblem = passwordProblem(body.password);
      if (pwProblem) return badRequest(pwProblem);
      user.passwordHash = await hashPassword(body.password);
      // password badla → is user ke purane sessions khatam
      user.passwordChangedAt = new Date();
    }

    await user.save();
    return NextResponse.json({ user: user.toSafeJSON() });
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(request, { params }) {
  const g = await guard({ role: 'owner' });
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  // khud ko nahi hata sakte
  if (String(g.user._id) === id) return badRequest('CANNOT_DELETE_SELF');

  try {
    const user = await AdminUser.findById(id);
    if (!user) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    if (await isLastOwner(user)) return badRequest('LAST_OWNER');

    await user.deleteOne();
    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
