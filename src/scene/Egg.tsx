import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { live } from "./live";
import { EGG_BURY, EGG_GROUND, EGG_X, EGG_Z, groundHeight } from "./story";

const H = 1.25;
const W = 0.5;
const CRACK = 0.62 * Math.PI;
const SEG = 48;

const eggPoint = (th: number) => new THREE.Vector2(W * Math.sin(th) * (1 + 0.12 * Math.cos(th)), (H / 2) * (1 - Math.cos(th)));
const zig = (i: number) => {
  const s = i % SEG;
  return (s % 2 ? 1 : -1) * 0.04 * (0.55 + 0.45 * Math.sin(s * 2.3));
};
const RIM = eggPoint(CRACK);

function half(from: number, to: number, n: number, crackRow: number) {
  const pts: THREE.Vector2[] = [];
  for (let k = 0; k <= n; k++) pts.push(eggPoint(from + ((to - from) * k) / n));
  const g = new THREE.LatheGeometry(pts, SEG);
  const pos = g.getAttribute("position");
  for (let i = 0; i <= SEG; i++) {
    const idx = i * pts.length + crackRow;
    pos.setY(idx, pos.getY(idx) + zig(i));
  }
  g.computeVertexNormals();
  return g;
}

function crackTube(dir: 1 | -1) {
  const pts: THREE.Vector3[] = [];
  for (let k = 0; k <= SEG / 2; k++) {
    const i = dir === 1 ? k : SEG - k;
    const phi = (i / SEG) * Math.PI * 2;
    const r = RIM.x * 1.015;
    pts.push(new THREE.Vector3(r * Math.sin(phi), RIM.y + zig(i), r * Math.cos(phi)));
  }
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  return new THREE.TubeGeometry(curve, SEG * 3, 0.009, 5, false);
}

const SHARDS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2 + 0.3;
  return { a, dist: 0.5 + ((i * 37) % 10) / 14, up: 0.35 + ((i * 53) % 10) / 22, spin: 3 + (i % 4) * 2, size: 0.05 + (i % 3) * 0.02 };
});

export function Egg() {
  const egg = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const cracks = useRef<THREE.Mesh[]>([]);
  const shards = useRef<THREE.Mesh[]>([]);

  const res = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({ color: "#f6efdf", emissive: "#3b3628", emissiveIntensity: 0.55, roughness: 0.5, sheen: 0.4, sheenColor: new THREE.Color("#ffffff"), side: THREE.DoubleSide });
    const crackMat = new THREE.MeshBasicMaterial({ color: "#2b2a22" });
    return {
      mat,
      crackMat,
      bottom: half(0, CRACK, 18, 18),
      top: half(CRACK, Math.PI, 10, 0),
      tubes: [crackTube(1), crackTube(-1)],
      shard: new THREE.CircleGeometry(1, 3),
      nest: new THREE.SphereGeometry(1, 24, 16),
    };
  }, []);

  useFrame((state) => {
    const s = live.story;
    const t = state.clock.elapsedTime;
    if (egg.current) {
      const w = s.eggWobble;
      egg.current.rotation.z = Math.sin(t * 17) * 0.09 * w + s.eggTilt;
      egg.current.rotation.x = Math.cos(t * 13) * 0.05 * w;
    }
    for (const m of cracks.current) {
      if (!m) continue;
      const total = m.geometry.index ? m.geometry.index.count : 0;
      const n = Math.floor((s.crack * total) / 6) * 6;
      m.geometry.setDrawRange(0, n);
      m.visible = s.crack > 0 && s.shellOpen < 0.05;
    }
    if (top.current) {
      const e = s.shellOpen;
      const restY = EGG_BURY + (H - RIM.y) * 0.92;
      top.current.position.set(-1.3 * e, RIM.y + (restY - RIM.y) * e + 0.75 * Math.sin(Math.PI * e), 0.3 * e);
      top.current.rotation.set(0.35 * e, 0.6 * e, Math.PI * 0.94 * e);
    }
    shards.current.forEach((m, i) => {
      if (!m) return;
      const d = SHARDS[i]!;
      const f = s.shellOpen;
      m.visible = f > 0.02;
      const r = RIM.x + d.dist * f;
      m.position.set(Math.sin(d.a) * r, RIM.y + (EGG_BURY + 0.01 - RIM.y) * f + d.up * 4 * f * (1 - f), Math.cos(d.a) * r);
      m.rotation.set(d.spin * f, d.spin * 0.7 * f, 0);
      if (f >= 0.999) m.rotation.set(-Math.PI / 2, 0, i);
    });
  });

  const base: [number, number, number] = [EGG_X, EGG_GROUND - EGG_BURY, EGG_Z];
  const nestEggs: [number, number, number][] = [
    [EGG_X - 0.95, 0, EGG_Z - 0.55],
    [EGG_X - 0.25, 0, EGG_Z - 1.05],
    [EGG_X - 1.5, 0, EGG_Z + 0.25],
  ];

  return (
    <>
      <group ref={egg} position={base}>
        <mesh geometry={res.bottom} material={res.mat} castShadow />
        <group ref={top} position={[0, RIM.y, 0]}>
          <mesh geometry={res.top} material={res.mat} position={[0, -RIM.y, 0]} castShadow />
        </group>
        {res.tubes.map((g, i) => (
          <mesh key={i} geometry={g} material={res.crackMat} ref={(m) => void (m && (cracks.current[i] = m))} />
        ))}
      </group>
      <group position={base}>
        {SHARDS.map((d, i) => (
          <mesh
            key={i}
            geometry={res.shard}
            material={res.mat}
            scale={d.size}
            ref={(m) => void (m && (shards.current[i] = m))}
          />
        ))}
      </group>
      {nestEggs.map(([x, , z], i) => (
        <mesh key={i} geometry={res.nest} material={res.mat} position={[x, groundHeight(x, z) - 0.12, z]} scale={[0.28, 0.36, 0.28]} rotation={[0.3 * i, i, 0.4 - i * 0.3]} />
      ))}
    </>
  );
}
