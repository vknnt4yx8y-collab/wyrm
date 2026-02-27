import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ThreadList } from "@/components/forums/ThreadList";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface Props {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  return {
    title: `${categorySlug} - Forums`,
  };
}

export default async function ForumCategoryPage({ params }: Props) {
  const { categorySlug } = await params;
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumbs
          crumbs={[
            { label: "Forums", href: "/forums" },
            { label: categorySlug },
          ]}
        />
        <div className="mt-6">
          <ThreadList categorySlug={categorySlug} />
        </div>
      </div>
    </PageWrapper>
  );
}
