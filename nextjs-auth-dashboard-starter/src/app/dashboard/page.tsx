"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const payload = getUser();
    if (!payload) {
      router.replace("/auth");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <main className="page">
      <section className="card">
        <h1 className="h1">Welcome to the Dashboard</h1>
        <p className="subtitle">You are logged in.</p>
      </section>
    </main>
  );
}
