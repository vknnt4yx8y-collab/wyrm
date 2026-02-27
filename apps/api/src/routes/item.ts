import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /item
router.get("/", async (_req, res) => {
  try {
    const items = await prisma.item.findMany({
      orderBy: [{ tier: "asc" }, { level: "desc" }],
    });
    return res.json({ data: items });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch items" });
  }
});

// GET /item/:name
router.get("/:name", async (req, res) => {
  try {
    const name = decodeURIComponent(req.params.name);
    const item = await prisma.item.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });

    if (!item) return res.status(404).json({ error: `Item "${name}" not found.` });
    return res.json({ data: item });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch item" });
  }
});

export default router;
