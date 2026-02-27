"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { SearchBar } from "@/components/shared/SearchBar";

const mockNews = [
  { slug: "wynncraft-2-1-patch-notes", title: "Wynncraft 2.1 - The Celestial Update", excerpt: "A massive new content update bringing new quests, items, and a brand new province.", category: "UPDATE", publishedAt: "2024-10-15" },
  { slug: "halloween-event-2024", title: "Halloween Nightmare Event 2024", excerpt: "Face your fears in the annual Halloween event with exclusive cosmetics and rewards.", category: "EVENT", publishedAt: "2024-10-01" },
  { slug: "guild-season-10-recap", title: "Guild Season 10 - Final Standings", excerpt: "Season 10 has concluded! See which guilds dominated the war season.", category: "COMMUNITY", publishedAt: "2024-09-20" },
  { slug: "new-dungeon-released", title: "The Eldritch Outlook Dungeon", excerpt: "A brand new dungeon has arrived in the depths of Gavel.", category: "UPDATE", publishedAt: "2024-09-01" },
  { slug: "changelog-september", title: "September Balance Patch", excerpt: "Numerous balance adjustments to classes and items.", category: "CHANGELOG", publishedAt: "2024-08-28" },
  { slug: "fifth-anniversary", title: "Wynncraft 5th Anniversary Celebration", excerpt: "Celebrate 5 years of Wynncraft with special events and rewards.", category: "ANNOUNCEMENT", publishedAt: "2024-08-15" },
];

const categoryColors: Record<string, string> = {
  UPDATE: "#55ff55", CHANGELOG: "#55ffff", EVENT: "#f5c542", COMMUNITY: "#aa55ff", ANNOUNCEMENT: "#ff5555",
};

const categories = ["ALL", "UPDATE", "CHANGELOG", "EVENT", "COMMUNITY", "ANNOUNCEMENT"];

export function NewsGrid() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = mockNews.filter((n) => {
    const matchesCategory = activeCategory === "ALL" || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search news..."
          className="flex-1"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-accent-gold text-bg-primary"
                  : "bg-bg-card text-text-muted hover:text-text-primary border border-bg-elevated"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`} className="group">
            <div className="card overflow-hidden hover:border-accent-gold/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
              <div className="h-40 bg-bg-elevated flex items-center justify-center text-4xl">📰</div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ color: categoryColors[article.category], backgroundColor: categoryColors[article.category] + "20" }}
                  >
                    {article.category}
                  </span>
                  <span className="text-text-muted text-xs">{formatDate(article.publishedAt)}</span>
                </div>
                <h3 className="font-heading font-bold text-text-primary mb-2 group-hover:text-accent-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">{article.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-muted">No news articles found.</div>
      )}
    </div>
  );
}
