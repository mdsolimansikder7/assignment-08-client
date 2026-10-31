// Real auth context backed by Better Auth.
"use client";

import { createContext } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import type { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user: User | null = session?.user
    ? {
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        photoURL: session.user.image ?? "",
      }
    : null;

  const logout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully.");
    router.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading: isPending, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
