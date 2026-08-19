import { NextResponse } from 'next/server';
import GalleryItem from '@/models/GalleryItem';
import { guard, badRequest, serverError } from '@/lib/api-helpers';
import { buildGalleryPayload } from '@/lib/product-payload';
import { CATEGORY_IDS } from '@/lib/categories';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const items = await GalleryItem.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(request) {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const payload = buildGalleryPayload(await request.json());

    if (!payload.title.hi && !payload.title.en) return badRequest('TITLE_REQUIRED');
    if (!CATEGORY_IDS.includes(payload.category)) return badRequest('INVALID_CATEGORY');

    const item = await GalleryItem.create(payload);
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}
