import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import { signUpload, deleteImage, isCloudinaryConfigured } from '@/lib/cloudinary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** POST /api/upload — browser ko Cloudinary upload ke liye signature deta hai */
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json({ error: 'CLOUDINARY_NOT_CONFIGURED' }, { status: 500 });
  }

  return NextResponse.json(signUpload());
}

/** DELETE /api/upload?publicId=... — Cloudinary se photo hatata hai */
export async function DELETE(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }

  const publicId = new URL(request.url).searchParams.get('publicId');
  if (!publicId) {
    return NextResponse.json({ error: 'MISSING_PUBLIC_ID' }, { status: 400 });
  }

  try {
    await deleteImage(publicId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[vf] cloudinary delete failed:', err.message);
    return NextResponse.json({ error: 'DELETE_FAILED' }, { status: 500 });
  }
}
