"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, X } from "lucide-react";
import type { CommunityEvent } from "@/types/event";
import EventGrid from "@/components/events/EventGrid";
import Button from "@/components/shared/Button";
import EmptyState from "@/components/shared/EmptyState";

type SortOption = "date-asc" | "date-desc" | "title-asc" | "title-desc";

export default function UpcomingEventsExplorer({
  initialEvents,
}: {
  initialEvents: CommunityEvent[];
}) {
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date-asc");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedQuery(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSubmittedQuery("");
  };

  const filteredEvents = useMemo(() => {
    if (!submittedQuery) return initialEvents;
    const query = submittedQuery.toLowerCase();
    return initialEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.eventType.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query)
    );
  }, [initialEvents, submittedQuery]);

  const sortedEvents = useMemo(() => {
    const list = [...filteredEvents];
    switch (sortBy) {
      case "date-asc":
        return list.sort((a, b) => a.eventDate.localeCompare(b.eventDate));
      case "date-desc":
        return list.sort((a, b) => b.eventDate.localeCompare(a.eventDate));
      case "title-asc":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return list.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return list;
    }
  }, [filteredEvents, sortBy]);

  if (initialEvents.length === 0) {
    return (
      <EmptyState title="No upcoming events yet. Be the first to create one.">
        <div className="mt-4">
          <Link href="/events/create">
            <Button variant="primary">Create Event</Button>
          </Link>
        </div>
      </EmptyState>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (!e.target.value.trim() && submittedQuery) {
                  setSubmittedQuery("");
                }
              }}
              placeholder="Search by title, location, or cause..."
              className="w-full rounded-xl border border-border bg-input pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                aria-label="Clear search text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button variant="primary" type="submit" className="shrink-0">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center gap-1.5 text-sm text-muted">
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-xl border border-border bg-input px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            aria-label="Sort upcoming events"
          >
            <option value="date-asc">Date: Nearest First</option>
            <option value="date-desc">Date: Furthest First</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>
      </div>

      {submittedQuery && (
        <div className="mb-6 flex items-center justify-between rounded-xl bg-card border border-border px-4 py-2.5 text-sm">
          <p className="text-muted">
            Showing results for <span className="font-semibold text-foreground">&quot;{submittedQuery}&quot;</span> ({sortedEvents.length} found)
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="text-xs font-medium text-accent hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {sortedEvents.length === 0 ? (
        <EmptyState
          title="No events match your search"
          description={`We couldn't find any events matching "${submittedQuery}". Try different keywords.`}
        >
          <div className="mt-4">
            <Button variant="outline" onClick={handleClearSearch}>
              Clear Search
            </Button>
          </div>
        </EmptyState>
      ) : (
        <EventGrid events={sortedEvents} />
      )}
    </div>
  );
}
