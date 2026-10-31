import { CalendarPlus, HandHeart, Settings, CalendarClock, Users, Sparkles } from "lucide-react";
import { FEATURES } from "@/lib/constants";
import SectionHeading from "@/components/shared/SectionHeading";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarPlus,
  HandHeart,
  Settings,
  CalendarClock,
  Users,
  Sparkles,
};

export default function Features() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Why Humanova" subtitle="Everything you need to make a local difference." />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon] ?? Sparkles;
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
