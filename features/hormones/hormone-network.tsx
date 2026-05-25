"use client";

import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import { hormones } from "@/data/hormones";
import { useDigestionStore } from "@/store/use-digestion-store";
import type { HormoneId } from "@/types/digestion";

type NodeDatum = d3.SimulationNodeDatum & {
  id: string;
  label: string;
  zh: string;
  color: string;
};

export function HormoneNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const setActiveHormone = useDigestionStore((state) => state.setActiveHormone);
  const activeHormone = useDigestionStore((state) => state.activeHormone);

  const graph = useMemo(() => {
    const organNodes = ["Stomach", "Small Intestine", "Pancreas", "Liver", "Gallbladder"].map((name) => ({
      id: name,
      label: name,
      zh:
        name === "Stomach"
          ? "胃"
          : name === "Small Intestine"
            ? "小肠"
            : name === "Pancreas"
              ? "胰腺"
              : name === "Liver"
                ? "肝"
                : "胆囊",
      color: "#ffffff"
    }));
    const hormoneNodes = hormones.map((hormone) => ({
      id: hormone.id,
      label: hormone.name,
      zh: hormone.zh,
      color: hormone.color
    }));
    const links = hormones.flatMap((hormone) =>
      hormone.relatedOrgans.map((organ) => ({
        source: hormone.id,
        target:
          organ === "small-intestine"
            ? "Small Intestine"
            : organ === "gallbladder"
              ? "Gallbladder"
              : organ.charAt(0).toUpperCase() + organ.slice(1)
      }))
    );
    return { nodes: [...organNodes, ...hormoneNodes] as NodeDatum[], links };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const width = 980;
    const height = 520;

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force("link", d3.forceLink(graph.links).id((d) => (d as NodeDatum).id).distance(118))
      .force("charge", d3.forceManyBody().strength(-420))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(graph.links)
      .join("line")
      .attr("stroke", "rgba(72,244,255,0.34)")
      .attr("stroke-width", 1.4)
      .attr("stroke-dasharray", "5 6");

    const node = svg
      .append("g")
      .selectAll("g")
      .data(graph.nodes)
      .join("g")
      .style("cursor", "pointer")
      .on("mouseenter", (_, d) => {
        if (hormones.some((hormone) => hormone.id === d.id)) setActiveHormone(d.id as HormoneId);
      })
      .on("mouseleave", () => setActiveHormone(null));

    node
      .append("circle")
      .attr("r", (d) => (hormones.some((hormone) => hormone.id === d.id) ? 28 : 36))
      .attr("fill", (d) => `${d.color}28`)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 1.5);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", -2)
      .attr("fill", "white")
      .attr("font-size", 11)
      .attr("font-weight", 600)
      .text((d) => d.label);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 13)
      .attr("fill", "rgba(255,255,255,0.48)")
      .attr("font-size", 10)
      .text((d) => d.zh);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as unknown as NodeDatum).x ?? 0)
        .attr("y1", (d) => (d.source as unknown as NodeDatum).y ?? 0)
        .attr("x2", (d) => (d.target as unknown as NodeDatum).x ?? 0)
        .attr("y2", (d) => (d.target as unknown as NodeDatum).y ?? 0);
      node.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [graph, setActiveHormone]);

  const active = hormones.find((hormone) => hormone.id === activeHormone);

  return (
    <section className="px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm text-cyan-glow">Hormonal Regulation Network / 激素调控网络</p>
          <h2 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">Signals make digestion systemic.</h2>
        </div>
        <div className="glass grid gap-5 rounded-lg p-5 lg:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-lg bg-black/30">
            <svg ref={svgRef} viewBox="0 0 980 520" className="h-[520px] w-full" />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-xl font-semibold text-white">{active?.name ?? "Hover a hormone"}</h3>
            <p className="text-white/42">{active?.zh ?? "悬停激素节点"}</p>
            <div className="mt-6 space-y-4 text-sm">
              <Info label="Secreted by / 分泌来源" value={active ? `${active.secretedBy.en} / ${active.secretedBy.zh}` : "Gastrin, Secretin, CCK, GIP, Motilin, Ghrelin, Somatostatin"} />
              <Info label="Function / 功能" value={active ? `${active.function.en} / ${active.function.zh}` : "Hover to reveal dynamic regulation."} />
              <Info label="Target / 靶器官" value={active ? `${active.target.en} / ${active.target.zh}` : "全系统联动高亮入口。"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-white/38">{label}</div>
      <div className="mt-1 leading-6 text-white/68">{value}</div>
    </div>
  );
}
