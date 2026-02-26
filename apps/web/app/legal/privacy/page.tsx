import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-text-secondary">
          <p className="text-sm">Last updated: January 1, 2024</p>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">Data We Collect</h2>
            <p className="text-sm leading-relaxed">We collect your Minecraft username, email address (for store purchases), and gameplay statistics to operate the service.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">How We Use Data</h2>
            <p className="text-sm leading-relaxed">Your data is used to provide game services, process purchases, and improve the Wynncraft experience. We do not sell your data.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">Your Rights</h2>
            <p className="text-sm leading-relaxed">You have the right to access, correct, or delete your personal data. Contact privacy@wynncraft.com for requests.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
