import { NextResponse } from 'next/server';
import { currentUser } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Abhi kaun login hai — admin UI isse apna naam/role dikhata hai */
export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  return NextResponse.json({ user: user.toSafeJSON() });
}
