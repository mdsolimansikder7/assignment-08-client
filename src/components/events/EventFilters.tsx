"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/shared/Button";

const TYPES = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Drive",
  "Health Camp",
  "Education",
] as const;

export default function EventFilters({
  currentType,
  currentSearch,
  count,
}: {
  currentType: string;
  currentSearch: string;
  count: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);

  function buildUrl(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === "") params.delete(k);
      else params.set(k, v);
    }
    params.delete("sort");
    const qs = params.toString();
    router.push(qs ? `/events?${qs}` : "/events");
  }

  function selectType(type: string) {
    buildUrl({ type: type === "All" ? null : type });
  }

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    buildUrl({ search: searchInput.trim() || null });
  }

  const activeType = currentType || "All";

  return (
    <div className="mt-8">
      <form onSubmit={submitSearch} className="mx-auto flex max-w-2xl items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title, location, or cause..."
            className="w-full rounded-xl border border-border bg-input pl-10 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
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

      <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => selectType(t)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                activeType === t
                  ? "border-accent bg-accent text-white"
                  : "border-primary text-primary hover:bg-primary/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted">{count} {count === 1 ? "event" : "events"} found</span>
      </div>
    </div>
  );
}
