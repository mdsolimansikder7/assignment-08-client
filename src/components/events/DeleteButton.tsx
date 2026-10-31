"use client";

import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import Button from "@/components/shared/Button";

export default function DeleteButton({ onDelete }: { onDelete: () => Promise<void> }) {
  const handleClick = async () => {
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");
    const style = typeof window !== "undefined" ? getComputedStyle(document.documentElement) : null;
    const background = style?.getPropertyValue("--card").trim() || (isDark ? "#1C1C2E" : "#FFFFFF");
    const color = style?.getPropertyValue("--foreground").trim() || (isDark ? "#F3F0EA" : "#1E1E2F");
    const cancelButtonColor = style?.getPropertyValue("--primary").trim() || (isDark ? "#A9AAF5" : "#2B2D6E");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#FF6B4A",
      cancelButtonColor,
      background,
      color,
    });

    if (result.isConfirmed) {
      try {
        await onDelete();
        toast.success("Event deleted successfully!");
      } catch (err) {
        const apiErr = err as { message?: string; errors?: string[] };
        const msg =
          (Array.isArray(apiErr?.errors) && apiErr.errors[0]) ||
          apiErr?.message ||
          "Failed to delete the event.";
        toast.error(msg);
      }
    }
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Delete
    </Button>
  );
}
