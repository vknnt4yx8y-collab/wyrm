export interface GuildSummary {
  name: string;
  prefix: string;
  level: number;
  xp: number;
  xpPercent: number;
  territories: number;
  wars: number;
  created: string;
  members: {
    total: number;
    owner: Record<string, GuildMemberDetail>;
    chief: Record<string, GuildMemberDetail>;
    strategist: Record<string, GuildMemberDetail>;
    captain: Record<string, GuildMemberDetail>;
    recruiter: Record<string, GuildMemberDetail>;
    recruit: Record<string, GuildMemberDetail>;
  };
  online: number;
  banner: GuildBanner | null;
  seasonRanks: Record<string, { rating: number; finalTerritories: number }>;
}

export interface GuildMemberDetail {
  username: string;
  online: boolean;
  server: string | null;
  uuid: string;
  rank: string;
  rankStars: string;
  guildRank: string;
  contributed: number;
  contributionRank: number;
  joined: string;
}

export interface GuildBanner {
  base: string;
  tier: number;
  structure: string;
  layers: Array<{ colour: string; pattern: string }>;
}

export interface TerritoryDetail {
  territory: string;
  guild: { name: string; prefix: string } | null;
  acquired: string;
  location: {
    startX: number;
    startZ: number;
    endX: number;
    endZ: number;
  };
}
