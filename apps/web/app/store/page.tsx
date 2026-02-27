import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Store",
  description: "Purchase ranks, crates, pets, and more to support Wynncraft.",
};

const storeCategories = [
  { name: "Ranks", href: "/store/ranks", description: "VIP, HERO, CHAMPION and more", icon: "👑", price: "From $14.99" },
  { name: "Crates", href: "/store/crates", description: "Mystery crates with exclusive rewards", icon: "📦", price: "From $4.99" },
  { name: "Pets", href: "/store/pets", description: "Adorable companions for your journey", icon: "🐾", price: "From $7.99" },
  { name: "Bombs", href: "/store/bombs", description: "Server-wide experience and loot boosts", icon: "💣", price: "From $1.99" },
  { name: "Cosmetics", href: "/store/cosmetics", description: "Stand out with unique visual effects", icon: "✨", price: "From $2.99" },
  { name: "Gift Cards", href: "/store/gift-cards", description: "Give the gift of adventure", icon: "🎁", price: "From $10.00" },
];

export default function StorePage() {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Wynncraft Store</h1>
          <p className="section-subtitle">
            Support the server and enhance your experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeCategories.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group">
              <div className="card p-6 h-full hover:border-accent-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h2 className="font-heading font-bold text-xl text-text-primary group-hover:text-accent-gold transition-colors mb-2">
                  {cat.name}
                </h2>
                <p className="text-text-muted text-sm mb-4">{cat.description}</p>
                <p className="text-accent-gold font-semibold text-sm">{cat.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
