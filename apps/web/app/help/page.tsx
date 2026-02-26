import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Help",
  description: "Get help with Wynncraft gameplay and account issues.",
};

const helpTopics = [
  { title: "How to Join", content: "Connect to play.wynncraft.com on Minecraft Java Edition 1.12+", icon: "🎮" },
  { title: "Classes Guide", href: "/help/classes", content: "Learn about the 5 classes: Warrior, Mage, Archer, Assassin, and Shaman.", icon: "⚔️" },
  { title: "FAQ", href: "/help/faq", content: "Frequently asked questions about gameplay, ranks, and more.", icon: "❓" },
  { title: "Report a Bug", href: "/forums/bugs", content: "Found a bug? Report it on the forums.", icon: "🐛" },
  { title: "Discord", href: "https://discord.gg/wynncraft", content: "Join the Discord for real-time help from the community.", icon: "💬" },
  { title: "Store Support", href: "/store", content: "Questions about purchases? Contact support@wynncraft.com.", icon: "🛍️" },
];

export default function HelpPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Help Center</h1>
          <p className="section-subtitle">Find answers and get support</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic) => (
            <div key={topic.title} className="card p-6">
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h2 className="font-heading font-bold text-lg text-text-primary mb-2">
                {topic.title}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{topic.content}</p>
              {topic.href && (
                <Link
                  href={topic.href}
                  className="text-accent-gold text-sm hover:underline"
                  target={topic.href.startsWith("http") ? "_blank" : undefined}
                >
                  Learn more →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
