import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { getEvent } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import JoinButton from "@/components/events/JoinButton";
import EventDetailsSkeleton from "@/components/events/EventDetailsSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await getEvent(id);
    if (!event) {
      return { title: "Event Not Found", description: "The requested event does not exist." };
    }
    return {
      title: event.title,
      description: event.description,
    };
  } catch {
    return { title: "Event Details", description: "View community event details." };
  }
}

async function EventDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let event = null;
  let loadError = false;
  try {
    event = await getEvent(id);
  } catch {
    loadError = true;
  }

  if (loadError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="We could not load events."
          description="Please try again later."
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <EmptyState
          title="Event not found"
          description="The event you are looking for does not exist or has been removed."
        />
        <div className="mt-6 text-center">
          <Link href="/events">
            <Button variant="primary">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover dark:brightness-90"
            sizes="100vw"
            priority
          />
        </div>
        <div className="p-6 md:p-8">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {event.eventType}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
            {event.title}
          </h1>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {formatDate(event.eventDate)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {event.location}
            </span>
            {event.creatorName && (
              <span className="text-muted">Organized by {event.creatorName}</span>
            )}
          </div>
          <p className="mt-6 leading-relaxed text-foreground/80">{event.description}</p>
          <div className="mt-8">
            <JoinButton eventId={event._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}
