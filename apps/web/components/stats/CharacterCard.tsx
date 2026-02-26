import React from "react";
import { formatNumber, formatPlaytime, getClassColor } from "@/lib/utils";

interface CharacterCardProps {
  uuid: string;
  character: unknown;
}

export function CharacterCard({ uuid, character }: CharacterCardProps) {
  const char = character as Record<string, unknown>;
  const color = getClassColor((char.type as string) || "WARRIOR");

  return (
    <div className="card p-4" style={{ borderColor: color + "30" }}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: color + "20" }}
        >
          {String(char.type || "").toUpperCase() === "WARRIOR" ? "⚔️" :
           String(char.type || "").toUpperCase() === "MAGE" ? "🔮" :
           String(char.type || "").toUpperCase() === "ARCHER" ? "🏹" :
           String(char.type || "").toUpperCase() === "ASSASSIN" ? "🗡️" : "🌀"}
        </div>
        <div>
          <p className="font-heading font-bold text-text-primary" style={{ color }}>
            {String(char.type || "Unknown")}
          </p>
          <p className="text-text-muted text-xs">Level {char.level as number}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-text-muted text-xs">Playtime</p>
          <p className="text-text-secondary text-sm font-medium">{formatPlaytime((char.playtime as number) || 0)}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs">Quests</p>
          <p className="text-text-secondary text-sm font-medium">{((char.quests as string[]) || []).length}</p>
        </div>
        <div>
          <p className="text-text-muted text-xs">Mobs</p>
          <p className="text-text-secondary text-sm font-medium">{formatNumber((char.mobsKilled as number) || 0)}</p>
        </div>
      </div>
    </div>
  );
}
