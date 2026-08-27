import { NextResponse } from 'next/server';
import { currentUser } from './auth';
import { connectDB } from './db';

/**
 * Admin API routes ke liye common jaanch:
 * 1. database jud raha hai ya nahi
 * 2. login hai ya nahi (user DB se aata hai)
 * 3. zaroorat ho to role bhi (jaise users page sirf owner ke liye)
 *
 * Agar kuch galat ho to seedha response return karta hai.
 */
export async function guard({ role } = {}) {
  try {
    await connectDB();
  } catch (err) {
    return {
      error: NextResponse.json(
        { error: 'DB_NOT_CONNECTED', message: err.message },
        { status: 503 }
      )
    };
  }

  const user = await currentUser();
  if (!user) {
    return { error: NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 }) };
  }

  if (role && user.role !== role) {
    return { error: NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 }) };
  }

  return { ok: true, user };
}

export function badRequest(message = 'BAD_REQUEST') {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function serverError(err) {
  console.error('[vf] admin api error:', err);
  return NextResponse.json({ error: 'SERVER_ERROR', message: err.message }, { status: 500 });
}

export function isObjectId(v) {
  return /^[a-f\d]{24}$/i.test(String(v || ''));
}
