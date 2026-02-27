import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-heading font-bold text-accent-gold mb-4" style={{ textShadow: "0 0 30px rgba(245,197,66,0.4)" }}>
          404
        </div>
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-text-muted mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist in the world of Wynncraft. Perhaps it was lost in a dungeon raid?
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
}
