"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getEvent, updateEvent } from "@/lib/api";
import type { CommunityEvent } from "@/types/event";
import type { EventInput } from "@/lib/api";
import EventForm, { type FormValues } from "@/components/events/EventForm";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import Button from "@/components/shared/Button";
import Spinner from "@/components/shared/Spinner";
import LoginRequired from "@/components/shared/LoginRequired";
import toast from "react-hot-toast";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [event, setEvent] = useState<CommunityEvent | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!id) return;
      try {
        const data = await getEvent(id);
        if (!active) return;
        if (!data) setNotFound(true);
        else setEvent(data);
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const handleSubmit = async (values: FormValues) => {
    const payload: EventInput = {
      title: values.title,
      description: values.description,
      eventType: values.eventType,
      thumbnail: values.thumbnail,
      location: values.location,
      eventDate: values.eventDate,
    };
    await updateEvent(id, payload);
    toast.success("Event updated successfully!");
    router.push("/events/manage");
  };

  return (
    <LoginRequired>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Edit Event" subtitle="Update the event details." />

        {loading ? (
          <Spinner />
        ) : loadError ? (
          <EmptyState
            title="We could not load events."
            description="Please try again later."
          />
        ) : notFound || !event ? (
          <>
            <EmptyState
              title="Event not found"
              description="The event you want to edit does not exist."
            />
            <div className="mt-6 text-center">
              <Link href="/events/manage">
                <Button variant="primary">Back to Manage</Button>
              </Link>
            </div>
          </>
        ) : (
          <EventForm
            initialValues={{
              title: event.title,
              description: event.description,
              eventType: event.eventType,
              thumbnail: event.thumbnail,
              location: event.location,
              eventDate: event.eventDate,
            }}
            submitLabel="Update Event"
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </LoginRequired>
  );
}
