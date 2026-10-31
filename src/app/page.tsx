import type { Metadata } from "next";
import { Suspense } from "react";
import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import RecentEvents from "@/components/home/RecentEvents";
import RecentEventsSkeleton from "@/components/home/RecentEventsSkeleton";
import Gallery from "@/components/home/Gallery";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Home",
  description: "Serve your community. Discover and join local social-service events.",
};

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <Suspense fallback={<RecentEventsSkeleton />}>
        <RecentEvents />
      </Suspense>
      <Gallery />
      <Newsletter />
    </>
  );
}
