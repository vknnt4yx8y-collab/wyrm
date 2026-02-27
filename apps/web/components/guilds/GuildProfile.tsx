"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { guildApi } from "@/lib/api";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Tabs } from "@/components/shared/Tabs";
import { Avatar } from "@/components/shared/Avatar";
import { formatNumber } from "@/lib/utils";

interface GuildProfileProps {
  guildName: string;
}

export function GuildProfile({ guildName }: GuildProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const { data, isLoading, error } = useQuery({
    queryKey: ["guild", guildName],
    queryFn: async () => {
      const res = await guildApi.get(guildName);
      return res.data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-16"><LoadingSpinner size="lg" /></div>;

  if (error || !data) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">🏰</div>
        <h2 className="font-heading font-bold text-xl text-text-primary mb-2">Guild Not Found</h2>
        <p className="text-text-muted">Could not find guild &quot;{guildName}&quot;</p>
      </div>
    );
  }

  const guild = data.data || data;

  return (
    <div>
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-bg-elevated rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
            🏰
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {guild.name || guildName}
            </h1>
            <p className="text-text-muted font-mono text-sm mb-4">[{guild.prefix}]</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Level", value: guild.level },
                { label: "Territories", value: guild.territories },
                { label: "Wars", value: formatNumber(guild.wars || 0) },
                { label: "Members", value: guild.members?.total || 0 },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-text-muted text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-text-primary font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs
        tabs={[{ id: "overview", label: "Overview" }, { id: "members", label: "Members" }]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === "members" && guild.members && (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bg-elevated">
                <th className="text-left px-4 py-3 text-text-muted text-sm">Player</th>
                <th className="text-left px-4 py-3 text-text-muted text-sm">Role</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(guild.members).map(([role, members]) => {
                if (role === "total" || typeof members !== "object") return null;
                return Object.entries(members as Record<string, { username: string; uuid?: string }>).map(([uuid, member]) => (
                  <tr key={uuid} className="border-b border-bg-elevated/50 hover:bg-bg-elevated/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar uuid={uuid} name={member.username} size={24} />
                        <span className="text-text-primary text-sm">{member.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-text-muted capitalize">{role}</span>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "overview" && (
        <div className="text-text-muted text-center py-8">Guild overview data loaded from API</div>
      )}
    </div>
  );
}
