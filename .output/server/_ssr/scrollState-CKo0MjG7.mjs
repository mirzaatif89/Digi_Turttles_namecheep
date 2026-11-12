//#region node_modules/.nitro/vite/services/ssr/assets/scrollState-CKo0MjG7.js
var EGG_Z = .3;
var EGG_BURY = .12;
var WALK_START_X = -4.7;
var WALK_END_X = 7.2;
var WADE_END_X = 8.6;
var STRIDE = .38;
var SWIM_DEPTH = -2.3;
/** Progress values where each chapter of the story begins/ends. */
var STAGE = {
	idleEnd: .02,
	crackEnd: .1,
	breakEnd: .15,
	headStart: .115,
	headEnd: .17,
	climbEnd: .24,
	walkEnd: .47,
	wadeEnd: .52,
	diveEnd: .58
};
/** Progress values pinned to the interlude sections of the page. */
var ANCHOR = {
	hatch: .165,
	walk: .36,
	dive: .55
};
var clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
var lerp = (a, b, t) => a + (b - a) * t;
var remap = (v, a, b) => clamp((v - a) / (b - a));
var smoothstep = (a, b, v) => {
	const t = remap(v, a, b);
	return t * t * (3 - 2 * t);
};
var easeInOut = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
/** Beach + seabed height. Shoreline runs diagonally so the sea fills the back-right. */
function groundHeight(x, z) {
	const u = x - z * .3;
	const base = .6 - 5.6 * smoothstep(5, 16, u);
	const dunes = (Math.sin(x * .7) * .12 + Math.sin(z * 1.1 + x * .3) * .08) * (1 - smoothstep(3, 7, u));
	const hills = smoothstep(-6, -16, z) * 1.8 * (1 - smoothstep(0, 6, u)) * (.6 + .4 * Math.sin(x * .3));
	const bed = (Math.sin(x * .4 + z * .3) * .35 + Math.sin(z * .7 - x * .2) * .25) * smoothstep(12, 20, u);
	return base + dunes + hills + bed;
}
var EGG_GROUND = groundHeight(-6, EGG_Z);
var pathZ = (x) => EGG_Z + Math.sin((x - WALK_START_X) * .45) * .35;
var pathYaw = (x) => -Math.atan(Math.cos((x - WALK_START_X) * .45) * .45 * .35);
var BODY_H = .085;
/** Chapter index used by the on-page journey indicator. */
function chapterAt(p) {
	if (p < STAGE.idleEnd + .01) return 0;
	if (p < STAGE.climbEnd) return 1;
	if (p < STAGE.walkEnd) return 2;
	if (p < STAGE.diveEnd) return 3;
	return 4;
}
function storyAt(p, t, lateral = 1) {
	p = clamp(p);
	const crack = remap(p, STAGE.idleEnd, STAGE.crackEnd);
	const shellOpen = easeInOut(remap(p, STAGE.crackEnd, STAGE.breakEnd));
	const idleBurst = Math.pow(Math.max(0, Math.sin(t * 1.7)), 6) * .35;
	const crackBurst = (.4 + .6 * Math.pow(Math.max(0, Math.sin(t * 3.1)), 2)) * (crack > 0 && shellOpen < 1 ? 1 : 0);
	const eggWobble = Math.max(idleBurst * (1 - crack), crackBurst * (.4 + crack * .6)) * (1 - shellOpen * .8);
	const eggTilt = -.32 * smoothstep(.17, .215, p);
	let x = -6;
	let y = EGG_GROUND + .3;
	let z = EGG_Z;
	let pitch = 1.25;
	let yaw = 0;
	let crawlPhase = 0;
	const scale = lerp(.55, 1, smoothstep(.205, .28, p));
	const climbPhaseEnd = (STAGE.climbEnd - STAGE.headStart) * 140;
	if (p < STAGE.headEnd) {
		y = EGG_GROUND + lerp(.3, .52, smoothstep(STAGE.headStart, STAGE.headEnd, p));
		crawlPhase = (p - STAGE.headStart) * 140;
	} else if (p < STAGE.climbEnd) {
		const c = remap(p, STAGE.headEnd, STAGE.climbEnd);
		const e = easeInOut(c);
		x = lerp(-6, WALK_START_X, e);
		z = lerp(EGG_Z, pathZ(WALK_START_X), e);
		const gy = groundHeight(x, z) + BODY_H * scale;
		y = lerp(EGG_GROUND + .52, gy, e) + .3 * Math.sin(Math.PI * Math.min(c * 1.5, 1)) * (1 - c);
		if (c < .4) pitch = lerp(1.25, .2, c / .4);
		else if (c < .7) pitch = lerp(.2, -.55, (c - .4) / .3);
		else pitch = lerp(-.55, 0, (c - .7) / .3);
		yaw = lerp(0, pathYaw(WALK_START_X), e);
		crawlPhase = (p - STAGE.headStart) * 140;
	} else if (p < STAGE.walkEnd) {
		x = lerp(WALK_START_X, WALK_END_X, remap(p, STAGE.climbEnd, STAGE.walkEnd));
		z = pathZ(x);
		y = groundHeight(x, z) + BODY_H * scale;
		const slope = (groundHeight(x + .3, z) - groundHeight(x - .3, z)) / .6;
		pitch = Math.atan(slope);
		yaw = pathYaw(x);
		crawlPhase = climbPhaseEnd + (x - WALK_START_X) / STRIDE * Math.PI * 2;
	} else if (p < STAGE.wadeEnd) {
		const w = remap(p, STAGE.walkEnd, STAGE.wadeEnd);
		x = lerp(WALK_END_X, WADE_END_X, w);
		z = pathZ(x);
		const gy = groundHeight(x, z) + BODY_H * scale;
		y = Math.max(gy, -.14);
		const slope = (groundHeight(x + .3, z) - groundHeight(x - .3, z)) / .6;
		pitch = Math.atan(slope) * (1 - w);
		yaw = pathYaw(x);
		crawlPhase = climbPhaseEnd + (x - WALK_START_X) / STRIDE * Math.PI * 2;
	} else if (p < STAGE.diveEnd) {
		const d = remap(p, STAGE.wadeEnd, STAGE.diveEnd);
		x = lerp(WADE_END_X, 12, d);
		z = lerp(pathZ(WADE_END_X), EGG_Z, d);
		y = lerp(-.14, SWIM_DEPTH, easeInOut(d));
		pitch = -.65 * Math.sin(Math.PI * d);
		yaw = lerp(pathYaw(WADE_END_X), 0, d);
	} else {
		x = lerp(12, 40, remap(p, STAGE.diveEnd, 1));
		const sx = x - 12;
		y = SWIM_DEPTH - sx * .035 + Math.sin(sx * .35) * .35;
		z = EGG_Z + Math.sin(sx * .2) * .3;
		pitch = Math.atan(-.035 + Math.cos(sx * .35) * .35 * .35);
		yaw = -Math.atan(Math.cos(sx * .2) * .2 * .3);
	}
	const swim = smoothstep(STAGE.walkEnd + .01, STAGE.wadeEnd + .01, p);
	const swimPhase = t * 3.4 + p * 120;
	const tuck = smoothstep(STAGE.headStart + .02, STAGE.climbEnd - .02, p);
	const turtle = {
		x,
		y,
		z
	};
	const L = lateral;
	const eg = EGG_GROUND;
	const hero = {
		pos: {
			x: -6 - 2.3 * L,
			y: eg + 1.7,
			z: 6.6
		},
		target: {
			x: -6 - 2.2 * L,
			y: eg + .75,
			z: 0
		}
	};
	const close = {
		pos: {
			x: -6 - 1.2 * L,
			y: eg + 1.35,
			z: 4.4
		},
		target: {
			x: -6 - .85 * L,
			y: eg + .62,
			z: EGG_Z
		}
	};
	const above = {
		pos: {
			x: x - 1.5 * L,
			y: Math.max(y, 0) + 1.45,
			z: z + 5.2
		},
		target: {
			x: x - 1.25 * L,
			y: y + .3,
			z
		}
	};
	const under = {
		pos: {
			x: x - 1.8 * L,
			y: y + .55,
			z: z + 5.4
		},
		target: {
			x: x - 1.45 * L,
			y: y + .05,
			z
		}
	};
	const uwCam = smoothstep(.49, .565, p);
	const follow = {
		pos: mix3(above.pos, under.pos, uwCam),
		target: mix3(above.target, under.target, uwCam)
	};
	let camPos = mix3(hero.pos, close.pos, smoothstep(.015, .09, p));
	let camTarget = mix3(hero.target, close.target, smoothstep(.015, .09, p));
	const f = smoothstep(.17, .27, p);
	camPos = mix3(camPos, follow.pos, f);
	camTarget = mix3(camTarget, follow.target, f);
	const splashRaw = remap(p, .505, .56);
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
		splashX: 8.4,
		tracksToX: p > STAGE.climbEnd ? Math.min(x, 6.9) : WALK_START_X,
		chapter: chapterAt(p)
	};
}
function mix3(a, b, t) {
	return {
		x: lerp(a.x, b.x, t),
		y: lerp(a.y, b.y, t),
		z: lerp(a.z, b.z, t)
	};
}
/** Piecewise-linear scroll → story progress, so story beats line up with page sections. */
function mapScroll(scrollY, anchors) {
	if (anchors.length === 0) return 0;
	if (scrollY <= anchors[0].y) return anchors[0].p;
	for (let i = 1; i < anchors.length; i++) {
		const a = anchors[i - 1];
		const b = anchors[i];
		if (scrollY <= b.y) return b.y === a.y ? b.p : lerp(a.p, b.p, (scrollY - a.y) / (b.y - a.y));
	}
	return anchors[anchors.length - 1].p;
}
/** Keep anchors strictly increasing in both scroll position and progress. */
function normalizeAnchors(list) {
	const sorted = [...list].sort((a, b) => a.p - b.p);
	const out = [];
	for (const a of sorted) {
		const prev = out[out.length - 1];
		if (prev && a.y <= prev.y) continue;
		out.push(a);
	}
	return out;
}
/** Shared, non-React state the 3D scene and HUD read every frame. */
var scrollState = {
	target: 0,
	pointerX: 0,
	pointerY: 0
};
var anchors = [];
function measure() {
	const vh = window.innerHeight;
	const max = Math.max(1, document.documentElement.scrollHeight - vh);
	const list = [{
		y: 0,
		p: 0
	}];
	document.querySelectorAll("[data-story]").forEach((el) => {
		const r = el.getBoundingClientRect();
		const y = r.top + window.scrollY + r.height / 2 - vh / 2;
		const p = Number.parseFloat(el.dataset["story"] ?? "");
		if (Number.isFinite(p)) list.push({
			y: Math.min(Math.max(1, y), max - 1),
			p
		});
	});
	list.push({
		y: max,
		p: 1
	});
	anchors = normalizeAnchors(list);
}
function update() {
	scrollState.target = mapScroll(window.scrollY, anchors);
}
/** Starts listening to scroll/pointer. Returns a cleanup function. */
function startScrollStory() {
	measure();
	update();
	let scrollFrame = 0;
	let resizeFrame = 0;
	let pointerFrame = 0;
	let pointer;
	const onScroll = () => {
		if (scrollFrame) return;
		scrollFrame = requestAnimationFrame(() => {
			scrollFrame = 0;
			update();
		});
	};
	const onResize = () => {
		if (resizeFrame) return;
		resizeFrame = requestAnimationFrame(() => {
			resizeFrame = 0;
			measure();
			update();
		});
	};
	const onPointer = (e) => {
		pointer = e;
		if (pointerFrame) return;
		pointerFrame = requestAnimationFrame(() => {
			pointerFrame = 0;
			if (!pointer) return;
			scrollState.pointerX = pointer.clientX / window.innerWidth * 2 - 1;
			scrollState.pointerY = -(pointer.clientY / window.innerHeight * 2 - 1);
		});
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	window.addEventListener("resize", onResize);
	window.addEventListener("pointermove", onPointer, { passive: true });
	const ro = new ResizeObserver(onResize);
	ro.observe(document.body);
	return () => {
		window.removeEventListener("scroll", onScroll);
		window.removeEventListener("resize", onResize);
		window.removeEventListener("pointermove", onPointer);
		cancelAnimationFrame(scrollFrame);
		cancelAnimationFrame(resizeFrame);
		cancelAnimationFrame(pointerFrame);
		ro.disconnect();
	};
}
//#endregion
export { WALK_START_X as a, lerp as c, startScrollStory as d, storyAt as f, EGG_Z as i, scrollState as l, EGG_BURY as n, chapterAt as o, EGG_GROUND as r, groundHeight as s, ANCHOR as t, smoothstep as u };
