"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/hooks/useCart";
import { useToast } from "@/components/shared/Toast";
import { Check } from "lucide-react";

const ranks = [
  {
    id: "vip", name: "VIP", price: 14.99, color: "#55ff55",
    perks: ["Extra character slot", "VIP prefix", "Exclusive cosmetics", "Larger bank", "Custom particle effects"],
  },
  {
    id: "vip-plus", name: "VIP+", price: 29.99, color: "#55ffff",
    perks: ["All VIP perks", "VIP+ prefix", "Additional cosmetics", "Priority queue", "Name color"],
  },
  {
    id: "hero", name: "HERO", price: 54.99, color: "#ff55ff", popular: true,
    perks: ["All VIP+ perks", "HERO prefix", "Exclusive emotes", "Custom chat color", "Unique particle sets"],
  },
  {
    id: "hero-plus", name: "HERO+", price: 89.99, color: "#ffff55",
    perks: ["All HERO perks", "HERO+ prefix", "Exclusive mounts", "Extended storage", "Priority support"],
  },
  {
    id: "champion", name: "CHAMPION", price: 170.99, color: "#ff5555",
    perks: ["All HERO+ perks", "CHAMPION prefix", "Animated cosmetics", "Exclusive titles", "Top-tier benefits"],
  },
];

export function RankComparison() {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (rank: (typeof ranks)[0]) => {
    if (!selectedRecipient.trim()) {
      showToast("Please enter a Minecraft username first", "error");
      return;
    }
    addItem({
      id: rank.id,
      name: `${rank.name} Rank`,
      price: rank.price,
      category: "RANK",
      recipientName: selectedRecipient,
      isGift: false,
    });
    showToast(`${rank.name} rank added to cart!`, "success");
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
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
          className="flex-1 bg-bg-elevated border border-bg-card rounded px-3 py-2 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {ranks.map((rank) => (
          <div
            key={rank.id}
            className={`card p-5 flex flex-col relative ${rank.popular ? "border-opacity-100" : ""}`}
            style={{ borderColor: rank.popular ? rank.color + "60" : undefined }}
          >
            {rank.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-0.5 rounded-full text-bg-primary"
                style={{ backgroundColor: rank.color }}
              >
                POPULAR
              </div>
            )}
            <h3
              className="font-heading font-bold text-xl mb-1 text-center"
              style={{ color: rank.color }}
            >
              {rank.name}
            </h3>
            <p className="text-3xl font-bold text-text-primary text-center mb-4">
              ${rank.price}
            </p>
            <ul className="space-y-2 flex-1 mb-6">
              {rank.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-text-muted">
                  <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: rank.color }} />
                  {perk}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleAddToCart(rank)}
              className="w-full py-2 px-4 rounded font-heading font-bold text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: rank.color, color: "#0a0e14" }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
