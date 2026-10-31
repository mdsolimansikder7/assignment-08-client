import Spinner from "@/components/shared/Spinner";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Spinner />
    </div>
  );
}
