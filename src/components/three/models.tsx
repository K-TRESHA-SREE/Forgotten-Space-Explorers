import "@react-three/fiber";
import * as THREE from "three";
import { Asteroid, Box, Cyl, Dish, GasGiant, Ground, SolarPanel, Tube, type V3 } from "./parts";
import type { ModelKey } from "../../data/types";

const SILVER = "#d8dce6";
const DARK = "#3b3e48";

/* ─────────────────────────── MOON ─────────────────────────── */

export function EagleModel() {
  const legAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const rungs = [0.15, 0.32, 0.5, 0.68, 0.85];
  const rail = (z: number): [V3, V3] => [[1.0, 0.8, z], [1.75, 0.08, z]];
  return (
    <group position={[0, 0, 0]}>
      <Ground color="#8c8e96" radius={4.3} rocks={10} />
      {/* octagonal body wrapped in gold foil */}
      <mesh position={[0, 1.0, 0]} rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[0.95, 0.95, 0.62, 8]} />
        <meshStandardMaterial color="#f3c24f" metalness={0.5} roughness={0.35} emissive="#9a6a00" emissiveIntensity={0.5} flatShading />
      </mesh>
      {/* top deck where the ascent stage sat */}
      <mesh position={[0, 1.34, 0]} rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[0.9, 0.95, 0.08, 8]} />
        <meshStandardMaterial color="#9a9ba3" metalness={0.5} roughness={0.5} flatShading />
      </mesh>
      {/* descent engine bell */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.32, 0.55, 24, 1, true]} />
        <meshStandardMaterial color="#2f3036" metalness={0.6} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* landing legs */}
      {legAngles.map((a, i) => {
        const c = Math.cos(a);
        const s = Math.sin(a);
        return (
          <group key={i}>
            <Tube a={[c * 0.8, 1.15, s * 0.8]} b={[c * 1.85, 0.1, s * 1.85]} r={0.045} color="#cfd2da" />
            <Tube a={[c * 0.7, 0.8, s * 0.7]} b={[c * 1.4, 0.4, s * 1.4]} r={0.03} color="#a9acb6" />
            <Cyl p={[c * 1.85, 0.04, s * 1.85]} rad={0.26} h={0.06} color={SILVER} />
          </group>
        );
      })}
      {/* ladder on the forward leg + porch */}
      <Box p={[0.95, 0.88, 0]} s={[0.4, 0.04, 0.55]} color="#bfc2cc" />
      {[-0.12, 0.12].map((z) => {
        const [a, b] = rail(z);
        return <Tube key={z} a={a} b={b} r={0.02} color="#e5e7ee" />;
      })}
      {rungs.map((t) => (
        <Box
          key={t}
          p={[1.0 + 0.75 * t, 0.8 - 0.72 * t, 0]}
          s={[0.04, 0.03, 0.26]}
          color="#e5e7ee"
        />
      ))}
      {/* experiment packages left nearby */}
      <Box p={[-2.3, 0.1, 1.2]} s={[0.35, 0.2, 0.35]} color="#b9bcc6" />
      <Box p={[-2.8, 0.06, 0.5]} s={[0.3, 0.12, 0.3]} color="#7e8190" />
      {/* flag */}
      <Tube a={[2.7, 0, -2.2]} b={[2.7, 1.1, -2.2]} r={0.015} color="#eee" />
      <Box p={[2.95, 0.95, -2.2]} s={[0.5, 0.3, 0.01]} color="#c8d3ff" metalness={0} />
    </group>
  );
}

export function SurveyorModel() {
  const verts: V3[] = [0, 1, 2].map((i) => {
    const a = (i * 2 * Math.PI) / 3 + Math.PI / 6;
    return [Math.cos(a) * 0.65, 0.95, Math.sin(a) * 0.65] as V3;
  });
  return (
    <group>
      <Ground color="#7f8189" radius={4.2} rocks={11} />
      {/* triangular frame */}
      {verts.map((v, i) => (
        <Tube key={i} a={v} b={verts[(i + 1) % 3]} r={0.04} color="#d3d6de" />
      ))}
      {/* legs + footpads + vernier engines */}
      {verts.map((v, i) => {
        const a = (i * 2 * Math.PI) / 3 + Math.PI / 6;
        const foot: V3 = [Math.cos(a) * 1.55, 0.06, Math.sin(a) * 1.55];
        return (
          <group key={i}>
            <Tube a={v} b={foot} r={0.035} color="#e2e4ea" />
            <Tube a={[v[0] * 0.55, 0.95, v[2] * 0.55]} b={[foot[0] * 0.78, 0.5, foot[2] * 0.78]} r={0.025} color="#b7bac4" />
            <Cyl p={foot} rad={0.2} h={0.05} color={SILVER} />
            <mesh position={[v[0] * 0.9, 0.8, v[2] * 0.9]}>
              <coneGeometry args={[0.07, 0.2, 12]} />
              <meshStandardMaterial color={DARK} />
            </mesh>
          </group>
        );
      })}
      {/* electronics compartments */}
      {verts.map((_v, i) => {
        const a = (i * 2 * Math.PI) / 3 + Math.PI / 6 + Math.PI / 3;
        return <Box key={i} p={[Math.cos(a) * 0.35, 1.08, Math.sin(a) * 0.35]} s={[0.32, 0.28, 0.32]} r={[0, -a, 0]} color="#e9ebf0" metalness={0.3} />;
      })}
      {/* central mast, solar panel and antenna */}
      <Tube a={[0, 0.95, 0]} b={[0, 2.25, 0]} r={0.045} color="#dcdfe6" />
      <mesh position={[0, 2.3, 0]} rotation={[0.12, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.04, 6]} />
        <meshStandardMaterial color="#1e3b8a" metalness={0.6} roughness={0.35} emissive="#0f2457" emissiveIntensity={0.6} />
      </mesh>
      <Box p={[0.35, 2.2, -0.35]} s={[0.4, 0.4, 0.03]} r={[0.5, 0.6, 0]} color="#f1f2f5" />
      {/* TV camera */}
      <Tube a={[0, 1.2, 0]} b={[0, 1.75, 0]} r={0.06} color="#f3f4f8" />
      <Cyl p={[0, 1.88, 0]} rad={0.13} h={0.3} color="#f6f7fa" />
      <Cyl p={[0.14, 1.88, 0]} r={[0, 0, Math.PI / 2]} rad={0.07} h={0.16} color="#111" />
      {/* surface sampler arm */}
      <Tube a={[0.3, 0.95, 0.5]} b={[0.9, 0.7, 1.0]} r={0.025} color="#c5c8d2" />
      <Tube a={[0.9, 0.7, 1.0]} b={[1.1, 0.25, 1.25]} r={0.02} color="#c5c8d2" />
      <Box p={[1.12, 0.2, 1.28]} s={[0.14, 0.1, 0.14]} color="#7d7f87" />
    </group>
  );
}

/* ─────────────────────────── VENUS ─────────────────────────── */

export function VenusProbeModel({ large }: { large: boolean }) {
  const k = large ? 1 : 0.7;
  return (
    <group>
      {!large && <Ground color="#6a3a22" radius={3.6} rocks={8} glow="#a03a10" rockColor="#4a2a1a" />}
      <group position={[0, large ? 0 : 0.95, 0]} rotation={large ? [0.35, 0, 0.25] : [0, 0, 0]} scale={k}>
        {/* conical aeroshell (nose points down) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.05, 1.5, 48, 1, true]} />
          <meshStandardMaterial
            color="#5a4c43"
            metalness={0.3}
            roughness={0.7}
            side={THREE.DoubleSide}
            transparent={large}
            opacity={large ? 0.78 : 1}
          />
        </mesh>
        {/* blunt nose */}
        <mesh position={[0, -0.78, 0]}>
          <sphereGeometry args={[0.2, 24, 16]} />
          <meshStandardMaterial color="#3d342f" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* aft base rim */}
        <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.04, 8, 48]} />
          <meshStandardMaterial color="#b9a58e" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* pressure vessel (sphere) */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.6, 40, 28]} />
          <meshStandardMaterial color="#c9ccd4" metalness={0.8} roughness={0.28} />
        </mesh>
        {/* instrument windows */}
        {Array.from({ length: large ? 6 : 3 }).map((_, i) => {
          const n = large ? 6 : 3;
          const a = (i * 2 * Math.PI) / n;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.6, 0.42, Math.sin(a) * 0.6]}>
              <sphereGeometry args={[0.09, 14, 14]} />
              <meshStandardMaterial color="#ffd78a" emissive="#ff9a3c" emissiveIntensity={0.6} />
            </mesh>
          );
        })}
        {/* top bulkhead + parachute for the large probe */}
        {large && (
          <group position={[0, 0.9, 0]}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 8;
              return <Tube key={i} a={[Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3]} b={[Math.cos(a) * 1.0, 1.9, Math.sin(a) * 1.0]} r={0.008} color="#f4f0e6" />;
            })}
            <mesh position={[0, 1.9, 0]}>
              <sphereGeometry args={[1.05, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
              <meshStandardMaterial color="#fff4e0" side={THREE.DoubleSide} roughness={0.8} emissive="#a86a30" emissiveIntensity={0.25} />
            </mesh>
          </group>
        )}
        {!large && <Tube a={[0, 0.75, 0]} b={[0, 1.15, 0]} r={0.02} color="#ddd" />}
      </group>
    </group>
  );
}

/* ─────────────────────────── MARS ─────────────────────────── */

export function SojournerModel() {
  const zs = [-0.5, 0.5];
  const xs = [-0.55, 0, 0.55];
  return (
    <group scale={1.6} position={[0, 0, 0]}>
      <Ground color="#a4562f" radius={3.2} rocks={12} y={0} rockColor="#7a3f26" />
      <group position={[0, 0.02, 0]}>
        <Box p={[0, 0.5, 0]} s={[1.05, 0.36, 0.72]} color="#d9dbe2" metalness={0.5} />
        <SolarPanel p={[0, 0.72, 0]} s={[1.0, 0.04, 0.7]} cols={6} rows={4} />
        {zs.map((z) => (
          <group key={z}>
            {xs.map((x) => (
              <group key={x}>
                <Cyl p={[x, 0.22, z * 1.1]} r={[Math.PI / 2, 0, 0]} rad={0.22} h={0.18} seg={24} color="#b7bac4" />
                <Cyl p={[x, 0.22, z * 1.1]} r={[Math.PI / 2, 0, 0]} rad={0.1} h={0.2} seg={12} color="#555a66" />
              </group>
            ))}
            <Tube a={[-0.55, 0.22, z * 1.1]} b={[0, 0.5, z * 0.8]} r={0.03} />
            <Tube a={[0, 0.5, z * 0.8]} b={[0.55, 0.22, z * 1.1]} r={0.03} />
            <Tube a={[0, 0.5, z * 0.8]} b={[0, 0.5, z * 0.4]} r={0.03} />
          </group>
        ))}
        {/* antenna mast */}
        <Tube a={[-0.4, 0.74, 0.2]} b={[-0.4, 1.15, 0.2]} r={0.015} color="#e5e5e5" />
        <Box p={[-0.4, 1.17, 0.2]} s={[0.1, 0.03, 0.06]} color="#cfd3dc" />
        {/* cameras */}
        <Box p={[0.55, 0.55, 0]} s={[0.07, 0.1, 0.28]} color="#2d3038" />
        <Cyl p={[0.6, 0.56, 0.08]} r={[0, 0, Math.PI / 2]} rad={0.035} h={0.06} color="#111" />
        <Cyl p={[0.6, 0.56, -0.08]} r={[0, 0, Math.PI / 2]} rad={0.035} h={0.06} color="#111" />
        {/* APXS arm at the rear */}
        <Tube a={[-0.5, 0.35, 0]} b={[-0.85, 0.22, 0]} r={0.025} color="#aaa" />
        <Cyl p={[-0.9, 0.17, 0]} rad={0.06} h={0.1} color="#e8c36b" />
      </group>
    </group>
  );
}

export function OpportunityModel() {
  const xs = [-0.85, 0, 0.85];
  const zs = [-1.0, 1.0];
  return (
    <group scale={1.15}>
      <Ground color="#9c4c28" radius={4.6} rocks={14} rockColor="#6f3a24" />
      <group>
        {/* warm electronics box (body) */}
        <Box p={[0, 0.78, 0]} s={[1.5, 0.32, 1.0]} color="#c9a566" metalness={0.5} />
        {/* solar deck + wings */}
        <SolarPanel p={[0, 0.98, 0]} s={[1.6, 0.04, 1.3]} cols={8} rows={6} />
        <SolarPanel p={[0, 0.96, 1.15]} s={[1.5, 0.03, 1.0]} r={[-0.05, 0, 0]} cols={8} rows={5} />
        <SolarPanel p={[0, 0.96, -1.15]} s={[1.5, 0.03, 1.0]} r={[0.05, 0, 0]} cols={8} rows={5} />
        {/* wheels */}
        {zs.map((z) => (
          <group key={z}>
            {xs.map((x) => (
              <group key={x}>
                <Cyl p={[x, 0.3, z]} r={[Math.PI / 2, 0, 0]} rad={0.3} h={0.22} seg={28} color="#aeb2bd" />
                <Cyl p={[x, 0.3, z]} r={[Math.PI / 2, 0, 0]} rad={0.14} h={0.24} seg={14} color="#4d525e" />
              </group>
            ))}
            <Tube a={[-0.85, 0.3, z]} b={[0, 0.7, z * 0.7]} r={0.04} />
            <Tube a={[0, 0.7, z * 0.7]} b={[0.85, 0.3, z]} r={0.04} />
            <Tube a={[0, 0.7, z * 0.7]} b={[0, 0.75, z * 0.45]} r={0.04} />
          </group>
        ))}
        {/* PanCam mast with stereo camera head */}
        <Tube a={[-0.55, 1.0, 0]} b={[-0.55, 2.0, 0]} r={0.035} color="#dfe2ea" />
        <Box p={[-0.55, 2.08, 0]} s={[0.18, 0.14, 0.5]} color="#2f333d" />
        <Cyl p={[-0.43, 2.08, 0.15]} r={[0, 0, Math.PI / 2]} rad={0.06} h={0.1} color="#111" />
        <Cyl p={[-0.43, 2.08, -0.15]} r={[0, 0, Math.PI / 2]} rad={0.06} h={0.1} color="#111" />
        {/* high-gain antenna */}
        <Tube a={[0.25, 1.0, 0.35]} b={[0.25, 1.15, 0.35]} r={0.03} />
        <Cyl p={[0.25, 1.22, 0.35]} rad={0.34} h={0.04} seg={32} color="#e3e5ea" r={[0.35, 0, 0.2]} />
        {/* robotic arm */}
        <Tube a={[0.75, 0.7, 0.1]} b={[1.25, 0.55, 0.15]} r={0.035} color="#cfd3dc" />
        <Tube a={[1.25, 0.55, 0.15]} b={[1.4, 0.3, 0.3]} r={0.03} color="#cfd3dc" />
        <Cyl p={[1.42, 0.25, 0.32]} rad={0.12} h={0.16} color="#e0b96a" />
      </group>
    </group>
  );
}

/* ─────────────────────────── DEEP SPACE ─────────────────────────── */

export function PioneerModel({ saturn }: { saturn?: boolean }) {
  const rimPts: V3[] = Array.from({ length: 3 }).map((_, i) => {
    const a = (i * 2 * Math.PI) / 3 + Math.PI / 2;
    return [Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0.02];
  });
  const boomDirs = [
    { ang: (-30 * Math.PI) / 180, rtg: true },
    { ang: (210 * Math.PI) / 180, rtg: true },
  ];
  return (
    <group rotation={[0.1, -0.7, 0]}>
      {/* planet backdrop */}
      {saturn ? (
        <GasGiant p={[-3.2, -3, -7]} radius={2.2} ring bands={["#e8d3a0", "#d8bd86", "#efe0b4", "#cba96d"]} />
      ) : (
        <GasGiant p={[-3.2, -3, -7]} radius={2.6} bands={["#d9b99a", "#a97b58", "#ead3b7", "#b88b6a", "#f0e1c9", "#8d5e44"]} />
      )}
      {/* main dish */}
      <Dish radius={1.37} depth={0.33} />
      {/* hexagonal equipment compartment */}
      <mesh position={[0, 0, -0.62]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.5, 6]} />
        <meshStandardMaterial color="#c4b48c" metalness={0.5} roughness={0.5} flatShading />
      </mesh>
      {/* feed horn and struts */}
      {rimPts.map((p, i) => (
        <Tube key={i} a={p} b={[0, 0, 1.15]} r={0.015} color="#d9dce3" />
      ))}
      <Cyl p={[0, 0, 1.1]} r={[Math.PI / 2, 0, 0]} rad={0.1} h={0.2} color="#f2f3f7" />
      <mesh position={[0, 0, 1.28]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.18, 12]} />
        <meshStandardMaterial color="#e9c46a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* RTG booms */}
      {boomDirs.map((b, i) => {
        const dx = Math.cos(b.ang);
        const dy = Math.sin(b.ang);
        const from: V3 = [dx * 0.55, dy * 0.55, -0.62];
        const to: V3 = [dx * 3.1, dy * 3.1, -0.62];
        return (
          <group key={i}>
            <Tube a={from} b={to} r={0.025} color="#9aa0ad" />
            {[-0.09, 0.09].map((o, k) => (
              <group key={k}>
                <Tube a={[dx * 1.2 - dy * o, dy * 1.2 + dx * o, -0.62]} b={[dx * 2.5 - dy * o, dy * 2.5 + dx * o, -0.62]} r={0.075} color="#4a4d57" />
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((t) => (
                  <mesh
                    key={t}
                    position={[dx * (1.2 + 1.3 * t) - dy * o, dy * (1.2 + 1.3 * t) + dx * o, -0.62]}
                    rotation={[0, 0, b.ang + Math.PI / 2]}
                  >
                    <cylinderGeometry args={[0.15, 0.15, 0.015, 12]} />
                    <meshStandardMaterial color="#b9bdc8" metalness={0.5} roughness={0.5} />
                  </mesh>
                ))}
              </group>
            ))}
          </group>
        );
      })}
      {/* magnetometer boom */}
      <Tube a={[0, 0.5, -0.62]} b={[0, 3.0, -0.62]} r={0.018} color="#cdd1da" />
      <Box p={[0, 3.05, -0.62]} s={[0.14, 0.14, 0.14]} color="#e9c46a" />
      {/* the plaque, mounted on antenna supports */}
      <group position={[-0.95, -0.55, 0.0]} rotation={[0, 0.5, -0.4]}>
        <Box s={[0.46, 0.3, 0.012]} color="#e8c458" metalness={0.9} roughness={0.25} emissive="#7a5a10" />
        <Box p={[0, 0, 0.008]} s={[0.4, 0.24, 0.004]} color="#c9a63a" metalness={0.9} roughness={0.4} />
      </group>
    </group>
  );
}

/* ─────────────────────────── ASTEROIDS ─────────────────────────── */

export function NearModel() {
  return (
    <group rotation={[0.25, 0.4, 0]}>
      <Asteroid p={[3.4, -2.6, -4.5]} scale={[3.4, 1.3, 1.3]} seed={2} color="#a79d90" boulders={26} />
      {/* octagonal body, long axis along x */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.62, 0.62, 1.15, 8]} />
        <meshStandardMaterial color="#d6b565" metalness={0.65} roughness={0.38} flatShading emissive="#3a2a08" emissiveIntensity={0.3} />
      </mesh>
      {/* four fixed solar panels (two per side) */}
      {[-1, 1].map((side) =>
        [-0.45, 0.45].map((x) => (
          <group key={`${side}${x}`}>
            <SolarPanel p={[x, 0, side * 1.45]} s={[0.78, 0.035, 1.6]} cols={4} rows={8} />
            <Tube a={[x, 0, side * 0.55]} b={[x, 0, side * 0.7]} r={0.03} color="#bfc3cc" />
          </group>
        ))
      )}
      {/* high-gain dish on top */}
      <Dish radius={0.72} depth={0.14} p={[0, 0.7, 0]} r={[-Math.PI / 2, 0, 0]} />
      <Tube a={[0, 0.62, 0]} b={[0, 0.72, 0]} r={0.05} />
      {/* magnetometer boom + instrument deck */}
      <Tube a={[0.55, 0, 0]} b={[1.6, 0.05, 0]} r={0.02} color="#cfd3dc" />
      <Box p={[1.65, 0.05, 0]} s={[0.1, 0.1, 0.1]} color="#e9c46a" />
      <Box p={[-0.6, -0.1, 0]} s={[0.1, 0.5, 0.5]} color="#2d3038" />
      <Cyl p={[-0.68, -0.1, 0.1]} r={[0, 0, Math.PI / 2]} rad={0.06} h={0.1} color="#111" />
      {/* main engine nozzle */}
      <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.16, 0.3, 16, 1, true]} />
        <meshStandardMaterial color="#2f3036" metalness={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function DartModel() {
  return (
    <group rotation={[0.2, -0.5, 0]}>
      {/* Didymos in the distance and Dimorphos ahead */}
      <Asteroid p={[-1.5, -1.0, -9]} scale={[3.4, 3.0, 3.0]} seed={4} color="#a79d90" />
      <Asteroid p={[2.8, -0.8, -3.5]} scale={[1.2, 1.0, 1.1]} seed={9} color="#b8ad9d" boulders={60} />
      {/* spacecraft bus wrapped in foil */}
      <Box p={[0, 0, 0]} s={[1.0, 1.0, 1.2]} color="#d9ba6a" metalness={0.7} roughness={0.35} emissive="#3a2a08" />
      {/* ROSA roll-out solar arrays */}
      {[-1, 1].map((s) => (
        <group key={s}>
          <Tube a={[s * 0.5, 0, 0]} b={[s * 4.3, 0, 0]} r={0.025} color="#bfc3cc" />
          <SolarPanel p={[s * 2.4, 0, 0]} s={[3.6, 0.025, 1.15]} cols={12} rows={3} />
          <Cyl p={[s * 4.3, 0, 0]} r={[Math.PI / 2, 0, 0]} rad={0.07} h={1.2} color="#9aa0ad" />
        </group>
      ))}
      {/* radial-line slot antenna (flat) on top */}
      <Cyl p={[0.0, 0.58, -0.2]} rad={0.32} h={0.05} seg={32} color="#eef0f5" />
      {/* DRACO camera telescope */}
      <Cyl p={[0, 0.0, 0.85]} r={[Math.PI / 2, 0, 0]} rad={0.14} h={0.55} color="#f2f3f7" />
      <Cyl p={[0, 0.0, 1.15]} r={[Math.PI / 2, 0, 0]} rad={0.1} h={0.05} color="#0a0a0f" />
      {/* NEXT-C ion engine at the rear */}
      <Cyl p={[0, -0.2, -0.75]} r={[Math.PI / 2, 0, 0]} rad={0.2} radTop={0.12} h={0.3} color="#7d8392" />
      <mesh position={[0, -0.2, -0.93]}>
        <circleGeometry args={[0.1, 20]} />
        <meshBasicMaterial color="#7ff0ff" />
      </mesh>
    </group>
  );
}

/* ─────────────────────────── REGISTRY ─────────────────────────── */

export interface ModelConfig {
  node: React.ReactNode;
  camera: V3;
  target: V3;
  bg: [string, string];
  minDistance: number;
  maxDistance: number;
}

export function getModelConfig(key: ModelKey): ModelConfig {
  switch (key) {
    case "eagle":
      return { node: <EagleModel />, camera: [5.2, 3.0, 5.6], target: [0, 0.9, 0], bg: ["#1a1d3a", "#05071a"], minDistance: 3.5, maxDistance: 12 };
    case "surveyor":
      return { node: <SurveyorModel />, camera: [5.4, 3.2, 5.4], target: [0, 1.1, 0], bg: ["#1a1d3a", "#05071a"], minDistance: 3.5, maxDistance: 12 };
    case "venus-large":
      return { node: <VenusProbeModel large />, camera: [4.2, 1.8, 5.0], target: [0, 0.8, 0], bg: ["#5a2b12", "#14070a"], minDistance: 3, maxDistance: 10 };
    case "venus-day":
      return { node: <VenusProbeModel large={false} />, camera: [4.0, 2.4, 4.6], target: [0, 0.9, 0], bg: ["#6a3216", "#14070a"], minDistance: 2.5, maxDistance: 10 };
    case "sojourner":
      return { node: <SojournerModel />, camera: [3.6, 2.2, 3.8], target: [0, 0.6, 0], bg: ["#5a2a1a", "#12060a"], minDistance: 2.2, maxDistance: 9 };
    case "opportunity":
      return { node: <OpportunityModel />, camera: [5.4, 3.0, 5.6], target: [0, 1.0, 0], bg: ["#5a2a1a", "#12060a"], minDistance: 3, maxDistance: 12 };
    case "pioneer10":
      return { node: <PioneerModel />, camera: [5.8, 2.4, 6.4], target: [0, 0.2, 0], bg: ["#12163a", "#04050f"], minDistance: 3.5, maxDistance: 14 };
    case "pioneer11":
      return { node: <PioneerModel saturn />, camera: [5.8, 2.4, 6.4], target: [0, 0.2, 0], bg: ["#14123a", "#04050f"], minDistance: 3.5, maxDistance: 14 };
    case "near":
      return { node: <NearModel />, camera: [4.6, 2.6, 5.2], target: [0.6, -0.2, 0], bg: ["#10223a", "#04060f"], minDistance: 3, maxDistance: 13 };
    case "dart":
      return { node: <DartModel />, camera: [6.2, 2.8, 6.2], target: [0.2, -0.1, 0], bg: ["#161a40", "#04050f"], minDistance: 3.5, maxDistance: 14 };
  }
}
