"use client";

import React, { useState } from "react";
import Link from "next/link";

export function RegisterForm() {
  const [form, setForm] = useState({ email: "", password: "", minecraftName: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
      } else {
        window.location.href = "/account";
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}
        {[
          { label: "Minecraft Username", field: "minecraftName", type: "text", placeholder: "YourUsername" },
          { label: "Email Address", field: "email", type: "email", placeholder: "your@email.com" },
          { label: "Password", field: "password", type: "password", placeholder: "••••••••" },
        ].map(({ label, field, type, placeholder }) => (
          <div key={field}>
            <label className="block text-text-secondary text-sm mb-1.5">{label}</label>
            <input
              type={type}
              value={form[field as keyof typeof form]}
              onChange={update(field)}
              placeholder={placeholder}
              required
              className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
            />
          </div>
        ))}
        <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 disabled:opacity-50">
          {isLoading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/account/login" className="text-accent-gold hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
