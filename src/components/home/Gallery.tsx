import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Gallery() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Our Community in Action" subtitle="Moments from events across the city." />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY_IMAGES.map((src, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`Community service photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105 dark:brightness-90"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
