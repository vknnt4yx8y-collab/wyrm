"use client";

import React from "react";
import { formatDate } from "@/lib/utils";

interface NewsArticleProps {
  slug: string;
}

const mockArticle = {
  title: "Wynncraft 2.1 - The Celestial Update",
  category: "UPDATE",
  publishedAt: "2024-10-15",
  author: "Salted",
  content: `
<h2>Welcome to Wynncraft 2.1!</h2>
<p>We are thrilled to announce the Celestial Update, our biggest content drop of the year. This update introduces an entirely new province, dozens of quests, hundreds of new items, and a reworked ability tree system.</p>

<h3>New Province: Dern</h3>
<p>Venture into the corrupted realm of Dern, a province unlike anything seen in Wynncraft before. Face powerful enemies, uncover ancient lore, and discover the truth about the Decay.</p>

<h3>New Quests</h3>
<p>Over 30 new quests have been added, including a new main quest line that takes you deep into the heart of Dern. The story continues with shocking revelations about the Wynn world.</p>

<h3>Balance Changes</h3>
<p>All 5 classes have received balance adjustments to improve the endgame experience. Details in the full changelog below.</p>
  `,
};

export function NewsArticle({ slug }: NewsArticleProps) {
  const article = mockArticle;

  return (
    <article>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent-green/20 text-accent-green mb-4 inline-block">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mt-3 mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-4 text-text-muted text-sm">
          <span>By <strong className="text-text-secondary">{article.author}</strong></span>
          <span>·</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>

      <div className="h-64 bg-bg-elevated rounded-xl flex items-center justify-center text-6xl mb-8">
        📰
      </div>

      <div
        className="prose-wynncraft text-text-secondary leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
