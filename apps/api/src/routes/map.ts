import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /map/locations/markers
router.get("/locations/markers", async (_req, res) => {
  try {
    const locations = await prisma.mapLocation.findMany();
    return res.json({ data: locations });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch map locations" });
  }
});

export default router;
