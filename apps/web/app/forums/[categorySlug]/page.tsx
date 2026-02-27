import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ThreadList } from "@/components/forums/ThreadList";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

interface Props {
  params: { categorySlug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.categorySlug} - Forums`,
  };
}

export default function ForumCategoryPage({ params }: Props) {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumbs
          crumbs={[
            { label: "Forums", href: "/forums" },
            { label: params.categorySlug },
          ]}
        />
        <div className="mt-6">
          <ThreadList categorySlug={params.categorySlug} />
        </div>
      </div>
    </PageWrapper>
  );
}
