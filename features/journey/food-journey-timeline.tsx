"use client";

import { motion } from "framer-motion";
import { journeyStages } from "@/data/digestion";
import { useDigestionStore } from "@/store/use-digestion-store";

export function FoodJourneyTimeline() {
  const progress = useDigestionStore((state) => state.journeyProgress);

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm text-cyan-glow">Food Journey Timeline / 食物推进时间轴</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Bolus to waste, state by state.</h2>
          </div>
          <div className="font-mono text-sm text-white/50">Journey {(progress * 100).toFixed(0)}%</div>
        </div>
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <div className="absolute left-8 right-8 top-16 h-px bg-white/10" />
          <motion.div
            className="absolute left-8 top-16 h-px bg-cyan-glow shadow-glow"
            style={{ width: `calc((100% - 4rem) * ${progress})` }}
          />
          <div className="grid gap-5 md:grid-cols-4">
            {journeyStages.map((stage) => {
              const active = progress >= stage.progress - 0.18;
              return (
                <motion.div
                  key={stage.id}
                  animate={{ opacity: active ? 1 : 0.42, y: active ? 0 : 8 }}
                  className="relative rounded-lg border border-white/10 bg-black/28 p-5 backdrop-blur"
                >
                  <div className="mb-5 h-4 w-4 rounded-full bg-cyan-glow shadow-glow" />
                  <h3 className="text-xl font-semibold text-white">{stage.label.en}</h3>
                  <p className="text-sm text-white/45">{stage.label.zh}</p>
                  <p className="mt-4 text-sm leading-6 text-white/62">{stage.description.en}</p>
                  <p className="mt-2 text-sm leading-6 text-white/42">{stage.description.zh}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
