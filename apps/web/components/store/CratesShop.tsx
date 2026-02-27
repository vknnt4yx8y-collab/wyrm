"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";
import { Check, Star } from "lucide-react";

const crates = [
  {
    id: "lootrun-crate",
    name: "Lootrun Crate",
    price: 4.99,
    icon: "📦",
    color: "#f5c542",
    popular: false,
    description: "Contains cosmetics and boosters from past lootrun seasons.",
    contents: [
      "Random cosmetic item",
      "Experience booster (1hr)",
      "Loot booster (30min)",
      "Rare chance: Exclusive mount",
    ],
    keyRequired: "Lootrun Key",
  },
  {
    id: "heroic-crate",
    name: "Heroic Crate",
    price: 7.99,
    icon: "🏆",
    color: "#ff55ff",
    popular: true,
    description: "High-value crate containing hero-tier cosmetics and perks.",
    contents: [
      "Hero-tier cosmetic (guaranteed)",
      "Charm token",
      "Rare chance: Animated particle",
      "Rare chance: Exclusive title",
    ],
    keyRequired: "Heroic Key",
  },
  {
    id: "mythic-crate",
    name: "Mythic Crate",
    price: 14.99,
    icon: "💎",
    color: "#aa00aa",
    popular: false,
    description: "The rarest crate with mythic-tier exclusive rewards.",
    contents: [
      "Mythic cosmetic (guaranteed)",
      "Exclusive animated particle",
      "Rare chance: Limited-edition mount",
      "Rare chance: Unique title",
    ],
    keyRequired: "Mythic Key",
  },
  {
    id: "seasonal-crate",
    name: "Seasonal Crate",
    price: 9.99,
    icon: "🎄",
    color: "#55ff55",
    popular: false,
    description: "Limited-time seasonal crate with themed cosmetics.",
    contents: [
      "Seasonal cosmetic (guaranteed)",
      "Seasonal particle effect",
      "Rare chance: Seasonal mount",
      "Event currency bonus",
    ],
    keyRequired: "Seasonal Key",
  },
  {
    id: "champion-crate",
    name: "Champion Crate",
    price: 19.99,
    icon: "👑",
    color: "#ff5555",
    popular: false,
    description: "Exclusive champion-tier crate with the best rewards in the game.",
    contents: [
      "Champion cosmetic (guaranteed)",
      "Exclusive animated hat",
      "Rare chance: Champion mount",
      "Rare chance: Champion title",
    ],
    keyRequired: "Champion Key",
  },
  {
    id: "pet-crate",
    name: "Pet Crate",
    price: 6.99,
    icon: "🐾",
    color: "#55ffff",
    popular: false,
    description: "Contains a random pet companion for your adventures.",
    contents: [
      "Random pet (guaranteed)",
      "Pet food supply (30 days)",
      "Rare chance: Rare animated pet",
      "Rare chance: Legendary mythical pet",
    ],
    keyRequired: "Pet Key",
  },
];

export function CratesShop() {
  const [recipient, setRecipient] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (crate: (typeof crates)[0]) => {
    if (!recipient.trim()) {
      showToast("Please enter a Minecraft username first", "error");
      return;
    }
    addItem({
      id: crate.id,
      name: crate.name,
      price: crate.price,
      category: "CRATE",
      recipientName: recipient,
      isGift: false,
    });
    showToast(`${crate.name} added to cart!`, "success");
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crates.map((crate) => (
          <div
            key={crate.id}
            className="card p-6 flex flex-col relative"
            style={{ borderColor: crate.popular ? crate.color + "60" : undefined }}
          >
            {crate.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full text-bg-primary"
                style={{ backgroundColor: crate.color }}
              >
                POPULAR
              </div>
            )}
            <div className="text-5xl mb-3 text-center">{crate.icon}</div>
            <h3
              className="font-heading font-bold text-xl mb-1 text-center"
              style={{ color: crate.color }}
            >
              {crate.name}
            </h3>
            <p className="text-2xl font-bold text-text-primary text-center mb-2">
              ${crate.price}
            </p>
            <p className="text-text-muted text-sm text-center mb-4">{crate.description}</p>
            <div className="mb-2">
              <p className="text-text-secondary text-xs font-semibold uppercase tracking-wide mb-2">
                Possible Contents:
              </p>
              <ul className="space-y-1.5 flex-1 mb-4">
                {crate.contents.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                    <Star className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: crate.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-text-muted text-xs text-center mb-4">
              Requires: <span className="text-text-secondary">{crate.keyRequired}</span>
            </p>
            <button
              onClick={() => handleAddToCart(crate)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110 mt-auto"
              style={{ backgroundColor: crate.color, color: "#0a0e14" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-6 text-center">
        <p className="text-text-secondary text-sm mb-2">
          🔑 <strong>Need keys to open crates?</strong>
        </p>
        <p className="text-text-muted text-sm mb-4">
          Each crate requires a matching key to open. Purchase keys separately in our{" "}
          <a href="/store/keys" className="text-accent-gold hover:underline">
            Keys section
          </a>
          .
        </p>
      </div>
    </div>
  );
}
