// Join button with default, hover, and disabled "Joined" looks.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { checkJoined, joinEvent } from "@/lib/api";
import Button from "@/components/shared/Button";

export default function JoinButton({ eventId }: { eventId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    if (!user || !eventId) return;
    let active = true;
    checkJoined(eventId)
      .then((isJoined) => {
        if (active) setJoined(isJoined);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user, eventId]);

  const handleJoin = async () => {
    if (!user) {
      toast.error("Please log in to join this event.");
      router.push("/login");
      return;
    }
    try {
      await joinEvent(eventId);
      setJoined(true);
      toast.success("You joined the event!");
    } catch (err) {
      const apiErr = err as { message?: string; errors?: string[] };
      const msg =
        (Array.isArray(apiErr?.errors) && apiErr.errors[0]) ||
        apiErr?.message ||
        "Failed to join the event.";
      toast.error(msg);
    }
  };

  if (joined) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center rounded-xl bg-success px-5 py-2.5 text-sm font-semibold text-white opacity-70 cursor-not-allowed"
      >
        Joined
      </button>
    );
  }

  return (
    <Button variant="primary" onClick={handleJoin}>
      Join Event
    </Button>
  );
}
