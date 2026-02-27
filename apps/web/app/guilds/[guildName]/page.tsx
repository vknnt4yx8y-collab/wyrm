import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { GuildProfile } from "@/components/guilds/GuildProfile";

interface Props {
  params: { guildName: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.guildName)} - Guild`,
    description: `View guild profile and stats for ${decodeURIComponent(params.guildName)}.`,
  };
}

export default function GuildDetailPage({ params }: Props) {
  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <GuildProfile guildName={decodeURIComponent(params.guildName)} />
      </div>
    </PageWrapper>
  );
}
