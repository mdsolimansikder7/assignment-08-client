// Loading skeleton placeholder with a soft pulse.
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-skeleton ${className}`}
    />
  );
}
