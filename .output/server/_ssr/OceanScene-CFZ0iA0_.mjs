import { o as __toESM } from "../_runtime.mjs";
import { a as WALK_START_X, c as lerp, f as storyAt, i as EGG_Z, l as scrollState, n as EGG_BURY, r as EGG_GROUND, s as groundHeight, u as smoothstep } from "./scrollState-CKo0MjG7.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { L as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { a as Canvas, i as Environment, n as Stars, o as useFrame, r as Lightformer, s as useThree, t as Sparkles } from "../_libs/@react-three/drei+[...].mjs";
import { A as MeshBasicMaterial, B as RepeatWrapping, C as InstancedBufferAttribute, I as PlaneGeometry, K as TubeGeometry, M as MeshStandardMaterial, N as Object3D, U as ShaderMaterial, V as SRGBColorSpace, W as SphereGeometry, X as Vector3, Y as Vector2, b as FogExp2, c as BufferGeometry, d as CircleGeometry, h as ConeGeometry, j as MeshPhysicalMaterial, l as CanvasTexture, p as Color, q as UniformsUtils, r as UniformsLib, s as BufferAttribute, u as CatmullRomCurve3, w as LatheGeometry } from "../_libs/monogrid__gainmap-js+three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/OceanScene-CFZ0iA0_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Per-frame story state written by the single stepper, read by scene parts. */
var live = {
	story: storyAt(0, 0),
	uw: 0,
	time: 0
};
var H = 1.25;
var W = .5;
var CRACK = .62 * Math.PI;
var SEG = 48;
var eggPoint = (th) => new Vector2(W * Math.sin(th) * (1 + .12 * Math.cos(th)), H / 2 * (1 - Math.cos(th)));
var zig = (i) => {
	const s = i % SEG;
	return (s % 2 ? 1 : -1) * .04 * (.55 + .45 * Math.sin(s * 2.3));
};
var RIM = eggPoint(CRACK);
function half(from, to, n, crackRow) {
	const pts = [];
	for (let k = 0; k <= n; k++) pts.push(eggPoint(from + (to - from) * k / n));
	const g = new LatheGeometry(pts, SEG);
	const pos = g.getAttribute("position");
	for (let i = 0; i <= SEG; i++) {
		const idx = i * pts.length + crackRow;
		pos.setY(idx, pos.getY(idx) + zig(i));
	}
	g.computeVertexNormals();
	return g;
}
function crackTube(dir) {
	const pts = [];
	for (let k = 0; k <= SEG / 2; k++) {
		const i = dir === 1 ? k : SEG - k;
		const phi = i / SEG * Math.PI * 2;
		const r = RIM.x * 1.015;
		pts.push(new Vector3(r * Math.sin(phi), RIM.y + zig(i), r * Math.cos(phi)));
	}
	const curve = new CatmullRomCurve3(pts, false, "centripetal");
	return new TubeGeometry(curve, 144, .009, 5, false);
}
var SHARDS = Array.from({ length: 10 }, (_, i) => {
	return {
		a: i / 10 * Math.PI * 2 + .3,
		dist: .5 + i * 37 % 10 / 14,
		up: .35 + i * 53 % 10 / 22,
		spin: 3 + i % 4 * 2,
		size: .05 + i % 3 * .02
	};
});
function Egg() {
	const egg = (0, import_react.useRef)(null);
	const top = (0, import_react.useRef)(null);
	const cracks = (0, import_react.useRef)([]);
	const shards = (0, import_react.useRef)([]);
	const res = (0, import_react.useMemo)(() => {
		return {
			mat: new MeshPhysicalMaterial({
				color: "#f6efdf",
				emissive: "#3b3628",
				emissiveIntensity: .55,
				roughness: .5,
				sheen: .4,
				sheenColor: new Color("#ffffff"),
				side: 2
			}),
			crackMat: new MeshBasicMaterial({ color: "#2b2a22" }),
			bottom: half(0, CRACK, 18, 18),
			top: half(CRACK, Math.PI, 10, 0),
			tubes: [crackTube(1), crackTube(-1)],
			shard: new CircleGeometry(1, 3),
			nest: new SphereGeometry(1, 24, 16)
		};
	}, []);
	useFrame((state) => {
		const s = live.story;
		const t = state.clock.elapsedTime;
		if (egg.current) {
			const w = s.eggWobble;
			egg.current.rotation.z = Math.sin(t * 17) * .09 * w + s.eggTilt;
			egg.current.rotation.x = Math.cos(t * 13) * .05 * w;
		}
		for (const m of cracks.current) {
			if (!m) continue;
			const total = m.geometry.index ? m.geometry.index.count : 0;
			const n = Math.floor(s.crack * total / 6) * 6;
			m.geometry.setDrawRange(0, n);
			m.visible = s.crack > 0 && s.shellOpen < .05;
		}
		if (top.current) {
			const e = s.shellOpen;
			const restY = EGG_BURY + (H - RIM.y) * .92;
			top.current.position.set(-1.3 * e, RIM.y + (restY - RIM.y) * e + .75 * Math.sin(Math.PI * e), .3 * e);
			top.current.rotation.set(.35 * e, .6 * e, Math.PI * .94 * e);
		}
		shards.current.forEach((m, i) => {
			if (!m) return;
			const d = SHARDS[i];
			const f = s.shellOpen;
			m.visible = f > .02;
			const r = RIM.x + d.dist * f;
			m.position.set(Math.sin(d.a) * r, RIM.y + (EGG_BURY + .01 - RIM.y) * f + d.up * 4 * f * (1 - f), Math.cos(d.a) * r);
			m.rotation.set(d.spin * f, d.spin * .7 * f, 0);
			if (f >= .999) m.rotation.set(-Math.PI / 2, 0, i);
		});
	});
	const base = [
		-6,
		EGG_GROUND - EGG_BURY,
		EGG_Z
	];
	const nestEggs = [
		[
			-6.95,
			0,
			EGG_Z - .55
		],
		[
			-6.25,
			0,
			EGG_Z - 1.05
		],
		[
			-7.5,
			0,
			EGG_Z + .25
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: egg,
			position: base,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: res.bottom,
					material: res.mat,
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					ref: top,
					position: [
						0,
						RIM.y,
						0
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: res.top,
						material: res.mat,
						position: [
							0,
							-RIM.y,
							0
						],
						castShadow: true
					})
				}),
				res.tubes.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: g,
					material: res.crackMat,
					ref: (m) => void (m && (cracks.current[i] = m))
				}, i))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			position: base,
			children: SHARDS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: res.shard,
				material: res.mat,
				scale: d.size,
				ref: (m) => void (m && (shards.current[i] = m))
			}, i))
		}),
		nestEggs.map(([x, , z], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: res.nest,
			material: res.mat,
			position: [
				x,
				groundHeight(x, z) - .12,
				z
			],
			scale: [
				.28,
				.36,
				.28
			],
			rotation: [
				.3 * i,
				i,
				.4 - i * .3
			]
		}, i))
	] });
}
function canvas(size) {
	const c = document.createElement("canvas");
	c.width = c.height = size;
	return [c, c.getContext("2d")];
}
/** Top-down sea-turtle carapace pattern (scutes) in unit-circle space. */
function makeShellTexture() {
	const S = 512;
	const [c, g] = canvas(S);
	const R = 250;
	const cx = S / 2;
	const cy = S / 2;
	const grad = g.createRadialGradient(cx, cy, 20, cx, cy, R);
	grad.addColorStop(0, "#5d7566");
	grad.addColorStop(.7, "#3a4d45");
	grad.addColorStop(1, "#22302d");
	g.fillStyle = grad;
	g.fillRect(0, 0, S, S);
	const P = (x, y) => [cx + x * R, cy + y * R];
	const poly = (pts, fill) => {
		g.beginPath();
		pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
		g.closePath();
		g.fillStyle = fill;
		g.fill();
		g.strokeStyle = "#9cc7bd";
		g.lineWidth = 5;
		g.stroke();
	};
	for (const side of [-1, 1]) for (let k = 0; k < 4; k++) {
		const x0 = -.58 + k * .29;
		const x1 = x0 + .29;
		poly([
			P(x0, .15 * side),
			P(x1, .15 * side),
			P(x1 * .86, .68 * side),
			P(x0 * .86, .68 * side)
		], k % 2 ? "#4b6357" : "#435a50");
	}
	[
		-.6,
		-.31,
		-.02,
		.27,
		.54
	].forEach((x, i) => {
		const w = .15;
		const h = i === 0 || i === 4 ? .13 : .16;
		poly([
			P(x - w, 0),
			P(x - w * .55, -h),
			P(x + w * .55, -h),
			P(x + w, 0),
			P(x + w * .55, h),
			P(x - w * .55, h)
		], "#557063");
	});
	g.strokeStyle = "#9cc7bd";
	g.lineWidth = 5;
	g.beginPath();
	g.arc(cx, cy, R * .76, 0, Math.PI * 2);
	g.stroke();
	for (let a = 0; a < Math.PI * 2; a += Math.PI / 13) {
		g.beginPath();
		g.moveTo(cx + Math.cos(a) * R * .76, cy + Math.sin(a) * R * .76);
		g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
		g.stroke();
	}
	for (let i = 0; i < 900; i++) {
		g.fillStyle = `rgba(${Math.random() > .5 ? "20,30,28" : "150,190,175"},${Math.random() * .12})`;
		g.fillRect(Math.random() * S, Math.random() * S, 2, 2);
	}
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 4;
	return t;
}
/** Fine moonlit sand grain. */
function makeSandTexture() {
	const S = 256;
	const [c, g] = canvas(S);
	g.fillStyle = "#b9ad93";
	g.fillRect(0, 0, S, S);
	const img = g.getImageData(0, 0, S, S);
	for (let i = 0; i < img.data.length; i += 4) {
		const n = (Math.random() - .5) * 46;
		img.data[i] = img.data[i] + n;
		img.data[i + 1] = img.data[i + 1] + n;
		img.data[i + 2] = img.data[i + 2] + n * .9;
	}
	g.putImageData(img, 0, 0);
	for (let i = 0; i < 40; i++) {
		g.strokeStyle = `rgba(90,80,60,${.05 + Math.random() * .05})`;
		g.lineWidth = 2;
		g.beginPath();
		const y = Math.random() * S;
		g.moveTo(0, y);
		g.bezierCurveTo(S * .3, y + 8, S * .6, y - 8, S, y);
		g.stroke();
	}
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(40, 14);
	t.anisotropy = 8;
	return t;
}
/** Soft radial blob for shadows, glows and sprites. */
function makeRadialTexture(inner = "rgba(255,255,255,1)", outer = "rgba(255,255,255,0)") {
	const S = 128;
	const [c, g] = canvas(S);
	const grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
	grad.addColorStop(0, inner);
	grad.addColorStop(1, outer);
	g.fillStyle = grad;
	g.fillRect(0, 0, S, S);
	return new CanvasTexture(c);
}
/** Planar top-down UVs so the scute pattern sits on the carapace like a decal. */
function shellGeometry() {
	const g = new SphereGeometry(1, 48, 32);
	const pos = g.getAttribute("position");
	const uv = g.getAttribute("uv");
	for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) * .5 + .5, .5 - pos.getZ(i) * .5);
	return g;
}
function Turtle() {
	const root = (0, import_react.useRef)(null);
	const body = (0, import_react.useRef)(null);
	const neck = (0, import_react.useRef)(null);
	const shadow = (0, import_react.useRef)(null);
	const flippers = (0, import_react.useRef)([]);
	const mats = (0, import_react.useMemo)(() => {
		return {
			shell: new MeshPhysicalMaterial({
				map: makeShellTexture(),
				roughness: .42,
				clearcoat: .8,
				clearcoatRoughness: .25
			}),
			skin: new MeshStandardMaterial({
				color: "#4d6064",
				roughness: .6
			}),
			flipper: new MeshStandardMaterial({
				color: "#56696d",
				roughness: .55
			}),
			belly: new MeshStandardMaterial({
				color: "#d8d0bb",
				roughness: .7
			}),
			eye: new MeshPhysicalMaterial({
				color: "#050708",
				roughness: .05,
				clearcoat: 1
			}),
			shadowMat: new MeshBasicMaterial({
				map: makeRadialTexture("rgba(0,0,0,0.75)", "rgba(0,0,0,0)"),
				transparent: true,
				depthWrite: false
			})
		};
	}, []);
	const geo = (0, import_react.useMemo)(() => ({
		shell: shellGeometry(),
		sphere: new SphereGeometry(1, 24, 16),
		tail: new ConeGeometry(.035, .12, 8)
	}), []);
	const flipperDefs = [
		{
			side: -1,
			front: true
		},
		{
			side: 1,
			front: true
		},
		{
			side: -1,
			front: false
		},
		{
			side: 1,
			front: false
		}
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
		const crawlBob = Math.abs(Math.sin(cp)) * .018;
		const swimBob = Math.sin(sp + Math.PI) * .035;
		body.current.position.y = lerp(crawlBob, swimBob, w);
		body.current.rotation.x = lerp(Math.sin(cp) * .05, Math.sin(sp * .5) * .04, w);
		neck.current.rotation.y = scrollState.pointerX * -.35 + Math.sin(t * .7) * .08;
		neck.current.rotation.z = lerp(.12 + Math.sin(cp * 2) * .06, .05 + Math.sin(sp) * .04, w) + scrollState.pointerY * .1;
		for (const f of flippers.current) {
			const ph = f.front ? cp + (f.side < 0 ? 0 : Math.PI) : cp + (f.side < 0 ? Math.PI : 0);
			const amp = f.front ? .6 : .4;
			const crawlSweep = f.side * amp * Math.sin(ph);
			const crawlLift = Math.max(0, Math.cos(ph)) * (f.front ? .38 : .2);
			const flap = f.front ? Math.sin(sp) * .85 : Math.sin(sp + 1) * .15;
			const swimSweep = f.front ? f.side * (-.35 + .28 * Math.cos(sp)) : f.side * -.25;
			const feather = f.front ? Math.cos(sp) * .45 : 0;
			const tuckSweep = f.side * (f.front ? -.9 : -.5);
			const sweep = lerp(tuckSweep, lerp(crawlSweep, swimSweep, w), free);
			const lift = lerp(.1, lerp(crawlLift, flap, w), free);
			f.pivot.rotation.set(-f.side * lift, sweep, 0);
			f.inner.rotation.z = feather * w * f.side;
		}
		if (shadow.current) {
			const gy = groundHeight(s.turtle.x, s.turtle.z);
			const h = s.turtle.y - gy;
			shadow.current.position.set(s.turtle.x, gy + .02, s.turtle.z);
			shadow.current.rotation.set(-Math.PI / 2, 0, -s.yaw);
			shadow.current.scale.set(1.15 * s.scale, .85 * s.scale, 1);
			shadow.current.material.opacity = Math.max(0, 1 - h * 2.2) * (s.p > .2 ? 1 : 0);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: root,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: body,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: geo.shell,
					material: mats.shell,
					position: [
						0,
						.03,
						0
					],
					scale: [
						.45,
						.17,
						.36
					],
					castShadow: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: geo.sphere,
					material: mats.belly,
					position: [
						0,
						-.02,
						0
					],
					scale: [
						.42,
						.06,
						.33
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: geo.tail,
					material: mats.skin,
					position: [
						-.46,
						-.01,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: neck,
					position: [
						.36,
						.02,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: geo.sphere,
							material: mats.skin,
							position: [
								.04,
								0,
								0
							],
							scale: [
								.1,
								.075,
								.085
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: geo.sphere,
							material: mats.skin,
							position: [
								.13,
								.01,
								0
							],
							scale: [
								.12,
								.09,
								.1
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: geo.sphere,
							material: mats.skin,
							position: [
								.23,
								-.005,
								0
							],
							scale: [
								.06,
								.055,
								.065
							]
						}),
						[-1, 1].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: geo.sphere,
							material: mats.eye,
							position: [
								.18,
								.045,
								.07 * s
							],
							scale: .026
						}) }, s))
					]
				}),
				flipperDefs.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					position: d.front ? [
						.22,
						-.02,
						.24 * d.side
					] : [
						-.29,
						-.03,
						.17 * d.side
					],
					ref: (pivot) => {
						if (!pivot) return;
						const inner = pivot.children[0];
						flippers.current[i] = {
							pivot,
							inner,
							side: d.side,
							front: d.front
						};
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						rotation: [
							0,
							(d.front ? -.45 : -1) * d.side,
							0
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: geo.sphere,
							material: mats.flipper,
							position: [
								0,
								0,
								(d.front ? .24 : .12) * d.side
							],
							scale: d.front ? [
								.1,
								.022,
								.26
							] : [
								.075,
								.018,
								.13
							]
						})
					})
				}, i))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				1.2,
				1.4,
				2
			],
			intensity: 1.6,
			distance: 6,
			color: "#7fe3e6"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		ref: shadow,
		material: mats.shadowMat,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1, 1] })
	})] });
}
var rand = (i) => {
	const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};
function GodRays() {
	const group = (0, import_react.useRef)(null);
	const mat = (0, import_react.useMemo)(() => new ShaderMaterial({
		transparent: true,
		depthWrite: false,
		blending: 2,
		side: 2,
		uniforms: {
			uOpacity: { value: 0 },
			uTime: { value: 0 }
		},
		vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
		fragmentShader: `uniform float uOpacity; uniform float uTime; varying vec2 vUv;
          void main(){ float edge = smoothstep(0., .35, vUv.x) * smoothstep(1., .65, vUv.x);
          float fade = pow(vUv.y, 1.6); float flick = .75 + .25*sin(uTime*1.3 + vUv.x*9.);
          gl_FragColor = vec4(vec3(.45,.95,.95) * edge * fade * flick * uOpacity, 1.); }`
	}), []);
	const rays = (0, import_react.useMemo)(() => Array.from({ length: 12 }, (_, i) => ({
		x: 9 + i * 3 + rand(i) * 2,
		z: -5 + rand(i + 9) * 5,
		w: 1.2 + rand(i + 3) * 2.2
	})), []);
	useFrame(({ camera, clock }) => {
		mat.uniforms["uOpacity"].value = live.uw * .22;
		mat.uniforms["uTime"].value = clock.elapsedTime;
		if (group.current) {
			group.current.visible = live.uw > .01;
			group.current.children.forEach((c) => {
				c.rotation.y = Math.atan2(camera.position.x - c.position.x, camera.position.z - c.position.z);
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children: rays.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			material: mat,
			position: [
				r.x,
				-3.6,
				r.z
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [r.w, 8] })
		}, i))
	});
}
function Particles() {
	const ref = (0, import_react.useRef)(null);
	const dot = (0, import_react.useMemo)(() => makeRadialTexture(), []);
	const geo = (0, import_react.useMemo)(() => {
		const n = 900;
		const p = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) p.set([
			6 + rand(i) * 48,
			-5.5 + rand(i + 1e3) * 5.3,
			-9 + rand(i + 2e3) * 13
		], i * 3);
		const g = new BufferGeometry();
		g.setAttribute("position", new BufferAttribute(p, 3));
		return g;
	}, []);
	useFrame(({ clock }) => {
		if (!ref.current) return;
		ref.current.visible = live.uw > .01;
		ref.current.position.y = Math.sin(clock.elapsedTime * .2) * .25;
		ref.current.position.x = Math.sin(clock.elapsedTime * .13) * .4;
		ref.current.material.opacity = .75 * live.uw;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("points", {
		ref,
		geometry: geo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			map: dot,
			alphaTest: .01,
			size: .06,
			color: "#a8fbff",
			transparent: true,
			depthWrite: false,
			sizeAttenuation: true,
			blending: 2
		})
	});
}
function Kelp() {
	const mat = (0, import_react.useMemo)(() => new ShaderMaterial({
		side: 2,
		fog: true,
		uniforms: UniformsUtils.merge([UniformsLib.fog, { uTime: { value: 0 } }]),
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
          }`
	}), []);
	const { geo, count, matrices } = (0, import_react.useMemo)(() => {
		const count = 34;
		const g = new PlaneGeometry(.28, 1, 1, 14);
		g.translate(0, .5, 0);
		const seeds = new Float32Array(count);
		const matrices = [];
		const d = new Object3D();
		for (let i = 0; i < count; i++) {
			seeds[i] = rand(i + 50);
			const x = 13 + rand(i + 70) * 34;
			const z = -2 - rand(i + 90) * 8;
			d.position.set(x, groundHeight(x, z) - .1, z);
			d.rotation.set(0, rand(i + 7) * Math.PI, 0);
			d.scale.set(1, 2.2 + rand(i + 33) * 3.2, 1);
			d.updateMatrix();
			matrices.push(d.matrix.clone());
		}
		g.setAttribute("aSeed", new InstancedBufferAttribute(seeds, 1));
		return {
			geo: g,
			count,
			matrices
		};
	}, []);
	const ref = (0, import_react.useRef)(null);
	useFrame(({ clock }) => {
		mat.uniforms["uTime"].value = clock.elapsedTime;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref: (m) => {
			ref.current = m;
			if (m) {
				matrices.forEach((mx, i) => m.setMatrixAt(i, mx));
				m.instanceMatrix.needsUpdate = true;
			}
		},
		args: [
			geo,
			mat,
			count
		],
		frustumCulled: false
	});
}
function Fish() {
	const ref = (0, import_react.useRef)(null);
	const N = 28;
	const geo = (0, import_react.useMemo)(() => {
		const g = new ConeGeometry(.06, .26, 6);
		g.rotateZ(-Math.PI / 2);
		return g;
	}, []);
	const d = (0, import_react.useMemo)(() => new Object3D(), []);
	useFrame(({ clock }) => {
		const m = ref.current;
		if (!m) return;
		m.visible = live.uw > .05;
		const t = clock.elapsedTime * .35;
		for (let i = 0; i < N; i++) {
			const a = t + i / N * .9 + rand(i) * .4;
			const r = 3 + rand(i + 5) * 1.2;
			d.position.set(27 + Math.cos(a) * r, -2.4 + Math.sin(a * 2 + i) * .4 + rand(i + 8) * .8, -3.5 + Math.sin(a) * r * .6);
			d.rotation.set(0, -a - Math.PI / 2, Math.sin(clock.elapsedTime * 8 + i) * .15);
			d.updateMatrix();
			m.setMatrixAt(i, d.matrix);
		}
		m.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("instancedMesh", {
		ref,
		args: [
			geo,
			void 0,
			N
		],
		frustumCulled: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#8fe6ea",
			emissive: "#1c6f78",
			emissiveIntensity: .6,
			roughness: .3,
			metalness: .4
		})
	});
}
function Bubbles() {
	const group = (0, import_react.useRef)(null);
	const ripples = (0, import_react.useRef)(null);
	const N = 14;
	useFrame(({ clock }) => {
		const s = live.story;
		const t = clock.elapsedTime;
		if (group.current) {
			const under = s.turtle.y < -.4;
			group.current.visible = under;
			group.current.children.forEach((c, i) => {
				const k = (t * .45 + rand(i)) % 1;
				c.position.set(s.turtle.x + .35 - k * .6 + Math.sin(t * 3 + i) * .05, s.turtle.y + .15 + k * 2.4, s.turtle.z + (rand(i + 3) - .5) * .3);
				c.scale.setScalar(.02 + rand(i + 7) * .035 + k * .02);
			});
		}
		if (ripples.current) {
			const sp = s.splash;
			ripples.current.visible = sp >= 0;
			ripples.current.position.set(s.splashX, .03, s.turtle.z);
			ripples.current.children.forEach((c, i) => {
				const k = Math.max(0, sp * 1.4 - i * .2);
				c.scale.setScalar(.2 + k * 2.4);
				c.material.opacity = Math.max(0, .7 * (1 - k)) * (k > 0 ? 1 : 0);
			});
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		children: Array.from({ length: N }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			1,
			10,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhysicalMaterial", {
			color: "#d8ffff",
			transparent: true,
			opacity: .45,
			roughness: 0,
			transmission: 0,
			emissive: "#3fbcc4",
			emissiveIntensity: .4
		})] }, i))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: ripples,
		children: [
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
				.9,
				1,
				48
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#d9fbff",
				transparent: true,
				depthWrite: false
			})]
		}, i))
	})] });
}
function Underwater() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GodRays, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kelp, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubbles, {})
	] });
}
var MOON_DIR = new Vector3(.45, .32, -1).normalize();
var GROUND_GLSL = `
float ss(float a, float b, float x){ float t = clamp((x-a)/(b-a),0.,1.); return t*t*(3.-2.*t); }
float groundH(vec2 p){
  float u = p.x - p.y*0.3;
  float base = 0.6 - 5.6*ss(5.,16.,u);
  float dunes = (sin(p.x*0.7)*0.12 + sin(p.y*1.1 + p.x*0.3)*0.08) * (1. - ss(3.,7.,u));
  return base + dunes;
}`;
function Terrain() {
	const shader = (0, import_react.useRef)(null);
	const { geometry, material } = (0, import_react.useMemo)(() => {
		const g = new PlaneGeometry(130, 50, 260, 100);
		g.rotateX(-Math.PI / 2);
		g.translate(22, 0, -13);
		const pos = g.getAttribute("position");
		const colors = new Float32Array(pos.count * 3);
		const dry = new Color("#d8caa8");
		const wet = new Color("#7d7462");
		const deep = new Color("#2a5b63");
		const c = new Color();
		for (let i = 0; i < pos.count; i++) {
			const x = pos.getX(i);
			const z = pos.getZ(i);
			const h = groundHeight(x, z);
			pos.setY(i, h);
			if (h > .15) c.copy(dry);
			else if (h > -.6) c.lerpColors(wet, dry, (h + .6) / .75);
			else c.lerpColors(deep, wet, Math.max(0, (h + 4) / 3.4));
			colors.set([
				c.r,
				c.g,
				c.b
			], i * 3);
		}
		g.setAttribute("color", new BufferAttribute(colors, 3));
		g.computeVertexNormals();
		const m = new MeshStandardMaterial({
			map: makeSandTexture(),
			vertexColors: true,
			roughness: .95
		});
		m.onBeforeCompile = (sh) => {
			sh.uniforms["uTime"] = { value: 0 };
			shader.current = sh;
			sh.vertexShader = sh.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vWPos;").replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed,1.0)).xyz;");
			sh.fragmentShader = sh.fragmentShader.replace("#include <common>", `#include <common>
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
          }`).replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>
          float under = smoothstep(-0.1, -1.2, vWPos.y);
          totalEmissiveRadiance += vec3(0.35, 0.85, 0.85) * caustic(vWPos.xz * 0.12, uTime * 0.45) * under * 0.55;`);
		};
		return {
			geometry: g,
			material: m
		};
	}, []);
	useFrame((s) => {
		if (shader.current) shader.current.uniforms["uTime"].value = s.clock.elapsedTime;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry,
		material,
		receiveShadow: true
	});
}
function Water() {
	const mat = (0, import_react.useMemo)(() => new ShaderMaterial({
		transparent: true,
		side: 2,
		depthWrite: false,
		fog: true,
		uniforms: UniformsUtils.merge([UniformsLib.fog, {
			uTime: { value: 0 },
			uDeep: { value: new Color("#06303d") },
			uShallow: { value: new Color("#1b8b93") },
			uSky: { value: new Color("#2a5d78") },
			uFoam: { value: new Color("#d9fbff") },
			uUnder: { value: new Color("#3fb8c0") },
			uMoon: { value: MOON_DIR }
		}]),
		vertexShader: `
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
		fragmentShader: `
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
          }`
	}), []);
	useFrame((s) => {
		mat.uniforms["uTime"].value = s.clock.elapsedTime;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		material: mat,
		position: [
			60,
			0,
			-40
		],
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		frustumCulled: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			240,
			200,
			200,
			160
		] })
	});
}
function Sky() {
	const group = (0, import_react.useRef)(null);
	const skyMat = (0, import_react.useMemo)(() => new ShaderMaterial({
		side: 1,
		depthWrite: false,
		fog: false,
		uniforms: {
			uTop: { value: new Color("#030b17") },
			uHorizon: { value: new Color("#0f4256") },
			uMoon: { value: MOON_DIR }
		},
		vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }`,
		fragmentShader: `uniform vec3 uTop, uHorizon, uMoon; varying vec3 vD;
          void main(){ float h = clamp(vD.y, 0., 1.); vec3 c = mix(uHorizon, uTop, pow(h, 0.45));
          float m = max(dot(vD, uMoon), 0.); c += vec3(0.3,0.6,0.7) * pow(m, 30.) * 0.5;
          gl_FragColor = vec4(c, 1.);
          #include <colorspace_fragment>
          }`
	}), []);
	const glow = (0, import_react.useMemo)(() => makeRadialTexture("rgba(190,240,255,0.9)", "rgba(120,210,230,0)"), []);
	useFrame(({ camera }) => {
		if (!group.current) return;
		group.current.position.copy(camera.position);
		group.current.visible = live.uw < .6;
	});
	const moonPos = MOON_DIR.clone().multiplyScalar(220);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				material: skyMat,
				renderOrder: -10,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					300,
					32,
					16
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
				radius: 180,
				depth: 50,
				count: 2200,
				factor: 5,
				saturation: 0,
				fade: true,
				speed: .6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: moonPos,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					7,
					32,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#eafcff",
					fog: false,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sprite", {
				position: moonPos,
				scale: [
					70,
					70,
					1
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("spriteMaterial", {
					map: glow,
					transparent: true,
					depthWrite: false,
					fog: false,
					blending: 2
				})
			})
		]
	});
}
function Beach() {
	const tracks = (0, import_react.useRef)(null);
	const N = 140;
	const trackData = (0, import_react.useMemo)(() => {
		const arr = [];
		for (let i = 0; i < N; i++) {
			const x = WALK_START_X + (i >> 1) * .17 + .2;
			const side = i % 2 ? 1 : -1;
			const z = .3 + Math.sin((x - WALK_START_X) * .45) * .35 + side * .24;
			arr.push({
				x,
				z
			});
		}
		return arr;
	}, []);
	const rocks = (0, import_react.useMemo)(() => [
		[
			-10.5,
			-5.5,
			.9
		],
		[
			-3.2,
			-5.2,
			.6
		],
		[
			1.5,
			-7,
			1.2
		],
		[
			16,
			-2,
			1.4
		],
		[
			22,
			1.8,
			1
		],
		[
			29,
			-4,
			1.8
		],
		[
			35,
			.5,
			.9
		],
		[
			41,
			-3,
			1.3
		]
	].map(([x = 0, z = 0, s = 1]) => ({
		x,
		z,
		s,
		y: groundHeight(x, z)
	})), []);
	useFrame(() => {
		const m = tracks.current;
		if (!m) return;
		const dummy = new Object3D();
		let count = 0;
		for (const d of trackData) {
			if (d.x > live.story.tracksToX) break;
			dummy.position.set(d.x, groundHeight(d.x, d.z) + .012, d.z);
			dummy.rotation.set(-Math.PI / 2, 0, 0);
			dummy.scale.set(.09, .05, 1);
			dummy.updateMatrix();
			m.setMatrixAt(count++, dummy.matrix);
		}
		m.count = count;
		m.instanceMatrix.needsUpdate = true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("instancedMesh", {
			ref: tracks,
			args: [
				void 0,
				void 0,
				N
			],
			frustumCulled: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [1, 10] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#5e5443",
				transparent: true,
				opacity: .55,
				depthWrite: false
			})]
		}),
		rocks.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				r.x,
				r.y + r.s * .2,
				r.z
			],
			scale: [
				r.s,
				r.s * .6,
				r.s * .8
			],
			rotation: [
				i,
				i * 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [1, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: r.y < 0 ? "#2e4a4f" : "#5b5a55",
				roughness: .9,
				flatShading: true
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
			count: 70,
			scale: [
				3,
				.4,
				14
			],
			position: [
				7.4,
				.15,
				-2
			],
			color: "#6ff3f0",
			size: 4,
			speed: .35,
			opacity: .9
		})
	] });
}
var NIGHT_FOG = new Color("#0a2a3a");
var DEEP_FOG = new Color("#06374a");
var tmp = new Color();
/** The one stepper: advances progress, story, camera and atmosphere before anything reads them. */
function Stepper({ onReady }) {
	const { scene, camera, size } = useThree();
	const smooth = (0, import_react.useRef)({
		p: scrollState.target,
		px: 0,
		py: 0,
		ready: false,
		frames: 0
	});
	const hemi = (0, import_react.useRef)(null);
	const moon = (0, import_react.useRef)(null);
	useFrame((state, delta) => {
		const dt = Math.min(delta, .05);
		const s = smooth.current;
		s.p += (scrollState.target - s.p) * (1 - Math.exp(-dt * 3.5));
		s.px += (scrollState.pointerX - s.px) * (1 - Math.exp(-dt * 2.5));
		s.py += (scrollState.pointerY - s.py) * (1 - Math.exp(-dt * 2.5));
		const narrow = size.width < 768;
		const story = storyAt(s.p, state.clock.elapsedTime, narrow ? .12 : 1);
		live.story = story;
		live.time = state.clock.elapsedTime;
		const cam = camera;
		const targetFov = narrow ? 58 : 40;
		if (Math.abs(cam.fov - targetFov) > .01) {
			cam.fov = targetFov;
			cam.updateProjectionMatrix();
		}
		const lift = narrow ? .45 : 0;
		cam.position.set(story.camPos.x + s.px * .35, story.camPos.y + s.py * .18 + lift, story.camPos.z);
		cam.lookAt(story.camTarget.x, story.camTarget.y + lift, story.camTarget.z);
		const uw = smoothstep(.08, -.35, cam.position.y);
		live.uw = uw;
		const fog = scene.fog;
		fog.color.lerpColors(NIGHT_FOG, DEEP_FOG, uw);
		fog.density = lerp(.016, .085, uw);
		scene.background.copy(tmp.lerpColors(NIGHT_FOG, DEEP_FOG, uw));
		if (hemi.current) {
			hemi.current.color.set(uw > .5 ? "#4fd2d6" : "#4d8fb0");
			hemi.current.intensity = lerp(.75, 1.1, uw);
		}
		if (moon.current) moon.current.intensity = lerp(2.2, .9, uw);
		if (!s.ready && ++s.frames > 2) {
			s.ready = true;
			onReady();
		}
	}, -1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", {
			ref: hemi,
			args: [
				"#4d8fb0",
				"#3a3226",
				.75
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: moon,
			position: MOON_DIR.clone().multiplyScalar(30).toArray(),
			color: "#d6f1ff",
			intensity: 2.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: .18,
			color: "#7fb8d0"
		})
	] });
}
function OceanScene({ onReady }) {
	const [visible, setVisible] = (0, import_react.useState)(() => typeof document === "undefined" || !document.hidden);
	(0, import_react.useEffect)(() => {
		const onVisibility = () => setVisible(!document.hidden);
		document.addEventListener("visibilitychange", onVisibility, { passive: true });
		return () => document.removeEventListener("visibilitychange", onVisibility);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Canvas, {
		frameloop: visible ? "always" : "never",
		dpr: [1, 1.5],
		gl: {
			antialias: true,
			powerPreference: "high-performance"
		},
		camera: {
			fov: 40,
			near: .05,
			far: 700,
			position: [
				-8,
				1.5,
				6.6
			]
		},
		onCreated: ({ scene }) => {
			scene.background = new Color(NIGHT_FOG);
			scene.fog = new FogExp2(NIGHT_FOG.getHex(), .016);
			scene.environmentIntensity = .45;
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { onReady }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
				resolution: 64,
				frames: 1,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						intensity: 2,
						position: [
							0,
							6,
							0
						],
						"rotation-x": Math.PI / 2,
						scale: [
							12,
							12,
							1
						],
						color: "#bff4ff"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						intensity: 1.2,
						position: [
							-6,
							1,
							-2
						],
						"rotation-y": Math.PI / 2,
						scale: [
							20,
							2,
							1
						],
						color: "#3ec7cf"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						intensity: .8,
						position: [
							6,
							2,
							4
						],
						"rotation-y": -Math.PI / 2,
						scale: [
							10,
							3,
							1
						],
						color: "#1d6f8a"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sky, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terrain, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Water, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Beach, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Egg, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Turtle, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Underwater, {})
		]
	});
}
//#endregion
export { OceanScene as default };
