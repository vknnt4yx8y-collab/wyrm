import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "FAQ - Help" };

const faqs = [
  { q: "What version of Minecraft do I need?", a: "Wynncraft requires Minecraft Java Edition 1.12 or higher. It does not work on Bedrock Edition." },
  { q: "Is Wynncraft free to play?", a: "Yes! Wynncraft is completely free. The store offers optional cosmetic and quality-of-life purchases." },
  { q: "Do I need mods?", a: "No mods are required. However, some mods like Wynntils can enhance your experience." },
  { q: "How many classes are there?", a: "There are 5 classes: Warrior, Mage, Archer, Assassin, and Shaman. Each has 3 archetypes." },
  { q: "Can I play with friends?", a: "Yes! You can party up with friends, join guilds, and tackle dungeons and raids together." },
  { q: "What is the level cap?", a: "The main combat level cap is 106, with profession levels going up to 132." },
  { q: "How do guilds work?", a: "Guilds can claim territories, earn XP, and war with other guilds for control of the map." },
  { q: "Are there regular updates?", a: "Yes! The Wynncraft team releases regular updates with new content, quests, and items." },
];

export default function FaqPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">Frequently Asked Questions</h1>
        <p className="section-subtitle mb-10">Common questions about Wynncraft</p>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card p-6">
              <h2 className="font-heading font-bold text-text-primary mb-2">{faq.q}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
