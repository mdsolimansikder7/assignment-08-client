"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Button from "@/components/shared/Button";
import GoogleIcon from "@/components/shared/GoogleIcon";
import SectionHeading from "@/components/shared/SectionHeading";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      const msg = "Please enter your email and password.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });
      if (error) {
        const msg = error.message || "Login failed. Please try again.";
        setErrorMessage(msg);
        toast.error(msg);
        return;
      }
      toast.success("Login successful!");
      router.push("/");
    } catch {
      const msg = "Something went wrong. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setErrorMessage("");
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      const msg = "Google sign-in failed. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading title="Welcome Back" subtitle="Login to your Humanova account." />
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className={`${inputClass} pr-10`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/60 dark:text-red-400">{errorMessage}</div>
        )}

        <Button variant="primary" type="submit" disabled={submitting} className="w-full">
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </form>

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
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-primary hover:text-accent">
          Register
        </Link>
      </p>
    </div>
  );
}
