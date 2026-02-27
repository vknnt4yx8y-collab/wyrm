import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /news
router.get("/", async (_req, res) => {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      include: { author: { select: { minecraftName: true, rank: true } } },
      take: 20,
    });

    return res.json({
      data: articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        category: a.category,
        featuredImg: a.featuredImg,
        author: { name: a.author.minecraftName, rank: a.author.rank },
        publishedAt: a.publishedAt.toISOString(),
      })),
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
});

// GET /news/:slug
router.get("/:slug", async (req, res) => {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug: req.params.slug },
      include: { author: { select: { minecraftName: true, rank: true } } },
    });

    if (!article) return res.status(404).json({ error: "Article not found" });

    return res.json({
      data: {
        ...article,
        author: { name: article.author.minecraftName, rank: article.author.rank },
        publishedAt: article.publishedAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch article" });
  }
});

export default router;
