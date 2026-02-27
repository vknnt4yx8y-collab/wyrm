import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { ToastProvider } from "@/components/shared/Toast";

export const metadata: Metadata = {
  title: {
    default: "Wynncraft - The Minecraft MMORPG",
    template: "%s | Wynncraft",
  },
  description:
    "Wynncraft is the largest and most advanced Minecraft MMORPG server. Play for free without mods on play.wynncraft.com",
  keywords: ["wynncraft", "minecraft mmorpg", "minecraft server", "rpg"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wynncraft.com",
    siteName: "Wynncraft",
    title: "Wynncraft - The Minecraft MMORPG",
    description: "The largest and most advanced Minecraft MMORPG. Play for free!",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wynncraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wynncraft",
    creator: "@wynncraft",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ToastProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
