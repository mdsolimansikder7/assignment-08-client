import Skeleton from "@/components/shared/Skeleton";

export default function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm"
        >
          <div className="aspect-[16/10] w-full">
            <Skeleton className="h-full w-full rounded-none" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="mt-3 h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <div className="mt-auto pt-4">
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
