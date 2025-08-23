// src/lib/auth.ts
export const STORAGE_KEY = "auth_user";
export const DRIVE_FILE_ID = "1_pzxi2zuvFBSyBN1MZuN5kwM1sqk8dHC";
export const DRIVE_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`;

export type StoredAuth = {
  user: unknown; // raw JSON from the file
  ts: number;    // timestamp
};

export async function fetchUser(): Promise<unknown> {
  const res = await fetch(DRIVE_URL, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }
  // This will throw if the file is not JSON
  return await res.json();
}

export function saveUser(user: unknown) {
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
