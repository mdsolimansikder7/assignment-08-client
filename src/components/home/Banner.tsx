import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/Button";

export default function Banner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-lg dark:shadow-none dark:border dark:border-border min-h-[440px] md:min-h-[520px]">
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&h=900&fit=crop"
          alt="Community volunteers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(43,45,110,0.92)] via-[rgba(43,45,110,0.6)] to-transparent md:bg-gradient-to-r md:from-[rgba(43,45,110,0.92)] md:via-[rgba(43,45,110,0.5)] md:to-transparent md:[background-size:100%_100%]" />
        <div className="relative flex min-h-[440px] items-center md:min-h-[520px] px-6 py-12 sm:px-10">
          <div className="max-w-[560px] text-white">
            <span className="mb-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
              Community events near you
            </span>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-5xl">
              Serve your community. Build a brighter tomorrow.
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Discover and join local social-service events, or create your own and
              make a real impact where you live.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/events">
                <Button variant="primary">Explore Events</Button>
              </Link>
              <Link href="/events/create">
                <button className="rounded-xl border-[1.5px] border-white bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
                  Create an Event
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
