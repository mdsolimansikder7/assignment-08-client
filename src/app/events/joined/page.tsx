"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJoinedEvents } from "@/lib/api";
import type { CommunityEvent } from "@/types/event";
import EventGrid from "@/components/events/EventGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import EventGridSkeleton from "@/components/shared/EventGridSkeleton";
import LoginRequired from "@/components/shared/LoginRequired";

export default function JoinedEventsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [events, setEvents] = useState<CommunityEvent[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getJoinedEvents();
        if (active) {
          const sorted = [...data].sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
          setEvents(sorted);
        }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <LoginRequired>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Joined Events"
          
        />
        {loading ? (
          <EventGridSkeleton />
        ) : loadError ? (
          <EmptyState
            title="We could not load events."
            description="Please try again later."
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="You haven't joined any events yet"
            description="Browse upcoming events and join one today."
          >
            <div className="mt-4">
              <Link href="/events">
                <Button variant="primary">Explore Events</Button>
              </Link>
            </div>
          </EmptyState>
        ) : (
          <EventGrid events={events} />
        )}
      </div>
    </LoginRequired>
  );
}
