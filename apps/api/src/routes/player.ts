import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /player/online
router.get("/online", async (_req, res) => {
  try {
    // In production, this would come from a real-time source
    res.json({
      total: 847,
      players: {},
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch online players" });
  }
});

// GET /player/:username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const fullResult = req.query.fullResult !== undefined;

    const user = await prisma.user.findFirst({
      where: { minecraftName: { equals: username, mode: "insensitive" } },
      include: {
        characters: true,
        guildMembership: { include: { guild: true } },
      },
    });

    if (!user) {
      return res.status(404).json({ error: `Player "${username}" not found.` });
    }

    const response = {
      username: user.minecraftName,
      online: false,
      server: null,
      activeCharacter: null,
      uuid: user.minecraftUuid,
      rank: user.rank,
      firstJoin: user.createdAt.toISOString(),
      lastJoin: user.lastLogin?.toISOString() || user.createdAt.toISOString(),
      playtime: user.characters.reduce((sum, c) => sum + c.playtime, 0),
      guild: user.guildMembership ? {
        name: user.guildMembership.guild.name,
        prefix: user.guildMembership.guild.tag,
        rank: user.guildMembership.role,
        rankStars: "",
      } : null,
      globalData: {
        wars: user.characters.reduce((sum, c) => sum + c.warsCount, 0),
        totalLevel: user.characters.reduce((sum, c) => sum + c.level, 0),
        killedMobs: user.characters.reduce((sum, c) => sum + c.mobsKilled, 0),
        chestsFound: user.characters.reduce((sum, c) => sum + c.chestsFound, 0),
        dungeons: { total: 0, list: {} },
        raids: { total: 0, list: {} },
        completedQuests: user.characters.reduce((sum, c) => sum + c.quests.length, 0),
        pvp: { kills: 0, deaths: 0 },
      },
      characters: fullResult
        ? Object.fromEntries(user.characters.map((c) => [c.characterUuid, {
            type: c.className,
            level: c.level,
            xp: Number(c.totalXp),
            playtime: c.playtime,
            mobsKilled: c.mobsKilled,
            chestsFound: c.chestsFound,
            quests: c.quests,
            dungeons: c.dungeons,
            raids: c.raids,
            skillPoints: c.skillPoints,
            professions: c.professions,
            gamemode: c.gamemode,
          }]))
        : {},
      publicProfile: true,
    };

    return res.json({ data: response });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch player" });
  }
});

// GET /player/:username/characters
router.get("/:username/characters", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findFirst({
      where: { minecraftName: { equals: username, mode: "insensitive" } },
      include: { characters: true },
    });

    if (!user) {
      return res.status(404).json({ error: `Player "${username}" not found.` });
    }

    const characters = Object.fromEntries(
      user.characters.map((c) => [c.characterUuid, {
        type: c.className,
        level: c.level,
        xp: Number(c.totalXp),
        playtime: c.playtime,
        mobsKilled: c.mobsKilled,
        quests: c.quests,
      }])
    );

    return res.json({ data: characters });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch characters" });
  }
});

export default router;
