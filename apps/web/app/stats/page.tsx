import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PlayerSearch } from "@/components/stats/PlayerSearch";

export const metadata: Metadata = {
  title: "Player Stats",
  description: "Look up player statistics, characters, and guilds.",
};

export default function StatsPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Player Statistics</h1>
          <p className="section-subtitle">Search for any Wynncraft player</p>
        </div>
        <PlayerSearch />
      </div>
    </PageWrapper>
  );
}
