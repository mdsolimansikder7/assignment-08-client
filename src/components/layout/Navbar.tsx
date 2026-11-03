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
        <Link href="/" className="flex items-center gap-2">
          <LogoMark size={32} />
          <span className="font-heading text-lg font-bold text-primary sm:text-xl">{SITE_NAME}</span>
        </Link>

        {/* Desktop */}
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

        {/* Mobile: Theme toggle + Avatar (login thakle) + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          {user && <UserMenu user={user} />}
          <button
            className="text-primary"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/events" className={linkClass("/events")} onClick={() => setMobileOpen(false)}>
              Upcoming Events
            </Link>
            {user ? (
              <Button variant="outline" onClick={() => { logout(); setMobileOpen(false); }}>
                Logout
              </Button>
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