import { NextResponse } from 'next/server';
import Message from '@/models/Message';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const { status } = await request.json();
    if (!['new', 'read', 'replied'].includes(status)) return badRequest('INVALID_STATUS');

    const message = await Message.findByIdAndUpdate(id, { status }, { new: true });
    if (!message) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    return NextResponse.json({ message });
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
