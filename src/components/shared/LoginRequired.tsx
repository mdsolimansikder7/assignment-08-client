// Guard for private pages: shows a spinner while loading, redirects when logged out.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/shared/Spinner";

export default function LoginRequired({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please log in to continue.");
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
