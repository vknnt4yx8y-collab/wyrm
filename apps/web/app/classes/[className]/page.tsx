import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ClassCard } from "@/components/classes/ClassCard";
import { CLASS_DATA } from "@/lib/constants";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ className: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { className } = await params;
  const key = className.toUpperCase();
  const cls = CLASS_DATA[key as keyof typeof CLASS_DATA];
  if (!cls) return { title: "Class Not Found" };
  return {
    title: `${cls.name} - Classes`,
    description: cls.description,
  };
}

export default async function ClassDetailPage({ params }: Props) {
  const { className } = await params;
  const key = className.toUpperCase();
  const cls = CLASS_DATA[key as keyof typeof CLASS_DATA];
  if (!cls) notFound();

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ClassCard className={key} data={cls} />
      </div>
    </PageWrapper>
  );
}
