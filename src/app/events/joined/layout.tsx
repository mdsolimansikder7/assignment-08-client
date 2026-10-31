import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Joined Events",
  description: "Events you have joined.",
};

export default function JoinedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
