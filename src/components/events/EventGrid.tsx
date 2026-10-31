import type { CommunityEvent } from "@/types/event";
import EventCard from "@/components/events/EventCard";

export default function EventGrid({ events }: { events: CommunityEvent[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
