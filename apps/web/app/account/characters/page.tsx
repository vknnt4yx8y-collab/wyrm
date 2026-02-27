import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import Link from "next/link";
import { Sword, Shield, Zap, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Characters - Account" };

const mockCharacters = [
  {
    id: 1,
    name: "DragonSlayer99",
    class: "Warrior",
    classIcon: "⚔️",
    classColor: "#cc4444",
    level: 106,
    xp: 4_829_104,
    playtime: "312h 45m",
    deaths: 42,
    rank: "HERO",
    rankColor: "#ff55ff",
    lastPlayed: "2 days ago",
  },
  {
    id: 2,
    name: "StarWeaver",
    class: "Mage",
    classIcon: "🔮",
    classColor: "#44cccc",
    level: 87,
    xp: 1_204_392,
    playtime: "145h 20m",
    deaths: 27,
    rank: "VIP",
    rankColor: "#55ff55",
    lastPlayed: "1 week ago",
  },
  {
    id: 3,
    name: "ShadowArrow",
    class: "Archer",
    classIcon: "🏹",
    classColor: "#44cc44",
    level: 64,
    xp: 502_841,
    playtime: "78h 10m",
    deaths: 15,
    rank: null,
    rankColor: null,
    lastPlayed: "3 weeks ago",
  },
];

const classStats = [
  { icon: <Shield className="w-4 h-4" />, label: "Level" },
  { icon: <Zap className="w-4 h-4" />, label: "Playtime" },
  { icon: <Sword className="w-4 h-4" />, label: "Deaths" },
];

export default function CharactersPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="section-title">My Characters</h1>
          <p className="text-text-muted text-sm">
            {mockCharacters.length} / 5 slots used
          </p>
        </div>

        <div className="space-y-4">
          {mockCharacters.map((char) => (
            <div key={char.id} className="card p-5 hover:border-accent-gold/20 transition-all">
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: char.classColor + "20" }}
                >
                  {char.classIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="font-heading font-bold text-lg text-text-primary">
                      {char.name}
                    </h2>
                    {char.rank && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ backgroundColor: char.rankColor + "20", color: char.rankColor }}
                      >
                        {char.rank}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm mb-3" style={{ color: char.classColor }}>
                    {char.class}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-text-muted text-xs">Level</p>
                      <p className="text-text-primary text-sm font-semibold">{char.level}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">Playtime</p>
                      <p className="text-text-primary text-sm font-semibold">{char.playtime}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">Deaths</p>
                      <p className="text-text-primary text-sm font-semibold">{char.deaths}</p>
                    </div>
                    <div>
                      <p className="text-text-muted text-xs">Last Played</p>
                      <p className="text-text-primary text-sm font-semibold">{char.lastPlayed}</p>
                    </div>
                  </div>
                </div>
                <Link
                  href={`/stats?player=${char.name}`}
                  className="hidden sm:block text-text-muted hover:text-accent-gold transition-colors text-xs shrink-0"
                >
                  View Stats →
                </Link>
              </div>
            </div>
          ))}

          {/* Empty slot */}
          <div className="card p-5 border-dashed border-bg-elevated flex items-center justify-center gap-3 text-text-muted hover:text-text-secondary hover:border-accent-gold/30 transition-all cursor-pointer h-24">
            <Plus className="w-5 h-5" />
            <span className="text-sm">Create a new character in-game</span>
          </div>
        </div>

        <div className="mt-8 card p-5 bg-accent-gold/5 border-accent-gold/20">
          <p className="text-text-secondary text-sm text-center">
            💡 Characters are created and managed in-game. Connect to{" "}
            <span className="text-accent-gold font-mono">play.wynncraft.com</span> to create new characters.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
