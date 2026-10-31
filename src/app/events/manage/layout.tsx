import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Events",
  description: "Manage the events you created.",
};

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
