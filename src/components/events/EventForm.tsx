// Reusable event form used by Create and Edit pages.
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { EVENT_TYPES } from "@/lib/constants";
import { todayString } from "@/lib/utils";
import type { EventType } from "@/types/event";
import Button from "@/components/shared/Button";

export type FormValues = {
  title: string;
  description: string;
  eventType: EventType;
  thumbnail: string;
  location: string;
  eventDate: string;
};

type EventFormProps = {
  initialValues?: Partial<FormValues>;
  submitLabel?: string;
  onSubmit: (values: FormValues) => Promise<void>;
};

export default function EventForm({
  initialValues,
  submitLabel = "Submit",
  onSubmit,
}: EventFormProps) {
  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    eventType: initialValues?.eventType ?? "Cleanup",
    thumbnail: initialValues?.thumbnail ?? "",
    location: initialValues?.location ?? "",
    eventDate: initialValues?.eventDate ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.title.trim()) newErrors.title = "Title is required.";
    if (!values.description.trim()) newErrors.description = "Description is required.";
    if (!values.location.trim()) newErrors.location = "Location is required.";
    if (!values.eventDate) newErrors.eventDate = "Event date is required.";
    else if (values.eventDate < todayString()) newErrors.eventDate = "Event date cannot be in the past.";
    if (!values.thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerErrors([]);
    try {
      await onSubmit(values);
    } catch (err) {
      const apiErr = err as { message?: string; errors?: string[] };
      const msgs =
        Array.isArray(apiErr?.errors) && apiErr.errors.length > 0
          ? apiErr.errors
          : [apiErr?.message || "Something went wrong. Please try again."];
      setServerErrors(msgs);
      toast.error(msgs[0]);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Title</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Event title"
          className={inputClass}
        />
        {errors.title && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
        <textarea
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the event"
          rows={4}
          className={inputClass}
        />
        {errors.description && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Event Type</label>
        <select
          value={values.eventType}
          onChange={(e) => handleChange("eventType", e.target.value)}
          className={inputClass}
        >
          {EVENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Thumbnail Image URL</label>
        <input
          type="url"
          value={values.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={inputClass}
        />
        {errors.thumbnail && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.thumbnail}</p>}
        <div className="mt-3">
          {values.thumbnail ? (
            <div className="relative aspect-[16/10] w-full max-w-sm overflow-hidden rounded-xl bg-background">
              <Image
                src={values.thumbnail}
                alt="Thumbnail preview"
                fill
                className="object-cover dark:brightness-90"
                sizes="400px"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] w-full max-w-sm items-center justify-center rounded-xl border border-dashed border-border bg-background text-sm text-muted">
              Thumbnail preview
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Location</label>
        <input
          type="text"
          value={values.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Event location"
          className={inputClass}
        />
        {errors.location && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.location}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Event Date</label>
        <input
          type="date"
          min={todayString()}
          value={values.eventDate}
          onChange={(e) => handleChange("eventDate", e.target.value)}
          className={inputClass}
        />
        {errors.eventDate && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.eventDate}</p>}
      </div>

      {serverErrors.length > 0 && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/60 dark:text-red-400">
          <ul className="list-disc pl-5">
            {serverErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <Button variant="primary" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
