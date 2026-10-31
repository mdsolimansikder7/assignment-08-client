// Registration form with live password checklist and real Better Auth sign-up.
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { hasUppercase, hasLowercase, hasMinLength, passwordErrors } from "@/lib/validators";
import Button from "@/components/shared/Button";
import GoogleIcon from "@/components/shared/GoogleIcon";
import SectionHeading from "@/components/shared/SectionHeading";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const checklist = [
    { label: "At least one uppercase letter", pass: hasUppercase(password) },
    { label: "At least one lowercase letter", pass: hasLowercase(password) },
    { label: "At least 6 characters", pass: hasMinLength(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    if (!name.trim()) newErrors.push("Name is required.");
    if (!email.trim()) newErrors.push("Email is required.");
    if (!password) newErrors.push("Password is required.");
    if (password) {
      newErrors.push(...passwordErrors(password));
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors below.");
      return;
    }

    setErrors([]);
    setSubmitting(true);
    try {
      const signUpData = photoURL.trim()
        ? { name: name.trim(), email: email.trim(), password, image: photoURL.trim() }
        : { name: name.trim(), email: email.trim(), password };

      const { error } = await authClient.signUp.email(signUpData);
      if (error) {
        const msg = error.message || "Registration failed. Please try again.";
        setErrors([msg]);
        toast.error(msg);
        return;
      }
      toast.success("Registration successful!");
      router.push("/");
    } catch {
      const msg = "Something went wrong. Please try again.";
      setErrors([msg]);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading title="Create an Account" subtitle="Join the Humanova community." />
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className={inputClass}
          />
          <ul className="mt-2 space-y-1 text-xs">
            {checklist.map((item) => (
              <li
                key={item.label}
                className={item.pass ? "text-success" : "text-muted"}
              >
                {item.pass ? "✓" : "○"} {item.label}
              </li>
            ))}
          </ul>
        </div>

        {errors.length > 0 && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <ul className="list-disc pl-5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <Button variant="primary" type="submit" disabled={submitting} className="w-full">
          {submitting ? "Creating..." : "Register"}
        </Button>
      </form>

      {/* Google sign-in */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background dark:hover:bg-white/5 hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <GoogleIcon size={20} />
          {submitting ? "Connecting..." : "Continue with Google"}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-accent">
          Login
        </Link>
      </p>
    </div>
  );
}
