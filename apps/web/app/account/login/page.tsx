import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LoginForm } from "@/components/account/LoginForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="section-title text-center mb-2">Sign In</h1>
        <p className="section-subtitle text-center mb-8">Welcome back to Wynncraft</p>
        <LoginForm />
      </div>
    </PageWrapper>
  );
}
