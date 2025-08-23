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
  const randomUser = user.user as RandomUser;

  return (
    <div className="dashboard">
      {/* Top Navbar */}
      <header className="navbar">
        <h1 className="logo">My Dashboard</h1>
        <div className="navbar-right">
          <span className="user-email">{randomUser.email}</span>
          {randomUser.picture?.thumbnail && (
            <Image
              src={randomUser.picture.thumbnail}
              alt="user avatar"
              width={40}
              height={40}
              className="avatar-small"
            />
          )}
          <Button
            // size="sm"
            onClick={() => {
              clearUser();
              router.push("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </header>
        <main className="content">
          <h2>
            Welcome, {randomUser.name?.first ?? ""}{" "}
            {randomUser.name?.last ?? ""}
          </h2>
          <p>This is your personalized dashboard.</p>
        </main>
      </div>
  );
}
