import React from "react";
import type { Metadata } from "next";
import { WorldMap } from "@/components/map/WorldMap";

export const metadata: Metadata = {
  title: "World Map",
  description: "Explore the interactive Wynncraft world map.",
};

export default function MapPage() {
  return (
    <div className="h-screen w-screen overflow-hidden pt-16">
      <WorldMap />
    </div>
  );
}
