import { SkeletonRegion, PageHeaderSkeleton, ProductGridSkeleton } from '@/components/Skeleton';

/** Koi bhi page jiska apna loading.js nahi — upar heading, niche cards */
export default function Loading() {
  return (
    <SkeletonRegion>
      <PageHeaderSkeleton />
      <section className="container-page py-10">
        <ProductGridSkeleton count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
      </section>
    </SkeletonRegion>
  );
}
