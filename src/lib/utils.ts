// Shared helpers.
export { cn } from "cn";

// Format a "YYYY-MM-DD" date for display.
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Today's date as "YYYY-MM-DD" (for date input min).
export function todayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Sort events by date (nearest first).
export function sortByDate<T extends { eventDate: string }>(events: T[]): T[] {
  return [...events].sort((a, b) => (a.eventDate < b.eventDate ? -1 : 1));
}
