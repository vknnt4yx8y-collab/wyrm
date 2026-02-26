import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /forums/categories
router.get("/categories", async (_req, res) => {
  try {
    const categories = await prisma.forumCategory.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: "asc" },
      include: {
        children: true,
        _count: { select: { threads: true } },
      },
    });
    return res.json({ data: categories });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET /forums/threads?category=&page=
router.get("/threads", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const category = req.query.category as string;
    const PER_PAGE = 20;

    const where = category ? { category: { slug: category } } : {};

    const [threads, total] = await Promise.all([
      prisma.forumThread.findMany({
        where,
        orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
        skip: (page - 1) * PER_PAGE,
        take: PER_PAGE,
        include: {
          author: { select: { minecraftName: true, rank: true } },
          category: true,
          _count: { select: { posts: true } },
        },
      }),
      prisma.forumThread.count({ where }),
    ]);

    return res.json({
      data: threads.map((t) => ({
        id: t.id,
        title: t.title,
        isPinned: t.isPinned,
        isLocked: t.isLocked,
        viewCount: t.viewCount,
        replyCount: t._count.posts - 1,
        author: t.author.minecraftName,
        authorRank: t.author.rank,
        category: t.category.slug,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
        tags: t.tags,
      })),
      pagination: { page, total, totalPages: Math.ceil(total / PER_PAGE) },
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch threads" });
  }
});

// GET /forums/threads/:id
router.get("/threads/:id", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const PER_PAGE = 20;

    const thread = await prisma.forumThread.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { minecraftName: true, rank: true } },
        category: true,
        posts: {
          orderBy: { createdAt: "asc" },
          skip: (page - 1) * PER_PAGE,
          take: PER_PAGE,
          include: {
            author: { select: { minecraftName: true, rank: true, createdAt: true } },
            reactions: true,
            _count: { select: { reactions: true } },
          },
        },
      },
    });

    if (!thread) return res.status(404).json({ error: "Thread not found" });

    // Increment view count
    await prisma.forumThread.update({
      where: { id: req.params.id },
      data: { viewCount: { increment: 1 } },
    });

    return res.json({ data: thread });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch thread" });
  }
});

export default router;
