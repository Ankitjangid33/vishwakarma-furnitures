import { NextResponse } from 'next/server';
import Order, { ORDER_STATUSES } from '@/models/Order';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';
import { sanitize } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** PATCH — order ka status ya note badalna */
export async function PATCH(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const body = await request.json();
    const update = {};

    if (body.status) {
      if (!ORDER_STATUSES.includes(body.status)) return badRequest('INVALID_STATUS');
      update.status = body.status;
    }
    if (body.adminNote !== undefined) update.adminNote = sanitize(body.adminNote, 1000);

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    return NextResponse.json({ order });
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
    const order = await Order.findByIdAndDelete(id);
    if (!order) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
