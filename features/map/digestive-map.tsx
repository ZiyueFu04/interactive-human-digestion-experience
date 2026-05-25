"use client";

import { motion } from "framer-motion";
import { Activity, MapPin } from "lucide-react";
import { organs } from "@/data/digestion";
import { cn } from "@/lib/utils";
import { useDigestionStore } from "@/store/use-digestion-store";
import type { OrganId } from "@/types/digestion";

export function DigestiveMap() {
  const activeOrgan = useDigestionStore((state) => state.activeOrgan);
  const setActiveOrgan = useDigestionStore((state) => state.setActiveOrgan);

  const jump = (id: OrganId) => {
    setActiveOrgan(id);
    document.querySelector(`[data-organ-section="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="map" className="relative min-h-screen px-5 py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-cyan-glow">
            <MapPin className="h-4 w-4" />
            Human Digestive Map / 人体消化地图
          </div>
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Follow the active lumen, not a slide deck.
            <span className="mt-3 block text-2xl text-white/50 sm:text-4xl">沿着管腔旅行，而不是翻页。</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/62">
            Each organ lights up as the food state changes: bolus, chyme, nutrients and waste. Hover or click a node to reveal its role in the system.
            <span className="mt-2 block text-white/44">每个器官都会随食物状态变化而激活：食团、食糜、营养分子与废物。</span>
          </p>
        </div>

        <div className="glass relative min-h-[680px] overflow-hidden rounded-lg p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(72,244,255,0.1),transparent_55%)]" />
          <svg viewBox="0 0 100 100" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]">
            <path
              d="M50 8 C50 20 50 27 50 34 C61 42 59 53 50 58 C39 64 39 74 50 78 C62 83 58 91 50 94"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <motion.path
              d="M50 8 C50 20 50 27 50 34 C61 42 59 53 50 58 C39 64 39 74 50 78 C62 83 58 91 50 94"
              fill="none"
              stroke="url(#digestiveGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0.12 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="digestiveGradient" x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#48f4ff" />
                <stop offset="0.45" stopColor="#ff7474" />
                <stop offset="0.75" stopColor="#ffd15c" />
                <stop offset="1" stopColor="#65f58b" />
              </linearGradient>
            </defs>
          </svg>

          {organs.map((organ) => {
            const isActive = organ.id === activeOrgan;
            return (
              <button
                key={organ.id}
                type="button"
                onMouseEnter={() => setActiveOrgan(organ.id)}
                onClick={() => jump(organ.id)}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 text-left"
                style={{ left: `${organ.position.x}%`, top: `${organ.position.y}%` }}
              >
                <span
                  className={cn(
                    "block h-4 w-4 rounded-full border border-white/40 transition",
                    isActive ? "scale-150 bg-white shadow-glow" : "bg-white/30"
                  )}
                  style={{ boxShadow: isActive ? `0 0 34px ${organ.color}` : undefined }}
                />
                <span
                  className={cn(
                    "mt-3 block min-w-32 rounded-md border px-3 py-2 text-xs transition",
                    isActive ? "border-white/20 bg-white/12 text-white" : "border-white/8 bg-black/30 text-white/54"
                  )}
                >
                  <span className="block font-medium">{organ.name.en}</span>
                  <span className="block text-white/50">{organ.name.zh}</span>
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-5 left-5 right-5 z-20 rounded-lg border border-white/10 bg-black/30 p-4 backdrop-blur">
            <div className="flex items-center gap-3 text-sm text-white">
              <Activity className="h-4 w-4 text-cyan-glow" />
              <span>{organs.find((organ) => organ.id === activeOrgan)?.journeyState.en}</span>
              <span className="text-white/42">{organs.find((organ) => organ.id === activeOrgan)?.journeyState.zh}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
