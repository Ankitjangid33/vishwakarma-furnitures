import { Skeleton, SkeletonRegion, PageHeaderSkeleton, ChipRowSkeleton, ProductGridSkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <SkeletonRegion>
      <PageHeaderSkeleton />
      <section className="container-page py-10">
        <Skeleton className="mb-5 h-12 w-full rounded-xl" />
        <div className="mb-3">
          <ChipRowSkeleton count={8} />
        </div>
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <ProductGridSkeleton count={8} />
      </section>
    </SkeletonRegion>
  );
}
