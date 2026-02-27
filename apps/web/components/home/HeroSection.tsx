"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useServerStatus } from "@/lib/hooks/useServerStatus";
import { Users } from "lucide-react";

export function HeroSection() {
  const { status } = useServerStatus();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; size: number; speedY: number; opacity: number; color: string;
    }> = [];

    const colors = ["#f5c542", "#5555ff", "#aa55ff", "#55ffff"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.5 + 0.1),
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1;
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/30 to-bg-primary pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,197,66,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Server status */}
        {status && (
          <div className="inline-flex items-center gap-2 bg-bg-card/80 border border-accent-green/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <Users className="w-4 h-4 text-accent-green" />
            <span className="text-accent-green font-medium text-sm">
              {status.onlinePlayers.toLocaleString()} Players Online
            </span>
          </div>
        )}

        {/* Main title */}
        <h1
          className="text-7xl md:text-9xl font-heading font-bold mb-4 tracking-wider"
          style={{
            color: "#f5c542",
            textShadow: "0 0 30px rgba(245,197,66,0.5), 0 0 60px rgba(245,197,66,0.3)",
          }}
        >
          WYNNCRAFT
        </h1>

        <p className="text-2xl md:text-3xl text-text-secondary font-heading mb-8 tracking-wide">
          The Minecraft MMORPG
        </p>

        <p className="text-text-muted max-w-xl mx-auto mb-12 text-lg">
          Embark on an epic adventure in the largest Minecraft MMORPG. 
          Choose your class, complete quests, conquer dungeons, and forge your legend.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="minecraft://play.wynncraft.com"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            ⚔️ Play Now
          </a>
          <Link
            href="/help"
            className="btn-secondary text-lg px-8 py-4 inline-flex items-center gap-2"
          >
            Learn More
          </Link>
        </div>

        {/* Server IP */}
        <p className="mt-8 text-text-muted text-sm font-mono">
          Java Edition · play.wynncraft.com
        </p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted animate-bounce">
        <div className="w-0.5 h-8 bg-gradient-to-b from-accent-gold/50 to-transparent" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
