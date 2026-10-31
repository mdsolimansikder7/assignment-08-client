import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/shared/Button";

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="font-heading text-6xl font-bold text-heading">404</h1>
      <p className="mt-4 text-muted">Sorry, the page you are looking for does not exist.</p>
      <div className="mt-8">
        <Link href="/">
          <Button variant="primary">Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
