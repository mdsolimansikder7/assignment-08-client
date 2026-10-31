// Profile page: view the logged-in user and update name / profile picture.
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/shared/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import LoginRequired from "@/components/shared/LoginRequired";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhoto = photoURL.trim();

    if (!trimmedName) {
      const msg = "Name is required.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    setErrorMessage("");
    try {
      await authClient.updateUser({
        name: trimmedName,
        image: trimmedPhoto || null,
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      const apiErr = err as { message?: string; errors?: string[] };
      const msg =
        (Array.isArray(apiErr?.errors) && apiErr.errors[0]) ||
        apiErr?.message ||
        "Failed to update profile.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <LoginRequired>
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title="Profile" subtitle="View and update your profile." />

        <div className="overflow-hidden rounded-2xl bg-card shadow-sm">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-semibold">
                    {(user?.name ?? "").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-heading text-lg font-semibold text-foreground">{user?.name}</p>
                <p className="text-sm text-muted">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSave} className="mt-8 space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Profile Picture URL</label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />
              </div>

              {errorMessage && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/60 dark:text-red-400">{errorMessage}</div>
              )}

              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </LoginRequired>
  );
}
