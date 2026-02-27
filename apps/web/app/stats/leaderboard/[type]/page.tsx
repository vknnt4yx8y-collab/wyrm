import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LeaderboardTable } from "@/components/stats/LeaderboardTable";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${type} Leaderboard`,
    description: `Top players in ${type} on Wynncraft.`,
  };
}

export default async function LeaderboardPage({ params }: Props) {
  const { type } = await params;
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">Leaderboards</h1>
        <p className="section-subtitle mb-10">Top players across all categories</p>
        <LeaderboardTable type={type} />
      </div>
    </PageWrapper>
  );
}
