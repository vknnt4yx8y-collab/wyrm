import { Router } from "express";

const router = Router();

const CLASS_DATA = {
  WARRIOR: {
    name: "Warrior",
    description: "A tank class that wields a spear with high defense and powerful melee attacks.",
    color: "#cc4444",
    archetypes: ["Fallen", "Battle Monk", "Paladin"],
    baseStats: { health: 500, damage: "1-5 Neutral", defense: 15, speed: 0.2 },
    weapon: "Spear",
  },
  MAGE: {
    name: "Mage",
    description: "A spellcaster that wields a wand with powerful elemental attacks and healing.",
    color: "#44cccc",
    archetypes: ["Riftwalker", "Light Bender", "Arcanist"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 5, speed: 0.2 },
    weapon: "Wand",
  },
  ARCHER: {
    name: "Archer",
    description: "A ranged class that wields a bow with high burst damage and mobility.",
    color: "#44cc44",
    archetypes: ["Sharpshooter", "Trapper", "Boltslinger"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
    weapon: "Bow",
  },
  ASSASSIN: {
    name: "Assassin",
    description: "A melee class that wields daggers with fast combo attacks and evasion.",
    color: "#cccc44",
    archetypes: ["Acrobat", "Shadestepper", "Trickster"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
    weapon: "Dagger",
  },
  SHAMAN: {
    name: "Shaman",
    description: "A totem class that wields a relik and controls the battlefield with area attacks.",
    color: "#cc44cc",
    archetypes: ["Summoner", "Ritualist", "Acolyte"],
    baseStats: { health: 450, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
    weapon: "Relik",
  },
};

router.get("/", (_req, res) => {
  res.json({ data: CLASS_DATA });
});

router.get("/:className", (req, res) => {
  const cls = CLASS_DATA[req.params.className.toUpperCase() as keyof typeof CLASS_DATA];
  if (!cls) return res.status(404).json({ error: "Class not found" });
  return res.json({ data: cls });
});

export default router;
