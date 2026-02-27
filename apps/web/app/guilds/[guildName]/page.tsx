import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GuildProfile } from "@/components/guilds/GuildProfile";

interface Props {
  params: Promise<{ guildName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guildName } = await params;
  return {
    title: `${decodeURIComponent(guildName)} - Guild`,
    description: `View guild profile and stats for ${decodeURIComponent(guildName)}.`,
  };
}

export default async function GuildDetailPage({ params }: Props) {
  const { guildName } = await params;
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <GuildProfile guildName={decodeURIComponent(guildName)} />
      </div>
    </PageWrapper>
  );
}
