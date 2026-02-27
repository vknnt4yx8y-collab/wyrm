import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /guild/territory
router.get("/territory", async (_req, res) => {
  try {
    const territories = await prisma.territory.findMany({
      include: { guild: true },
    });

    const result = Object.fromEntries(
      territories.map((t) => [t.name, {
        territory: t.name,
        guild: t.guild ? { name: t.guild.name, prefix: t.guild.tag } : null,
        acquired: new Date().toISOString(),
        location: {
          startX: t.startX,
          startZ: t.startZ,
          endX: t.endX,
          endZ: t.endZ,
        },
      }])
    );

    return res.json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch territories" });
  }
});

// GET /guild/prefix/:prefix
router.get("/prefix/:prefix", async (req, res) => {
  try {
    const guild = await prisma.guild.findFirst({
      where: { tag: { equals: req.params.prefix, mode: "insensitive" } },
      include: { members: { include: { user: true } } },
    });

    if (!guild) return res.status(404).json({ error: "Guild not found" });
    return res.json({ data: guild });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch guild" });
  }
});

// GET /guild (list)
router.get("/", async (_req, res) => {
  try {
    const guilds = await prisma.guild.findMany({
      orderBy: { level: "desc" },
      take: 100,
      include: { _count: { select: { members: true } } },
    });

    return res.json({
      data: guilds.map((g) => ({
        name: g.name,
        prefix: g.tag,
        level: g.level,
        xp: Number(g.xp),
        territories: g.territories,
        wars: g.wars,
        members: g._count.members,
      })),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

// GET /guild/:name
router.get("/:name", async (req, res) => {
  try {
    const guild = await prisma.guild.findFirst({
      where: { name: { equals: req.params.name, mode: "insensitive" } },
      include: {
        members: { include: { user: true } },
        territoryList: true,
        seasonRanks: true,
      },
    });

    if (!guild) return res.status(404).json({ error: "Guild not found" });

    const membersByRole: Record<string, Record<string, unknown>> = {};
    guild.members.forEach((m) => {
      const role = m.role.toLowerCase();
      if (!membersByRole[role]) membersByRole[role] = {};
      membersByRole[role][m.user.minecraftUuid] = {
        username: m.user.minecraftName,
        online: false,
        server: null,
        uuid: m.user.minecraftUuid,
        rank: m.user.rank,
        guildRank: m.role,
        contributed: Number(m.xpContrib),
        joined: m.joinedAt.toISOString(),
      };
    });

    return res.json({
      data: {
        name: guild.name,
        prefix: guild.tag,
        level: guild.level,
        xp: Number(guild.xp),
        xpPercent: guild.xpPercent,
        territories: guild.territories,
        wars: guild.wars,
        created: guild.createdAt.toISOString(),
        members: {
          total: guild.members.length,
          ...membersByRole,
        },
        banner: guild.banner,
        seasonRanks: Object.fromEntries(
          guild.seasonRanks.map((sr) => [sr.season, { rating: sr.rating, finalTerritories: 0 }])
        ),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch guild" });
  }
});

export default router;
