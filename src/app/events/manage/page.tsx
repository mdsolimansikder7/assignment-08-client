"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMyEvents, deleteEvent } from "@/lib/api";
import type { CommunityEvent } from "@/types/event";
import { formatDate } from "@/lib/utils";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import DeleteButton from "@/components/events/DeleteButton";
import Spinner from "@/components/shared/Spinner";
import LoginRequired from "@/components/shared/LoginRequired";

export default function ManageEventsPage() {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [events, setEvents] = useState<CommunityEvent[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await getMyEvents();
        if (active) setEvents(data);
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

  const handleDelete = async (id: string) => {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e._id !== id));
  };

  return (
    <LoginRequired>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Manage Events"
          subtitle="Update or delete the events you created."
        />

        {loading ? (
          <Spinner />
        ) : loadError ? (
          <EmptyState
            title="We could not load events."
            description="Please try again later."
          />
        ) : events.length === 0 ? (
          <EmptyState
            title="You haven't created any events yet"
            description="Create your first event to get started."
          >
            <div className="mt-4">
              <Link href="/events/create">
                <Button variant="primary">Create your first event</Button>
              </Link>
            </div>
          </EmptyState>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-muted">
                  <tr>
                    <th className="py-3 pr-4">Thumbnail</th>
                    <th className="py-3 pr-4">Title</th>
                    <th className="py-3 pr-4">Date</th>
                    <th className="py-3 pr-4">Type</th>
                    <th className="py-3 pr-4">Location</th>
                    <th className="py-3 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event._id} className="border-b border-border/50">
                      <td className="py-3 pr-4">
                        <div className="relative h-12 w-20 overflow-hidden rounded-lg">
                          <Image
                            src={event.thumbnail}
                            alt={event.title}
                            fill
                            className="object-cover dark:brightness-90"
                            sizes="80px"
                            unoptimized
                          />
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium text-foreground">{event.title}</td>
                      <td className="py-3 pr-4 text-muted">{formatDate(event.eventDate)}</td>
                      <td className="py-3 pr-4 text-muted">{event.eventType}</td>
                      <td className="py-3 pr-4 text-muted">{event.location}</td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <Link href={`/events/manage/${event._id}/edit`}>
                            <Button variant="outline">Update</Button>
                          </Link>
                          <DeleteButton onDelete={() => handleDelete(event._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {events.map((event) => (
                <div key={event._id} className="rounded-2xl bg-card p-4 shadow-sm">
                  <div className="flex gap-3">
                    <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        className="object-cover dark:brightness-90"
                        sizes="96px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground">{event.title}</h3>
                      <p className="text-xs text-muted">{formatDate(event.eventDate)}</p>
                      <p className="text-xs text-muted">{event.eventType}</p>
                      <p className="text-xs text-muted">{event.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Link href={`/events/manage/${event._id}/edit`}>
                      <Button variant="outline">Update</Button>
                    </Link>
                    <DeleteButton onDelete={() => handleDelete(event._id)} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </LoginRequired>
  );
}
