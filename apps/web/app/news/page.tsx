import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { NewsGrid } from "@/components/news/NewsGrid";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, updates, and announcements from Wynncraft.",
};

export default function NewsPage() {
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">News & Updates</h1>
        <p className="section-subtitle mb-10">Stay up to date with Wynncraft</p>
        <NewsGrid />
      </div>
    </PageWrapper>
  );
}
