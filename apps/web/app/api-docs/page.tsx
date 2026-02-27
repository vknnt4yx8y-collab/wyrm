import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import Link from "next/link";

export const metadata: Metadata = { title: "API Documentation" };

export default function ApiDocsPage() {
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="section-title mb-2">API Documentation</h1>
        <p className="section-subtitle mb-8">Wynncraft Public API v3</p>
        <div className="card p-6 mb-6">
          <p className="text-text-muted text-sm mb-4">
            For full developer documentation, visit the{" "}
            <Link href="/community/developers" className="text-accent-gold hover:underline">
              Developer Hub
            </Link>
            .
          </p>
          <p className="text-text-muted text-sm">
            Base URL: <code className="text-accent-green font-mono">https://wynncraft.com/api/v3/</code>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
