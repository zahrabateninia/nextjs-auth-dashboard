// src/lib/auth.ts
export const STORAGE_KEY = "auth_user";

export type StoredAuth = {
  user: unknown; // raw JSON returned from Random User API
  ts: number;
};

// Fetch a random user from Random User API
export async function fetchUser(): Promise<unknown> {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error("No user found in API response");
  }

  return data.results[0]; // Return the first user object
}

// Save user in localStorage
export function saveUser(user: unknown) {
  if (typeof window === "undefined") return;
  const payload: StoredAuth = { user, ts: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

// Get user from localStorage
export function getUser(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

// Clear user from localStorage
export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
