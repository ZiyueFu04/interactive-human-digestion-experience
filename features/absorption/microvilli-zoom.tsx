"use client";

import { motion } from "framer-motion";

export function MicrovilliZoom() {
  return (
    <section className="px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm text-cyan-glow">Absorption Zoom / 吸收放大</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">Circular folds to microvilli.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ["Circular folds", "环形皱襞", 6, "#48f4ff"],
            ["Villi", "肠绒毛", 18, "#ffd15c"],
            ["Microvilli", "微绒毛", 42, "#65f58b"]
          ].map(([en, zh, count, color]) => (
            <div key={en} className="glass rounded-lg p-5">
              <div className="relative h-72 overflow-hidden rounded-lg bg-black/35">
                {Array.from({ length: Number(count) }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute bottom-0 rounded-t-full"
                    style={{
                      left: `${(index / Number(count)) * 100}%`,
                      width: `${Math.max(3, 42 / Number(count))}%`,
                      height: `${32 + (index % 5) * 8}%`,
                      background: `${color}30`,
                      border: `1px solid ${color}66`,
                      boxShadow: `0 0 22px ${color}33`
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2 + (index % 4) * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
                <motion.div
                  className="absolute left-1/3 top-16 h-4 w-4 rounded-full bg-acid shadow-acid-glow"
                  animate={{ x: [0, 130], y: [0, 45], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{en}</h3>
              <p className="text-white/42">{zh}</p>
              <p className="mt-3 text-sm text-white/58">
                {en === "Microvilli"
                  ? "Glucose enters capillaries; lipids enter lacteals."
                  : "Surface area expands before molecular absorption."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
