"use client";

import { MicrovilliZoom } from "@/features/absorption/microvilli-zoom";
import { ScrollDirector } from "@/features/experience/scroll-director";
import { HeroSection } from "@/features/hero/hero-section";
import { HormoneNetwork } from "@/features/hormones/hormone-network";
import { FoodJourneyTimeline } from "@/features/journey/food-journey-timeline";
import { KnowledgeGraph } from "@/features/knowledge/knowledge-graph";
import { LipidDigestionLab } from "@/features/lipid/lipid-digestion-lab";
import { DigestiveMap } from "@/features/map/digestive-map";
import { OrganSection } from "@/features/organs/organ-section";
import { DigestionSimulator } from "@/features/simulator/digestion-simulator";
import { organs } from "@/data/digestion";

export function ExperienceClient() {
  return (
    <main className="min-h-screen overflow-hidden">
      <ScrollDirector />
      <HeroSection />
      <DigestiveMap />
      <FoodJourneyTimeline />
      {organs.map((organ, index) => (
        <OrganSection key={organ.id} organ={organ} index={index} />
      ))}
      <LipidDigestionLab />
      <MicrovilliZoom />
      <HormoneNetwork />
      <KnowledgeGraph />
      <DigestionSimulator />
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-cyan-glow">Journey complete / 旅程完成</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Digestion is a coordinated system, not isolated organs.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/52">
            Motility, secretion, enzymes, absorption, hormones, nerves and clinical risk all move together.
          </p>
        </div>
      </section>
    </main>
  );
}
