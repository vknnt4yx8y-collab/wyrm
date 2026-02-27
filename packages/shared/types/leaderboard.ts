export interface LeaderboardEntry {
  rank: number;
  uuid: string;
  name: string;
  guildName?: string;
  guildPrefix?: string;
  value: number;
  displayValue: string;
}

export interface LeaderboardResponse {
  type: string;
  updatedAt: string;
  entries: LeaderboardEntry[];
}

export type LeaderboardType =
  | "combatSoloLevel"
  | "combatGlobalLevel"
  | "woodcuttingLevel"
  | "miningLevel"
  | "fishingLevel"
  | "farmingLevel"
  | "alchemismLevel"
  | "armouringLevel"
  | "cookingLevel"
  | "jewelingLevel"
  | "scribingLevel"
  | "tailoringLevel"
  | "weaponsmithingLevel"
  | "woodworkingLevel"
  | "pvpKills"
  | "completedQuests"
  | "globalPlaytime"
  | "guildLevel"
  | "guildTerritories"
  | "guildWars";
