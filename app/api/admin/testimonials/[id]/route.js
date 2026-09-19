import { NextResponse } from 'next/server';
import Testimonial from '@/models/Testimonial';
import { guard, badRequest, serverError, isObjectId } from '@/lib/api-helpers';
import { buildTestimonialPayload } from '@/lib/product-payload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  const g = await guard();
  if (g.error) return g.error;

  const { id } = await params;
  if (!isObjectId(id)) return badRequest('INVALID_ID');

  try {
    const payload = buildTestimonialPayload(await request.json());
    if (!payload.name) return badRequest('NAME_REQUIRED');
    if (!payload.text.hi && !payload.text.en) return badRequest('TEXT_REQUIRED');

    const item = await Testimonial.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
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
    const item = await Testimonial.findByIdAndDelete(id);
    if (!item) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return serverError(err);
  }
}
