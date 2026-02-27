import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { rateLimit } from "express-rate-limit";

const router = Router();
const prisma = new PrismaClient();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

router.use(authLimiter);

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET environment variable must be set in production");
}
const EFFECTIVE_JWT_SECRET = JWT_SECRET || "wynncraft-secret-change-in-development";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  minecraftName: z.string().min(3).max(16),
});

// POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, EFFECTIVE_JWT_SECRET, { expiresIn: "7d" });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        minecraftName: user.minecraftName,
        rank: user.rank,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }
    return res.status(500).json({ error: "Login failed" });
  }
});

// POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, minecraftName } = registerSchema.parse(req.body);

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const minecraftUuid = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        minecraftName,
        minecraftUuid,
      },
    });

    const token = jwt.sign({ userId: user.id }, EFFECTIVE_JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        minecraftName: user.minecraftName,
        rank: user.rank,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.errors });
    }
    return res.status(500).json({ error: "Registration failed" });
  }
});

// GET /auth/me
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.slice(7);
    const payload = jwt.verify(token, EFFECTIVE_JWT_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        minecraftName: user.minecraftName,
        rank: user.rank,
      },
    });
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
