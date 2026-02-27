import React from "react";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

interface GuildData {
  name: string;
  prefix: string;
  level: number;
  territories: number;
  members: number;
  wars: number;
}

interface GuildCardProps {
  guild: GuildData;
}

export function GuildCard({ guild }: GuildCardProps) {
  return (
    <Link href={`/guilds/${encodeURIComponent(guild.name)}`} className="group">
      <div className="card p-4 hover:border-accent-gold/30 transition-all hover:-translate-y-0.5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-heading font-bold text-text-primary group-hover:text-accent-gold transition-colors">
              {guild.name}
            </p>
            <p className="text-text-muted text-xs font-mono">[{guild.prefix}]</p>
          </div>
          <span className="text-xs bg-bg-elevated px-2 py-0.5 rounded text-text-muted font-medium">
            Lv. {guild.level}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-accent-gold font-bold">{guild.territories}</p>
            <p className="text-text-muted text-xs">Territories</p>
          </div>
          <div>
            <p className="text-text-secondary font-bold">{guild.members}</p>
            <p className="text-text-muted text-xs">Members</p>
          </div>
          <div>
            <p className="text-text-secondary font-bold">{formatNumber(guild.wars)}</p>
            <p className="text-text-muted text-xs">Wars</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
