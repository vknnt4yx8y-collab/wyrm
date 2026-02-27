"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";
import { Zap, Users, Clock } from "lucide-react";

const bombs = [
  {
    id: "xp-bomb",
    name: "XP Bomb",
    price: 1.99,
    icon: "💥",
    color: "#f5c542",
    duration: "1 Hour",
    bonus: "200% XP",
    description: "Doubles experience gain for the entire server for one hour.",
    details: ["Server-wide 2x XP boost", "Applies to all combat & quests", "Stacks with personal boosters"],
  },
  {
    id: "loot-bomb",
    name: "Loot Bomb",
    price: 1.99,
    icon: "💎",
    color: "#55ffff",
    duration: "1 Hour",
    bonus: "200% Loot",
    description: "Doubles loot quality and drop rates server-wide for one hour.",
    details: ["Server-wide 2x loot quality", "Higher chance for rare drops", "Applies to all dungeons"],
  },
  {
    id: "profession-bomb",
    name: "Profession Bomb",
    price: 1.99,
    icon: "⚒️",
    color: "#55ff55",
    duration: "1 Hour",
    bonus: "200% Profession XP",
    description: "Doubles profession experience gain across the entire server.",
    details: ["2x profession XP server-wide", "Applies to all professions", "Includes fishing, mining, farming"],
  },
  {
    id: "dungeon-bomb",
    name: "Dungeon Bomb",
    price: 3.99,
    icon: "🏰",
    color: "#ff55ff",
    duration: "2 Hours",
    bonus: "200% Dungeon Rewards",
    description: "Doubles all dungeon rewards including fragments and items.",
    details: ["2x dungeon reward drops", "Enhanced boss loot tables", "More dungeon fragment drops"],
  },
  {
    id: "mega-bomb",
    name: "Mega Bomb",
    price: 5.99,
    icon: "🌟",
    color: "#ff5555",
    duration: "1 Hour",
    bonus: "All 200% Boosts",
    description: "Activates ALL boost types simultaneously for maximum gains.",
    details: ["2x XP server-wide", "2x Loot server-wide", "2x Profession XP", "2x Dungeon rewards"],
    popular: true,
  },
];

export function BombsShop() {
  const [recipient, setRecipient] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (bomb: (typeof bombs)[0]) => {
    if (!recipient.trim()) {
      showToast("Please enter a Minecraft username first", "error");
      return;
    }
    addItem({
      id: bomb.id,
      name: bomb.name,
      price: bomb.price,
      category: "BOMB",
      recipientName: recipient,
      isGift: false,
    });
    showToast(`${bomb.name} added to cart!`, "success");
  };

  return (
    <div>
      <div className="card p-4 mb-6 bg-accent-gold/5 border-accent-gold/20">
        <p className="text-text-secondary text-sm text-center">
          💡 <strong>How Bombs Work:</strong> When detonated, bombs provide server-wide bonuses that benefit{" "}
          <strong>every player</strong> currently online — a great way to give back to the community!
        </p>
      </div>

      <div className="card p-4 mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bombs.map((bomb) => (
          <div
            key={bomb.id}
            className="card p-6 flex flex-col relative"
            style={{ borderColor: bomb.popular ? bomb.color + "60" : undefined }}
          >
            {bomb.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full text-bg-primary"
                style={{ backgroundColor: bomb.color }}
              >
                BEST VALUE
              </div>
            )}
            <div className="text-5xl mb-3 text-center">{bomb.icon}</div>
            <h3
              className="font-heading font-bold text-xl mb-1 text-center"
              style={{ color: bomb.color }}
            >
              {bomb.name}
            </h3>
            <p className="text-2xl font-bold text-text-primary text-center mb-1">${bomb.price}</p>
            <div className="flex items-center justify-center gap-4 text-xs text-text-muted mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {bomb.duration}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" style={{ color: bomb.color }} />
                {bomb.bonus}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                Server-wide
              </span>
            </div>
            <p className="text-text-muted text-sm text-center mb-4">{bomb.description}</p>
            <ul className="space-y-1.5 flex-1 mb-5">
              {bomb.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-sm text-text-muted">
                  <span style={{ color: bomb.color }}>✓</span>
                  {detail}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddToCart(bomb)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: bomb.color, color: "#0a0e14" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
