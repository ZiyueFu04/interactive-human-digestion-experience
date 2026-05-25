import type { JourneyStage, Organ } from "@/types/digestion";

const moduleTitles = {
  anatomy: { en: "Anatomy", zh: "解剖结构" },
  motor: { en: "Motor Function", zh: "运动功能" },
  secretory: { en: "Secretory Function", zh: "分泌功能" },
  digestive: { en: "Digestive Function", zh: "消化功能" },
  absorptive: { en: "Absorptive Function", zh: "吸收功能" },
  hormonal: { en: "Hormonal Regulation", zh: "激素调控" },
  clinical: { en: "Clinical Correlation", zh: "临床关联" }
} as const;

function modules(seed: {
  anatomy: [string, string];
  motor: [string, string];
  secretory: [string, string];
  digestive: [string, string];
  absorptive: [string, string];
  hormonal: [string, string];
  clinical: [string, string];
  terms: [string, string][];
}) {
  return Object.entries(moduleTitles).map(([key, title]) => ({
    key: key as keyof typeof moduleTitles,
    title,
    summary: {
      en: seed[key as keyof typeof moduleTitles][0],
      zh: seed[key as keyof typeof moduleTitles][1]
    },
    terms: seed.terms.map(([en, zh]) => ({ en, zh }))
  }));
}

export const organs: Organ[] = [
  {
    id: "mouth",
    name: { en: "Mouth", zh: "口腔" },
    position: { x: 50, y: 10 },
    color: "#48f4ff",
    journeyState: { en: "Bolus formation", zh: "食团形成" },
    modules: modules({
      anatomy: ["Teeth, tongue and salivary glands initiate the journey.", "牙齿、舌和唾液腺启动食物旅程。"],
      motor: ["Mastication increases surface area and shapes a swallowable bolus.", "咀嚼增加表面积，并形成可吞咽食团。"],
      secretory: ["Saliva lubricates food and buffers the oral cavity.", "唾液润滑食物并缓冲口腔环境。"],
      digestive: ["Salivary amylase begins starch digestion; lingual lipase starts lipid priming.", "唾液淀粉酶开始淀粉消化；舌脂肪酶预处理脂质。"],
      absorptive: ["Minimal nutrient absorption occurs here.", "此处营养吸收很少。"],
      hormonal: ["Cephalic phase signals prepare stomach acid and motility.", "头期反射为胃酸分泌和胃运动做准备。"],
      clinical: ["Xerostomia reduces bolus lubrication and oral digestion.", "口干会降低食团润滑和口腔消化效率。"],
      terms: [["Mastication", "咀嚼"], ["Salivary amylase", "唾液淀粉酶"], ["Lingual lipase", "舌脂肪酶"]]
    }),
    clinical: [
      {
        title: { en: "Xerostomia", zh: "口干症" },
        mechanism: { en: "Low saliva impairs lubrication, buffering and starch digestion.", zh: "唾液减少会损害润滑、缓冲和淀粉初步消化。" },
        risk: "moderate"
      }
    ]
  },
  {
    id: "pharynx",
    name: { en: "Pharynx", zh: "咽" },
    position: { x: 50, y: 18 },
    color: "#7ef7d4",
    journeyState: { en: "Swallowing reflex", zh: "吞咽反射" },
    modules: modules({
      anatomy: ["A muscular crossroad connecting oral cavity and esophagus.", "连接口腔与食管的肌性通道。"],
      motor: ["Coordinated swallowing protects the airway and moves bolus downward.", "协调吞咽保护气道，并推动食团向下。"],
      secretory: ["Mucus maintains a low-friction passage.", "黏液维持低摩擦通道。"],
      digestive: ["No major chemical digestion occurs.", "几乎不发生主要化学消化。"],
      absorptive: ["No meaningful absorption.", "无显著吸收。"],
      hormonal: ["Primarily neural reflex control.", "主要受神经反射控制。"],
      clinical: ["Dysphagia can cause aspiration and malnutrition.", "吞咽困难可导致误吸和营养不良。"],
      terms: [["Deglutition", "吞咽"], ["Epiglottis", "会厌"], ["Aspiration", "误吸"]]
    }),
    clinical: [
      {
        title: { en: "Dysphagia", zh: "吞咽困难" },
        mechanism: { en: "Disrupted reflex timing increases aspiration risk.", zh: "反射时序紊乱会增加误吸风险。" },
        risk: "high"
      }
    ]
  },
  {
    id: "esophagus",
    name: { en: "Esophagus", zh: "食管" },
    position: { x: 50, y: 31 },
    color: "#63b3ff",
    journeyState: { en: "Peristaltic transport", zh: "蠕动运输" },
    modules: modules({
      anatomy: ["A collapsible muscular tube about 25 cm long.", "约 25 cm 长的可塌陷肌性管道。"],
      motor: ["Primary and secondary peristalsis drive bolus to the stomach.", "原发与继发蠕动将食团推向胃。"],
      secretory: ["Mucus protects mucosa from abrasion.", "黏液保护黏膜免受摩擦。"],
      digestive: ["No digestive enzyme secretion.", "不分泌主要消化酶。"],
      absorptive: ["No nutrient absorption.", "无营养吸收。"],
      hormonal: ["Lower esophageal sphincter tone coordinates reflux prevention.", "下食管括约肌张力帮助防止反流。"],
      clinical: ["GERD exposes mucosa to acid and pepsin.", "胃食管反流使黏膜暴露于酸和胃蛋白酶。"],
      terms: [["Peristalsis", "蠕动"], ["Lower esophageal sphincter", "下食管括约肌"], ["GERD", "胃食管反流病"]]
    }),
    clinical: [
      {
        title: { en: "GERD", zh: "胃食管反流病" },
        mechanism: { en: "Acid reflux injures esophageal epithelium.", zh: "酸反流损伤食管上皮。" },
        risk: "moderate"
      }
    ]
  },
  {
    id: "stomach",
    name: { en: "Stomach", zh: "胃" },
    position: { x: 58, y: 48 },
    color: "#ff7474",
    journeyState: { en: "Chyme generation", zh: "食糜生成" },
    modules: modules({
      anatomy: ["A J-shaped reservoir connecting esophagus and duodenum.", "连接食管和十二指肠的 J 形储存器。"],
      motor: ["Storage, mixing, propulsion and retropulsion regulate chyme output.", "储存、混合、推进和反推调节食糜输出。"],
      secretory: ["Parietal cells secrete HCl and intrinsic factor; chief cells release pepsinogen.", "壁细胞分泌盐酸和内因子；主细胞释放胃蛋白酶原。"],
      digestive: ["Protein digestion begins as pepsin activates at low pH.", "低 pH 激活胃蛋白酶，蛋白质消化开始。"],
      absorptive: ["Limited absorption of water, alcohol and some drugs.", "少量吸收水、酒精和部分药物。"],
      hormonal: ["Gastrin increases acid and motility; CCK, secretin and GIP slow emptying.", "胃泌素增加酸分泌和运动；CCK、促胰液素和 GIP 减慢胃排空。"],
      clinical: ["Excess acid and impaired mucus defenses can cause peptic ulcer.", "酸过多或黏液屏障受损可导致消化性溃疡。"],
      terms: [["Retropulsion", "反推运动"], ["Gastric acid", "胃酸"], ["Pepsin", "胃蛋白酶"], ["Gastric emptying", "胃排空"]]
    }),
    clinical: [
      {
        title: { en: "Peptic ulcer", zh: "消化性溃疡" },
        mechanism: { en: "Acid-pepsin injury overwhelms mucus-bicarbonate defense.", zh: "酸和胃蛋白酶损伤超过黏液-碳酸氢盐防御。" },
        risk: "high"
      }
    ]
  },
  {
    id: "small-intestine",
    name: { en: "Small Intestine", zh: "小肠" },
    position: { x: 51, y: 63 },
    color: "#ffd15c",
    journeyState: { en: "Nutrient absorption", zh: "营养吸收" },
    modules: modules({
      anatomy: ["Circular folds, villi and microvilli multiply absorptive surface.", "环形皱襞、绒毛和微绒毛显著增加吸收面积。"],
      motor: ["Segmentation mixes chyme; peristalsis advances it aborally.", "分节运动混合食糜；蠕动向远端推进。"],
      secretory: ["Brunner glands and intestinal crypts add alkaline, protective fluid.", "十二指肠腺和肠腺提供碱性保护液。"],
      digestive: ["Brush border enzymes finish carbohydrate and peptide digestion.", "刷状缘酶完成碳水和肽类消化。"],
      absorptive: ["Glucose and amino acids enter capillaries; lipids enter lacteals.", "葡萄糖和氨基酸进入毛细血管；脂质进入乳糜管。"],
      hormonal: ["Secretin, CCK, GIP and motilin coordinate secretion and transit.", "促胰液素、CCK、GIP 和胃动素协调分泌与转运。"],
      clinical: ["Villous injury reduces surface area and causes malabsorption.", "绒毛损伤减少表面积并导致吸收不良。"],
      terms: [["Segmentation", "分节运动"], ["Brush border enzymes", "刷状缘酶"], ["Villi", "肠绒毛"], ["Microvilli", "微绒毛"]]
    }),
    clinical: [
      {
        title: { en: "Malabsorption", zh: "吸收不良" },
        mechanism: { en: "Loss of villous architecture reduces nutrient uptake.", zh: "绒毛结构丢失降低营养摄取。" },
        risk: "high"
      }
    ]
  },
  {
    id: "pancreas",
    name: { en: "Pancreas", zh: "胰腺" },
    position: { x: 64, y: 57 },
    color: "#65f58b",
    journeyState: { en: "Enzyme and bicarbonate release", zh: "酶与碳酸氢盐释放" },
    modules: modules({
      anatomy: ["Acinar and duct cells drain into the duodenum.", "腺泡细胞和导管细胞分泌物进入十二指肠。"],
      motor: ["Duct flow is coupled to duodenal chyme signals.", "导管液流与十二指肠食糜信号耦联。"],
      secretory: ["Acini secrete enzymes; ducts secrete bicarbonate.", "腺泡分泌消化酶；导管分泌碳酸氢盐。"],
      digestive: ["Proteases, amylase and lipase digest macromolecules.", "蛋白酶、淀粉酶和脂肪酶消化大分子。"],
      absorptive: ["Supports absorption by generating absorbable molecules.", "通过生成可吸收分子来支持吸收。"],
      hormonal: ["Secretin drives bicarbonate; CCK drives enzyme secretion.", "促胰液素促进碳酸氢盐；CCK 促进酶分泌。"],
      clinical: ["Premature enzyme activation can trigger pancreatitis.", "酶过早激活可诱发胰腺炎。"],
      terms: [["Pancreatic enzymes", "胰酶"], ["Bicarbonate", "碳酸氢盐"], ["Trypsin", "胰蛋白酶"]]
    }),
    clinical: [
      {
        title: { en: "Pancreatitis", zh: "胰腺炎" },
        mechanism: { en: "Premature protease activation injures pancreatic tissue.", zh: "蛋白酶过早激活损伤胰腺组织。" },
        risk: "high"
      }
    ]
  },
  {
    id: "liver",
    name: { en: "Liver", zh: "肝" },
    position: { x: 39, y: 50 },
    color: "#b28cff",
    journeyState: { en: "Bile synthesis and metabolism", zh: "胆汁合成与代谢" },
    modules: modules({
      anatomy: ["Hepatic lobules produce bile and process absorbed nutrients.", "肝小叶产生胆汁并处理吸收后的营养物。"],
      motor: ["Bile flows through ducts toward the gallbladder and duodenum.", "胆汁经胆道流向胆囊和十二指肠。"],
      secretory: ["Bile salts, pigments, cholesterol and electrolytes form bile.", "胆盐、胆色素、胆固醇和电解质组成胆汁。"],
      digestive: ["Bile salts emulsify fats and enable micelle formation.", "胆盐乳化脂肪并促进胶束形成。"],
      absorptive: ["Enterohepatic circulation recycles bile acids from ileum.", "肠肝循环从回肠回收胆汁酸。"],
      hormonal: ["CCK and secretin coordinate bile delivery.", "CCK 和促胰液素协调胆汁输送。"],
      clinical: ["Bile flow obstruction causes jaundice and fat malabsorption.", "胆汁流出受阻可导致黄疸和脂肪吸收不良。"],
      terms: [["Bile salts", "胆盐"], ["Micelles", "胶束"], ["Enterohepatic circulation", "肠肝循环"]]
    }),
    clinical: [
      {
        title: { en: "Cholestasis", zh: "胆汁淤积" },
        mechanism: { en: "Reduced bile delivery limits lipid digestion and bilirubin excretion.", zh: "胆汁输送减少限制脂质消化和胆红素排泄。" },
        risk: "moderate"
      }
    ]
  },
  {
    id: "gallbladder",
    name: { en: "Gallbladder", zh: "胆囊" },
    position: { x: 47, y: 55 },
    color: "#a3ff65",
    journeyState: { en: "Bile concentration and release", zh: "胆汁浓缩与释放" },
    modules: modules({
      anatomy: ["Stores and concentrates bile between meals.", "在餐间储存并浓缩胆汁。"],
      motor: ["CCK contracts the gallbladder and relaxes the sphincter pathway.", "CCK 促使胆囊收缩并协调括约肌通路。"],
      secretory: ["No enzyme secretion; concentrates bile by ion and water reabsorption.", "不分泌酶；通过离子和水重吸收浓缩胆汁。"],
      digestive: ["Released bile emulsifies lipid droplets in the duodenum.", "释放的胆汁在十二指肠乳化脂滴。"],
      absorptive: ["Indirectly supports lipid and fat-soluble vitamin absorption.", "间接支持脂质和脂溶性维生素吸收。"],
      hormonal: ["CCK rises after fatty acids and amino acids enter duodenum.", "脂肪酸和氨基酸进入十二指肠后 CCK 升高。"],
      clinical: ["Gallstones can block bile flow and cause biliary colic.", "胆结石可阻塞胆流并引起胆绞痛。"],
      terms: [["Emulsification", "乳化"], ["Gallstones", "胆结石"], ["Cholecystokinin", "胆囊收缩素"]]
    }),
    clinical: [
      {
        title: { en: "Gallstones", zh: "胆结石" },
        mechanism: { en: "Crystallized bile components obstruct the cystic or common bile duct.", zh: "胆汁成分结晶阻塞胆囊管或胆总管。" },
        risk: "moderate"
      }
    ]
  },
  {
    id: "colon",
    name: { en: "Large Intestine", zh: "大肠" },
    position: { x: 50, y: 76 },
    color: "#ff9f6e",
    journeyState: { en: "Water recovery and microbiota processing", zh: "水分回收与菌群处理" },
    modules: modules({
      anatomy: ["Frames the small intestine and houses dense microbiota.", "环绕小肠并容纳大量肠道菌群。"],
      motor: ["Haustral churning and mass movements shape fecal transit.", "袋状收缩和集团运动塑造粪便转运。"],
      secretory: ["Goblet cells secrete mucus for lubrication.", "杯状细胞分泌黏液用于润滑。"],
      digestive: ["Bacteria ferment residues and produce short-chain fatty acids.", "细菌发酵残渣并产生短链脂肪酸。"],
      absorptive: ["Absorbs water, electrolytes and bacterial metabolites.", "吸收水、电解质和细菌代谢产物。"],
      hormonal: ["Motility integrates ENS, autonomic and local chemical signals.", "运动整合 ENS、自主神经和局部化学信号。"],
      clinical: ["Excess water loss causes constipation; low absorption causes diarrhea.", "水分过度丢失可致便秘；吸收不足可致腹泻。"],
      terms: [["Water absorption", "水分吸收"], ["Microbiota", "肠道菌群"], ["Mass movement", "集团运动"]]
    }),
    clinical: [
      {
        title: { en: "Constipation / diarrhea", zh: "便秘 / 腹泻" },
        mechanism: { en: "Transit time determines water retention or loss.", zh: "转运时间决定水分保留或丢失。" },
        risk: "moderate"
      }
    ]
  },
  {
    id: "rectum",
    name: { en: "Rectum", zh: "直肠" },
    position: { x: 50, y: 91 },
    color: "#ffce8a",
    journeyState: { en: "Defecation reflex", zh: "排便反射" },
    modules: modules({
      anatomy: ["Terminal reservoir of the GI tract.", "胃肠道末端储存区。"],
      motor: ["Rectal stretch initiates coordinated defecation reflexes.", "直肠扩张启动协调排便反射。"],
      secretory: ["Mucus reduces friction during elimination.", "黏液降低排出过程中的摩擦。"],
      digestive: ["No digestion.", "不进行消化。"],
      absorptive: ["Limited fluid absorption may continue.", "可继续少量液体吸收。"],
      hormonal: ["Predominantly neural control with voluntary sphincter modulation.", "主要受神经控制，并受随意括约肌调节。"],
      clinical: ["Pelvic floor dysfunction can disrupt defecation.", "盆底功能障碍可影响排便。"],
      terms: [["Defecation", "排便"], ["Internal anal sphincter", "肛门内括约肌"], ["External anal sphincter", "肛门外括约肌"]]
    }),
    clinical: [
      {
        title: { en: "Defecation disorder", zh: "排便障碍" },
        mechanism: { en: "Poor coordination between rectal pressure and sphincter relaxation.", zh: "直肠压力与括约肌松弛协调不良。" },
        risk: "moderate"
      }
    ]
  }
];

export const journeyStages: JourneyStage[] = [
  {
    id: "bolus",
    label: { en: "Bolus", zh: "食团" },
    description: { en: "Chewed, lubricated food leaves the mouth.", zh: "经咀嚼和润滑后的食物离开口腔。" },
    organ: "mouth",
    progress: 0.1
  },
  {
    id: "chyme",
    label: { en: "Chyme", zh: "食糜" },
    description: { en: "Gastric acid and retropulsion transform bolus into acidic chyme.", zh: "胃酸和反推运动将食团变成酸性食糜。" },
    organ: "stomach",
    progress: 0.42
  },
  {
    id: "nutrients",
    label: { en: "Nutrients", zh: "营养分子" },
    description: { en: "Enzymes, bile and brush border digestion produce absorbable molecules.", zh: "胰酶、胆汁和刷状缘消化产生可吸收分子。" },
    organ: "small-intestine",
    progress: 0.68
  },
  {
    id: "waste",
    label: { en: "Waste", zh: "废物" },
    description: { en: "Water recovery and bacterial processing prepare feces for elimination.", zh: "水分回收和细菌处理为粪便排出做准备。" },
    organ: "colon",
    progress: 0.9
  }
];
