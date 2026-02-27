"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("admin-auth") === "true") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 400));
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-accent-gold text-glow-gold mb-2">
            WYNNCRAFT
          </h1>
          <p className="text-text-muted text-sm">Admin Panel</p>
        </div>
        <div className="card p-6">
          <h2 className="font-heading font-bold text-xl text-text-primary mb-5">Administrator Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-accent-red/10 border border-accent-red/30 text-accent-red text-sm px-3 py-2 rounded">
                {error}
              </div>
            )}
            <div>
              <label className="block text-text-secondary text-sm mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-sm mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-bg-elevated border border-bg-card rounded-lg px-3 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="text-text-muted text-xs text-center mt-4">
            Default credentials: <span className="font-mono text-accent-gold">admin / admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
