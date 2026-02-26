export interface PlayerSummary {
  username: string;
  online: boolean;
  server: string | null;
  activeCharacter: string | null;
  uuid: string;
  rank: string;
  rankBadge: string | null;
  legacyRankColour: { main: string; sub: string } | null;
  shortenedRank: string | null;
  supportRank: string | null;
  veteran: boolean;
  firstJoin: string;
  lastJoin: string;
  playtime: number;
  guild: {
    name: string;
    prefix: string;
    rank: string;
    rankStars: string;
  } | null;
  globalData: {
    wars: number;
    totalLevel: number;
    killedMobs: number;
    chestsFound: number;
    dungeons: {
      total: number;
      list: Record<string, number>;
    };
    raids: {
      total: number;
      list: Record<string, number>;
    };
    completedQuests: number;
    pvp: {
      kills: number;
      deaths: number;
    };
  };
  characters: Record<string, CharacterSummary>;
  ranking: Record<string, number>;
  publicProfile: boolean;
}

export interface CharacterSummary {
  type: string;
  nickname: string | null;
  level: number;
  xp: number;
  xpPercent: number;
  totalLevel: number;
  wars: number;
  playtime: number;
  mobsKilled: number;
  chestsFound: number;
  blocksWalked: number;
  itemsIdentified: number;
  logins: number;
  deaths: number;
  discoveries: number;
  pvp: { kills: number; deaths: number };
  gamemode: string[];
  skillPoints: {
    strength: number;
    dexterity: number;
    intelligence: number;
    defence: number;
    agility: number;
  };
  professions: Record<string, { level: number; xpPercent: number }>;
  dungeons: { total: number; list: Record<string, number> };
  raids: { total: number; list: Record<string, number> };
  quests: string[];
}
