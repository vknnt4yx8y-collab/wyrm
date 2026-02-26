import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /store/products
router.get("/products", async (req, res) => {
  try {
    const category = req.query.category as string | undefined;
    const products = await prisma.storeProduct.findMany({
      where: {
        isActive: true,
        ...(category ? { category: category as "RANK" | "CRATE" | "PET" | "BOMB" | "COSMETIC" | "GIFT_CARD" } : {}),
      },
      orderBy: { sortOrder: "asc" },
    });
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
