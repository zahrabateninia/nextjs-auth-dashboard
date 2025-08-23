export const STORAGE_KEY = "auth_user";
export const GIST_URL = "https://gist.githubusercontent.com/zahrabateninia/cec47bec95bc1dd5f1c8d8dec62f4843/raw/c46f26e7ba73694c0bc900092bdd28be2ca06d11/mock-user.json";

export type StoredAuth = {
  user: unknown; // raw JSON from the file
  ts: number;    // timestamp
};

export async function fetchUser(): Promise<unknown> {
  const res = await fetch(GIST_URL, { method: "GET" });
  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  }
  // This should now reliably parse JSON
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
