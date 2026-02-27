import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Community</h1>
          <p className="section-subtitle">Connect with millions of Wynncraft players</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Forums", href: "/forums", icon: "💬", desc: "Discuss builds, strategies, and more" },
            { title: "Guilds", href: "/guilds", icon: "🏰", desc: "Find or create a guild" },
            { title: "Leaderboards", href: "/stats/leaderboard/combatSoloLevel", icon: "🏆", desc: "See the top players" },
            { title: "Developer API", href: "/community/developers", icon: "🔧", desc: "Build apps with our public API" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="card p-6 hover:border-accent-gold/30 transition-all hover:-translate-y-1">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h2 className="font-heading font-bold text-xl text-text-primary group-hover:text-accent-gold transition-colors mb-2">
                  {item.title}
                </h2>
                <p className="text-text-muted text-sm">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
