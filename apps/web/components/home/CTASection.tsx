"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { SERVER_IP } from "@/lib/constants";

export function CTASection() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
          Ready to Begin Your{" "}
          <span className="text-accent-gold" style={{ textShadow: "0 0 20px rgba(245,197,66,0.4)" }}>
            Adventure?
          </span>
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          Join millions of players in the world&apos;s largest Minecraft MMORPG.
          No mods, no downloads, no cost.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="minecraft://play.wynncraft.com"
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
          >
            ⚔️ Play Now — It&apos;s Free
          </a>
        </div>

        <div className="inline-flex items-center gap-3 bg-bg-card border border-bg-elevated rounded-xl px-6 py-4">
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-0.5">Server IP</p>
            <p className="font-mono font-bold text-text-primary text-lg">{SERVER_IP}</p>
          </div>
          <button
            onClick={copyIP}
            className="p-2 rounded-lg bg-bg-elevated hover:bg-accent-gold hover:text-bg-primary transition-all text-text-secondary"
            aria-label="Copy server IP"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <p className="mt-4 text-text-muted text-sm">
          Minecraft Java Edition 1.12+ required
        </p>
      </div>
    </section>
  );
}
