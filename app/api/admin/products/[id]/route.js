import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';
import { buildProductPayload } from '@/lib/product-payload';
import { CATEGORY_IDS } from '@/lib/categories';
import { deleteImage, isCloudinaryConfigured } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** PUT — product badalna */
export async function PUT(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const payload = buildProductPayload(await request.json());

    if (!payload.slug) return badRequest('SLUG_REQUIRED');
    if (!CATEGORY_IDS.includes(payload.category)) return badRequest('INVALID_CATEGORY');

    const clash = await Product.findOne({ slug: payload.slug, _id: { $ne: id } });
    if (clash) return badRequest('SLUG_EXISTS');

    const product = await Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!product) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    return NextResponse.json({ product });
  } catch (err) {
    return serverError(err);
  }
}

/** PATCH — sirf ek-do cheezein badalni ho (jaise active on/off) */
export async function PATCH(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const body = await request.json();
    const update = {};

    if (typeof body.active === 'boolean') update.active = body.active;
    if (typeof body.featured === 'boolean') update.featured = body.featured;
    if (body.sortOrder !== undefined) update.sortOrder = Number(body.sortOrder) || 100;

    const product = await Product.findByIdAndUpdate(id, update, { new: true });
    if (!product) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    return NextResponse.json({ product });
  } catch (err) {
    return serverError(err);
  }
}

/** DELETE — product aur uski photos hatana */
export async function DELETE(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

    // Cloudinary se photos bhi hata dein
    if (isCloudinaryConfigured()) {
      for (const img of product.images || []) {
        if (img.publicId) await deleteImage(img.publicId).catch(() => {});
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
