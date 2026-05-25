export type BilingualText = {
  en: string;
  zh: string;
};

export type OrganId =
  | "mouth"
  | "pharynx"
  | "esophagus"
  | "stomach"
  | "small-intestine"
  | "pancreas"
  | "liver"
  | "gallbladder"
  | "colon"
  | "rectum";

export type OrganModuleKey =
  | "anatomy"
  | "motor"
  | "secretory"
  | "digestive"
  | "absorptive"
  | "hormonal"
  | "clinical";

export type OrganModule = {
  key: OrganModuleKey;
  title: BilingualText;
  summary: BilingualText;
  terms: BilingualText[];
};

export type ClinicalCorrelation = {
  title: BilingualText;
  mechanism: BilingualText;
  risk: "low" | "moderate" | "high";
};

export type Organ = {
  id: OrganId;
  name: BilingualText;
  position: { x: number; y: number };
  color: string;
  journeyState: BilingualText;
  modules: OrganModule[];
  clinical: ClinicalCorrelation[];
};

export type JourneyStage = {
  id: string;
  label: BilingualText;
  description: BilingualText;
  organ: OrganId;
  progress: number;
};

export type HormoneId =
  | "gastrin"
  | "secretin"
  | "cck"
  | "gip"
  | "motilin"
  | "ghrelin"
  | "somatostatin";

export type Hormone = {
  id: HormoneId;
  name: string;
  zh: string;
  secretedBy: BilingualText;
  function: BilingualText;
  target: BilingualText;
  color: string;
  relatedOrgans: OrganId[];
};

export type MealType = "fat" | "protein" | "carb" | "mixed";

export type SimulatorState = {
  pH: number;
  gastricEmptying: number;
  bileRelease: number;
  pancreaticEnzymes: number;
  satiety: number;
  gastrin: number;
  secretin: number;
  cck: number;
  gip: number;
};
