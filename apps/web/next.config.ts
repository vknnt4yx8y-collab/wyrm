import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crafatar.com",
      },
      {
        protocol: "https",
        hostname: "minotar.net",
      },
      {
        protocol: "https",
        hostname: "wynncraft.com",
      },
      {
        protocol: "https",
        hostname: "cdn.wynncraft.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v3/:path*",
        destination: `${process.env.API_URL || "http://localhost:3001"}/api/v3/:path*`,
      },
    ];
  },
};

export default nextConfig;
