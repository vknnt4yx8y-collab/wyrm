"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { playerApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Avatar } from "@/components/shared/Avatar";
import { Tabs } from "@/components/shared/Tabs";
import { formatNumber, formatPlaytime, getRankColor } from "@/lib/utils";
import { CharacterCard } from "@/components/stats/CharacterCard";

interface PlayerCardProps {
  username: string;
}

export function PlayerCard({ username }: PlayerCardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, error } = useQuery({
    queryKey: ["player", username],
    queryFn: async () => {
      const res = await playerApi.get(username);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">❌</div>
        <h2 className="font-heading font-bold text-xl text-text-primary mb-2">Player Not Found</h2>
        <p className="text-text-muted">Could not find player &quot;{username}&quot;</p>
      </div>
    );
  }

  const rankColor = getRankColor(data.rank || "DEFAULT");

  return (
    <div>
      {/* Player header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Avatar uuid={data.uuid} name={data.username} size={80} className="rounded-lg" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-heading font-bold text-text-primary">{data.username}</h1>
              {data.rank && data.rank !== "DEFAULT" && (
                <span
                  className="text-sm font-bold px-2 py-0.5 rounded border"
                  style={{ color: rankColor, borderColor: rankColor + "40", backgroundColor: rankColor + "15" }}
                >
                  {data.rank.replace("_", "+")}
                </span>
              )}
              {data.online && (
                <span className="text-xs text-accent-green bg-accent-green/10 border border-accent-green/30 px-2 py-0.5 rounded-full">
                  Online
                </span>
              )}
            </div>
            {data.guild && (
              <p className="text-text-muted text-sm mb-3">
                [{data.guild.prefix}] {data.guild.name} — {data.guild.rank}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Playtime</p>
                <p className="text-text-primary font-medium">{formatPlaytime(data.playtime || 0)}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Quests</p>
                <p className="text-text-primary font-medium">{formatNumber(data.globalData?.completedQuests || 0)}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Mobs Killed</p>
                <p className="text-text-primary font-medium">{formatNumber(data.globalData?.killedMobs || 0)}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider">Wars</p>
                <p className="text-text-primary font-medium">{formatNumber(data.globalData?.wars || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "characters", label: "Characters" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h3 className="font-heading font-bold text-text-primary mb-3">PvP</h3>
            <div className="flex gap-6">
              <div>
                <p className="text-text-muted text-xs">Kills</p>
                <p className="text-accent-green font-bold">{formatNumber(data.globalData?.pvp?.kills || 0)}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Deaths</p>
                <p className="text-accent-red font-bold">{formatNumber(data.globalData?.pvp?.deaths || 0)}</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-heading font-bold text-text-primary mb-3">Dungeons</h3>
            <p className="text-text-secondary font-bold text-lg">
              {formatNumber(data.globalData?.dungeons?.total || 0)} completed
            </p>
          </div>
        </div>
      )}

      {activeTab === "characters" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.characters && Object.entries(data.characters).map(([uuid, char]: [string, unknown]) => (
            <CharacterCard key={uuid} uuid={uuid} character={char} />
          ))}
        </div>
      )}
    </div>
  );
}
