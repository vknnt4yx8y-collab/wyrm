"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function PlayerSearch() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/stats/player/${encodeURIComponent(username.trim())}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Minecraft username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-bg-card border border-bg-elevated rounded-xl pl-12 pr-4 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors text-lg"
            maxLength={16}
          />
        </div>
        <button type="submit" className="btn-primary px-8 py-4 text-base">
          Search
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["Salted", "Jumla", "Grian", "ThunderMCPE"].map((name) => (
          <button
            key={name}
            onClick={() => router.push(`/stats/player/${name}`)}
            className="card p-3 text-sm text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-all text-left"
          >
            <span className="text-text-muted text-xs block mb-0.5">Example</span>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
