"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Cross, FlaskConical, Waves } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Organ } from "@/types/digestion";

export function OrganSection({ organ, index }: { organ: Organ; index: number }) {
  const [open, setOpen] = useState(organ.modules[0].key);

  return (
    <section data-organ-section={organ.id} className="min-h-screen px-5 py-28">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="font-mono text-sm text-white/40">0{index + 1} / Organ Module</p>
          <h2 className="mt-4 text-5xl font-semibold text-white">
            {organ.name.en}
            <span className="mt-2 block text-3xl text-white/42">{organ.name.zh}</span>
          </h2>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-5 flex items-center gap-2 text-sm text-white/60">
              <Waves className="h-4 w-4" style={{ color: organ.color }} />
              {organ.journeyState.en} / {organ.journeyState.zh}
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-black/30">
              <motion.div
                className="absolute inset-x-8 top-1/2 h-16 -translate-y-1/2 rounded-full blur-xl"
                animate={{ x: ["-20%", "20%", "-20%"], opacity: [0.32, 0.72, 0.32] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: organ.color }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                animate={{ scale: [0.92, 1.1, 0.92], rotate: 360 }}
                transition={{ duration: organ.id === "stomach" ? 2 : 5, repeat: Infinity, ease: "linear" }}
                style={{ borderColor: organ.color, boxShadow: `0 0 50px ${organ.color}33` }}
              />
              {organ.id === "stomach" && (
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-3 text-xs">
                  <StatusPill label="pH" value="2.0" tone="acid" />
                  <StatusPill label="Pepsin" value="Activated" tone="protein" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {organ.modules.map((module) => {
            const isOpen = open === module.key;
            return (
              <Card key={module.key} className={cn("overflow-hidden transition", isOpen && "border-white/20")}>
                <button
                  type="button"
                  onClick={() => setOpen(module.key)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span>
                    <span className="block text-lg font-semibold text-white">{module.title.en}</span>
                    <span className="text-sm text-white/42">{module.title.zh}</span>
                  </span>
                  <ChevronDown className={cn("h-5 w-5 text-white/48 transition", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                    >
                      <CardContent>
                        <p className="text-base leading-7 text-white/68">{module.summary.en}</p>
                        <p className="mt-2 text-base leading-7 text-white/44">{module.summary.zh}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {module.terms.map((term) => (
                            <span key={`${module.key}-${term.en}`} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
                              {term.en}
                              <span className="ml-2 text-white/40">{term.zh}</span>
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}

          <div className="grid gap-4 md:grid-cols-2">
            {organ.clinical.map((item) => (
              <Card key={item.title.en} className="border-red-300/15">
                <CardContent className="pt-5">
                  <div className="mb-3 flex items-center gap-2 text-sm text-red-200">
                    <Cross className="h-4 w-4" />
                    Clinical Correlation / 临床关联
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title.en}</h3>
                  <p className="text-sm text-white/42">{item.title.zh}</p>
                  <p className="mt-4 text-sm leading-6 text-white/62">{item.mechanism.en}</p>
                  <p className="mt-2 text-sm leading-6 text-white/42">{item.mechanism.zh}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusPill({ label, value, tone }: { label: string; value: string; tone: "acid" | "protein" }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/45 p-3 backdrop-blur">
      <div className="flex items-center gap-2 text-white/48">
        <FlaskConical className={cn("h-3.5 w-3.5", tone === "acid" ? "text-acid" : "text-protein")} />
        {label}
      </div>
      <div className="mt-1 font-mono text-lg text-white">{value}</div>
    </div>
  );
}
