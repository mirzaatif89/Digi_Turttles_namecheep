import { Sparkles, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { live } from "./live";
import { groundHeight, WALK_START_X } from "./story";
import { makeRadialTexture, makeSandTexture } from "./textures";

export const MOON_DIR = new THREE.Vector3(0.45, 0.32, -1).normalize();

const GROUND_GLSL = /* glsl */ `
float ss(float a, float b, float x){ float t = clamp((x-a)/(b-a),0.,1.); return t*t*(3.-2.*t); }
float groundH(vec2 p){
  float u = p.x - p.y*0.3;
  float base = 0.6 - 5.6*ss(5.,16.,u);
  float dunes = (sin(p.x*0.7)*0.12 + sin(p.y*1.1 + p.x*0.3)*0.08) * (1. - ss(3.,7.,u));
  return base + dunes;
}`;

/* ---------------- Terrain (sand + seabed with caustics) ---------------- */
export function Terrain() {
  const shader = useRef<{ uniforms: Record<string, THREE.IUniform> } | null>(null);
  const { geometry, material } = useMemo(() => {
    const g = new THREE.PlaneGeometry(130, 50, 260, 100);
    g.rotateX(-Math.PI / 2);
    g.translate(22, 0, -13);
    const pos = g.getAttribute("position");
    const colors = new Float32Array(pos.count * 3);
    const dry = new THREE.Color("#d8caa8");
    const wet = new THREE.Color("#7d7462");
    const deep = new THREE.Color("#2a5b63");
    const c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = groundHeight(x, z);
      pos.setY(i, h);
      if (h > 0.15) c.copy(dry);
      else if (h > -0.6) c.lerpColors(wet, dry, (h + 0.6) / 0.75);
      else c.lerpColors(deep, wet, Math.max(0, (h + 4) / 3.4));
      colors.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    g.computeVertexNormals();
    const m = new THREE.MeshStandardMaterial({
      map: makeSandTexture(),
      vertexColors: true,
      roughness: 0.95,
    });
    m.onBeforeCompile = (sh) => {
      sh.uniforms["uTime"] = { value: 0 };
      shader.current = sh;
      sh.vertexShader = sh.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
        .replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;",
        );
      sh.fragmentShader = sh.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
          varying vec3 vWPos; uniform float uTime;
          float caustic(vec2 uv, float t){
            vec2 p = mod(uv*6.2831, 6.2831) - 250.0;
            vec2 i = p; float c = 1.0; float inten = .005;
            for (int n = 0; n < 4; n++) {
              float tt = t * (1.0 - (3.5 / float(n+1)));
              i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
              c += 1.0/length(vec2(p.x / (sin(i.x+tt)/inten), p.y / (cos(i.y+tt)/inten)));
            }
            c /= 4.0; c = 1.17 - pow(c, 1.4);
            return pow(abs(c), 8.0);
          }`,
        )
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
          float under = smoothstep(-0.1, -1.2, vWPos.y);
          totalEmissiveRadiance += vec3(0.35, 0.85, 0.85) * caustic(vWPos.xz * 0.12, uTime * 0.45) * under * 0.55;`,
        );
    };
    return { geometry: g, material: m };
  }, []);

  useFrame((s) => {
    if (shader.current) shader.current.uniforms["uTime"]!.value = s.clock.elapsedTime;
  });

  return <mesh geometry={geometry} material={material} receiveShadow />;
}

/* ---------------- Water surface ---------------- */
export function Water() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        fog: true,
        uniforms: THREE.UniformsUtils.merge([
          THREE.UniformsLib.fog,
          {
            uTime: { value: 0 },
            uDeep: { value: new THREE.Color("#06303d") },
            uShallow: { value: new THREE.Color("#1b8b93") },
            uSky: { value: new THREE.Color("#2a5d78") },
            uFoam: { value: new THREE.Color("#d9fbff") },
            uUnder: { value: new THREE.Color("#3fb8c0") },
            uMoon: { value: MOON_DIR },
          },
        ]),
        vertexShader: /* glsl */ `
          #include <fog_pars_vertex>
          uniform float uTime;
          varying vec3 vW;
          float wave(vec2 p){
            return sin(p.x*0.35 + uTime*0.9)*0.06 + sin(p.y*0.5 - uTime*0.7 + p.x*0.2)*0.05 + sin((p.x+p.y)*1.3 + uTime*1.6)*0.015;
          }
          void main(){
            vec4 w = modelMatrix * vec4(position, 1.0);
            w.y += wave(w.xz);
            vW = w.xyz;
            vec4 mvPosition = viewMatrix * w;
            gl_Position = projectionMatrix * mvPosition;
            #include <fog_vertex>
          }`,
        fragmentShader: /* glsl */ `
          #include <fog_pars_fragment>
          uniform float uTime; uniform vec3 uDeep, uShallow, uSky, uFoam, uUnder, uMoon;
          varying vec3 vW;
          ${GROUND_GLSL}
          float wave(vec2 p){
            return sin(p.x*0.35 + uTime*0.9)*0.06 + sin(p.y*0.5 - uTime*0.7 + p.x*0.2)*0.05 + sin((p.x+p.y)*1.3 + uTime*1.6)*0.015
                 + sin(p.x*3.1 + uTime*2.3)*0.006 + sin(p.y*2.7 - uTime*1.9)*0.006;
          }
          void main(){
            float e = 0.08;
            float dx = (wave(vW.xz + vec2(e,0.)) - wave(vW.xz - vec2(e,0.))) / (2.*e);
            float dz = (wave(vW.xz + vec2(0.,e)) - wave(vW.xz - vec2(0.,e))) / (2.*e);
            vec3 n = normalize(vec3(-dx*3., 1., -dz*3.));
            vec3 V = normalize(cameraPosition - vW);
            float depth = -groundH(vW.xz);
            vec4 outc;
            if (gl_FrontFacing) {
              float fres = pow(1. - max(dot(n, V), 0.), 3.);
              vec3 col = mix(uShallow, uDeep, smoothstep(0., 3.5, depth));
              col = mix(col, uSky, fres * 0.7);
              vec3 R = reflect(-V, n);
              float m = max(dot(R, uMoon), 0.);
              col += vec3(0.85, 0.97, 1.0) * (pow(m, 220.) * 2.5 + pow(m, 18.) * 0.18);
              float band = 1. - smoothstep(0., 0.45, depth);
              float lines = smoothstep(0.55, 1., sin(depth * 22. - uTime * 2.2 + sin(vW.z * 0.9) * 2.) * 0.5 + 0.5);
              float foam = band * (0.35 + 0.65 * lines) * step(-0.02, depth);
              col = mix(col, uFoam, foam * 0.75);
              float a = mix(0.45, 0.93, smoothstep(0., 1.6, depth));
              outc = vec4(col, max(a, foam * 0.9));
            } else {
              float sh = sin(vW.x * 2.1 + uTime * 1.4) * sin(vW.z * 1.7 - uTime) * 0.5 + 0.5;
              float up = pow(max(dot(-n, -V), 0.), 2.);
              vec3 col = mix(uDeep * 1.4, uUnder, up * 0.8 + sh * 0.2);
              outc = vec4(col, 0.92);
            }
            gl_FragColor = outc;
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`,
      }),
    [],
  );
  useFrame((s) => {
    mat.uniforms["uTime"]!.value = s.clock.elapsedTime;
  });
  return (
    <mesh
      material={mat}
      position={[60, 0, -40]}
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[240, 200, 200, 160]} />
    </mesh>
  );
}

/* ---------------- Night sky ---------------- */
export function Sky() {
  const group = useRef<THREE.Group>(null);
  const skyMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color("#030b17") },
          uHorizon: { value: new THREE.Color("#0f4256") },
          uMoon: { value: MOON_DIR },
        },
        vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
        fragmentShader: `uniform vec3 uTop, uHorizon, uMoon; varying vec3 vD;
          void main(){ float h = clamp(vD.y, 0., 1.); vec3 c = mix(uHorizon, uTop, pow(h, 0.45));
          float m = max(dot(vD, uMoon), 0.); c += vec3(0.3,0.6,0.7) * pow(m, 30.) * 0.5;
          gl_FragColor = vec4(c, 1.);
          #include <colorspace_fragment>
          }`,
      }),
    [],
  );
  const glow = useMemo(() => makeRadialTexture("rgba(190,240,255,0.9)", "rgba(120,210,230,0)"), []);
  useFrame(({ camera }) => {
    if (!group.current) return;
    group.current.position.copy(camera.position);
    group.current.visible = live.uw < 0.6;
  });
  const moonPos = MOON_DIR.clone().multiplyScalar(220);
  return (
    <group ref={group}>
      <mesh material={skyMat} renderOrder={-10}>
        <sphereGeometry args={[300, 32, 16]} />
      </mesh>
      <Stars radius={180} depth={50} count={2200} factor={5} saturation={0} fade speed={0.6} />
      <mesh position={moonPos}>
        <sphereGeometry args={[7, 32, 16]} />
        <meshBasicMaterial color="#eafcff" fog={false} toneMapped={false} />
      </mesh>
      <sprite position={moonPos} scale={[70, 70, 1]}>
        <spriteMaterial
          map={glow}
          transparent
          depthWrite={false}
          fog={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
    </group>
  );
}

/* ---------------- Beach props: rocks, tracks, bioluminescence ---------------- */
export function Beach() {
  const tracks = useRef<THREE.InstancedMesh>(null);
  const N = 140;
  const trackData = useMemo(() => {
    const arr: { x: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const x = WALK_START_X + (i >> 1) * 0.17 + 0.2;
      const side = i % 2 ? 1 : -1;
      const z = 0.3 + Math.sin((x - WALK_START_X) * 0.45) * 0.35 + side * 0.24;
      arr.push({ x, z });
    }
    return arr;
  }, []);
  const rocks = useMemo(
    () =>
      [
        [-10.5, -5.5, 0.9],
        [-3.2, -5.2, 0.6],
        [1.5, -7, 1.2],
        [16, -2, 1.4],
        [22, 1.8, 1.0],
        [29, -4, 1.8],
        [35, 0.5, 0.9],
        [41, -3, 1.3],
      ].map(([x = 0, z = 0, s = 1]) => ({ x, z, s, y: groundHeight(x, z) })),
    [],
  );

  useFrame(() => {
    const m = tracks.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    let count = 0;
    for (const d of trackData) {
      if (d.x > live.story.tracksToX) break;
      dummy.position.set(d.x, groundHeight(d.x, d.z) + 0.012, d.z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.scale.set(0.09, 0.05, 1);
      dummy.updateMatrix();
      m.setMatrixAt(count++, dummy.matrix);
    }
    m.count = count;
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={tracks} args={[undefined, undefined, N]} frustumCulled={false}>
        <circleGeometry args={[1, 10]} />
        <meshBasicMaterial color="#5e5443" transparent opacity={0.55} depthWrite={false} />
      </instancedMesh>
      {rocks.map((r, i) => (
        <mesh
          key={i}
          position={[r.x, r.y + r.s * 0.2, r.z]}
          scale={[r.s, r.s * 0.6, r.s * 0.8]}
          rotation={[i, i * 2, 0]}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={r.y < 0 ? "#2e4a4f" : "#5b5a55"}
            roughness={0.9}
            flatShading
          />
        </mesh>
      ))}
      <Sparkles
        count={70}
        scale={[3, 0.4, 14]}
        position={[7.4, 0.15, -2]}
        color="#6ff3f0"
        size={4}
        speed={0.35}
        opacity={0.9}
      />
    </>
  );
}
