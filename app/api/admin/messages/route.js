import { NextResponse } from 'next/server';
import Message from '@/models/Message';
import { guard, serverError } from '@/lib/api-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const messages = await Message.find({}).sort({ createdAt: -1 }).limit(300).lean();
    return NextResponse.json({ messages });
  } catch (err) {
    return serverError(err);
  }
}
