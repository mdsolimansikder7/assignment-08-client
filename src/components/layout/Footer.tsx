
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SITE_NAME } from "@/lib/constants";
import LogoMark from "@/components/shared/LogoMark";

export default function Footer() {
  const year = new Date().getFullYear();

  const causes = [
    { label: "Cleanups", type: "Cleanup" },
    { label: "Plantations", type: "Plantation" },
    { label: "Donation Drives", type: "Donation" },
    { label: "Food Drives", type: "Food Drive" },
    { label: "Health Camps", type: "Health Camp" },
    { label: "Education", type: "Education" },
  ];

  return (
    <footer className="bg-primary text-white dark:bg-card dark:text-card-foreground dark:border-t dark:border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <LogoMark size={32} />
              <span className="font-heading text-xl font-bold">{SITE_NAME}</span>
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed dark:text-muted">
              Empowering communities through local social-service events.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-highlight">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="/events" className="hover:text-accent">Upcoming Events</Link></li>
              <li><Link href="/events/create" className="hover:text-accent">Create Event</Link></li>
              <li><Link href="/events/manage" className="hover:text-accent">Manage Events</Link></li>
              <li><Link href="/events/joined" className="hover:text-accent">Joined Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-highlight">Popular Causes</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80 dark:text-muted">
              {causes.map((c) => (
                <li key={c.type}>
                  <Link
                    href={`/events?type=${encodeURIComponent(c.type)}`}
                    className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-highlight">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80 dark:text-muted">
              <li>hello@humanova.org</li>
              <li>+880 1700-000000</li>
              <li>House 12, Road 5, Dhanmondi, Dhaka 1209</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="hover:text-accent"><FaFacebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-accent"><FaInstagram className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-accent"><FaLinkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="X" className="hover:text-accent"><FaXTwitter className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/70 dark:border-border dark:text-muted">
          © {year} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
