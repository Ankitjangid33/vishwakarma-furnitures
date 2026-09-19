import { SkeletonRegion, PageHeaderSkeleton, ChipRowSkeleton, GalleryGridSkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <SkeletonRegion>
      <PageHeaderSkeleton />
      <section className="container-page py-10">
        <div className="mb-6">
          <ChipRowSkeleton count={8} />
        </div>
        <GalleryGridSkeleton count={9} />
      </section>
    </SkeletonRegion>
  );
}
