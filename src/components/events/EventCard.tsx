// Event card with equal size, clamped text, and a View Event button.
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import type { CommunityEvent } from "@/types/event";
import { formatDate } from "@/lib/utils";
import Button from "@/components/shared/Button";

export default function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-cover dark:brightness-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {event.eventType}
        </span>
        <h3 className="mt-3 line-clamp-2 font-heading text-lg font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{event.description}</p>
        <div className="mt-3 flex flex-col gap-1 text-sm text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {event.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formatDate(event.eventDate)}
          </span>
        </div>
        <div className="mt-auto pt-4">
          <Link href={`/events/${event._id}`}>
            <Button variant="outline">View Event</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
