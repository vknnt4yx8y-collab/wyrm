"use client";

import { useEffect, useState } from "react";

export interface ServerStatus {
  onlinePlayers: number;
  maxPlayers: number;
  worlds: Record<string, string[]>;
}

export function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/v3/server/status");
        if (!res.ok) throw new Error("Failed to fetch server status");
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        setError(err as Error);
        // Fallback mock data
        setStatus({ onlinePlayers: 847, maxPlayers: 2000, worlds: {} });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return { status, isLoading, error };
}
