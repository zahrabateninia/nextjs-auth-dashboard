// src/lib/auth.ts
export const STORAGE_KEY = "auth_user";                
export const USERS_BY_PHONE_KEY = "auth_users_by_phone"; // map: phone -> StoredAuth

export interface RandomUser {
  name?: { first?: string; last?: string };
  email?: string;
  picture?: { large?: string; medium?: string; thumbnail?: string };
}

export type StoredAuth = {
  user: RandomUser;
  ts: number;
};

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// existing session helpers 
export function saveUser(user: RandomUser) {
  writeJSON(STORAGE_KEY, { user, ts: Date.now() } satisfies StoredAuth);
}

export function getUser(): StoredAuth | null {
  return readJSON<StoredAuth | null>(STORAGE_KEY, null);
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// per-phone cache helpers 
export function getUsersByPhone(): Record<string, StoredAuth> {
  return readJSON<Record<string, StoredAuth>>(USERS_BY_PHONE_KEY, {});
}

export function getCachedUserForPhone(phone: string): StoredAuth | null {
  const store = getUsersByPhone();
  return store[phone] ?? null;
}

export function cacheUserForPhone(phone: string, user: RandomUser) {
  const store = getUsersByPhone();
  store[phone] = { user, ts: Date.now() };
  writeJSON(USERS_BY_PHONE_KEY, store);
}

// ---- fetch from Random User API ----
export async function fetchUser(): Promise<RandomUser> {
  const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data.results) || data.results.length === 0) {
    throw new Error("No user found in API response");
  }
  return data.results[0] as RandomUser;
}

/**
 * Login flow with caching:
 * - If a user for this phone exists in localStorage, reuse it.
 * - Otherwise fetch, cache under the phone, and set as current session.
 */
export async function loginWithPhone(phone: string): Promise<RandomUser> {
  const key = phone.trim(); // phone already validated; keep a stable key
  const cached = getCachedUserForPhone(key);
  if (cached) {
    saveUser(cached.user); // set current session to cached user
    return cached.user;
  }
  const user = await fetchUser();
  cacheUserForPhone(key, user);
  saveUser(user); // set current session
  return user;
}

/** Optional: clear everything (session + phone map) */
export function clearAllAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(USERS_BY_PHONE_KEY);
}
