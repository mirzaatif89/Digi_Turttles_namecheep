/**
 * Pure story timeline: maps scroll progress (0..1) to everything the 3D scene draws.
 * No React or three.js imports — keep it testable.
 */

export const EGG_X = -6;
export const EGG_Z = 0.3;
export const EGG_BURY = 0.12;
export const WALK_START_X = EGG_X + 1.3;
export const WALK_END_X = 7.2;
export const WADE_END_X = 8.6;
export const DIVE_END_X = 12;
export const SWIM_END_X = 40;
export const STRIDE = 0.38;
export const SWIM_DEPTH = -2.3;

/** Progress values where each chapter of the story begins/ends. */
export const STAGE = {
  idleEnd: 0.02,
  crackEnd: 0.1,
  breakEnd: 0.15,
  headStart: 0.115,
  headEnd: 0.17,
  climbEnd: 0.24,
  walkEnd: 0.47,
  wadeEnd: 0.52,
  diveEnd: 0.58,
} as const;

/** Progress values pinned to the interlude sections of the page. */
export const ANCHOR = { hatch: 0.165, walk: 0.36, dive: 0.55 } as const;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const remap = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
export const smoothstep = (a: number, b: number, v: number) => {
  const t = remap(v, a, b);
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Beach + seabed height. Shoreline runs diagonally so the sea fills the back-right. */
export function groundHeight(x: number, z: number): number {
  const u = x - z * 0.3;
  const base = 0.6 - 5.6 * smoothstep(5, 16, u);
  const dunes = (Math.sin(x * 0.7) * 0.12 + Math.sin(z * 1.1 + x * 0.3) * 0.08) * (1 - smoothstep(3, 7, u));
  const hills = smoothstep(-6, -16, z) * 1.8 * (1 - smoothstep(0, 6, u)) * (0.6 + 0.4 * Math.sin(x * 0.3));
  const bed = (Math.sin(x * 0.4 + z * 0.3) * 0.35 + Math.sin(z * 0.7 - x * 0.2) * 0.25) * smoothstep(12, 20, u);
  return base + dunes + hills + bed;
}

export const EGG_GROUND = groundHeight(EGG_X, EGG_Z);

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Story {
  p: number;
  eggWobble: number;
  crack: number;
  shellOpen: number;
  eggTilt: number;
  turtleVisible: boolean;
  turtle: Vec3;
  yaw: number;
  pitch: number;
  scale: number;
  /** 0 = crawling on sand, 1 = swimming */
  swim: number;
  crawlPhase: number;
  swimPhase: number;
  /** 0 = flippers tucked inside the egg, 1 = free */
  tuck: number;
  camPos: Vec3;
  camTarget: Vec3;
  /** -1 when inactive, else 0..1 */
  splash: number;
  splashX: number;
  tracksToX: number;
  chapter: number;
}

const pathZ = (x: number) => EGG_Z + Math.sin((x - WALK_START_X) * 0.45) * 0.35;
const pathYaw = (x: number) => -Math.atan(Math.cos((x - WALK_START_X) * 0.45) * 0.45 * 0.35);

const BODY_H = 0.085;

/** Chapter index used by the on-page journey indicator. */
export function chapterAt(p: number): number {
  if (p < STAGE.idleEnd + 0.01) return 0; // egg
  if (p < STAGE.climbEnd) return 1; // hatch
  if (p < STAGE.walkEnd) return 2; // crawl
  if (p < STAGE.diveEnd) return 3; // dive
  return 4; // ocean
}

export function storyAt(p: number, t: number, lateral = 1): Story {
  p = clamp(p);

  // --- Egg ---
  const crack = remap(p, STAGE.idleEnd, STAGE.crackEnd);
  const shellOpen = easeInOut(remap(p, STAGE.crackEnd, STAGE.breakEnd));
  const idleBurst = Math.pow(Math.max(0, Math.sin(t * 1.7)), 6) * 0.35;
  const crackBurst = (0.4 + 0.6 * Math.pow(Math.max(0, Math.sin(t * 3.1)), 2)) * (crack > 0 && shellOpen < 1 ? 1 : 0);
  const eggWobble = Math.max(idleBurst * (1 - crack), crackBurst * (0.4 + crack * 0.6)) * (1 - shellOpen * 0.8);
  const eggTilt = -0.32 * smoothstep(0.17, 0.215, p);

  // --- Turtle ---
  let x = EGG_X;
  let y = EGG_GROUND + 0.3;
  let z = EGG_Z;
  let pitch = 1.25;
  let yaw = 0;
  let crawlPhase = 0;
  const scale = lerp(0.55, 1, smoothstep(0.205, 0.28, p));
  const climbPhaseEnd = (STAGE.climbEnd - STAGE.headStart) * 140;

  if (p < STAGE.headEnd) {
    const h = smoothstep(STAGE.headStart, STAGE.headEnd, p);
    y = EGG_GROUND + lerp(0.3, 0.52, h);
    crawlPhase = (p - STAGE.headStart) * 140;
  } else if (p < STAGE.climbEnd) {
    const c = remap(p, STAGE.headEnd, STAGE.climbEnd);
    const e = easeInOut(c);
    x = lerp(EGG_X, WALK_START_X, e);
    z = lerp(EGG_Z, pathZ(WALK_START_X), e);
    const gy = groundHeight(x, z) + BODY_H * scale;
    y = lerp(EGG_GROUND + 0.52, gy, e) + 0.3 * Math.sin(Math.PI * Math.min(c * 1.5, 1)) * (1 - c);
    if (c < 0.4) pitch = lerp(1.25, 0.2, c / 0.4);
    else if (c < 0.7) pitch = lerp(0.2, -0.55, (c - 0.4) / 0.3);
    else pitch = lerp(-0.55, 0, (c - 0.7) / 0.3);
    yaw = lerp(0, pathYaw(WALK_START_X), e);
    crawlPhase = (p - STAGE.headStart) * 140;
  } else if (p < STAGE.walkEnd) {
    const w = remap(p, STAGE.climbEnd, STAGE.walkEnd);
    x = lerp(WALK_START_X, WALK_END_X, w);
    z = pathZ(x);
    y = groundHeight(x, z) + BODY_H * scale;
    const slope = (groundHeight(x + 0.3, z) - groundHeight(x - 0.3, z)) / 0.6;
    pitch = Math.atan(slope);
    yaw = pathYaw(x);
    crawlPhase = climbPhaseEnd + ((x - WALK_START_X) / STRIDE) * Math.PI * 2;
  } else if (p < STAGE.wadeEnd) {
    const w = remap(p, STAGE.walkEnd, STAGE.wadeEnd);
    x = lerp(WALK_END_X, WADE_END_X, w);
    z = pathZ(x);
    const gy = groundHeight(x, z) + BODY_H * scale;
    y = Math.max(gy, -0.14);
    const slope = (groundHeight(x + 0.3, z) - groundHeight(x - 0.3, z)) / 0.6;
    pitch = Math.atan(slope) * (1 - w);
    yaw = pathYaw(x);
    crawlPhase = climbPhaseEnd + ((x - WALK_START_X) / STRIDE) * Math.PI * 2;
  } else if (p < STAGE.diveEnd) {
    const d = remap(p, STAGE.wadeEnd, STAGE.diveEnd);
    x = lerp(WADE_END_X, DIVE_END_X, d);
    z = lerp(pathZ(WADE_END_X), EGG_Z, d);
    y = lerp(-0.14, SWIM_DEPTH, easeInOut(d));
    pitch = -0.65 * Math.sin(Math.PI * d);
    yaw = lerp(pathYaw(WADE_END_X), 0, d);
  } else {
    const s = remap(p, STAGE.diveEnd, 1);
    x = lerp(DIVE_END_X, SWIM_END_X, s);
    const sx = x - DIVE_END_X;
    y = SWIM_DEPTH - sx * 0.035 + Math.sin(sx * 0.35) * 0.35;
    z = EGG_Z + Math.sin(sx * 0.2) * 0.3;
    pitch = Math.atan(-0.035 + Math.cos(sx * 0.35) * 0.35 * 0.35);
    yaw = -Math.atan(Math.cos(sx * 0.2) * 0.2 * 0.3);
  }

  const swim = smoothstep(STAGE.walkEnd + 0.01, STAGE.wadeEnd + 0.01, p);
  const swimPhase = t * 3.4 + p * 120;
  const tuck = smoothstep(STAGE.headStart + 0.02, STAGE.climbEnd - 0.02, p);
  const turtle = { x, y, z };

  // --- Camera ---
  const L = lateral;
  const eg = EGG_GROUND;
  const hero = { pos: { x: EGG_X - 2.3 * L, y: eg + 1.7, z: 6.6 }, target: { x: EGG_X - 2.2 * L, y: eg + 0.75, z: 0 } };
  const close = { pos: { x: EGG_X - 1.2 * L, y: eg + 1.35, z: 4.4 }, target: { x: EGG_X - 0.85 * L, y: eg + 0.62, z: EGG_Z } };
  const above = {
    pos: { x: x - 1.5 * L, y: Math.max(y, 0) + 1.45, z: z + 5.2 },
    target: { x: x - 1.25 * L, y: y + 0.3, z },
  };
  const under = {
    pos: { x: x - 1.8 * L, y: y + 0.55, z: z + 5.4 },
    target: { x: x - 1.45 * L, y: y + 0.05, z },
  };
  const uwCam = smoothstep(0.49, 0.565, p);
  const follow = { pos: mix3(above.pos, under.pos, uwCam), target: mix3(above.target, under.target, uwCam) };
  let camPos = mix3(hero.pos, close.pos, smoothstep(0.015, 0.09, p));
  let camTarget = mix3(hero.target, close.target, smoothstep(0.015, 0.09, p));
  const f = smoothstep(0.17, 0.27, p);
  camPos = mix3(camPos, follow.pos, f);
  camTarget = mix3(camTarget, follow.target, f);

  const splashRaw = remap(p, 0.505, 0.56);
  const splash = splashRaw > 0 && splashRaw < 1 ? splashRaw : -1;

  return {
    p,
    eggWobble,
    crack,
    shellOpen,
    eggTilt,
    turtleVisible: p > STAGE.headStart,
    turtle,
    yaw,
    pitch,
    scale,
    swim,
    crawlPhase,
    swimPhase,
    tuck,
    camPos,
    camTarget,
    splash,
    splashX: WADE_END_X - 0.2,
    tracksToX: p > STAGE.climbEnd ? Math.min(x, WALK_END_X - 0.3) : WALK_START_X,
    chapter: chapterAt(p),
  };
}

function mix3(a: Vec3, b: Vec3, t: number): Vec3 {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t) };
}

export interface Anchor {
  y: number;
  p: number;
}

/** Piecewise-linear scroll → story progress, so story beats line up with page sections. */
export function mapScroll(scrollY: number, anchors: Anchor[]): number {
  if (anchors.length === 0) return 0;
  if (scrollY <= anchors[0]!.y) return anchors[0]!.p;
  for (let i = 1; i < anchors.length; i++) {
    const a = anchors[i - 1]!;
    const b = anchors[i]!;
    if (scrollY <= b.y) return b.y === a.y ? b.p : lerp(a.p, b.p, (scrollY - a.y) / (b.y - a.y));
  }
  return anchors[anchors.length - 1]!.p;
}

/** Keep anchors strictly increasing in both scroll position and progress. */
export function normalizeAnchors(list: Anchor[]): Anchor[] {
  const sorted = [...list].sort((a, b) => a.p - b.p);
  const out: Anchor[] = [];
  for (const a of sorted) {
    const prev = out[out.length - 1];
    if (prev && a.y <= prev.y) continue;
    out.push(a);
  }
  return out;
}
