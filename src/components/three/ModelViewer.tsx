import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import type { Group } from "three";
import { getModelConfig, PioneerModel } from "./models";
import type { ModelKey } from "../../data/types";

export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#bcd0ff", "#3a2a30", 0.9]} />
      <directionalLight position={[6, 9, 5]} intensity={2.6} color="#fff4e2" />
      <directionalLight position={[-6, 3, -5]} intensity={1.1} color="#8fb4ff" />
      <pointLight position={[0, 3, 4]} intensity={20} color="#ffd9b0" distance={14} />
    </>
  );
}

export function ModelViewer({
  model,
  fallback,
  autoRotate = true,
}: {
  model: ModelKey;
  fallback: ReactNode;
  autoRotate?: boolean;
}) {
  const cfg = getModelConfig(model);
  const [ok] = useState(() => hasWebGL());
  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (!ok) return <>{fallback}</>;
  return (
    <Boundary fallback={fallback}>
      <div
        className="relative h-full w-full"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${cfg.bg[0]}, ${cfg.bg[1]} 80%)` }}
      >
        <Canvas
          key={model}
          dpr={[1, 1.75]}
          camera={{ position: cfg.camera, fov: 40, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: true }}
          aria-label="Interactive 3D model. Drag to rotate, scroll or pinch to zoom."
        >
          <Suspense fallback={null}>
            <Lights />
            <Stars radius={60} depth={40} count={1800} factor={3} saturation={0} fade speed={0.6} />
            {cfg.node}
            <OrbitControls
              target={cfg.target}
              enablePan={false}
              autoRotate={autoRotate && !reduced}
              autoRotateSpeed={1.1}
              minDistance={cfg.minDistance}
              maxDistance={cfg.maxDistance}
              maxPolarAngle={Math.PI * 0.62}
              enableDamping
            />
          </Suspense>
        </Canvas>
      </div>
    </Boundary>
  );
}

/* ───────── Hero: floating Pioneer with pointer parallax ───────── */

function Floating() {
  const g = useRef<Group>(null);
  useFrame((state, dt) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    const tx = state.pointer.x * 0.5;
    const ty = -state.pointer.y * 0.25;
    g.current.rotation.y += (tx + Math.sin(t * 0.3) * 0.25 - g.current.rotation.y) * Math.min(1, dt * 2);
    g.current.rotation.x += (ty - g.current.rotation.x) * Math.min(1, dt * 2);
    g.current.position.y = Math.sin(t * 0.8) * 0.12;
  });
  return (
    <group ref={g}>
      <PioneerModel />
    </group>
  );
}

export function HeroScene() {
  const [ok] = useState(() => hasWebGL());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!ok || !mounted) return null;
  return (
    <Boundary fallback={null}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [-1.2, 0.4, 12], fov: 38 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Lights />
          <Floating />
        </Suspense>
      </Canvas>
    </Boundary>
  );
}
