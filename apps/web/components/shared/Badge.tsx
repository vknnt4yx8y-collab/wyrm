import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "green" | "red" | "blue" | "purple";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-bg-elevated text-text-secondary border-bg-card",
    gold: "bg-accent-gold/10 text-accent-gold border-accent-gold/30",
    green: "bg-accent-green/10 text-accent-green border-accent-green/30",
    red: "bg-accent-red/10 text-accent-red border-accent-red/30",
    blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/30",
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-medium border rounded ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
