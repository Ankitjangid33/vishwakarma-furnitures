import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-[family-name:var(--font-display)] text-6xl font-bold text-wood-200">404</p>
        <h1 className="mt-4 text-2xl text-wood-900">यह पेज नहीं मिला</h1>
        <p className="mt-2 text-muted">This page could not be found.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            होम पेज / Home
          </Link>
          <Link href="/products" className="btn btn-outline">
            सामान देखें / Products
          </Link>
        </div>
      </div>
    </section>
  );
}
