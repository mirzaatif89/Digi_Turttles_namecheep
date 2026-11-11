import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { live } from "./live";
import { scrollState } from "./scrollState";
import { groundHeight, lerp } from "./story";
import { makeRadialTexture, makeShellTexture } from "./textures";

/** Planar top-down UVs so the scute pattern sits on the carapace like a decal. */
function shellGeometry() {
  const g = new THREE.SphereGeometry(1, 48, 32);
  const pos = g.getAttribute("position");
  const uv = g.getAttribute("uv");
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) * 0.5 + 0.5, 0.5 - pos.getZ(i) * 0.5);
  return g;
}

interface Flipper {
  pivot: THREE.Group;
  inner: THREE.Group;
  side: number;
  front: boolean;
}

export function Turtle() {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const neck = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Mesh>(null);
  const flippers = useRef<Flipper[]>([]);

  const mats = useMemo(() => {
    const shell = new THREE.MeshPhysicalMaterial({
      map: makeShellTexture(),
      roughness: 0.42,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25,
    });
    const skin = new THREE.MeshStandardMaterial({ color: "#4d6064", roughness: 0.6 });
    const flipper = new THREE.MeshStandardMaterial({ color: "#56696d", roughness: 0.55 });
    const belly = new THREE.MeshStandardMaterial({ color: "#d8d0bb", roughness: 0.7 });
    const eye = new THREE.MeshPhysicalMaterial({ color: "#050708", roughness: 0.05, clearcoat: 1 });
    const shadowMat = new THREE.MeshBasicMaterial({
      map: makeRadialTexture("rgba(0,0,0,0.75)", "rgba(0,0,0,0)"),
      transparent: true,
      depthWrite: false,
    });
    return { shell, skin, flipper, belly, eye, shadowMat };
  }, []);
  const geo = useMemo(
    () => ({ shell: shellGeometry(), sphere: new THREE.SphereGeometry(1, 24, 16), tail: new THREE.ConeGeometry(0.035, 0.12, 8) }),
    [],
  );

  const flipperDefs: { side: number; front: boolean }[] = [
    { side: -1, front: true },
    { side: 1, front: true },
    { side: -1, front: false },
    { side: 1, front: false },
  ];

  useFrame((state) => {
    const s = live.story;
    const r = root.current;
    if (!r || !body.current || !neck.current) return;
    r.visible = s.turtleVisible;
    if (!s.turtleVisible) return;
    const t = state.clock.elapsedTime;
    r.position.set(s.turtle.x, s.turtle.y, s.turtle.z);
    r.rotation.set(0, s.yaw, s.pitch, "YZX");
    r.scale.setScalar(s.scale);

    const cp = s.crawlPhase;
    const sp = s.swimPhase;
    const w = s.swim;
    const free = s.tuck;

    // body motion
    const crawlBob = Math.abs(Math.sin(cp)) * 0.018;
    const swimBob = Math.sin(sp + Math.PI) * 0.035;
    body.current.position.y = lerp(crawlBob, swimBob, w);
    body.current.rotation.x = lerp(Math.sin(cp) * 0.05, Math.sin(sp * 0.5) * 0.04, w);

    // head: nods with the stride, curiously follows the pointer
    neck.current.rotation.y = scrollState.pointerX * -0.35 + Math.sin(t * 0.7) * 0.08;
    neck.current.rotation.z = lerp(0.12 + Math.sin(cp * 2) * 0.06, 0.05 + Math.sin(sp) * 0.04, w) + scrollState.pointerY * 0.1;

    for (const f of flippers.current) {
      const ph = f.front ? cp + (f.side < 0 ? 0 : Math.PI) : cp + (f.side < 0 ? Math.PI : 0);
      // crawl: diagonal alternating sweep + lift on the recovery stroke
      const amp = f.front ? 0.6 : 0.4;
      const crawlSweep = f.side * amp * Math.sin(ph);
      const crawlLift = Math.max(0, Math.cos(ph)) * (f.front ? 0.38 : 0.2);
      // swim: front flippers flap together like wings, rear ones steer
      const flap = f.front ? Math.sin(sp) * 0.85 : Math.sin(sp + 1) * 0.15;
      const swimSweep = f.front ? f.side * (-0.35 + 0.28 * Math.cos(sp)) : f.side * -0.25;
      const feather = f.front ? Math.cos(sp) * 0.45 : 0;
      // tucked inside the egg
      const tuckSweep = f.side * (f.front ? -0.9 : -0.5);

      const sweep = lerp(tuckSweep, lerp(crawlSweep, swimSweep, w), free);
      const lift = lerp(0.1, lerp(crawlLift, flap, w), free);
      f.pivot.rotation.set(-f.side * lift, sweep, 0);
      f.inner.rotation.z = feather * w * f.side;
    }

    if (shadow.current) {
      const gy = groundHeight(s.turtle.x, s.turtle.z);
      const h = s.turtle.y - gy;
      shadow.current.position.set(s.turtle.x, gy + 0.02, s.turtle.z);
      shadow.current.rotation.set(-Math.PI / 2, 0, -s.yaw);
      shadow.current.scale.set(1.15 * s.scale, 0.85 * s.scale, 1);
      (shadow.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - h * 2.2) * (s.p > 0.2 ? 1 : 0);
    }
  });

  return (
    <>
      <group ref={root}>
        <group ref={body}>
          {/* carapace + plastron */}
          <mesh geometry={geo.shell} material={mats.shell} position={[0, 0.03, 0]} scale={[0.45, 0.17, 0.36]} castShadow />
          <mesh geometry={geo.sphere} material={mats.belly} position={[0, -0.02, 0]} scale={[0.42, 0.06, 0.33]} />
          <mesh geometry={geo.tail} material={mats.skin} position={[-0.46, -0.01, 0]} rotation={[0, 0, Math.PI / 2]} />
          {/* head */}
          <group ref={neck} position={[0.36, 0.02, 0]}>
            <mesh geometry={geo.sphere} material={mats.skin} position={[0.04, 0, 0]} scale={[0.1, 0.075, 0.085]} />
            <mesh geometry={geo.sphere} material={mats.skin} position={[0.13, 0.01, 0]} scale={[0.12, 0.09, 0.1]} />
            <mesh geometry={geo.sphere} material={mats.skin} position={[0.23, -0.005, 0]} scale={[0.06, 0.055, 0.065]} />
            {[-1, 1].map((s) => (
              <group key={s}>
                <mesh geometry={geo.sphere} material={mats.eye} position={[0.18, 0.045, 0.07 * s]} scale={0.026} />
              </group>
            ))}
          </group>
          {flipperDefs.map((d, i) => (
            <group
              key={i}
              position={d.front ? [0.22, -0.02, 0.24 * d.side] : [-0.29, -0.03, 0.17 * d.side]}
              ref={(pivot) => {
                if (!pivot) return;
                const inner = pivot.children[0] as THREE.Group;
                flippers.current[i] = { pivot, inner, side: d.side, front: d.front };
              }}
            >
              <group rotation={[0, (d.front ? -0.45 : -1.0) * d.side, 0]}>
                <mesh
                  geometry={geo.sphere}
                  material={mats.flipper}
                  position={[0, 0, (d.front ? 0.24 : 0.12) * d.side]}
                  scale={d.front ? [0.1, 0.022, 0.26] : [0.075, 0.018, 0.13]}
                />
              </group>
            </group>
          ))}
        </group>
        <pointLight position={[1.2, 1.4, 2]} intensity={1.6} distance={6} color="#7fe3e6" />
      </group>
      <mesh ref={shadow} material={mats.shadowMat}>
        <planeGeometry args={[1, 1]} />
      </mesh>
    </>
  );
}
