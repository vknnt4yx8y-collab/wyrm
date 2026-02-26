import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="section-title mb-8">Refund Policy</h1>
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">General Policy</h2>
            <p className="text-text-muted text-sm leading-relaxed">All purchases are generally non-refundable once the item has been delivered to your account.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">Exceptions</h2>
            <p className="text-text-muted text-sm leading-relaxed">Refunds may be granted if the item was not delivered due to a technical error. Contact support@wynncraft.com within 7 days.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-heading font-bold text-text-primary mb-3">Chargebacks</h2>
            <p className="text-text-muted text-sm leading-relaxed">Initiating a chargeback without contacting us first will result in an account ban. Please contact us first.</p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
