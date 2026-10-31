import Skeleton from "@/components/shared/Skeleton";
import EventGridSkeleton from "@/components/shared/EventGridSkeleton";

export default function RecentEventsSkeleton() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-72" />
        <Skeleton className="mt-3 h-4 w-80 max-w-full" />
        <div className="mt-8">
          <EventGridSkeleton />
        </div>
      </div>
    </section>
  );
}
