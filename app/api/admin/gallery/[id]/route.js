import { NextResponse } from 'next/server';
import GalleryItem from '@/models/GalleryItem';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';
import { buildGalleryPayload } from '@/lib/product-payload';
import { CATEGORY_IDS } from '@/lib/categories';
import { deleteImage, isCloudinaryConfigured } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const payload = buildGalleryPayload(await request.json());
    if (!CATEGORY_IDS.includes(payload.category)) return badRequest('INVALID_CATEGORY');

    const item = await GalleryItem.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!item) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    return NextResponse.json({ item });
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
    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    if (isCloudinaryConfigured() && item.image?.publicId) {
      await deleteImage(item.image.publicId).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
