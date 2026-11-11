import * as THREE from "three";

function canvas(size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return [c, c.getContext("2d")!] as const;
}

/** Top-down sea-turtle carapace pattern (scutes) in unit-circle space. */
export function makeShellTexture() {
  const S = 512;
  const [c, g] = canvas(S);
  const R = 250;
  const cx = S / 2;
  const cy = S / 2;
  const grad = g.createRadialGradient(cx, cy, 20, cx, cy, R);
  grad.addColorStop(0, "#5d7566");
  grad.addColorStop(0.7, "#3a4d45");
  grad.addColorStop(1, "#22302d");
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);

  const P = (x: number, y: number) => [cx + x * R, cy + y * R] as const;
  const poly = (pts: (readonly [number, number])[], fill: string) => {
    g.beginPath();
    pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
    g.closePath();
    g.fillStyle = fill;
    g.fill();
    g.strokeStyle = "#9cc7bd";
    g.lineWidth = 5;
    g.stroke();
  };

  // costal scutes (both sides)
  for (const side of [-1, 1]) {
    for (let k = 0; k < 4; k++) {
      const x0 = -0.58 + k * 0.29;
      const x1 = x0 + 0.29;
      poly(
        [P(x0, 0.15 * side), P(x1, 0.15 * side), P(x1 * 0.86, 0.68 * side), P(x0 * 0.86, 0.68 * side)],
        k % 2 ? "#4b6357" : "#435a50",
      );
    }
  }
  // vertebral scutes
  const xs = [-0.6, -0.31, -0.02, 0.27, 0.54];
  xs.forEach((x, i) => {
    const w = 0.15;
    const h = i === 0 || i === 4 ? 0.13 : 0.16;
    poly(
      [P(x - w, 0), P(x - w * 0.55, -h), P(x + w * 0.55, -h), P(x + w, 0), P(x + w * 0.55, h), P(x - w * 0.55, h)],
      "#557063",
    );
  });
  // marginal ring
  g.strokeStyle = "#9cc7bd";
  g.lineWidth = 5;
  g.beginPath();
  g.arc(cx, cy, R * 0.76, 0, Math.PI * 2);
  g.stroke();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 13) {
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * R * 0.76, cy + Math.sin(a) * R * 0.76);
    g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    g.stroke();
  }
  // speckle
  for (let i = 0; i < 900; i++) {
    g.fillStyle = `rgba(${Math.random() > 0.5 ? "20,30,28" : "150,190,175"},${Math.random() * 0.12})`;
    g.fillRect(Math.random() * S, Math.random() * S, 2, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Fine moonlit sand grain. */
export function makeSandTexture() {
  const S = 256;
  const [c, g] = canvas(S);
  g.fillStyle = "#b9ad93";
  g.fillRect(0, 0, S, S);
  const img = g.getImageData(0, 0, S, S);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 46;
    img.data[i] = img.data[i]! + n;
    img.data[i + 1] = img.data[i + 1]! + n;
    img.data[i + 2] = img.data[i + 2]! + n * 0.9;
  }
  g.putImageData(img, 0, 0);
  for (let i = 0; i < 40; i++) {
    g.strokeStyle = `rgba(90,80,60,${0.05 + Math.random() * 0.05})`;
    g.lineWidth = 2;
    g.beginPath();
    const y = Math.random() * S;
    g.moveTo(0, y);
    g.bezierCurveTo(S * 0.3, y + 8, S * 0.6, y - 8, S, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(40, 14);
  t.anisotropy = 8;
  return t;
}

/** Soft radial blob for shadows, glows and sprites. */
export function makeRadialTexture(inner = "rgba(255,255,255,1)", outer = "rgba(255,255,255,0)") {
  const S = 128;
  const [c, g] = canvas(S);
  const grad = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grad.addColorStop(0, inner);
  grad.addColorStop(1, outer);
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(c);
}
