import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getEvents } from "@/lib/api";
import { getUpcomingEventsFromDb } from "@/lib/events-db";
import type { CommunityEvent } from "@/types/event";
import EventFilters from "@/components/events/EventFilters";
import EventGrid from "@/components/events/EventGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import EventGridSkeleton from "@/components/shared/EventGridSkeleton";
import Button from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Discover community events happening soon near you.",
};

const ALLOWED = ["Cleanup", "Plantation", "Donation", "Food Drive", "Health Camp", "Education"];

async function EventsContent({
  searchParams,
}: {
  searchParams: { type?: string; search?: string; sort?: string };
}) {
  const type = searchParams.type && ALLOWED.includes(searchParams.type) ? searchParams.type : undefined;
  const search = searchParams.search || undefined;

  let events: CommunityEvent[] = [];
  let loadError = false;

  try {
    events = await getEvents({ type, search });
  } catch {
    try {
      events = await getUpcomingEventsFromDb(100);
    } catch {
      loadError = true;
    }
  }

  if (loadError && events.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Upcoming Events" subtitle="Discover community events happening soon near you." />
        <EventFilters currentType={type || ""} currentSearch={search || ""} count={0} />
        <EmptyState title="We could not load events." description="Please try again later." />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading title="Upcoming Events" subtitle="Discover community events happening soon near you." />
      <EventFilters currentType={type || ""} currentSearch={search || ""} count={events.length} />
      <div className="mt-8">
        {events.length === 0 ? (
          <EmptyState title="No events found. Try another category or search." description="">
            <div className="mt-4">
              <Link href="/events">
                <Button variant="outline">Clear filters</Button>
              </Link>
            </div>
          </EmptyState>
        ) : (
          <EventGrid events={events} />
        )}
      </div>
    </div>
  );
}

export default async function UpcomingEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; search?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  return (
    <Suspense fallback={<EventGridSkeleton />}>
      <EventsContent searchParams={sp} />
    </Suspense>
  );
}
