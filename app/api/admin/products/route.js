import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { guard, badRequest, serverError } from '@/lib/api-helpers';
import { buildProductPayload } from '@/lib/product-payload';
import { CATEGORY_IDS } from '@/lib/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET — admin ke liye saare products (band kiye hue bhi) */
export async function GET() {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const products = await Product.find({}).sort({ category: 1, sortOrder: 1 }).lean();
    return NextResponse.json({ products });
  } catch (err) {
    return serverError(err);
  }
}

/** POST — naya product jodna */
export async function POST(request) {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const payload = buildProductPayload(await request.json());

    if (!payload.slug) return badRequest('SLUG_REQUIRED');
    if (!payload.name.hi && !payload.name.en) return badRequest('NAME_REQUIRED');
    if (!CATEGORY_IDS.includes(payload.category)) return badRequest('INVALID_CATEGORY');

    const exists = await Product.findOne({ slug: payload.slug });
    if (exists) return badRequest('SLUG_EXISTS');

    const product = await Product.create(payload);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}
