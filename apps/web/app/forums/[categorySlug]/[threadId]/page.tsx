import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ThreadView } from "@/components/forums/ThreadView";

interface Props {
  params: Promise<{ categorySlug: string; threadId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Thread - Forums`,
  };
}

export default async function ForumThreadPage({ params }: Props) {
  const { categorySlug, threadId } = await params;
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ThreadView threadId={threadId} categorySlug={categorySlug} />
      </div>
    </PageWrapper>
  );
}
