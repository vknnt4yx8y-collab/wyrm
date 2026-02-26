import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/v3/", limiter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
import playerRoutes from "./routes/player";
import guildRoutes from "./routes/guild";
import leaderboardRoutes from "./routes/leaderboard";
import itemRoutes from "./routes/item";
import mapRoutes from "./routes/map";
import searchRoutes from "./routes/search";
import newsRoutes from "./routes/news";
import serverRoutes from "./routes/server";
import classRoutes from "./routes/classes";
import forumsRoutes from "./routes/forums";
import storeRoutes from "./routes/store";
import authRoutes from "./routes/auth";

app.use("/api/v3/player", playerRoutes);
app.use("/api/v3/guild", guildRoutes);
app.use("/api/v3/leaderboard", leaderboardRoutes);
app.use("/api/v3/item", itemRoutes);
app.use("/api/v3/map", mapRoutes);
app.use("/api/v3/search", searchRoutes);
app.use("/api/v3/news", newsRoutes);
app.use("/api/v3/server", serverRoutes);
app.use("/api/v3/classes", classRoutes);
app.use("/api/v3/forums", forumsRoutes);
app.use("/api/v3/store", storeRoutes);
app.use("/api/auth", authRoutes);

// WebSocket for real-time server status
io.on("connection", (socket) => {
  // Emit server status every 15 seconds
  const interval = setInterval(async () => {
    socket.emit("serverStatus", {
      onlinePlayers: Math.floor(Math.random() * 500) + 500,
      maxPlayers: 2000,
    });
  }, 15000);

  socket.on("disconnect", () => {
    clearInterval(interval);
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

httpServer.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

export default app;
