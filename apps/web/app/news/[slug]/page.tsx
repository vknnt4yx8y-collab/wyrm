import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { NewsArticle } from "@/components/news/NewsArticle";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: "Read the latest news from Wynncraft.",
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <NewsArticle slug={slug} />
      </div>
    </PageWrapper>
  );
}
