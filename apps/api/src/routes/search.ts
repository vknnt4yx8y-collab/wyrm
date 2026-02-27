import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /search/:query
router.get("/:query", async (req, res) => {
  try {
    const query = decodeURIComponent(req.params.query);
    if (!query || query.length < 2) {
      return res.json({ data: { players: [], guilds: [], items: [] } });
    }

    const [players, guilds, items] = await Promise.all([
      prisma.user.findMany({
        where: { minecraftName: { contains: query, mode: "insensitive" } },
        select: { minecraftName: true, minecraftUuid: true, rank: true },
        take: 5,
      }),
      prisma.guild.findMany({
        where: { OR: [
          { name: { contains: query, mode: "insensitive" } },
          { tag: { contains: query, mode: "insensitive" } },
        ]},
        select: { name: true, tag: true, level: true },
        take: 5,
      }),
      prisma.item.findMany({
        where: { displayName: { contains: query, mode: "insensitive" } },
        select: { name: true, displayName: true, tier: true, type: true },
        take: 5,
      }),
    ]);

    return res.json({
      data: {
        players: players.map((p) => ({ name: p.minecraftName, uuid: p.minecraftUuid, rank: p.rank, type: "player" })),
        guilds: guilds.map((g) => ({ name: g.name, prefix: g.tag, level: g.level, type: "guild" })),
        items: items.map((i) => ({ name: i.name, displayName: i.displayName, tier: i.tier, itemType: i.type, type: "item" })),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Search failed" });
  }
});

export default router;
