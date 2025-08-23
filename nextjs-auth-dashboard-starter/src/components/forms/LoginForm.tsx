"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validation";
import { fetchUser, saveUser } from "@/lib/auth";
import { Input, Button } from "@/components/ui";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validate the phone number only
    const parsed = loginSchema.safeParse({ phone });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      // Fetch a random user from the API
      const user = await fetchUser();
      // Store user in localStorage
      saveUser(user);
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit} noValidate>
      <h1 className="h1" style={{ textAlign: "center" }}>Login</h1>
      <p className="subtitle" style={{ textAlign: "center" }}>
        Enter your Iranian mobile number to continue.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <Input
          label="Mobile number"
          placeholder="09xxxxxxxxx"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={error ?? undefined}
          autoComplete="tel-national"
          required
        />

        <Button type="submit" loading={loading}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
