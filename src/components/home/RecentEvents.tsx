// Shows 6 recent upcoming events using MongoDB's .limit() operator, sorted by date.
import Link from "next/link";
import { getEvents } from "@/lib/api";
import { getUpcomingEventsFromDb } from "@/lib/events-db";
import type { CommunityEvent } from "@/types/event";
import EventGrid from "@/components/events/EventGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";
import EmptyState from "@/components/shared/EmptyState";

export default async function RecentEvents() {
  let events: CommunityEvent[] = [];
  let loadError = false;

  try {
    // 1. Fetch 6 upcoming events via backend API (which uses MongoDB .limit(6))
    events = await getEvents({ limit: 6 });
  } catch {
    // 2. Direct fallback to MongoDB using .limit(6) if backend API server is offline
    try {
      events = await getUpcomingEventsFromDb(6);
    } catch {
      loadError = true;
    }
  }

  // If API returned empty array, try direct DB query as fallback
  if (events.length === 0 && !loadError) {
    try {
      const dbEvents = await getUpcomingEventsFromDb(6);
      if (dbEvents.length > 0) {
        events = dbEvents;
      }
    } catch {
      // Ignore fallback error
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Recent Upcoming Events"
          subtitle="Explore the latest community events happening soon near you."
        />
        {loadError && events.length === 0 ? (
          <EmptyState
            title="We could not load events."
            description="Please try again later."
          />
        ) : events.length === 0 ? (
          <EmptyState title="No upcoming events yet. Be the first to create one.">
            <div className="mt-4">
              <Link href="/events/create">
                <Button variant="primary">Create Event</Button>
              </Link>
            </div>
          </EmptyState>
        ) : (
          <EventGrid events={events} />
        )}
        <div className="mt-10 text-center">
          <Link href="/events">
            <Button variant="primary">View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
