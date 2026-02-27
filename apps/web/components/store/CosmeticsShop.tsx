"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";

type Category = "All" | "Particles" | "Hats" | "Cloaks" | "Titles" | "Emotes";

const cosmetics = [
  {
    id: "golden-aura",
    name: "Golden Aura",
    price: 4.99,
    icon: "✨",
    category: "Particles" as Category,
    color: "#f5c542",
    description: "A shimmering golden particle aura that emanates from your character.",
    preview: "Swirling gold particles around player",
  },
  {
    id: "shadow-cloak",
    name: "Shadow Cloak",
    price: 7.99,
    icon: "🌑",
    category: "Cloaks" as Category,
    color: "#556677",
    description: "A dark flowing cloak woven from the shadows of the void.",
    preview: "Dark animated cape with shadow wisps",
  },
  {
    id: "royal-crown",
    name: "Royal Crown",
    price: 5.99,
    icon: "👑",
    category: "Hats" as Category,
    color: "#f5c542",
    description: "A magnificent golden crown worn by Wynn's greatest champions.",
    preview: "Glowing golden crown above player",
  },
  {
    id: "champion-title",
    name: "Champion Title",
    price: 2.99,
    icon: "🏆",
    category: "Titles" as Category,
    color: "#ff5555",
    description: "Display the prestigious [Champion] title above your name.",
    preview: "[Champion] YourName",
  },
  {
    id: "flame-particles",
    name: "Flame Trail",
    price: 3.99,
    icon: "🔥",
    category: "Particles" as Category,
    color: "#ff5555",
    description: "Leave a trail of flickering flames wherever you walk.",
    preview: "Fire particles trailing behind player",
  },
  {
    id: "wave-emote",
    name: "Wave Emote",
    price: 1.99,
    icon: "👋",
    category: "Emotes" as Category,
    color: "#55ff55",
    description: "A friendly wave animation to greet fellow adventurers.",
    preview: "Player waves animation",
  },
  {
    id: "dragon-cape",
    name: "Dragon Cape",
    price: 9.99,
    icon: "🐉",
    category: "Cloaks" as Category,
    color: "#ff55ff",
    description: "An epic dragon-scale cape with animated wing-like extensions.",
    preview: "Dragon scale cape with particle effects",
  },
  {
    id: "ice-crown",
    name: "Frost Crown",
    price: 5.99,
    icon: "❄️",
    category: "Hats" as Category,
    color: "#55ffff",
    description: "A crown made of eternal ice from the Nesaak tundra.",
    preview: "Icy crown with snowflake particles",
  },
  {
    id: "legend-title",
    name: "Legend Title",
    price: 3.99,
    icon: "⚔️",
    category: "Titles" as Category,
    color: "#55ffff",
    description: "Display the exclusive [Legend] title to mark your legacy.",
    preview: "[Legend] YourName",
  },
  {
    id: "star-burst",
    name: "Starburst Particles",
    price: 4.99,
    icon: "⭐",
    category: "Particles" as Category,
    color: "#f5c542",
    description: "Dazzling star-shaped particles that orbit your character.",
    preview: "Star particles orbiting player",
  },
  {
    id: "dance-emote",
    name: "Victory Dance",
    price: 2.99,
    icon: "💃",
    category: "Emotes" as Category,
    color: "#ff55ff",
    description: "A celebratory dance animation for your finest moments.",
    preview: "Player performs victory dance",
  },
  {
    id: "witch-hat",
    name: "Witch Hat",
    price: 3.99,
    icon: "🧙",
    category: "Hats" as Category,
    color: "#aa55ff",
    description: "A pointed witch hat with magical sparkling effects.",
    preview: "Pointy hat with sparkle particles",
  },
];

const CATEGORIES: Category[] = ["All", "Particles", "Hats", "Cloaks", "Titles", "Emotes"];

export function CosmeticsShop() {
  const [recipient, setRecipient] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const filtered = activeCategory === "All"
    ? cosmetics
    : cosmetics.filter((c) => c.category === activeCategory);

  const handleAddToCart = (item: (typeof cosmetics)[0]) => {
    if (!recipient.trim()) {
      showToast("Please enter a Minecraft username first", "error");
      return;
    }
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: "COSMETIC",
      recipientName: recipient,
      isGift: false,
    });
    showToast(`${item.name} added to cart!`, "success");
  };

  return (
    <div>
      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <label className="text-text-secondary text-sm font-medium flex-shrink-0">
          Minecraft Username:
        </label>
        <input
          type="text"
          placeholder="Enter your username..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="flex-1 bg-bg-elevated border border-bg-card rounded px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-accent-gold text-bg-primary"
                : "bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="card p-5 flex flex-col">
            <div className="text-5xl mb-3 text-center">{item.icon}</div>
            <div
              className="text-xs font-bold text-center mb-1 uppercase tracking-wide"
              style={{ color: item.color }}
            >
              {item.category}
            </div>
            <h3 className="font-heading font-bold text-base text-text-primary text-center mb-1">
              {item.name}
            </h3>
            <p className="text-xl font-bold text-text-primary text-center mb-2">${item.price}</p>
            <p className="text-text-muted text-xs text-center mb-2">{item.description}</p>
            <p className="text-text-muted text-xs text-center italic mb-4 opacity-70">
              Preview: {item.preview}
            </p>
            <button
              onClick={() => handleAddToCart(item)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110 mt-auto"
              style={{ backgroundColor: item.color, color: "#0a0e14" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
