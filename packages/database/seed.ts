import { PrismaClient, Rank, ClassName, ItemTier, ItemType, NewsCategory, StoreCategory } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPasswordHash = await bcrypt.hash("admin_password_change_me", 12);
  const admin = await prisma.user.upsert({
    where: { minecraftUuid: "admin-uuid-00000000" },
    update: {},
    create: {
      email: "admin@wynncraft.com",
      passwordHash: adminPasswordHash,
      minecraftUuid: "admin-uuid-00000000",
      minecraftName: "Salted",
      rank: Rank.ADMIN,
      emailVerified: true,
    },
  });

  // Create tzkal admin user
  const tzkalPasswordHash = await bcrypt.hash("535352", 12);
  await prisma.user.upsert({
    where: { minecraftUuid: "tzkal-uuid-00000000" },
    update: { passwordHash: tzkalPasswordHash },
    create: {
      email: "tzkal@wynncraft.com",
      passwordHash: tzkalPasswordHash,
      minecraftUuid: "tzkal-uuid-00000000",
      minecraftName: "tzkal",
      rank: Rank.ADMIN,
      emailVerified: true,
    },
  });

  // Create sample players
  const playerNames = ["Jumla", "Grian", "ThunderMCPE", "ElDiaEntre", "Cookiestix", "Illindra", "Sorcerer753", "NicBOMB", "Moe_Shapes", "HighboundHazel"];
  const players = [];

  for (const name of playerNames) {
    const player = await prisma.user.upsert({
      where: { minecraftUuid: `${name.toLowerCase()}-uuid-000` },
      update: {},
      create: {
        minecraftUuid: `${name.toLowerCase()}-uuid-000`,
        minecraftName: name,
        rank: Rank.DEFAULT,
      },
    });
    players.push(player);
  }

  // Create characters for players
  const classNames = [ClassName.WARRIOR, ClassName.MAGE, ClassName.ARCHER, ClassName.ASSASSIN, ClassName.SHAMAN];
  for (const player of [admin, ...players]) {
    const charClass = classNames[Math.floor(Math.random() * classNames.length)];
    await prisma.character.upsert({
      where: { characterUuid: `${player.id}-char-1` },
      update: {},
      create: {
        userId: player.id,
        characterUuid: `${player.id}-char-1`,
        className: charClass,
        level: Math.floor(Math.random() * 106) + 1,
        totalXp: BigInt(Math.floor(Math.random() * 1000000)),
        playtime: Math.floor(Math.random() * 10000) + 100,
        mobsKilled: Math.floor(Math.random() * 500000),
        chestsFound: Math.floor(Math.random() * 10000),
        warsCount: Math.floor(Math.random() * 1000),
        quests: ["Broken Memories", "Quake", "Lost Soles", "The Passage", "Underwater"],
        dungeons: { total: 50, list: { "Decrepit Sewers": 20, "Infested Pit": 15, "Sand-Swept Tomb": 15 } },
        raids: { total: 10, list: { "Nest of the Grootslangs": 5, "Orphion's Nexus of Light": 5 } },
        skillPoints: { strength: 100, dexterity: 100, intelligence: 100, defence: 100, agility: 100 },
        professions: {
          woodcutting: { level: 50, xpPercent: 45 },
          mining: { level: 50, xpPercent: 30 },
          fishing: { level: 40, xpPercent: 20 },
          farming: { level: 35, xpPercent: 60 },
        },
        gamemode: [],
      },
    });
  }

  // Create guilds
  const guildData = [
    { name: "Luminous", tag: "LMNX", level: 91, territories: 28, wars: 1205 },
    { name: "Visionary", tag: "VIS", level: 87, territories: 15, wars: 987 },
    { name: "The Unknown", tag: "UNKN", level: 85, territories: 12, wars: 876 },
    { name: "Titan", tag: "TIT", level: 82, territories: 8, wars: 765 },
    { name: "Brave", tag: "BRV", level: 79, territories: 5, wars: 654 },
  ];

  for (const gd of guildData) {
    await prisma.guild.upsert({
      where: { name: gd.name },
      update: {},
      create: {
        name: gd.name,
        tag: gd.tag,
        level: gd.level,
        xp: BigInt(gd.level * 1000000),
        territories: gd.territories,
        wars: gd.wars,
      },
    });
  }

  // Create items
  const itemsData = [
    { name: "Tsunami", displayName: "Tsunami", tier: ItemTier.MYTHIC, type: ItemType.WEAPON, level: 100, identifications: { waterDamage: { min: 50, max: 70, raw: 60 }, manaRegen: { min: 5, max: 8, raw: 7 } }, requirements: { level: 100, dexterity: 80 }, powderSlots: 3 },
    { name: "Inferno", displayName: "Inferno", tier: ItemTier.MYTHIC, type: ItemType.WEAPON, level: 97, identifications: { fireDamage: { min: 60, max: 80, raw: 70 }, attackSpeed: { min: 0, max: 1, raw: 1 } }, requirements: { level: 97, strength: 75 }, powderSlots: 3 },
    { name: "Leviathan", displayName: "Leviathan", tier: ItemTier.LEGENDARY, type: ItemType.HELMET, level: 98, baseDefense: { health: 5000, water: 100 }, identifications: { healthBonus: { min: 1000, max: 2000, raw: 1500 } }, requirements: { level: 98, defence: 60 }, powderSlots: 2 },
    { name: "Crystalline", displayName: "Crystalline", tier: ItemTier.FABLED, type: ItemType.CHESTPLATE, level: 105, baseDefense: { health: 8000, air: 80 }, identifications: { airDefense: { min: 10, max: 15, raw: 12 } }, requirements: { level: 105, agility: 70 }, powderSlots: 4 },
    { name: "Hephaestus", displayName: "Hephaestus", tier: ItemTier.LEGENDARY, type: ItemType.WEAPON, level: 95, identifications: { fireDamage: { min: 40, max: 60, raw: 50 }, strength: { min: 5, max: 10, raw: 7 } }, requirements: { level: 95, strength: 65 }, powderSlots: 3 },
    { name: "Revenant", displayName: "Revenant", tier: ItemTier.RARE, type: ItemType.HELMET, level: 85, baseDefense: { health: 3000 }, identifications: { lifeSteal: { min: 100, max: 200, raw: 150 } }, requirements: { level: 85 }, powderSlots: 2 },
    { name: "Aquarius", displayName: "Aquarius", tier: ItemTier.LEGENDARY, type: ItemType.RING, level: 90, identifications: { waterDamage: { min: 8, max: 12, raw: 10 }, manaSteal: { min: 3, max: 5, raw: 4 } }, requirements: { level: 90, intelligence: 55 }, powderSlots: 0 },
    { name: "Stratiformis", displayName: "Stratiformis", tier: ItemTier.UNIQUE, type: ItemType.BOOTS, level: 75, baseDefense: { health: 1500, air: 50 }, identifications: { walkSpeed: { min: 5, max: 12, raw: 8 } }, requirements: { level: 75, agility: 40 }, powderSlots: 1 },
    { name: "Brynden", displayName: "Brynden", tier: ItemTier.SET, type: ItemType.HELMET, level: 60, baseDefense: { health: 1200, earth: 30 }, identifications: { thorns: { min: 10, max: 15, raw: 12 } }, requirements: { level: 60 }, setName: "Brynden Set", powderSlots: 1 },
    { name: "Arcanist's Ring", displayName: "Arcanist's Ring", tier: ItemTier.RARE, type: ItemType.RING, level: 80, identifications: { spellDamage: { min: 5, max: 10, raw: 7 }, manaRegen: { min: 2, max: 4, raw: 3 } }, requirements: { level: 80, intelligence: 45 }, powderSlots: 0 },
  ];

  for (const item of itemsData) {
    await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        displayName: item.displayName,
        tier: item.tier,
        type: item.type,
        level: item.level,
        identifications: item.identifications,
        requirements: item.requirements,
        powderSlots: item.powderSlots,
        baseDefense: item.baseDefense ?? null,
        setName: item.setName ?? null,
      },
    });
  }

  // Create store products
  const storeProducts = [
    { name: "VIP Rank", slug: "vip", description: "Unlock exclusive VIP perks and cosmetics.", price: "14.99", category: StoreCategory.RANK, sortOrder: 1 },
    { name: "VIP+ Rank", slug: "vip-plus", description: "Enhanced VIP benefits with additional perks.", price: "29.99", category: StoreCategory.RANK, sortOrder: 2 },
    { name: "HERO Rank", slug: "hero", description: "Premium rank with exclusive HERO features.", price: "54.99", category: StoreCategory.RANK, sortOrder: 3 },
    { name: "HERO+ Rank", slug: "hero-plus", description: "The ultimate HERO experience.", price: "89.99", category: StoreCategory.RANK, sortOrder: 4 },
    { name: "CHAMPION Rank", slug: "champion", description: "The pinnacle of Wynncraft ranks.", price: "170.99", category: StoreCategory.RANK, sortOrder: 5 },
    { name: "Mystery Crate", slug: "mystery-crate", description: "Contains a random rare or legendary item.", price: "4.99", category: StoreCategory.CRATE, sortOrder: 1 },
    { name: "Heroic Crate", slug: "heroic-crate", description: "Contains guaranteed HERO-tier rewards.", price: "9.99", category: StoreCategory.CRATE, sortOrder: 2 },
    { name: "XP Bomb", slug: "xp-bomb", description: "Activates a server-wide XP boost for 1 hour.", price: "1.99", category: StoreCategory.BOMB, sortOrder: 1 },
    { name: "Loot Bomb", slug: "loot-bomb", description: "Activates a server-wide loot boost for 1 hour.", price: "2.99", category: StoreCategory.BOMB, sortOrder: 2 },
  ];

  for (const product of storeProducts) {
    await prisma.storeProduct.upsert({
      where: { slug: product.slug },
      update: {},
      create: product as Parameters<typeof prisma.storeProduct.create>[0]["data"],
    });
  }

  // Create forum categories
  const forumCats = [
    { name: "News & Announcements", slug: "news", description: "Official news from the Wynncraft team", sortOrder: 0 },
    { name: "General Discussion", slug: "general", description: "Talk about anything Wynncraft", sortOrder: 1 },
    { name: "Questions & Help", slug: "help", description: "Get help from the community", sortOrder: 2 },
    { name: "Suggestions", slug: "suggestions", description: "Share your ideas for the game", sortOrder: 3 },
    { name: "Class Builds", slug: "builds", description: "Share and discuss class builds", sortOrder: 4 },
    { name: "Guilds", slug: "guilds", description: "Guild recruitment and discussions", sortOrder: 5 },
    { name: "Bug Reports", slug: "bugs", description: "Report bugs and issues", sortOrder: 6 },
  ];

  for (const cat of forumCats) {
    await prisma.forumCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create news articles
  const newsCategory = await prisma.forumCategory.findUnique({ where: { slug: "news" } });
  const newsArticles = [
    {
      slug: "wynncraft-2-1-patch-notes",
      title: "Wynncraft 2.1 - The Celestial Update",
      excerpt: "A massive new content update bringing new quests, items, and a brand new province.",
      content: "<p>The Celestial Update is here! This massive content drop includes a new province, 30+ quests, 200+ items, and much more.</p>",
      category: NewsCategory.UPDATE,
      authorId: admin.id,
    },
    {
      slug: "halloween-event-2024",
      title: "Halloween Nightmare Event 2024",
      excerpt: "Face your fears in the annual Halloween event with exclusive cosmetics and rewards.",
      content: "<p>The Halloween Nightmare event returns! Complete spooky quests and earn exclusive limited-time rewards.</p>",
      category: NewsCategory.EVENT,
      authorId: admin.id,
    },
    {
      slug: "guild-season-10-recap",
      title: "Guild Season 10 - Final Standings",
      excerpt: "Season 10 has concluded! See which guilds dominated the war season.",
      content: "<p>Season 10 has ended with Luminous taking the top spot with 28 territories. Congratulations to all participants!</p>",
      category: NewsCategory.COMMUNITY,
      authorId: admin.id,
    },
  ];

  for (const article of newsArticles) {
    const created = await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });

    if (newsCategory) {
      const existingThread = await prisma.forumThread.findUnique({
        where: { newsArticleId: created.id },
      });

      if (!existingThread) {
        await prisma.forumThread.create({
          data: {
            title: article.title,
            categoryId: newsCategory.id,
            authorId: admin.id,
            isPinned: false,
            newsArticleId: created.id,
            posts: {
              create: {
                authorId: admin.id,
                content: article.content,
                isFirst: true,
              },
            },
          },
        });
      }
    }
  }

  // Create map locations
  const mapLocations = [
    { name: "Ragni", type: "city", x: -855, z: -1540 },
    { name: "Detlas", type: "city", x: 459, z: -1580 },
    { name: "Almuj", type: "city", x: 928, z: -1789 },
    { name: "Nesaak", type: "city", x: 89, z: -756 },
    { name: "Troms", type: "city", x: -818, z: -476 },
    { name: "Decrepit Sewers", type: "dungeon", x: -779, z: -1564 },
    { name: "Infested Pit", type: "dungeon", x: 471, z: -1549 },
    { name: "Sand-Swept Tomb", type: "dungeon", x: 905, z: -1796 },
  ];

  for (const loc of mapLocations) {
    await prisma.mapLocation.upsert({
      where: { id: loc.name },
      update: {},
      create: { id: loc.name, name: loc.name, type: loc.type, x: loc.x, z: loc.z },
    }).catch(() => prisma.mapLocation.create({ data: { name: loc.name, type: loc.type, x: loc.x, z: loc.z } }).catch(() => {}));
  }

  console.log("Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
