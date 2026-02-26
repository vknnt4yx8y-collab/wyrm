"use client";

import React, { useEffect, useRef } from "react";

export function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    // Leaflet is loaded dynamically to avoid SSR issues
    let map: { remove: () => void } | null = null;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current) return;

      map = L.map(mapRef.current, {
        center: [0, 0],
        zoom: 3,
        minZoom: 2,
        maxZoom: 8,
        crs: L.CRS.Simple,
      });

      // Simple background
      L.rectangle([[-4096, -4096], [4096, 4096]], {
        color: "#1a2030",
        fillColor: "#121820",
        fillOpacity: 1,
      }).addTo(map);

      // Example markers for major cities
      const cities = [
        { name: "Ragni", x: -855, z: -1540 },
        { name: "Detlas", x: 459, z: -1580 },
        { name: "Almuj", x: 928, z: -1789 },
        { name: "Nesaak", x: 89, z: -756 },
        { name: "Troms", x: -818, z: -476 },
      ];

      cities.forEach((city) => {
        const marker = L.circleMarker([city.z / 100, city.x / 100], {
          radius: 8,
          color: "#f5c542",
          fillColor: "#f5c542",
          fillOpacity: 0.8,
          weight: 2,
        }).addTo(map as L.Map);
        marker.bindTooltip(city.name, { permanent: false });
      });
    };

    initMap();

    return () => {
      if (map) map.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 z-10 bg-bg-secondary/90 border border-bg-elevated rounded-lg p-3 backdrop-blur-sm">
        <h2 className="font-heading font-bold text-text-primary text-sm mb-2">World Map</h2>
        <p className="text-text-muted text-xs">Wynncraft World</p>
      </div>
    </div>
  );
}
