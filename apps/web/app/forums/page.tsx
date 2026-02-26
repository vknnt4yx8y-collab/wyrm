import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = {
  title: "Forums",
  description: "Join the Wynncraft community discussions.",
};

const forumCategories = [
  { name: "News & Announcements", slug: "news", description: "Official news from the Wynncraft team", threads: 145, staffOnly: false, icon: "📢" },
  { name: "General Discussion", slug: "general", description: "Talk about anything Wynncraft", threads: 2341, staffOnly: false, icon: "💬" },
  { name: "Questions & Help", slug: "help", description: "Get help from the community", threads: 1876, staffOnly: false, icon: "❓" },
  { name: "Suggestions", slug: "suggestions", description: "Share your ideas for the game", threads: 987, staffOnly: false, icon: "💡" },
  { name: "Class Builds", slug: "builds", description: "Share and discuss class builds", threads: 765, staffOnly: false, icon: "⚔️" },
  { name: "Guilds", slug: "guilds", description: "Guild recruitment and discussions", threads: 543, staffOnly: false, icon: "🏰" },
  { name: "Your Work", slug: "your-work", description: "Share your art, guides, and projects", threads: 432, staffOnly: false, icon: "🎨" },
  { name: "Off-Topic", slug: "off-topic", description: "Chat about non-Wynncraft topics", threads: 321, staffOnly: false, icon: "🎭" },
  { name: "Bug Reports", slug: "bugs", description: "Report bugs and issues", threads: 234, staffOnly: false, icon: "🐛" },
];

export default function ForumsPage() {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-title mb-2">Forums</h1>
            <p className="section-subtitle">Join the Wynncraft community</p>
          </div>
          <Link href="/forums/create" className="btn-primary text-sm">
            New Thread
          </Link>
        </div>

        <div className="space-y-3">
          {forumCategories.map((cat) => (
            <Link key={cat.slug} href={`/forums/${cat.slug}`} className="group block">
              <div className="card p-4 hover:border-accent-gold/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="text-3xl w-10 text-center flex-shrink-0">{cat.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading font-bold text-text-primary group-hover:text-accent-gold transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-text-muted text-sm truncate">{cat.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-text-secondary font-medium">{cat.threads.toLocaleString()}</p>
                    <p className="text-text-muted text-xs">threads</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
