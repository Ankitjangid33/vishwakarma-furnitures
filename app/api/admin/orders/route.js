import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import { guard, serverError } from '@/lib/api-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/admin/orders?status=new — website se aaye orders */
export async function GET(request) {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const status = new URL(request.url).searchParams.get('status');
    const query = status && status !== 'all' ? { status } : {};

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(300).lean();
    return NextResponse.json({ orders });
  } catch (err) {
    return serverError(err);
  }
}
