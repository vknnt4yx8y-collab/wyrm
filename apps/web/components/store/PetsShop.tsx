"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";

const pets = [
  {
    id: "baby-dragon",
    name: "Baby Dragon",
    price: 12.99,
    icon: "🐉",
    rarity: "Legendary",
    rarityColor: "#55ffff",
    description: "A tiny fire-breathing dragon that follows you everywhere.",
    abilities: ["Lights up dark areas", "Occasional fire breath animation", "Exclusive idle animation"],
  },
  {
    id: "fox-companion",
    name: "Silver Fox",
    price: 7.99,
    icon: "🦊",
    rarity: "Rare",
    rarityColor: "#ff55ff",
    description: "A sleek silver fox that dashes around your feet.",
    abilities: ["Speed boost aura (cosmetic)", "Playful idle animations", "Custom sounds"],
  },
  {
    id: "mini-golem",
    name: "Mini Golem",
    price: 9.99,
    icon: "🗿",
    rarity: "Rare",
    rarityColor: "#ff55ff",
    description: "A tiny stone golem that marches loyally at your side.",
    abilities: ["Stone crumble particle effect", "Guard stance idle animation", "Stomping sound effects"],
  },
  {
    id: "spirit-cat",
    name: "Spirit Cat",
    price: 6.99,
    icon: "🐱",
    rarity: "Uncommon",
    rarityColor: "#55ff55",
    description: "A glowing ethereal cat that phases through obstacles.",
    abilities: ["Ghost particle trail", "Phase-through idle animation", "Ethereal glow effect"],
  },
  {
    id: "luma",
    name: "Luma",
    price: 14.99,
    icon: "⭐",
    rarity: "Mythic",
    rarityColor: "#aa00aa",
    description: "A star-shaped celestial being of immense cosmic energy.",
    abilities: ["Star trail particle effect", "Constellation display", "Cosmic explosion idle"],
  },
  {
    id: "penguin",
    name: "Arctic Penguin",
    price: 7.99,
    icon: "🐧",
    rarity: "Uncommon",
    rarityColor: "#55ff55",
    description: "A cheerful penguin from the icy northern tundra.",
    abilities: ["Waddle animation", "Snowflake particle trail", "Happy idle animations"],
  },
  {
    id: "thunder-hawk",
    name: "Thunder Hawk",
    price: 11.99,
    icon: "🦅",
    rarity: "Rare",
    rarityColor: "#ff55ff",
    description: "A magnificent hawk cracking with lightning energy.",
    abilities: ["Lightning strike animation", "Storm cloud aura", "Thunder sound effects"],
  },
  {
    id: "mushroom-sprite",
    name: "Mushroom Sprite",
    price: 5.99,
    icon: "🍄",
    rarity: "Common",
    rarityColor: "#aaaaaa",
    description: "A cheerful mushroom sprite from the Wynn forests.",
    abilities: ["Spore particle trail", "Bounce idle animation", "Nature sound effects"],
  },
];

export function PetsShop() {
  const [recipient, setRecipient] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (pet: (typeof pets)[0]) => {
    if (!recipient.trim()) {
      showToast("Please enter a Minecraft username first", "error");
      return;
    }
    addItem({
      id: pet.id,
      name: pet.name,
      price: pet.price,
      category: "PET",
      recipientName: recipient,
      isGift: false,
    });
    showToast(`${pet.name} added to cart!`, "success");
  };

  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pets.map((pet) => (
          <div key={pet.id} className="card p-5 flex flex-col">
            <div className="text-5xl mb-3 text-center">{pet.icon}</div>
            <div
              className="text-xs font-bold text-center mb-1 uppercase tracking-wide"
              style={{ color: pet.rarityColor }}
            >
              {pet.rarity}
            </div>
            <h3 className="font-heading font-bold text-lg text-text-primary text-center mb-1">
              {pet.name}
            </h3>
            <p className="text-2xl font-bold text-text-primary text-center mb-3">
              ${pet.price}
            </p>
            <p className="text-text-muted text-sm text-center mb-4">{pet.description}</p>
            <ul className="space-y-1 mb-5 flex-1">
              {pet.abilities.map((ability) => (
                <li
                  key={ability}
                  className="text-xs text-text-muted flex items-start gap-1.5"
                >
                  <span style={{ color: pet.rarityColor }}>✦</span>
                  {ability}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddToCart(pet)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: pet.rarityColor, color: "#0a0e14" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
