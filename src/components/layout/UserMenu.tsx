"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, List, CalendarCheck, User as UserIcon } from "lucide-react";
import type { User } from "@/types/user";

export default function UserMenu({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {user.name}
      </span>

      <button
        onClick={() => setOpen((v) => !v)}
        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary"
        aria-label="User menu"
      >
        {user.photoURL ? (
          <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-card p-2 shadow-lg">
          <Link href="/events/create" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-card-foreground hover:bg-background" onClick={() => setOpen(false)}>
            <Plus className="h-4 w-4" /> Create Event
          </Link>
          <Link href="/events/manage" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-card-foreground hover:bg-background" onClick={() => setOpen(false)}>
            <List className="h-4 w-4" /> Manage Events
          </Link>
          <Link href="/events/joined" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-card-foreground hover:bg-background" onClick={() => setOpen(false)}>
            <CalendarCheck className="h-4 w-4" /> Joined Events
          </Link>
          <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-card-foreground hover:bg-background" onClick={() => setOpen(false)}>
            <UserIcon className="h-4 w-4" /> Profile
          </Link>
        </div>
      )}
    </div>
  );
}