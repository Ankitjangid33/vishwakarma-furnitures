import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';
import { isValidName, isValidPhone, isValidEmail, cleanPhone, sanitize, rateLimit, clientIp } from '@/lib/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/contact — contact form ka sandesh */
export async function POST(request) {
  try {
    const ip = clientIp(request);
    const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
    if (!limit.ok) {
      return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = sanitize(body.name, 80);
    const phone = cleanPhone(body.phone);
    const email = sanitize(body.email, 120).toLowerCase();
    const message = sanitize(body.message, 2000);

    if (!isValidName(name)) return NextResponse.json({ error: 'INVALID_NAME' }, { status: 400 });
    if (!isValidPhone(phone)) return NextResponse.json({ error: 'INVALID_PHONE' }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: 'INVALID_EMAIL' }, { status: 400 });
    if (message.length < 3) return NextResponse.json({ error: 'INVALID_MESSAGE' }, { status: 400 });

    const payload = {
      name,
      phone,
      email,
      subject: sanitize(body.subject, 150),
      message,
      language: body.language === 'en' ? 'en' : 'hi'
    };

    try {
      await connectDB();
      await Message.create(payload);
      return NextResponse.json({ ok: true, saved: true });
    } catch (dbErr) {
      console.error('[vf] message save failed:', dbErr.message);
      return NextResponse.json({ ok: true, saved: false });
    }
  } catch (err) {
    console.error('[vf] contact error:', err);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}
