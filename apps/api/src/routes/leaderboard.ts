import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

const LEADERBOARD_TYPES = [
  "combatSoloLevel", "combatGlobalLevel", "woodcuttingLevel", "miningLevel",
  "fishingLevel", "farmingLevel", "alchemismLevel", "armouringLevel", "cookingLevel",
  "jewelingLevel", "scribingLevel", "tailoringLevel", "weaponsmithingLevel", "woodworkingLevel",
  "pvpKills", "completedQuests", "globalPlaytime", "guildLevel", "guildTerritories", "guildWars",
];

// GET /leaderboard/types
router.get("/types", (_req, res) => {
  res.json({ data: LEADERBOARD_TYPES });
});

// GET /leaderboard/:type
router.get("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const limit = Math.min(parseInt(req.query.resultLimit as string) || 100, 100);

    if (!LEADERBOARD_TYPES.includes(type)) {
      return res.status(404).json({ error: `Leaderboard type "${type}" not found.` });
    }

    // Check cache
    const cached = await prisma.leaderboardCache.findUnique({ where: { type } });
    if (cached && (Date.now() - cached.updatedAt.getTime()) < 10 * 60 * 1000) {
      const data = cached.data as { data: unknown[] };
      return res.json({ data: data.data.slice(0, limit) });
    }

    // Generate leaderboard from DB
    let entries: Array<{ rank: number; name: string; uuid: string; value: number }> = [];

    if (type === "combatSoloLevel" || type === "combatGlobalLevel") {
      const chars = await prisma.character.findMany({
        orderBy: { level: "desc" },
        take: 100,
        include: { user: true },
      });
      entries = chars.map((c, i) => ({
        rank: i + 1,
        name: c.user.minecraftName,
        uuid: c.user.minecraftUuid,
        value: c.level,
      }));
    } else if (type === "completedQuests") {
      const users = await prisma.user.findMany({
        include: { characters: true },
        take: 100,
      });
      entries = users
        .map((u) => ({
          rank: 0,
          name: u.minecraftName,
          uuid: u.minecraftUuid,
          value: u.characters.reduce((sum, c) => sum + c.quests.length, 0),
        }))
        .sort((a, b) => b.value - a.value)
        .map((e, i) => ({ ...e, rank: i + 1 }));
    } else if (type === "guildLevel" || type === "guildTerritories" || type === "guildWars") {
      const guilds = await prisma.guild.findMany({
        orderBy: type === "guildLevel" ? { level: "desc" } : type === "guildTerritories" ? { territories: "desc" } : { wars: "desc" },
        take: 100,
      });
      const field = type === "guildLevel" ? "level" : type === "guildTerritories" ? "territories" : "wars";
      entries = guilds.map((g, i) => ({
        rank: i + 1,
        name: g.name,
        uuid: g.id,
        value: g[field as keyof typeof g] as number,
      }));
    }

    // Cache it
    await prisma.leaderboardCache.upsert({
      where: { type },
      create: { type, data: { data: entries } },
      update: { data: { data: entries }, updatedAt: new Date() },
    });

    return res.json({ data: entries.slice(0, limit) });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

export default router;
