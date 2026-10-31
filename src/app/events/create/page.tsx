"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createEvent } from "@/lib/api";
import type { FormValues } from "@/components/events/EventForm";
import EventForm from "@/components/events/EventForm";
import SectionHeading from "@/components/shared/SectionHeading";
import LoginRequired from "@/components/shared/LoginRequired";

export default function CreateEventPage() {
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    await createEvent({
      title: values.title,
      description: values.description,
      eventType: values.eventType,
      thumbnail: values.thumbnail,
      location: values.location,
      eventDate: values.eventDate,
    });
    toast.success("Event created successfully!");
    router.push("/events");
  };

  return (
    <LoginRequired>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Create Event" subtitle="Set up a new community event." />
        <EventForm submitLabel="Create Event" onSubmit={handleSubmit} />
      </div>
    </LoginRequired>
  );
}
