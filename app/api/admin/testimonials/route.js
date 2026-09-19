import { NextResponse } from 'next/server';
import Testimonial from '@/models/Testimonial';
import { guard, badRequest, serverError } from '@/lib/api-helpers';
import { buildTestimonialPayload } from '@/lib/product-payload';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const items = await Testimonial.find({}).sort({ sortOrder: 1, createdAt: -1 }).lean();
    return NextResponse.json({ items });
  } catch (err) {
    return serverError(err);
  }
}

export async function POST(request) {
  const g = await guard();
  if (g.error) return g.error;

  try {
    const payload = buildTestimonialPayload(await request.json());

    if (!payload.name) return badRequest('NAME_REQUIRED');
    if (!payload.text.hi && !payload.text.en) return badRequest('TEXT_REQUIRED');

    const item = await Testimonial.create(payload);
    return NextResponse.json({ item }, { status: 201 });
  } catch (err) {
    return serverError(err);
  }
}
