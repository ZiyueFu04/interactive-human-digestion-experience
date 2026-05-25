import type { Hormone } from "@/types/digestion";

export const hormones: Hormone[] = [
  {
    id: "gastrin",
    name: "Gastrin",
    zh: "胃泌素",
    secretedBy: { en: "G cells in gastric antrum", zh: "胃窦 G 细胞" },
    function: { en: "Increases HCl secretion and gastric motility", zh: "增加盐酸分泌和胃运动" },
    target: { en: "Parietal cells, gastric smooth muscle", zh: "壁细胞、胃平滑肌" },
    color: "#ff7474",
    relatedOrgans: ["stomach"]
  },
  {
    id: "secretin",
    name: "Secretin",
    zh: "促胰液素",
    secretedBy: { en: "S cells in duodenum", zh: "十二指肠 S 细胞" },
    function: { en: "Increases bicarbonate-rich pancreatic juice", zh: "增加富含碳酸氢盐的胰液" },
    target: { en: "Pancreatic ducts, liver bile ducts", zh: "胰腺导管、肝胆管" },
    color: "#48f4ff",
    relatedOrgans: ["small-intestine", "pancreas", "liver"]
  },
  {
    id: "cck",
    name: "CCK",
    zh: "胆囊收缩素",
    secretedBy: { en: "I cells in duodenum and jejunum", zh: "十二指肠和空肠 I 细胞" },
    function: { en: "Increases bile release and pancreatic enzymes", zh: "增加胆汁释放和胰酶分泌" },
    target: { en: "Gallbladder, pancreas, pylorus", zh: "胆囊、胰腺、幽门" },
    color: "#65f58b",
    relatedOrgans: ["gallbladder", "pancreas", "stomach", "small-intestine"]
  },
  {
    id: "gip",
    name: "GIP",
    zh: "胃抑制肽",
    secretedBy: { en: "K cells in small intestine", zh: "小肠 K 细胞" },
    function: { en: "Slows gastric emptying and supports insulin response", zh: "减慢胃排空并支持胰岛素反应" },
    target: { en: "Stomach, pancreatic islets", zh: "胃、胰岛" },
    color: "#ffd15c",
    relatedOrgans: ["stomach", "small-intestine", "pancreas"]
  },
  {
    id: "motilin",
    name: "Motilin",
    zh: "胃动素",
    secretedBy: { en: "M cells in small intestine", zh: "小肠 M 细胞" },
    function: { en: "Triggers migrating motor complex during fasting", zh: "空腹时触发移行性运动复合波" },
    target: { en: "Stomach and small intestine smooth muscle", zh: "胃和小肠平滑肌" },
    color: "#b28cff",
    relatedOrgans: ["stomach", "small-intestine"]
  },
  {
    id: "ghrelin",
    name: "Ghrelin",
    zh: "饥饿素",
    secretedBy: { en: "Stomach endocrine cells", zh: "胃内分泌细胞" },
    function: { en: "Increases hunger and primes intake behavior", zh: "增强饥饿感并促进入食行为" },
    target: { en: "Hypothalamus and GI tract", zh: "下丘脑和胃肠道" },
    color: "#ff9f6e",
    relatedOrgans: ["stomach"]
  },
  {
    id: "somatostatin",
    name: "Somatostatin",
    zh: "生长抑素",
    secretedBy: { en: "D cells in stomach and pancreas", zh: "胃和胰腺 D 细胞" },
    function: { en: "Broad inhibition of acid, hormones and secretion", zh: "广泛抑制胃酸、激素和分泌" },
    target: { en: "G cells, parietal cells, endocrine pancreas", zh: "G 细胞、壁细胞、内分泌胰腺" },
    color: "#d7ff5b",
    relatedOrgans: ["stomach", "pancreas", "small-intestine"]
  }
];
