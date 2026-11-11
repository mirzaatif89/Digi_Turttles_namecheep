import { Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Egg } from "./Egg";
import { live } from "./live";
import { scrollState } from "./scrollState";
import { lerp, smoothstep, storyAt } from "./story";
import { Turtle } from "./Turtle";
import { Underwater } from "./Underwater";
import { Beach, MOON_DIR, Sky, Terrain, Water } from "./World";

const NIGHT_FOG = new THREE.Color("#0a2a3a");
const DEEP_FOG = new THREE.Color("#06374a");
const tmp = new THREE.Color();
// Dev-only: `?snap` skips scroll smoothing so automated screenshots land on exact story beats.
const SNAP = import.meta.env.DEV && typeof window !== "undefined" && new URLSearchParams(window.location.search).has("snap");

/** The one stepper: advances progress, story, camera and atmosphere before anything reads them. */
function Stepper({ onReady }: { onReady: () => void }) {
  const { scene, camera, size } = useThree();
  const smooth = useRef({ p: scrollState.target, px: 0, py: 0, ready: false, frames: 0 });
  const hemi = useRef<THREE.HemisphereLight>(null);
  const moon = useRef<THREE.DirectionalLight>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = smooth.current;
    s.p += (scrollState.target - s.p) * (SNAP ? 1 : 1 - Math.exp(-dt * 3.5));
    s.px += (scrollState.pointerX - s.px) * (1 - Math.exp(-dt * 2.5));
    s.py += (scrollState.pointerY - s.py) * (1 - Math.exp(-dt * 2.5));
    const narrow = size.width < 768;
    const story = storyAt(s.p, state.clock.elapsedTime, narrow ? 0.12 : 1);
    live.story = story;
    live.time = state.clock.elapsedTime;

    const cam = camera as THREE.PerspectiveCamera;
    const targetFov = narrow ? 58 : 40;
    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov = targetFov;
      cam.updateProjectionMatrix();
    }
    // On phones, lift the view so the turtle sits in the lower half, below the text cards.
    const lift = narrow ? 0.45 : 0;
    cam.position.set(story.camPos.x + s.px * 0.35, story.camPos.y + s.py * 0.18 + lift, story.camPos.z);
    cam.lookAt(story.camTarget.x, story.camTarget.y + lift, story.camTarget.z);

    const uw = smoothstep(0.08, -0.35, cam.position.y);
    live.uw = uw;
    const fog = scene.fog as THREE.FogExp2;
    fog.color.lerpColors(NIGHT_FOG, DEEP_FOG, uw);
    fog.density = lerp(0.016, 0.085, uw);
    (scene.background as THREE.Color).copy(tmp.lerpColors(NIGHT_FOG, DEEP_FOG, uw));
    if (hemi.current) {
      hemi.current.color.set(uw > 0.5 ? "#4fd2d6" : "#4d8fb0");
      hemi.current.intensity = lerp(0.75, 1.1, uw);
    }
    if (moon.current) moon.current.intensity = lerp(2.2, 0.9, uw);

    if (!s.ready && ++s.frames > 2) {
      s.ready = true;
      onReady();
    }
  }, -1);

  return (
    <>
      <hemisphereLight ref={hemi} args={["#4d8fb0", "#3a3226", 0.75]} />
      <directionalLight ref={moon} position={MOON_DIR.clone().multiplyScalar(30).toArray()} color="#d6f1ff" intensity={2.2} />
      <ambientLight intensity={0.18} color="#7fb8d0" />
    </>
  );
}

export default function OceanScene({ onReady }: { onReady: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 40, near: 0.05, far: 700, position: [-8, 1.5, 6.6] }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color(NIGHT_FOG);
        scene.fog = new THREE.FogExp2(NIGHT_FOG.getHex(), 0.016);
        scene.environmentIntensity = 0.45;
      }}
    >
      <Stepper onReady={onReady} />
      <Environment resolution={64} frames={1}>
        <Lightformer intensity={2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 12, 1]} color="#bff4ff" />
        <Lightformer intensity={1.2} position={[-6, 1, -2]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} color="#3ec7cf" />
        <Lightformer intensity={0.8} position={[6, 2, 4]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} color="#1d6f8a" />
      </Environment>
      <Sky />
      <Terrain />
      <Water />
      <Beach />
      <Egg />
      <Turtle />
      <Underwater />
    </Canvas>
  );
}
