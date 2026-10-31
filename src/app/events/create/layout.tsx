import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Event",
  description: "Create a new community event.",
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
