import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import GalleryItem from '@/models/GalleryItem';
import Order from '@/models/Order';
import Message from '@/models/Message';
import { guard, serverError } from '@/lib/api-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Dashboard ke numbers */
export async function GET() {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const [products, activeProducts, gallery, orders, newOrders, messages, newMessages, recentOrders] =
      await Promise.all([
        Product.countDocuments({}),
        Product.countDocuments({ active: true }),
        GalleryItem.countDocuments({}),
        Order.countDocuments({}),
        Order.countDocuments({ status: 'new' }),
        Message.countDocuments({}),
        Message.countDocuments({ status: 'new' }),
        Order.find({}).sort({ createdAt: -1 }).limit(5).lean()
      ]);

    return NextResponse.json({
      stats: { products, activeProducts, gallery, orders, newOrders, messages, newMessages },
      recentOrders
    });
  } catch (err) {
    return serverError(err);
  }
}
