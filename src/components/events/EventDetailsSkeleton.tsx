import Skeleton from "@/components/shared/Skeleton";

export default function EventDetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        <Skeleton className="aspect-[16/9] w-full rounded-none" />
        <div className="p-6 md:p-8">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="mt-4 h-9 w-2/3" />
          <div className="mt-4 flex flex-col gap-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="mt-6 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
          <div className="mt-8">
            <Skeleton className="h-11 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
