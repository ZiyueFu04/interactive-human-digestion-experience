"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import { knowledgeEdges, knowledgeNodes } from "@/data/knowledge-graph";

export function KnowledgeGraph() {
  return (
    <section className="px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm text-cyan-glow">Interactive Knowledge Graph / 交互式知识图谱</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">Concepts become a living map.</h2>
        </div>
        <div className="glass h-[560px] overflow-hidden rounded-lg p-2">
          <ReactFlow
            nodes={knowledgeNodes}
            edges={knowledgeEdges}
            fitView
            nodesDraggable
            panOnScroll
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={28} color="rgba(255,255,255,0.08)" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </section>
  );
}
