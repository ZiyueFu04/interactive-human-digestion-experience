import type { Edge, Node } from "@xyflow/react";

export const knowledgeNodes: Node[] = [
  {
    id: "gastrin",
    position: { x: 0, y: 120 },
    data: { label: "Gastrin\n胃泌素" },
    type: "input"
  },
  {
    id: "g-cells",
    position: { x: 260, y: 30 },
    data: { label: "G cells\nG 细胞" }
  },
  {
    id: "hcl",
    position: { x: 260, y: 130 },
    data: { label: "HCl secretion\n盐酸分泌" }
  },
  {
    id: "motility",
    position: { x: 260, y: 230 },
    data: { label: "Gastric motility\n胃运动" }
  },
  {
    id: "cck",
    position: { x: 560, y: 110 },
    data: { label: "CCK\n胆囊收缩素" }
  },
  {
    id: "bile",
    position: { x: 850, y: 50 },
    data: { label: "Bile release\n胆汁释放" }
  },
  {
    id: "enzymes",
    position: { x: 850, y: 170 },
    data: { label: "Pancreatic enzymes\n胰酶" }
  },
  {
    id: "micelles",
    position: { x: 1120, y: 110 },
    data: { label: "Micelles\n胶束" },
    type: "output"
  }
];

export const knowledgeEdges: Edge[] = [
  { id: "e1", source: "g-cells", target: "gastrin", label: "secrete / 分泌", animated: true },
  { id: "e2", source: "gastrin", target: "hcl", label: "stimulates / 促进", animated: true },
  { id: "e3", source: "gastrin", target: "motility", label: "increases / 增加", animated: true },
  { id: "e4", source: "cck", target: "bile", label: "contracts gallbladder / 收缩胆囊", animated: true },
  { id: "e5", source: "cck", target: "enzymes", label: "stimulates acini / 刺激腺泡", animated: true },
  { id: "e6", source: "bile", target: "micelles", label: "emulsifies / 乳化", animated: true },
  { id: "e7", source: "enzymes", target: "micelles", label: "digests lipids / 消化脂质", animated: true }
];
