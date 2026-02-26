import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatPlaytime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ${hours % 24}h`;
  return `${hours}h ${minutes % 60}m`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const past = new Date(dateStr).getTime();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(dateStr);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getRarityColor(tier: string): string {
  const colors: Record<string, string> = {
    NORMAL: "#cccccc",
    UNIQUE: "#ffff55",
    RARE: "#ff55ff",
    LEGENDARY: "#55ffff",
    FABLED: "#ff5555",
    MYTHIC: "#aa00aa",
    SET: "#00aa00",
    CRAFTED: "#00ffff",
  };
  return colors[tier] ?? "#cccccc";
}

export function getRankColor(rank: string): string {
  const colors: Record<string, string> = {
    DEFAULT: "#cccccc",
    VIP: "#55ff55",
    VIP_PLUS: "#55ffff",
    HERO: "#ff55ff",
    HERO_PLUS: "#ffff55",
    CHAMPION: "#ff5555",
    MODERATOR: "#5555ff",
    ADMIN: "#ff5555",
  };
  return colors[rank] ?? "#cccccc";
}

export function getClassColor(className: string): string {
  const colors: Record<string, string> = {
    WARRIOR: "#cc4444",
    MAGE: "#44cccc",
    ARCHER: "#44cc44",
    ASSASSIN: "#cccc44",
    SHAMAN: "#cc44cc",
  };
  return colors[className.toUpperCase()] ?? "#cccccc";
}

export function getSkinUrl(uuid: string, type: "face" | "body" = "face"): string {
  if (type === "face") {
    return `https://crafatar.com/avatars/${uuid}?size=64&overlay=true`;
  }
  return `https://crafatar.com/renders/body/${uuid}?scale=10&overlay=true`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
