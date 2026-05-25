import type { MealType, SimulatorState } from "@/types/digestion";

export const mealProfiles: Record<
  MealType,
  {
    label: { en: string; zh: string };
    description: { en: string; zh: string };
    state: SimulatorState;
  }
> = {
  fat: {
    label: { en: "High Fat Meal", zh: "高脂餐" },
    description: { en: "Maximizes CCK, bile release and chylomicron flow.", zh: "显著提升 CCK、胆汁释放和乳糜微粒转运。" },
    state: {
      pH: 4.1,
      gastricEmptying: 38,
      bileRelease: 92,
      pancreaticEnzymes: 86,
      satiety: 88,
      gastrin: 42,
      secretin: 62,
      cck: 94,
      gip: 72
    }
  },
  protein: {
    label: { en: "High Protein Meal", zh: "高蛋白餐" },
    description: { en: "Stimulates gastrin, pepsin activity and pancreatic proteases.", zh: "刺激胃泌素、胃蛋白酶活性和胰蛋白酶分泌。" },
    state: {
      pH: 2.2,
      gastricEmptying: 58,
      bileRelease: 36,
      pancreaticEnzymes: 82,
      satiety: 78,
      gastrin: 88,
      secretin: 42,
      cck: 55,
      gip: 45
    }
  },
  carb: {
    label: { en: "High Carbohydrate Meal", zh: "高碳水餐" },
    description: { en: "Faster emptying with stronger GIP and glucose absorption.", zh: "排空更快，GIP 与葡萄糖吸收更明显。" },
    state: {
      pH: 3.3,
      gastricEmptying: 76,
      bileRelease: 28,
      pancreaticEnzymes: 62,
      satiety: 58,
      gastrin: 48,
      secretin: 45,
      cck: 32,
      gip: 82
    }
  },
  mixed: {
    label: { en: "Mixed Meal", zh: "混合餐" },
    description: { en: "Balanced acid, bile, enzyme and incretin response.", zh: "酸、胆汁、胰酶和肠促胰素反应较均衡。" },
    state: {
      pH: 3.0,
      gastricEmptying: 61,
      bileRelease: 67,
      pancreaticEnzymes: 74,
      satiety: 72,
      gastrin: 64,
      secretin: 59,
      cck: 66,
      gip: 64
    }
  }
};
