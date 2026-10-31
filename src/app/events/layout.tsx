import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Events",
  description: "Discover upcoming community events near you.",
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
