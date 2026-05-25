"use client";

import { create } from "zustand";
import type { HormoneId, MealType, OrganId } from "@/types/digestion";

type DigestionStore = {
  activeOrgan: OrganId;
  activeHormone: HormoneId | null;
  journeyProgress: number;
  selectedMeal: MealType;
  microView: "macro" | "villi" | "microvilli" | "lipid";
  setActiveOrgan: (organ: OrganId) => void;
  setActiveHormone: (hormone: HormoneId | null) => void;
  setJourneyProgress: (progress: number) => void;
  setSelectedMeal: (meal: MealType) => void;
  setMicroView: (view: DigestionStore["microView"]) => void;
};

export const useDigestionStore = create<DigestionStore>((set) => ({
  activeOrgan: "mouth",
  activeHormone: null,
  journeyProgress: 0,
  selectedMeal: "mixed",
  microView: "macro",
  setActiveOrgan: (activeOrgan) => set({ activeOrgan }),
  setActiveHormone: (activeHormone) => set({ activeHormone }),
  setJourneyProgress: (journeyProgress) => set({ journeyProgress }),
  setSelectedMeal: (selectedMeal) => set({ selectedMeal }),
  setMicroView: (microView) => set({ microView })
}));
