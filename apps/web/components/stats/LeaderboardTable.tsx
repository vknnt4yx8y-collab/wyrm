"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { leaderboardApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Avatar } from "@/components/shared/Avatar";
import { formatNumber } from "@/lib/utils";

const LEADERBOARD_TYPES = [
  { id: "combatSoloLevel", label: "Combat Level" },
  { id: "woodcuttingLevel", label: "Woodcutting" },
  { id: "miningLevel", label: "Mining" },
  { id: "fishingLevel", label: "Fishing" },
  { id: "farmingLevel", label: "Farming" },
  { id: "pvpKills", label: "PvP Kills" },
  { id: "completedQuests", label: "Quests" },
  { id: "guildLevel", label: "Guild Level" },
];

interface LeaderboardTableProps {
  type: string;
}

export function LeaderboardTable({ type }: LeaderboardTableProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard", type],
    queryFn: async () => {
      const res = await leaderboardApi.get(type, 100);
      return res.data;
    },
  });

  return (
    <div>
      {/* Type selector */}
      <div className="flex gap-2 flex-wrap mb-8">
        {LEADERBOARD_TYPES.map((lb) => (
          <Link
            key={lb.id}
            href={`/stats/leaderboard/${lb.id}`}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
              type === lb.id
                ? "bg-accent-gold text-bg-primary"
                : "bg-bg-card text-text-muted hover:text-text-primary border border-bg-elevated"
            }`}
          >
            {lb.label}
          </Link>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8"><LoadingSpinner /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bg-elevated">
                  <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">#</th>
                  <th className="text-left px-4 py-3 text-text-muted text-sm font-medium">Player</th>
                  <th className="text-right px-4 py-3 text-text-muted text-sm font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {data?.data ? (
                  data.data.map((entry: { rank: number; name: string; uuid?: string; value: number }) => (
                    <tr
                      key={entry.rank}
                      className="border-b border-bg-elevated/50 hover:bg-bg-elevated/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-text-muted font-mono text-sm">
                        {entry.rank <= 3 ? (
                          <span className={entry.rank === 1 ? "text-accent-gold" : entry.rank === 2 ? "text-text-secondary" : "text-amber-600"}>
                            {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                          </span>
                        ) : entry.rank}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {entry.uuid && <Avatar uuid={entry.uuid} name={entry.name} size={24} />}
                          <Link
                            href={`/stats/player/${entry.name}`}
                            className="text-text-primary hover:text-accent-gold transition-colors font-medium"
                          >
                            {entry.name}
                          </Link>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-accent-gold font-bold font-mono">
                        {formatNumber(entry.value)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                      No leaderboard data available. Connect a database to populate.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
