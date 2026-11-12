import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { live } from "./live";
import { groundHeight } from "./story";
import { makeRadialTexture } from "./textures";

const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* Light shafts from the surface */
function GodRays() {
  const group = useRef<THREE.Group>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: { uOpacity: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
        fragmentShader: `uniform float uOpacity; uniform float uTime; varying vec2 vUv;
          void main(){ float edge = smoothstep(0., .35, vUv.x) * smoothstep(1., .65, vUv.x);
          float fade = pow(vUv.y, 1.6); float flick = .75 + .25*sin(uTime*1.3 + vUv.x*9.);
          gl_FragColor = vec4(vec3(.45,.95,.95) * edge * fade * flick * uOpacity, 1.); }`,
      }),
    [],
  );
  const rays = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        x: 9 + i * 3 + rand(i) * 2,
        z: -5 + rand(i + 9) * 5,
        w: 1.2 + rand(i + 3) * 2.2,
      })),
    [],
  );
  useFrame(({ camera, clock }) => {
    mat.uniforms["uOpacity"]!.value = live.uw * 0.22;
    mat.uniforms["uTime"]!.value = clock.elapsedTime;
    if (group.current) {
      group.current.visible = live.uw > 0.01;
      group.current.children.forEach((c) => {
        c.rotation.y = Math.atan2(
          camera.position.x - c.position.x,
          camera.position.z - c.position.z,
        );
      });
    }
  });
  return (
    <group ref={group}>
      {rays.map((r, i) => (
        <mesh key={i} material={mat} position={[r.x, -3.6, r.z]}>
          <planeGeometry args={[r.w, 8]} />
        </mesh>
      ))}
    </group>
  );
}

/* Drifting marine snow */
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const dot = useMemo(() => makeRadialTexture(), []);
  const geo = useMemo(() => {
    const n = 900;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++)
      p.set([6 + rand(i) * 48, -5.5 + rand(i + 1000) * 5.3, -9 + rand(i + 2000) * 13], i * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.visible = live.uw > 0.01;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.25;
    ref.current.position.x = Math.sin(clock.elapsedTime * 0.13) * 0.4;
    (ref.current.material as THREE.PointsMaterial).opacity = 0.75 * live.uw;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        map={dot}
        alphaTest={0.01}
        size={0.06}
        color="#a8fbff"
        transparent
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Swaying kelp */
function Kelp() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        fog: true,
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTime: { value: 0 } }]),
        vertexShader: `#include <fog_pars_vertex>
          uniform float uTime; attribute float aSeed; varying float vY;
          void main(){ vec3 p = position; vY = uv.y;
            float s = uv.y*uv.y; p.x += sin(uTime*0.9 + aSeed*6.0 + uv.y*3.0) * 0.45 * s; p.z += cos(uTime*0.7 + aSeed*4.0) * 0.2 * s;
            vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(p,1.); gl_Position = projectionMatrix * mvPosition;
            #include <fog_vertex>
          }`,
        fragmentShader: `#include <fog_pars_fragment>
          varying float vY;
          void main(){ vec3 c = mix(vec3(0.03,0.16,0.14), vec3(0.16,0.45,0.36), vY); gl_FragColor = vec4(c,1.);
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`,
      }),
    [],
  );
  const { geo, count, matrices } = useMemo(() => {
    const count = 34;
    const g = new THREE.PlaneGeometry(0.28, 1, 1, 14);
    g.translate(0, 0.5, 0);
    const seeds = new Float32Array(count);
    const matrices: THREE.Matrix4[] = [];
    const d = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      seeds[i] = rand(i + 50);
      const x = 13 + rand(i + 70) * 34;
      const z = -2 - rand(i + 90) * 8;
      d.position.set(x, groundHeight(x, z) - 0.1, z);
      d.rotation.set(0, rand(i + 7) * Math.PI, 0);
      d.scale.set(1, 2.2 + rand(i + 33) * 3.2, 1);
      d.updateMatrix();
      matrices.push(d.matrix.clone());
    }
    g.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
    return { geo: g, count, matrices };
  }, []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useFrame(({ clock }) => {
    mat.uniforms["uTime"]!.value = clock.elapsedTime;
  });
  return (
    <instancedMesh
      ref={(m) => {
        ref.current = m;
        if (m) {
          matrices.forEach((mx, i) => m.setMatrixAt(i, mx));
          m.instanceMatrix.needsUpdate = true;
        }
      }}
      args={[geo, mat, count]}
      frustumCulled={false}
    />
  );
}

/* A small school of fish circling */
function Fish() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 28;
  const geo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.06, 0.26, 6);
    g.rotateZ(-Math.PI / 2);
    return g;
  }, []);
  const d = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m) return;
    m.visible = live.uw > 0.05;
    const t = clock.elapsedTime * 0.35;
    for (let i = 0; i < N; i++) {
      const a = t + (i / N) * 0.9 + rand(i) * 0.4;
      const r = 3 + rand(i + 5) * 1.2;
      const cx = 27;
      const cz = -3.5;
      d.position.set(
        cx + Math.cos(a) * r,
        -2.4 + Math.sin(a * 2 + i) * 0.4 + rand(i + 8) * 0.8,
        cz + Math.sin(a) * r * 0.6,
      );
      d.rotation.set(0, -a - Math.PI / 2, Math.sin(clock.elapsedTime * 8 + i) * 0.15);
      d.updateMatrix();
      m.setMatrixAt(i, d.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[geo, undefined, N]} frustumCulled={false}>
      <meshStandardMaterial
        color="#8fe6ea"
        emissive="#1c6f78"
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.4}
      />
    </instancedMesh>
  );
}

/* Bubbles trailing the turtle + entry ripples */
function Bubbles() {
  const group = useRef<THREE.Group>(null);
  const ripples = useRef<THREE.Group>(null);
  const N = 14;
  useFrame(({ clock }) => {
    const s = live.story;
    const t = clock.elapsedTime;
    if (group.current) {
      const under = s.turtle.y < -0.4;
      group.current.visible = under;
      group.current.children.forEach((c, i) => {
        const k = (t * 0.45 + rand(i)) % 1;
        c.position.set(
          s.turtle.x + 0.35 - k * 0.6 + Math.sin(t * 3 + i) * 0.05,
          s.turtle.y + 0.15 + k * 2.4,
          s.turtle.z + (rand(i + 3) - 0.5) * 0.3,
        );
        c.scale.setScalar(0.02 + rand(i + 7) * 0.035 + k * 0.02);
      });
    }
    if (ripples.current) {
      const sp = s.splash;
      ripples.current.visible = sp >= 0;
      ripples.current.position.set(s.splashX, 0.03, s.turtle.z);
      ripples.current.children.forEach((c, i) => {
        const k = Math.max(0, sp * 1.4 - i * 0.2);
        c.scale.setScalar(0.2 + k * 2.4);
        ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
          Math.max(0, 0.7 * (1 - k)) * (k > 0 ? 1 : 0);
      });
    }
  });
  return (
    <>
      <group ref={group}>
        {Array.from({ length: N }, (_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshPhysicalMaterial
              color="#d8ffff"
              transparent
              opacity={0.45}
              roughness={0}
              transmission={0}
              emissive="#3fbcc4"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
      </group>
      <group ref={ripples}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.9, 1, 48]} />
            <meshBasicMaterial color="#d9fbff" transparent depthWrite={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export function Underwater() {
  return (
    <>
      <GodRays />
      <Particles />
      <Kelp />
      <Fish />
      <Bubbles />
    </>
  );
}
