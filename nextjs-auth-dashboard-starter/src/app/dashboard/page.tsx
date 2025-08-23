"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, clearUser, StoredAuth } from "@/lib/auth";
import { Button } from "@/components/ui";
import Image from "next/image";

interface RandomUser {
  name?: { first: string; last: string };
  email?: string;
  picture?: { large?: string; medium?: string; thumbnail?: string };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredAuth | null>(null);

  useEffect(() => {
    const stored = getUser();
    if (!stored) {
      router.replace("/auth");
      return;
    }
    setUser(stored);
  }, [router]);

  if (!user) return null;

  // Cast to RandomUser for safe access
  const randomUser = user.user as RandomUser;

  return (
    <main className="page">
      <section className="card" style={{ textAlign: "center" }}>
        <h1 className="h1">
          Welcome, {randomUser.name?.first ?? ""} {randomUser.name?.last ?? ""}
        </h1>
        <p className="subtitle">{randomUser.email ?? ""}</p>

        {randomUser.picture?.large && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Image
            src={randomUser.picture?.large ?? ""}
            alt={randomUser.name?.first ?? "user"}
            width={100}
            height={100}
            priority
            className="avatar"
          />
          </div>
        )}

        <Button
          style={{ marginTop: 24 }}
          onClick={() => {
            clearUser();
            router.push("/auth");
          }}
        >
          Logout
        </Button>
      </section>
    </main>
  );
}
