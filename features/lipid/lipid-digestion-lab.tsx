"use client";

import { motion } from "framer-motion";
import { useDigestionStore } from "@/store/use-digestion-store";

const steps = [
  { en: "Fat droplet", zh: "脂滴", color: "#ffd15c" },
  { en: "Emulsification", zh: "乳化", color: "#65f58b" },
  { en: "Micelle", zh: "胶束", color: "#48f4ff" },
  { en: "Enterocyte", zh: "肠上皮细胞", color: "#b28cff" },
  { en: "Chylomicron", zh: "乳糜微粒", color: "#ff9f6e" },
  { en: "Lymphatic lacteal", zh: "淋巴乳糜管", color: "#ff7474" }
];

export function LipidDigestionLab() {
  const setMicroView = useDigestionStore((state) => state.setMicroView);

  return (
    <section className="px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm text-cyan-glow">Lipid Digestion / 脂肪消化</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">From droplet to lymph.</h2>
          <p className="mt-5 text-white/58">Bile salts turn hydrophobic fat into transportable micelles, then enterocytes rebuild triglycerides into chylomicrons for lymphatic transport.</p>
          <p className="mt-2 text-white/38">胆盐将疏水脂肪转为可运输胶束，肠上皮细胞再合成乳糜微粒并送入淋巴。</p>
        </div>

        <div className="glass grid gap-6 rounded-lg p-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[430px] overflow-hidden rounded-lg bg-black/32">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,209,92,0.13),transparent_55%)]" />
            {steps.map((step, index) => (
              <motion.div
                key={step.en}
                className="absolute rounded-full border border-white/20"
                style={{
                  width: 46 - index * 3,
                  height: 46 - index * 3,
                  background: `${step.color}30`,
                  boxShadow: `0 0 34px ${step.color}55`
                }}
                animate={{
                  x: [`${12 + index * 12}%`, `${24 + index * 11}%`, `${68 + index * 3}%`],
                  y: [`${44 + Math.sin(index) * 16}%`, `${28 + index * 5}%`, `${62 - index * 6}%`],
                  scale: index === 0 ? [1.5, 0.8, 0.6] : [0.6, 1.1, 0.85]
                }}
                transition={{ duration: 6.5, repeat: Infinity, delay: index * 0.24, ease: "easeInOut" }}
              />
            ))}
            <motion.div
              className="absolute bottom-0 right-[18%] h-72 w-28 rounded-t-full border border-cyan-glow/40 bg-cyan-glow/10"
              animate={{ opacity: [0.42, 0.9, 0.42] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <button
                key={step.en}
                type="button"
                onClick={() => setMicroView(index < 2 ? "lipid" : "microvilli")}
                className="flex w-full items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.07]"
              >
                <span className="h-3 w-3 rounded-full" style={{ background: step.color, boxShadow: `0 0 18px ${step.color}` }} />
                <span>
                  <span className="block text-sm font-medium text-white">{step.en}</span>
                  <span className="text-sm text-white/42">{step.zh}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
