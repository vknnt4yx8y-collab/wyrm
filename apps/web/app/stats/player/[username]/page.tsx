import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { PlayerCard } from "@/components/stats/PlayerCard";

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username} - Stats`,
    description: `View ${params.username}'s Wynncraft stats, characters, and achievements.`,
  };
}

export default function PlayerPage({ params }: Props) {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <PlayerCard username={params.username} />
      </div>
    </PageWrapper>
  );
}
