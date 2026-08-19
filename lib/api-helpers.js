import { NextResponse } from 'next/server';
import { isAdmin } from './auth';
import { connectDB } from './db';

/**
 * Admin API routes ke liye common jaanch:
 * 1. login hai ya nahi
 * 2. database jud raha hai ya nahi
 *
 * Agar kuch galat ho to seedha response return karta hai.
 */
export async function guard() {
  if (!(await isAdmin())) {
    return { error: NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 }) };
  }

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

  return { ok: true };
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
