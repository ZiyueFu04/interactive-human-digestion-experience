"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { organs } from "@/data/digestion";
import { useDigestionStore } from "@/store/use-digestion-store";
import type { OrganId } from "@/types/digestion";

gsap.registerPlugin(ScrollTrigger);

export function ScrollDirector() {
  const setActiveOrgan = useDigestionStore((state) => state.setActiveOrgan);
  const setJourneyProgress = useDigestionStore((state) => state.setJourneyProgress);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setJourneyProgress(self.progress)
    });

    const triggers = organs.map((organ) =>
      ScrollTrigger.create({
        trigger: `[data-organ-section="${organ.id}"]`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveOrgan(organ.id as OrganId),
        onEnterBack: () => setActiveOrgan(organ.id as OrganId)
      })
    );

    return () => {
      progressTrigger.kill();
      triggers.forEach((trigger) => trigger.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [setActiveOrgan, setJourneyProgress]);

  return null;
}
