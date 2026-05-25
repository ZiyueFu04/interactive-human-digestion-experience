# Interactive Human Digestion Experience

## 第一部分：完整产品设计方案

### 产品定位

本项目不是医学 PPT 网页化，而是以 **Food Journey Through the Human Body / 食物在人体中的旅程** 为主线的沉浸式医学学习系统。用户从食物进入口腔开始，沿管腔穿过咽、食管、胃、小肠、胰腺、肝胆、大肠和直肠，理解机械运动、分泌、化学消化、吸收、激素调控、神经调控与临床关联如何协同发生。

### 体验原则

- **Apple-style Scrollytelling**：通过滚动驱动器官激活、食物状态变化和微观动画。
- **Medical Sci-Fi Visual Language**：深色背景、玻璃态界面、荧光器官、动态粒子与流体感。
- **Bilingual by Design**：中英同步展示，不做语言切换，适合医学双语学习。
- **System-first Education**：每个器官不是孤立知识点，而是运动、分泌、酶、吸收、激素与临床风险的节点。

### 核心用户旅程

1. 用户进入全屏 Hero，看到半透明人体、发光消化道和食物粒子。
2. 点击 Start Digestion，进入人体消化地图。
3. 滚动时，食物从 bolus 变为 chyme，再变为 nutrients，最后成为 waste。
4. 每个器官 section 按统一结构学习：Anatomy、Motor、Secretory、Digestive、Absorptive、Hormonal、Clinical。
5. 在脂肪消化模块切换到微观视角，理解 emulsification、micelle、enterocyte、chylomicron、lacteal。
6. 在激素网络中 hover 节点，查看 gastrin、secretin、CCK、GIP、motilin、ghrelin、somatostatin 的系统联动。
7. 在 React Flow 知识图谱中拖拽、缩放关系节点。
8. 在模拟器中选择不同餐型，实时看到 pH、胃排空、胆汁、胰酶和饱腹感变化。

## 第二部分：完整技术架构

### 技术栈

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP ScrollTrigger
- Lenis Smooth Scroll
- React Three Fiber / Three.js
- D3.js
- React Flow
- Shadcn-style UI primitives
- Lucide React
- Zustand

### 项目目录结构

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  ui/
    button.tsx
    card.tsx
data/
  digestion.ts
  hormones.ts
  knowledge-graph.ts
  simulator.ts
docs/
  product-architecture.md
features/
  absorption/
  experience/
  hero/
  hormones/
  journey/
  knowledge/
  lipid/
  map/
  organs/
  simulator/
hooks/
  use-scroll-progress.ts
lib/
  utils.ts
store/
  use-digestion-store.ts
three/
  digestive-scene.tsx
types/
  digestion.ts
```

### 状态管理方案

使用 Zustand 管理全局体验状态：

- `activeOrgan`：当前激活器官，驱动地图、WebGL 颜色和 section 状态。
- `activeHormone`：当前 hover/click 的激素节点，用于全站联动高亮。
- `journeyProgress`：滚动进度，驱动食物粒子、时间轴、状态切换。
- `selectedMeal`：模拟器餐型。
- `microView`：微观视角模式，如 villi、microvilli、lipid。

### 数据流

`data/*` 是唯一内容源。页面、图谱、模拟器和动画组件从数据对象读取内容，避免 PPT 式硬编码。未来可以将这些数据迁移到 CMS、MDX 或数据库。

## 第三部分：完整页面结构

### Landing Hero

作用：建立沉浸感，定义主题 From Food to Molecules / 从食物到分子。

动画：React Three Fiber 人体轮廓、消化道曲线、食物粒子，Framer Motion 入场。

组件树：

```txt
HeroSection
  DigestiveScene
    BodySilhouette
    DigestivePath
    FoodParticles
  Button
```

### Human Digestive Map

作用：全局器官地图，可点击、hover、双语标签。

动画：SVG pathLength 动态路径，器官 hover 发光。

组件树：

```txt
DigestiveMap
  SVG digestive path
  Organ node buttons
  Active state readout
```

### Food Journey Timeline

作用：展示 Bolus → Chyme → Nutrients → Waste。

动画：滚动进度条、阶段卡片渐显。

### Organ Sections

作用：每个器官以统一结构组织知识。

模块：Anatomy、Motor Function、Secretory Function、Digestive Function、Absorptive Function、Hormonal Regulation、Clinical Correlation。

### Lipid Digestion Lab

作用：重点展示脂肪消化。

链路：Fat droplet → Emulsification → Micelle → Enterocyte → Chylomicron → Lymphatic lacteal。

### Microvilli Zoom

作用：展示 Circular folds → Villi → Microvilli 的逐级放大。

### Hormonal Regulation Network

作用：D3 动态网络展示激素-器官关系。

### Knowledge Graph

作用：React Flow 可拖拽、可缩放知识图谱。

### Digestion Simulator

作用：根据餐型实时展示 pH、胃排空、胆汁释放、胰酶和激素变化。

## 第四部分：完整组件树

```txt
app/page.tsx
  ExperienceClient
    ScrollDirector
    HeroSection
      DigestiveScene
    DigestiveMap
    FoodJourneyTimeline
    OrganSection[]
      StatusPill
      Clinical Card
    LipidDigestionLab
    MicrovilliZoom
    HormoneNetwork
      D3 force graph
    KnowledgeGraph
      ReactFlow
    DigestionSimulator
      Meal selector
      Metric bars
```

## 第五部分：完整动画设计

### GSAP

- 负责滚动进度同步。
- 使用 ScrollTrigger 检测当前器官 section。
- 将滚动进度写入 Zustand，供 WebGL、timeline 和 UI 消费。

### Lenis

- 负责平滑滚动。
- 与 GSAP ticker 绑定，保证滚动动画和状态同步。

### Framer Motion

- 用于 UI 入场、卡片展开、进度条、模拟器数值变化。
- 用于脂肪消化粒子和微绒毛吸收演示。

### Three.js / React Three Fiber

- 用于 Hero 的 3D 半透明人体、消化道发光路径、食物粒子推进。
- 后续可加入 shader fluid、tube geometry、GPU particles、postprocessing bloom。

### D3.js

- 用于 Hormonal Regulation Network 的 force layout。
- hover 节点时写入 `activeHormone`，未来可驱动全站高亮。

### React Flow

- 用于可交互知识图谱。
- 支持拖拽、缩放、动态关系线。

## 第六部分：完整中英双语内容结构

每个器官内容结构：

```ts
type Organ = {
  id: OrganId;
  name: { en: string; zh: string };
  journeyState: { en: string; zh: string };
  modules: [
    Anatomy,
    Motor Function,
    Secretory Function,
    Digestive Function,
    Absorptive Function,
    Hormonal Regulation,
    Clinical Correlation
  ];
  clinical: ClinicalCorrelation[];
};
```

核心术语库已覆盖：

- Mouth / 口腔：Mastication、Saliva、Salivary amylase、Lingual lipase
- Pharynx / 咽：Swallowing reflex、Deglutition
- Esophagus / 食管：Peristalsis、Lower esophageal sphincter
- Stomach / 胃：Storage、Mixing、Retropulsion、Gastric acid、Pepsin、Gastric emptying
- Small Intestine / 小肠：Segmentation、Brush border enzymes、Absorption、Villi、Microvilli
- Pancreas / 胰腺：Pancreatic enzymes、Bicarbonate
- Liver & Gallbladder / 肝胆：Bile、Emulsification、Micelles
- Large Intestine / 大肠：Water absorption、Bacteria、Microbiota
- Defecation / 排便：Rectal reflex、Anal sphincters
- GI Hormones / 胃肠激素：Gastrin、Secretin、CCK、GIP、Motilin、Ghrelin、Somatostatin

## 第七部分：完整开发路线图

### Phase 1：Production-grade Starter

- 搭建 Next.js 15 App Router 项目。
- 实现 Hero、Digestive Map、Timeline、Organ Section。
- 接入 Zustand、GSAP、Lenis、Framer Motion。
- 接入 R3F、D3、React Flow。
- 建立中英双语数据层。

### Phase 2：Deep Scrollytelling

- 每个器官独立滚动叙事片段。
- 根据 section progress 触发 pH、酶、激素和吸收动画。
- 加入 sticky WebGL stage，文本与 3D 镜头联动。

### Phase 3：Advanced WebGL Visualization

- 使用 TubeGeometry 表现真实消化管道。
- 加入 bloom、fluid shader、GPU particles。
- 胃酸、胆汁、胰液使用 shader flow map。
- 脂肪乳化加入 instanced particles 和 collision-like motion。

### Phase 4：Medical Knowledge System

- 扩展术语数据库。
- 每个术语支持 definition、source slide、clinical note、quiz prompt。
- React Flow 自动布局，支持按器官、激素、疾病过滤。

### Phase 5：Simulator Engine

- 将餐型模拟从静态 profile 升级为状态机。
- 加入时间维度：0-240 min。
- 使用曲线模型模拟胃排空、pH 回升、CCK/GIP/Secretin 峰值。
- 支持用户自定义 macronutrient ratio。

### Phase 6：Assessment and Learning Analytics

- 加入互动 quiz、病例推理、错题知识图谱。
- 将用户路径、知识掌握度和高频误区可视化。

## 第八部分：Production-grade Starter Code

本仓库已生成可运行 starter：

- `package.json`：Next.js 15 + required stack。
- `app/layout.tsx`：App Router 根布局。
- `app/page.tsx`：Server entry，加载 client experience。
- `features/hero/hero-section.tsx`：沉浸式首页。
- `features/experience/scroll-director.tsx`：Lenis + GSAP 滚动同步。
- `features/map/digestive-map.tsx`：交互人体消化地图。
- `features/organs/organ-section.tsx`：统一器官学习模块。
- `three/digestive-scene.tsx`：React Three Fiber WebGL 场景。
- `features/hormones/hormone-network.tsx`：D3 激素网络。
- `features/knowledge/knowledge-graph.tsx`：React Flow 知识图谱。
- `features/simulator/digestion-simulator.tsx`：餐型消化模拟器。

运行方式：

```bash
npm install
npm run dev
```

访问：

```txt
http://localhost:3000
```

## 性能优化方案

- 将 WebGL、D3、React Flow 隔离在 client feature，避免污染 Server Component。
- Three Canvas 使用 `dpr={[1, 1.6]}` 控制像素比。
- WebGL 材质与曲线通过 `useMemo` 缓存。
- ScrollTrigger 只写入轻量全局状态，不在滚动中做昂贵 DOM 查询。
- 后续可将重型模块用 `next/dynamic` 分段 lazy loading。
- 图谱与模拟器可放入 route segment 或 suspense boundary。
- 纹理应使用 WebP/AVIF/KTX2，WebGL 模型使用 Draco/glTF。
- 对长页面可做 section-level virtualization 或按视口激活动画。
