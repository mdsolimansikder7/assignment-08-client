// Real API helpers for the Humanova backend.
import type { CommunityEvent } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Data sent when creating or updating an event (creator identity comes from the token).
export type EventInput = Omit<CommunityEvent, "_id" | "creatorEmail" | "creatorName">;

type TokenResponse = { data?: { token?: string }; token?: string };

class ApiError extends Error {
  errors?: string[];
  status?: number;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  needsLogin = false
): Promise<T> {
  const method = options.method || "GET";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (needsLogin) {
    if (typeof window === "undefined") {
      throw new Error("Please log in to continue.");
    }
    const { authClient } = await import("@/lib/auth-client");
    const tokenResponse = (await authClient.token()) as TokenResponse;
    const token = tokenResponse?.data?.token || tokenResponse?.token;
    if (!token) {
      throw new Error("Please log in to continue.");
    }
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    method,
    headers,
    cache: method === "GET" ? "no-store" : undefined,
  });

  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    data?: T;
    errors?: string[];
  };

  if (!res.ok || json.success === false) {
    const err = new ApiError(json.message || "Request failed.");
    err.errors = Array.isArray(json.errors) ? json.errors : undefined;
    err.status = res.status;
    throw err;
  }

  return (json.data as T) ?? (undefined as T);
}

function normalizeEvents(data: unknown): CommunityEvent[] {
  if (Array.isArray(data)) return data as CommunityEvent[];
  if (data && typeof data === "object") {
    const obj = data as { events?: CommunityEvent[] };
    if (Array.isArray(obj.events)) return obj.events;
  }
  return [];
}

function normalizeJoined(data: unknown): boolean {
  if (typeof data === "boolean") return data;
  if (data && typeof data === "object") {
    const obj = data as { joined?: boolean; isJoined?: boolean };
    if (typeof obj.joined === "boolean") return obj.joined;
    if (typeof obj.isJoined === "boolean") return obj.isJoined;
  }
  return false;
}

export async function getEvents(params?: {
  limit?: number;
  type?: string;
  search?: string;
}): Promise<CommunityEvent[]> {
  const sp = new URLSearchParams();
  if (params?.limit) sp.set("limit", String(params.limit));
  const allowedTypes = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Food Drive",
    "Health Camp",
    "Education",
  ];
  if (params?.type && allowedTypes.includes(params.type)) {
    sp.set("type", params.type);
  }
  if (params?.search) sp.set("search", params.search);
  const query = sp.toString() ? `?${sp.toString()}` : "";
  const data = await request<unknown>(`/events${query}`);
  return normalizeEvents(data);
}

export async function getEvent(id: string): Promise<CommunityEvent | null> {
  try {
    return await request<CommunityEvent>(`/events/${id}`);
  } catch (err) {
    const apiErr = err as ApiError;
    if (apiErr?.status === 404 || /not found/i.test(apiErr?.message || "")) {
      return null;
    }
    throw err;
  }
}

export async function createEvent(data: EventInput): Promise<CommunityEvent> {
  return request<CommunityEvent>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  }, true);
}

export async function getMyEvents(): Promise<CommunityEvent[]> {
  const data = await request<unknown>("/events/mine", {}, true);
  return normalizeEvents(data);
}

export async function updateEvent(id: string, data: EventInput): Promise<CommunityEvent> {
  return request<CommunityEvent>(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }, true);
}

export async function deleteEvent(id: string): Promise<void> {
  await request<unknown>(`/events/${id}`, { method: "DELETE" }, true);
}

export async function joinEvent(id: string): Promise<void> {
  await request<unknown>(`/events/${id}/join`, { method: "POST" }, true);
}

export async function checkJoined(id: string): Promise<boolean> {
  const data = await request<unknown>(`/events/${id}/joined`, {}, true);
  return normalizeJoined(data);
}

export async function getJoinedEvents(): Promise<CommunityEvent[]> {
  const data = await request<unknown>("/joins/mine", {}, true);
  return normalizeEvents(data);
}
