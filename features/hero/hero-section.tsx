"use client";

import { ArrowDown, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DigestiveScene } from "@/three/digestive-scene";

export function HeroSection() {
  const start = () => document.getElementById("map")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-radial-grid bg-[length:100%_100%,100%_100%,48px_48px,48px_48px] px-5">
      <div className="absolute inset-0 opacity-70">
        <DigestiveScene />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#030712] to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start"
      >
        <div className="mb-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-glow">
          Food Journey Through the Human Body
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[0.96] text-white sm:text-7xl lg:text-8xl">
          From Food to Molecules
          <span className="mt-4 block text-3xl text-white/68 sm:text-5xl">从食物到分子</span>
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
          An Interactive Journey Through Human Digestion
          <span className="block text-white/52">人体消化系统交互式旅程</span>
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button onClick={start}>
            <Play className="h-4 w-4 fill-current" />
            Start Digestion
            <span className="text-slate-950/60">开始消化</span>
          </Button>
          <Button variant="outline" onClick={() => document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" })}>
            <ArrowDown className="h-4 w-4" />
            Simulator
            <span className="text-white/48">模拟器</span>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
