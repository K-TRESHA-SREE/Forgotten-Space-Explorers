import { useMemo } from "react";
import * as THREE from "three";
import "@react-three/fiber";

export type V3 = [number, number, number];

/** Cylinder between two points. */
export function Tube({
  a,
  b,
  r = 0.03,
  color = "#cfd3dc",
  metalness = 0.5,
  roughness = 0.45,
}: {
  a: V3;
  b: V3;
  r?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  const { pos, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const dir = vb.clone().sub(va);
    const len = dir.length();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.normalize()
    );
    return { pos: va.clone().add(vb).multiplyScalar(0.5), quat, len };
  }, [a, b]);
  return (
    <mesh position={pos} quaternion={quat} castShadow>
      <cylinderGeometry args={[r, r, len, 10]} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

export function Box({
  p = [0, 0, 0],
  s,
  r = [0, 0, 0],
  color = "#cfd3dc",
  metalness = 0.4,
  roughness = 0.5,
  emissive,
  map,
}: {
  p?: V3;
  s: V3;
  r?: V3;
  color?: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  map?: THREE.Texture;
}) {
  return (
    <mesh position={p} rotation={r}>
      <boxGeometry args={s} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissive ? 0.4 : 0}
        map={map}
      />
    </mesh>
  );
}

export function Cyl({
  p = [0, 0, 0],
  r = [0, 0, 0],
  rad = 0.2,
  radTop,
  h = 0.5,
  seg = 20,
  color = "#cfd3dc",
  metalness = 0.4,
  roughness = 0.5,
  emissive,
  open = false,
}: {
  p?: V3;
  r?: V3;
  rad?: number;
  radTop?: number;
  h?: number;
  seg?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  open?: boolean;
}) {
  return (
    <mesh position={p} rotation={r}>
      <cylinderGeometry args={[radTop ?? rad, rad, h, seg, 1, open]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive}
        emissiveIntensity={emissive ? 0.5 : 0}
        side={open ? THREE.DoubleSide : THREE.FrontSide}
      />
    </mesh>
  );
}

/** Blue solar-cell texture with a grid of cells. */
export function useSolarTexture(cols = 8, rows = 4) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, "#1b3a8a");
    grad.addColorStop(1, "#0d1f55");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    g.strokeStyle = "rgba(180,210,255,0.55)";
    g.lineWidth = 2;
    for (let i = 0; i <= cols; i++) {
      g.beginPath();
      g.moveTo((i * 256) / cols, 0);
      g.lineTo((i * 256) / cols, 256);
      g.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      g.beginPath();
      g.moveTo(0, (j * 256) / rows);
      g.lineTo(256, (j * 256) / rows);
      g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [cols, rows]);
}

export function SolarPanel({
  p,
  s,
  r = [0, 0, 0],
  cols = 8,
  rows = 4,
}: {
  p: V3;
  s: V3;
  r?: V3;
  cols?: number;
  rows?: number;
}) {
  const map = useSolarTexture(cols, rows);
  return (
    <mesh position={p} rotation={r}>
      <boxGeometry args={s} />
      <meshStandardMaterial map={map} metalness={0.6} roughness={0.35} emissive="#10224f" emissiveIntensity={0.5} />
    </mesh>
  );
}

/** A parabolic dish whose rim lies in the z=0 plane and which opens toward +z. */
export function Dish({
  radius = 1.37,
  depth = 0.33,
  color = "#eceff6",
  p = [0, 0, 0],
  r = [0, 0, 0],
}: {
  radius?: number;
  depth?: number;
  color?: string;
  p?: V3;
  r?: V3;
}) {
  // choose sphere radius R and cap angle so that cap radius = radius and depth = depth
  const R = (radius * radius + depth * depth) / (2 * depth);
  const theta = Math.asin(radius / R);
  return (
    <group position={p} rotation={r}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[0, -R * Math.cos(theta), 0]}>
          <sphereGeometry args={[R, 64, 24, 0, Math.PI * 2, 0, theta]} />
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/** Rocky ground disc for surface scenes. */
export function Ground({
  color = "#8d8f98",
  radius = 4.2,
  y = 0,
  rocks = 9,
  rockColor,
  glow,
}: {
  color?: string;
  radius?: number;
  y?: number;
  rocks?: number;
  rockColor?: string;
  glow?: string;
}) {
  const items = useMemo(() => {
    const out: { p: V3; s: number; rot: V3 }[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < rocks; i++) {
      const ang = rnd() * Math.PI * 2;
      const d = 1.8 + rnd() * (radius - 2.3);
      out.push({ p: [Math.cos(ang) * d, y + 0.05, Math.sin(ang) * d], s: 0.08 + rnd() * 0.2, rot: [rnd() * 3, rnd() * 3, rnd() * 3] });
    }
    return out;
  }, [rocks, radius, y]);
  return (
    <group>
      <mesh position={[0, y - 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[radius, 64]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} emissive={glow} emissiveIntensity={glow ? 0.35 : 0} />
      </mesh>
      {items.map((it, i) => (
        <mesh key={i} position={it.p} rotation={it.rot} scale={[it.s * 1.3, it.s, it.s]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={rockColor ?? color} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** Lumpy asteroid built from a displaced icosahedron. */
export function Asteroid({
  p = [0, 0, 0],
  scale = [1, 1, 1],
  color = "#9a948c",
  seed = 1,
  boulders = 0,
}: {
  p?: V3;
  scale?: V3;
  color?: string;
  seed?: number;
  boulders?: number;
}) {
  const geo = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 4);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).normalize();
      const n =
        Math.sin(v.x * 4.1 + seed) * 0.06 +
        Math.sin(v.y * 5.3 + seed * 2) * 0.05 +
        Math.sin(v.z * 6.7 + seed * 3) * 0.05 +
        Math.sin((v.x + v.y) * 11 + seed) * 0.02 +
        Math.sin((v.y - v.z) * 13) * 0.015;
      // a few craters
      const craters: V3[] = [
        [0.6, 0.5, 0.6],
        [-0.7, 0.2, 0.6],
        [0.1, -0.9, 0.3],
        [-0.3, 0.6, -0.7],
      ];
      let dent = 0;
      craters.forEach((c) => {
        const cv = new THREE.Vector3(...c).normalize();
        const d = v.distanceTo(cv);
        if (d < 0.38) dent += (0.38 - d) * 0.35;
      });
      v.multiplyScalar(1 + n - dent);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, [seed]);

  const bl = useMemo(() => {
    const out: { p: V3; s: number }[] = [];
    let sd = seed * 13 + 5;
    const rnd = () => {
      sd = (sd * 16807) % 2147483647;
      return sd / 2147483647;
    };
    for (let i = 0; i < boulders; i++) {
      const v = new THREE.Vector3(rnd() - 0.5, rnd() - 0.5, rnd() - 0.5).normalize().multiplyScalar(0.98);
      out.push({ p: [v.x, v.y, v.z], s: 0.03 + rnd() * 0.07 });
    }
    return out;
  }, [boulders, seed]);

  return (
    <group position={p} scale={scale}>
      <mesh geometry={geo}>
        <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading />
      </mesh>
      {bl.map((b, i) => (
        <mesh key={i} position={b.p} scale={b.s}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/** Banded gas-giant with optional rings. */
export function GasGiant({
  p,
  radius,
  bands,
  ring = false,
}: {
  p: V3;
  radius: number;
  bands: string[];
  ring?: boolean;
}) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 16;
    c.height = 256;
    const g = c.getContext("2d")!;
    let y = 0;
    let i = 0;
    while (y < 256) {
      const h = 10 + ((i * 37) % 28);
      g.fillStyle = bands[i % bands.length];
      g.fillRect(0, y, 16, h);
      y += h;
      i++;
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [bands]);
  return (
    <group position={p} rotation={[0.25, 0, ring ? 0.35 : 0]}>
      <mesh>
        <sphereGeometry args={[radius, 48, 32]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
      {ring && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.35, radius * 1.9, 96]} />
            <meshBasicMaterial color="#e6cfa0" side={THREE.DoubleSide} transparent opacity={0.75} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 2.0, radius * 2.35, 96]} />
            <meshBasicMaterial color="#c9b080" side={THREE.DoubleSide} transparent opacity={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}
