import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12 prose prose-invert">
        <h1 className="section-title mb-8">Terms of Service</h1>
        <div className="space-y-6 text-text-secondary">
          <p>Last updated: January 1, 2024</p>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed">By accessing and playing Wynncraft, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">2. Use of Service</h2>
            <p className="text-sm leading-relaxed">Wynncraft is a free-to-play Minecraft server. You must comply with Minecraft&apos;s End User License Agreement and our server rules.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">3. Store Purchases</h2>
            <p className="text-sm leading-relaxed">All purchases through the Wynncraft store are subject to our refund policy. Rank benefits are delivered within 24 hours of purchase.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">4. Account Rules</h2>
            <p className="text-sm leading-relaxed">You are responsible for maintaining the confidentiality of your account. Sharing, selling, or transferring accounts is prohibited.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
