import { Router } from "express";

const router = Router();

// GET /server/status
router.get("/status", async (_req, res) => {
  try {
    // In production, this would query the actual Minecraft server
    res.json({
      data: {
        onlinePlayers: Math.floor(Math.random() * 500) + 500,
        maxPlayers: 2000,
        worlds: {
          "Wynncraft": ["lobby1", "lobby2"],
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch server status" });
  }
});

export default router;
