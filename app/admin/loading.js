import { Skeleton, SkeletonRegion, ListSkeleton } from '@/components/Skeleton';

/** Admin ke andar ek page se doosre par jaate waqt */
export default function Loading() {
  return (
    <SkeletonRegion>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-2 h-4 w-72 max-w-full" />
      <div className="mt-6">
        <ListSkeleton rows={5} />
      </div>
    </SkeletonRegion>
  );
}
