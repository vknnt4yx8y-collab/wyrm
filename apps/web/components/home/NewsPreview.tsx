import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// Mock news data - in production this comes from the API
const mockNews = [
  {
    slug: "wynncraft-2-1-patch-notes",
    title: "Wynncraft 2.1 - The Celestial Update",
    excerpt: "A massive new content update bringing new quests, items, and a brand new province.",
    category: "UPDATE",
    publishedAt: "2024-10-15",
    featuredImg: null,
  },
  {
    slug: "halloween-event-2024",
    title: "Halloween Nightmare Event 2024",
    excerpt: "Face your fears in the annual Halloween event with exclusive cosmetics and rewards.",
    category: "EVENT",
    publishedAt: "2024-10-01",
    featuredImg: null,
  },
  {
    slug: "guild-season-10-recap",
    title: "Guild Season 10 - Final Standings",
    excerpt: "Season 10 has concluded! See which guilds dominated the war season.",
    category: "COMMUNITY",
    publishedAt: "2024-09-20",
    featuredImg: null,
  },
];

const categoryColors: Record<string, string> = {
  UPDATE: "#55ff55",
  CHANGELOG: "#55ffff",
  EVENT: "#f5c542",
  COMMUNITY: "#aa55ff",
  ANNOUNCEMENT: "#ff5555",
};

export function NewsPreview() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="section-title">Latest News</h2>
            <p className="section-subtitle mt-2">Updates, events, and community highlights</p>
          </div>
          <Link
            href="/news"
            className="text-accent-gold hover:text-accent-gold/80 transition-colors text-sm font-medium"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group">
              <div className="card overflow-hidden hover:border-accent-gold/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Image placeholder */}
                <div className="h-48 bg-bg-elevated flex items-center justify-center text-4xl">
                  📰
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{
                        color: categoryColors[article.category],
                        backgroundColor: categoryColors[article.category] + "20",
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-text-muted text-xs">
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-text-primary text-lg mb-2 group-hover:text-accent-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
