/**
 * Data aane tak dikhne wale khaali dhaanche (skeleton).
 * Har ek asli component ke naap-jokh jaisa hi hai, taaki data aane par
 * page upar-neeche na uchhle.
 *
 * Server aur client dono jagah chalta hai — koi hook nahi.
 */

export function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`skeleton ${className}`} />;
}

/** Screen reader ko batata hai ki kuch load ho raha hai */
export function SkeletonRegion({ children, className = '' }) {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className={className}>
      <span className="sr-only">Loading…</span>
      {children}
    </div>
  );
}

const repeat = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------------- Website ---------------- */

export function PageHeaderSkeleton() {
  return (
    <section className="border-b border-wood-100 bg-gradient-to-b from-wood-50 to-cream">
      <div className="container-page py-10 md:py-14">
        <Skeleton className="h-9 w-64 max-w-full md:h-11" />
        <Skeleton className="mt-4 h-4 w-full max-w-xl" />
        <Skeleton className="mt-2 h-4 w-2/3 max-w-md" />
      </div>
    </section>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card flex flex-col">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="flex flex-1 flex-col p-5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-3 h-3.5 w-full" />
        <Skeleton className="mt-2 h-3.5 w-5/6" />
        <div className="mb-4 mt-4 flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="mt-auto flex flex-col gap-3 border-t border-wood-100 pt-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8, className = 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' }) {
  return (
    <div className={`grid gap-5 ${className}`}>
      {repeat(count).map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ChipRowSkeleton({ count = 6 }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-hidden px-4 pb-1">
      {repeat(count).map((i) => (
        <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-full" />
      ))}
    </div>
  );
}

export function GalleryGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repeat(count).map((i) => (
        <Skeleton key={i} className="aspect-[4/3] w-full rounded-2xl" />
      ))}
    </div>
  );
}

/* ---------------- Admin ---------------- */

/** Naam + chhoti line + dahine taraf badge — orders, messages, users jaisi list */
function ListRowSkeleton({ withThumb, boxed }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 p-4 ${boxed ? 'card' : ''}`}>
      {withThumb && <Skeleton className="h-16 w-20 shrink-0 rounded-xl" />}
      <div className="min-w-[10rem] flex-1">
        <Skeleton className="h-4 w-48 max-w-full" />
        <Skeleton className="mt-2 h-3 w-64 max-w-full" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-16 rounded-full" />
    </div>
  );
}

export function ListSkeleton({ rows = 5, withThumb = false, divided = false }) {
  return (
    <div className={divided ? 'card divide-y divide-wood-100' : 'space-y-3'}>
      {repeat(rows).map((i) => (
        <ListRowSkeleton key={i} withThumb={withThumb} boxed={!divided} />
      ))}
    </div>
  );
}

/** Photo wale admin cards (gallery) */
export function MediaCardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repeat(count).map((i) => (
        <div key={i} className="card overflow-hidden">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/2" />
            <Skeleton className="mt-2 h-3 w-3/4" />
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Text wale admin cards (reviews) */
export function TextCardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repeat(count).map((i) => (
        <div key={i} className="card p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-3.5 w-full" />
          <Skeleton className="mt-2 h-3.5 w-full" />
          <Skeleton className="mt-2 h-3.5 w-2/3" />
          <Skeleton className="mt-5 h-4 w-32" />
          <Skeleton className="mt-2 h-3 w-24" />
          <div className="mt-3 flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Dashboard ke 4 ginti wale dabbe + recent orders */
export function StatCardsSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {repeat(count).map((i) => (
        <div key={i} className="card p-5">
          <Skeleton className="h-11 w-11 rounded-2xl" />
          <Skeleton className="mt-4 h-8 w-14" />
          <Skeleton className="mt-2 h-4 w-28" />
        </div>
      ))}
    </div>
  );
}

/** Form wale card (account page) */
export function FormCardSkeleton({ fields = 1 }) {
  return (
    <div className="card p-5">
      <Skeleton className="h-5 w-32" />
      {repeat(fields).map((i) => (
        <div key={i} className="mt-4">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="mt-2 h-11 w-full rounded-xl" />
        </div>
      ))}
      <Skeleton className="mt-4 h-10 w-24 rounded-full" />
    </div>
  );
}
