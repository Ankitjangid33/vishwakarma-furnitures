import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Order, { makeOrderNo } from '@/models/Order';
import { getProductBySlug } from '@/lib/products';
import { isValidName, isValidPhone, isValidEmail, cleanPhone, sanitize, rateLimit, clientIp } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/orders — website se order book karna
 * Daam client se nahi lete — server par products se dobara nikalte hain.
 */
export async function POST(request) {
  try {
    const ip = clientIp(request);
    const limit = rateLimit(`order:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // honeypot — bots ise bhar dete hain, insaan nahi
    if (body.website) {
      return NextResponse.json({ ok: true, orderNo: 'VF-000000-0000' });
    }

    const name = sanitize(body?.customer?.name, 80);
    const phone = cleanPhone(body?.customer?.phone);
    const email = sanitize(body?.customer?.email, 120).toLowerCase();

    if (!isValidName(name)) {
      return NextResponse.json({ error: 'INVALID_NAME' }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'INVALID_PHONE' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 });
    }

    const rawItems = Array.isArray(body.items) ? body.items.slice(0, 40) : [];
    if (rawItems.length === 0) {
      return NextResponse.json({ error: 'EMPTY_ORDER' }, { status: 400 });
    }

    // har item ka asli daam server par nikalte hain
    const items = [];
    let estimatedTotal = 0;
    let hasQuoteItems = false;

    for (const raw of rawItems) {
      const slug = sanitize(raw?.slug, 120);
      if (!slug) continue;

      const product = await getProductBySlug(slug);
      if (!product) continue;

      const qty = Math.max(1, Math.min(99, Number(raw.qty) || 1));
      const price = product.priceType === 'quote' ? 0 : Number(product.price) || 0;

      if (!price) hasQuoteItems = true;
      estimatedTotal += price * qty;

      items.push({
        productId: /^[a-f\d]{24}$/i.test(String(product._id)) ? product._id : undefined,
        slug: product.slug,
        name: { en: product.name?.en || '', hi: product.name?.hi || '' },
        price,
        priceType: product.priceType || 'fixed',
        unit: product.unit || 'piece',
        qty
      });
    }

    if (items.length === 0) {
      return NextResponse.json({ error: 'EMPTY_ORDER' }, { status: 400 });
    }

    const payload = {
      orderNo: makeOrderNo(),
      customer: {
        name,
        phone,
        email,
        address: sanitize(body?.customer?.address, 300),
        city: sanitize(body?.customer?.city, 80),
        pincode: sanitize(body?.customer?.pincode, 10)
      },
      items,
      estimatedTotal,
      hasQuoteItems,
      note: sanitize(body.note, 1000),
      visitRequested: Boolean(body.visitRequested),
      language: body.language === 'en' ? 'en' : 'hi',
      status: 'new'
    };

    try {
      await connectDB();
      const order = await Order.create(payload);
      return NextResponse.json({ ok: true, orderNo: order.orderNo, saved: true });
    } catch (dbErr) {
      // Database abhi set nahi hai — order kho na jaaye, isliye ok bhejte hain
      // taaki customer WhatsApp par bhej sake.
      console.error('[vf] order save failed:', dbErr.message);
      return NextResponse.json({ ok: true, orderNo: payload.orderNo, saved: false });
    }
  } catch (err) {
    console.error('[vf] order error:', err);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
