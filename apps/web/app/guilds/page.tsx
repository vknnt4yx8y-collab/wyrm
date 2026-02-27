import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GuildCard } from "@/components/guilds/GuildCard";

export const metadata: Metadata = {
  title: "Guilds",
  description: "Browse Wynncraft guilds and their territories.",
};

// Mock guild list - in production from API
const mockGuilds = [
  { name: "Luminous", prefix: "LMNX", level: 91, territories: 28, members: 50, wars: 1205 },
  { name: "Visionary", prefix: "VIS", level: 87, territories: 15, members: 48, wars: 987 },
  { name: "The Unknown", prefix: "UNKN", level: 85, territories: 12, members: 45, wars: 876 },
  { name: "Titan", prefix: "TIT", level: 82, territories: 8, members: 43, wars: 765 },
  { name: "Brave", prefix: "BRV", level: 79, territories: 5, members: 41, wars: 654 },
  { name: "Epic", prefix: "EPIC", level: 75, territories: 3, members: 38, wars: 543 },
];

export default function GuildsPage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">Guilds</h1>
        <p className="section-subtitle mb-10">Browse Wynncraft&apos;s top guilds</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockGuilds.map((guild) => (
            <GuildCard key={guild.name} guild={guild} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
