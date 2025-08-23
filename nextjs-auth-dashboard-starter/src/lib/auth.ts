import { ApiUser, StoredAuth } from "@/types/user";

export const STORAGE_KEY = "auth_user";
export const GIST_URL =
  "https://gist.githubusercontent.com/zahrabateninia/5c9c6bfc3835469f6ae338b7f76850e3/raw/01ebe54e404a2fb909b351266b56bee3e21872c1/mock-user.json";

export async function fetchUser(): Promise<ApiUser> {
  const res = await fetch(GIST_URL, { method: "GET" });
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);

  const data = await res.json();
  // Extract the first user from results
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error("No user found in API response");
  }
  return data.results[0] as ApiUser;
}

export function saveUser(user: ApiUser) {
  if (typeof window === "undefined") return;
  const payload: StoredAuth = { user, ts: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

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

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
