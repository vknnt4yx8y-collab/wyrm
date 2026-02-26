import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-bg-primary ${className}`}>
      <div className="pt-16">{children}</div>
    </div>
  );
}
