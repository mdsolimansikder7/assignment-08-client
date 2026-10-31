// Top navigation bar. Shows Login (logged out) or avatar + Logout (logged in).
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoMark from "@/components/shared/LogoMark";
import { useAuth } from "@/hooks/useAuth";
import { SITE_NAME } from "@/lib/constants";
import UserMenu from "./UserMenu";
import ThemeToggle from "@/components/shared/ThemeToggle";
import Button from "@/components/shared/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      isActive(href) ? "text-accent" : "text-primary hover:text-accent"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="font-heading text-xl font-bold text-primary">{SITE_NAME}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/events" className={linkClass("/events")}>
            Upcoming Events
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <UserMenu user={user} />
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/events" className={linkClass("/events")} onClick={() => setMobileOpen(false)}>
              Upcoming Events
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Theme</span>
              <ThemeToggle />
            </div>
            {user ? (
              <>
                <Link href="/events/create" className={linkClass("/events/create")} onClick={() => setMobileOpen(false)}>Create Event</Link>
                <Link href="/events/manage" className={linkClass("/events/manage")} onClick={() => setMobileOpen(false)}>Manage Events</Link>
                <Link href="/events/joined" className={linkClass("/events/joined")} onClick={() => setMobileOpen(false)}>Joined Events</Link>
                <Link href="/profile" className={linkClass("/profile")} onClick={() => setMobileOpen(false)}>Profile</Link>
                <Button variant="outline" onClick={() => { logout(); setMobileOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="primary">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
