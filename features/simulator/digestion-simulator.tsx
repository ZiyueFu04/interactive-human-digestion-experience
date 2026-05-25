"use client";

import { motion } from "framer-motion";
import { Flame, Gauge, Salad, Soup, Waves, type LucideIcon } from "lucide-react";
import { mealProfiles } from "@/data/simulator";
import { cn } from "@/lib/utils";
import { useDigestionStore } from "@/store/use-digestion-store";
import type { MealType } from "@/types/digestion";

const icons: Record<MealType, LucideIcon> = {
  fat: Flame,
  protein: Soup,
  carb: Gauge,
  mixed: Salad
};

export function DigestionSimulator() {
  const selectedMeal = useDigestionStore((state) => state.selectedMeal);
  const setSelectedMeal = useDigestionStore((state) => state.setSelectedMeal);
  const profile = mealProfiles[selectedMeal];
  const state = profile.state;

  return (
    <section id="simulator" className="px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm text-cyan-glow">Digestion Simulator / 消化模拟器</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">Change the meal, change the system.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="space-y-3">
            {(Object.keys(mealProfiles) as MealType[]).map((meal) => {
              const Icon = icons[meal];
              const active = meal === selectedMeal;
              return (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setSelectedMeal(meal)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition",
                    active ? "border-cyan-glow/50 bg-cyan-glow/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-cyan-glow" : "text-white/50")} />
                  <span>
                    <span className="block text-sm font-medium text-white">{mealProfiles[meal].label.en}</span>
                    <span className="text-sm text-white/42">{mealProfiles[meal].label.zh}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="glass rounded-lg p-5">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-white">{profile.label.en}</h3>
                <p className="text-white/42">{profile.label.zh}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">{profile.description.en}</p>
                <p className="text-sm leading-6 text-white/38">{profile.description.zh}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-4 font-mono">
                <div className="text-xs text-white/40">Gastric pH / 胃 pH</div>
                <motion.div key={state.pH} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-4xl text-acid">
                  {state.pH.toFixed(1)}
                </motion.div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Metric label="Gastric emptying" zh="胃排空速度" value={state.gastricEmptying} />
              <Metric label="Bile release" zh="胆汁释放" value={state.bileRelease} />
              <Metric label="Pancreatic enzymes" zh="胰酶变化" value={state.pancreaticEnzymes} />
              <Metric label="Satiety" zh="饱腹感" value={state.satiety} />
              <Metric label="Gastrin" zh="胃泌素" value={state.gastrin} />
              <Metric label="Secretin" zh="促胰液素" value={state.secretin} />
              <Metric label="CCK" zh="胆囊收缩素" value={state.cck} />
              <Metric label="GIP" zh="胃抑制肽" value={state.gip} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, zh, value }: { label: string; zh: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/24 p-4">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-white">{label}</div>
          <div className="text-xs text-white/38">{zh}</div>
        </div>
        <Waves className="h-4 w-4 text-cyan-glow" />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-cyan-glow shadow-glow"
          initial={false}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
      </div>
      <div className="mt-2 font-mono text-xs text-white/42">{value}%</div>
    </div>
  );
}
