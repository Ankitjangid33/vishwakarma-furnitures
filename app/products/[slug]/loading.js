import { Skeleton, SkeletonRegion } from '@/components/Skeleton';

export default function Loading() {
  return (
    <SkeletonRegion>
      <section className="container-page py-6">
        <Skeleton className="h-4 w-64 max-w-full" />

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
            <div className="mt-3 flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-20 shrink-0 rounded-xl" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-10 w-3/4" />
            <Skeleton className="mt-5 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <Skeleton className="mt-6 h-9 w-48" />
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Skeleton className="h-12 w-44 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </SkeletonRegion>
  );
}
