"use client";

import { Float, Line, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useDigestionStore } from "@/store/use-digestion-store";

function FoodParticles() {
  const group = useRef<THREE.Group>(null);
  const journeyProgress = useDigestionStore((state) => state.journeyProgress);
  const points = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.3, 0),
        new THREE.Vector3(0, 1.4, 0.05),
        new THREE.Vector3(0.38, 0.5, 0.02),
        new THREE.Vector3(-0.25, -0.25, 0.12),
        new THREE.Vector3(0.15, -1.2, 0.02),
        new THREE.Vector3(0, -2.15, 0)
      ]),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      const offset = (journeyProgress + index * 0.08 + clock.elapsedTime * 0.025) % 1;
      const point = points.getPoint(offset);
      child.position.copy(point);
      child.scale.setScalar(0.06 + Math.sin(clock.elapsedTime * 2 + index) * 0.01);
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: 13 }).map((_, index) => (
        <Sphere key={index} args={[1, 16, 16]}>
          <meshStandardMaterial
            color={index % 3 === 0 ? "#ffd15c" : index % 3 === 1 ? "#65f58b" : "#ff7474"}
            emissive={index % 2 ? "#48f4ff" : "#ffd15c"}
            emissiveIntensity={0.9}
            roughness={0.35}
          />
        </Sphere>
      ))}
    </group>
  );
}

function DigestivePath() {
  const activeOrgan = useDigestionStore((state) => state.activeOrgan);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.5, 0),
        new THREE.Vector3(0, 1.6, 0),
        new THREE.Vector3(0.42, 0.72, 0),
        new THREE.Vector3(-0.48, -0.18, 0),
        new THREE.Vector3(0.38, -0.82, 0),
        new THREE.Vector3(-0.18, -1.52, 0),
        new THREE.Vector3(0.04, -2.25, 0)
      ]),
    []
  );

  const color = activeOrgan === "stomach" ? "#ff7474" : activeOrgan === "small-intestine" ? "#ffd15c" : "#48f4ff";

  return (
    <>
      <Line points={curve.getPoints(160)} color={color} lineWidth={4} transparent opacity={0.78} />
      <Line points={curve.getPoints(160)} color="#ffffff" lineWidth={1} transparent opacity={0.16} />
    </>
  );
}

function BodySilhouette() {
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.24}>
      <mesh position={[0, 0.05, -0.08]} scale={[1.38, 2.78, 0.08]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#152032"
          emissive="#48f4ff"
          emissiveIntensity={0.08}
          transparent
          opacity={0.26}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export function DigestiveScene() {
  return (
    <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <PerspectiveCamera makeDefault position={[0, 0.1, 6.2]} fov={38} />
      <ambientLight intensity={0.55} />
      <pointLight position={[2.2, 3.2, 3]} color="#48f4ff" intensity={45} />
      <pointLight position={[-2, -1, 2]} color="#65f58b" intensity={18} />
      <BodySilhouette />
      <DigestivePath />
      <FoodParticles />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
