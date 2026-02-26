export const SITE_NAME = "Wynncraft";
export const SITE_DESCRIPTION = "The Minecraft MMORPG";
export const SERVER_IP = "play.wynncraft.com";

export const NAV_LINKS = [
  { label: "Play", href: "/", external: false },
  { label: "News", href: "/news", external: false },
  {
    label: "Store",
    href: "/store",
    external: false,
    children: [
      { label: "Ranks", href: "/store/ranks" },
      { label: "Crates", href: "/store/crates" },
      { label: "Pets", href: "/store/pets" },
      { label: "Bombs", href: "/store/bombs" },
      { label: "Cosmetics", href: "/store/cosmetics" },
      { label: "Gift Cards", href: "/store/gift-cards" },
    ],
  },
  {
    label: "Stats",
    href: "/stats",
    external: false,
    children: [
      { label: "Player Stats", href: "/stats" },
      { label: "Leaderboards", href: "/stats/leaderboard/combatSoloLevel" },
    ],
  },
  {
    label: "Community",
    href: "/community",
    external: false,
    children: [
      { label: "Forums", href: "/forums" },
      { label: "Classes", href: "/classes" },
      { label: "Item Database", href: "/items" },
      { label: "World Map", href: "/map" },
      { label: "Guilds", href: "/guilds" },
    ],
  },
  { label: "Help", href: "/help", external: false },
];

export const FOOTER_LINKS = {
  Game: [
    { label: "How to Play", href: "/help" },
    { label: "Classes", href: "/classes" },
    { label: "Item Database", href: "/items" },
    { label: "World Map", href: "/map" },
    { label: "FAQ", href: "/help/faq" },
  ],
  Community: [
    { label: "Forums", href: "/forums" },
    { label: "Guilds", href: "/guilds" },
    { label: "Leaderboards", href: "/stats/leaderboard/combatSoloLevel" },
    { label: "Developers", href: "/community/developers" },
  ],
  Store: [
    { label: "Ranks", href: "/store/ranks" },
    { label: "Crates", href: "/store/crates" },
    { label: "Pets", href: "/store/pets" },
    { label: "Gift Cards", href: "/store/gift-cards" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Refund Policy", href: "/legal/refund" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Discord", href: "https://discord.gg/wynncraft", icon: "discord" },
  { label: "Twitter", href: "https://twitter.com/wynncraft", icon: "twitter" },
  { label: "YouTube", href: "https://youtube.com/wynncraft", icon: "youtube" },
  { label: "Reddit", href: "https://reddit.com/r/wynncraft", icon: "reddit" },
  { label: "GitHub", href: "https://github.com/wynncraft", icon: "github" },
];

export const CLASS_DATA = {
  WARRIOR: {
    name: "Warrior",
    description: "Wielding a spear, the Warrior is a tank class with high defense and powerful melee attacks.",
    color: "#cc4444",
    icon: "⚔️",
    archetypes: ["Fallen", "Battle Monk", "Paladin"],
    baseStats: { health: 500, damage: "1-5 Neutral", defense: 15, speed: 0.2 },
  },
  MAGE: {
    name: "Mage",
    description: "Armed with a wand, the Mage commands powerful elemental spells and can heal allies.",
    color: "#44cccc",
    icon: "🔮",
    archetypes: ["Riftwalker", "Light Bender", "Arcanist"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 5, speed: 0.2 },
  },
  ARCHER: {
    name: "Archer",
    description: "Using a bow, the Archer deals high burst damage from range and has excellent mobility.",
    color: "#44cc44",
    icon: "🏹",
    archetypes: ["Sharpshooter", "Trapper", "Boltslinger"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
  },
  ASSASSIN: {
    name: "Assassin",
    description: "Wielding daggers, the Assassin is a high-speed class with combo attacks and mobility.",
    color: "#cccc44",
    icon: "🗡️",
    archetypes: ["Acrobat", "Shadestepper", "Trickster"],
    baseStats: { health: 400, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
  },
  SHAMAN: {
    name: "Shaman",
    description: "Using a relik, the Shaman summons totems and controls the battlefield with area attacks.",
    color: "#cc44cc",
    icon: "🌀",
    archetypes: ["Summoner", "Ritualist", "Acolyte"],
    baseStats: { health: 450, damage: "1-4 Neutral", defense: 10, speed: 0.2 },
  },
};

export const FEATURES = [
  {
    title: "5 Unique Classes",
    description: "Choose from Warrior, Mage, Archer, Assassin, or Shaman — each with 3 archetypes.",
    icon: "⚔️",
  },
  {
    title: "Open World",
    description: "Explore a massive Minecraft world filled with lore, secrets, and adventure.",
    icon: "🗺️",
  },
  {
    title: "1000+ Quests",
    description: "An epic story campaign spanning the entire world with thousands of quests.",
    icon: "📜",
  },
  {
    title: "Dungeons & Raids",
    description: "Challenge deadly dungeons and massive raids with your friends.",
    icon: "🏰",
  },
  {
    title: "Guild Territories",
    description: "Join a guild, conquer territories, and wage war against rivals.",
    icon: "🏴",
  },
  {
    title: "No Mods Required",
    description: "Play on any Minecraft Java Edition 1.12+ client. No downloads needed.",
    icon: "✅",
  },
];

export const STATS_COUNTERS = [
  { label: "Quests", value: 1000, suffix: "+" },
  { label: "Items", value: 10000, suffix: "+" },
  { label: "Accounts", value: 100000000, suffix: "+" },
  { label: "Classes", value: 5, suffix: "" },
];

export const PRESS_QUOTES = [
  {
    quote: "The largest and most advanced Minecraft MMORPG.",
    source: "PC Gamer",
    url: "https://pcgamer.com",
  },
  {
    quote: "Wynncraft holds the Guinness World Record for the largest Minecraft adventure map.",
    source: "Guinness World Records",
    url: "https://guinnessworldrecords.com",
  },
  {
    quote: "An incredibly ambitious project that transforms Minecraft into a full RPG.",
    source: "Kotaku",
    url: "https://kotaku.com",
  },
];
