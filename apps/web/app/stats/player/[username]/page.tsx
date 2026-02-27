import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PlayerCard } from "@/components/stats/PlayerCard";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${username} - Stats`,
    description: `View ${username}'s Wynncraft stats, characters, and achievements.`,
  };
}

export default async function PlayerPage({ params }: Props) {
  const { username } = await params;
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <PlayerCard username={username} />
      </div>
    </PageWrapper>
  );
}
