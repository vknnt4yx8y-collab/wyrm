export const RANK_COLORS: Record<string, string> = {
  DEFAULT: "#cccccc",
  VIP: "#55ff55",
  VIP_PLUS: "#55ffff",
  HERO: "#ff55ff",
  HERO_PLUS: "#ffff55",
  CHAMPION: "#ff5555",
  MODERATOR: "#5555ff",
  ADMIN: "#ff5555",
};

export const RANK_LABELS: Record<string, string> = {
  DEFAULT: "Player",
  VIP: "VIP",
  VIP_PLUS: "VIP+",
  HERO: "HERO",
  HERO_PLUS: "HERO+",
  CHAMPION: "CHAMPION",
  MODERATOR: "MOD",
  ADMIN: "ADMIN",
};

export const RARITY_COLORS: Record<string, string> = {
  NORMAL: "#cccccc",
  UNIQUE: "#ffff55",
  RARE: "#ff55ff",
  LEGENDARY: "#55ffff",
  FABLED: "#ff5555",
  MYTHIC: "#aa00aa",
  SET: "#00aa00",
  CRAFTED: "#00ffff",
};

export const CLASS_COLORS: Record<string, string> = {
  WARRIOR: "#cc4444",
  MAGE: "#44cccc",
  ARCHER: "#44cc44",
  ASSASSIN: "#cccc44",
  SHAMAN: "#cc44cc",
};

export const CLASS_DISPLAY_NAMES: Record<string, string> = {
  WARRIOR: "Warrior",
  MAGE: "Mage",
  ARCHER: "Archer",
  ASSASSIN: "Assassin",
  SHAMAN: "Shaman",
};

export const STORE_RANK_PRICES: Record<string, number> = {
  VIP: 14.99,
  VIP_PLUS: 29.99,
  HERO: 54.99,
  HERO_PLUS: 89.99,
  CHAMPION: 170.99,
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const RATE_LIMIT_WINDOW_MS = 60 * 1000;
export const RATE_LIMIT_MAX = 120;

export const CACHE_TTL = {
  PLAYER: 5 * 60,
  GUILD: 5 * 60,
  ITEM: 60 * 60,
  LEADERBOARD: 10 * 60,
  MAP: 60 * 60,
  NEWS: 5 * 60,
  SERVER_STATUS: 15,
  GUILD_LIST: 30 * 60,
  TERRITORY: 60,
} as const;
