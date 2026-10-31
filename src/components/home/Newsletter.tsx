"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/shared/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading
          title="Stay in the Loop"
          subtitle="Get updates about new community events in your inbox."
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button variant="primary" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
