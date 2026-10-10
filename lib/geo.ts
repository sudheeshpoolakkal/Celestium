import * as THREE from "three";
import { PLAN, sectionAt, type SectionSample } from "./planform";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function pointOn(sec: SectionSample, theta: number, out: THREE.Vector3) {
  const c = Math.cos(theta);
  const sn = Math.sin(theta);
  const above = sn >= 0;
  const n = above ? sec.nCrown : sec.nBelly;
  const ry = above ? sec.crown : sec.belly;
  const ex = 2 / n;
  const y = sec.cy + (sn === 0 ? 0 : Math.sign(sn) * ry * Math.pow(Math.abs(sn), ex));
  const z = c === 0 ? 0 : Math.sign(c) * sec.rx * Math.pow(Math.abs(c), ex);
  out.set(sec.x, y, z);
  return out;
}

export function loftSections(sections: SectionSample[], slices = 72, cap = true) {
  const nSec = sections.length;
  const positions: number[] = [];
  const uvs: number[] = [];
  const tmp = new THREE.Vector3();
  for (let i = 0; i < nSec; i += 1) {
    for (let j = 0; j < slices; j += 1) {
      const theta = (j / slices) * Math.PI * 2;
      pointOn(sections[i], theta, tmp);
      positions.push(tmp.x, tmp.y, tmp.z);
      uvs.push(j / slices, sections[i].s);
    }
  }
  const index: number[] = [];
  for (let i = 0; i < nSec - 1; i += 1) {
    for (let j = 0; j < slices; j += 1) {
      const j2 = (j + 1) % slices;
      const a = i * slices + j;
      const b = i * slices + j2;
      const c = (i + 1) * slices + j;
      const d = (i + 1) * slices + j2;
      index.push(a, c, b, b, c, d);
    }
  }
  if (cap) {
    const s0 = sections[0];
    const nose = positions.length / 3;
    positions.push(s0.x, s0.cy, 0);
    uvs.push(0.5, s0.s);
    for (let j = 0; j < slices; j += 1) {
      index.push(nose, (j + 1) % slices, j);
    }
    const s1 = sections[nSec - 1];
    const tail = positions.length / 3;
    positions.push(s1.x, s1.cy, 0);
    uvs.push(0.5, s1.s);
    const base = (nSec - 1) * slices;
    for (let j = 0; j < slices; j += 1) {
      index.push(tail, base + j, base + ((j + 1) % slices));
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(index);
  forceOutward(geo);
  geo.computeVertexNormals();
  return geo;
}

function forceOutward(geo: THREE.BufferGeometry) {
  geo.computeVertexNormals();
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  let score = 0;
  const step = Math.max(1, Math.floor(pos.count / 90));
  for (let i = 0; i < pos.count; i += step) {
    score += Math.sign(pos.getY(i) - 1.25) * nor.getY(i);
  }
  if (score < 0 && geo.index) {
    const index = geo.index;
    for (let i = 0; i < index.count; i += 3) {
      const b = index.getX(i + 1);
      index.setX(i + 1, index.getX(i + 2));
      index.setX(i + 2, b);
    }
  }
}

export function buildFuselage() {
  const samples = 48;
  const sections: SectionSample[] = [];
  for (let i = 0; i < samples; i += 1) {
    sections.push(sectionAt(i / (samples - 1)));
  }
  const geo = loftSections(sections, 80, true);
  const colors = new Float32Array(geo.attributes.position.count * 3);
  colors.fill(1);
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

/** A glazed surface patch follows the actual forward fuselage loft. */
export function canopyPoint(t: number, u: number, out: THREE.Vector3, offset = 0.025) {
  const s = 0.055 + t * 0.238;
  const sec = sectionAt(s);
  // Raise the sill toward the rear of the cockpit, keeping a continuous wrap.
  const sill = 0.05 + 0.17 * t * t;
  const theta = Math.PI * (sill + u * (1 - 2 * sill));
  pointOn(sec, theta, out);
  out.y += offset;
  out.z *= 1 + offset / Math.max(sec.rx, 0.2);
  return out;
}

export function buildCanopy() {
  const rows = 34;
  const columns = 48;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const point = new THREE.Vector3();
  for (let i = 0; i <= rows; i += 1) {
    for (let j = 0; j <= columns; j += 1) {
      canopyPoint(i / rows, j / columns, point);
      positions.push(point.x, point.y, point.z);
      uvs.push(j / columns, i / rows);
    }
  }
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      const a = i * (columns + 1) + j;
      const b = a + 1;
      const c = a + columns + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Frame curves use the same patch parameterization as the cockpit glazing. */
export function buildCanopyFrame() {
  const curves: THREE.BufferGeometry[] = [];
  const point = new THREE.Vector3();
  const paths = [
    (t: number) => [t, 0],
    (t: number) => [t, 1],
    (u: number) => [0, u],
    (u: number) => [1, u],
    (t: number) => [t, 0.5],
    (u: number) => [0.61, u],
  ];
  for (const path of paths) {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 32; i += 1) {
      const [t, u] = path(i / 32);
      canopyPoint(t, u, point, 0.033);
      points.push(point.clone());
    }
    const curve = new THREE.CatmullRomCurve3(points);
    curves.push(new THREE.TubeGeometry(curve, 40, 0.015, 6, false));
  }
  return curves;
}

/** A cabin panel follows the hull rather than floating beside it. */
export function buildSidePanel(side: 1 | -1, window = false) {
  const start = window ? 0.405 : 0.376;
  const end = window ? 0.501 : 0.544;
  const low = window ? 0.1 : -0.43;
  const high = window ? 0.32 : 0.43;
  const rows = 18;
  const columns = 12;
  const vertices: number[] = [];
  const indices: number[] = [];
  const point = new THREE.Vector3();
  const at = (t: number, u: number) => {
    const sec = sectionAt(lerp(start, end, t));
    const angle = lerp(low, high, u);
    pointOn(sec, side === 1 ? angle : Math.PI - angle, point);
    point.z += side * (window ? 0.028 : 0.014);
    return point.clone();
  };
  for (let i = 0; i <= rows; i += 1) {
    for (let j = 0; j <= columns; j += 1) {
      const p = at(i / rows, j / columns);
      vertices.push(p.x, p.y, p.z);
    }
  }
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      const a = i * (columns + 1) + j;
      const b = a + 1;
      const c = a + columns + 1;
      const d = c + 1;
      if (side === 1) indices.push(a, b, c, b, d, c);
      else indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const perimeter: THREE.Vector3[] = [];
  for (const edge of [
    (t: number) => at(t, 0),
    (t: number) => at(1, t),
    (t: number) => at(1 - t, 1),
    (t: number) => at(0, 1 - t),
  ])
    for (let i = 0; i < 20; i += 1) perimeter.push(edge(i / 20));
  const frame = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(perimeter, true),
    100,
    window ? 0.009 : 0.006,
    5,
    true,
  );
  return { geometry, frame };
}

export function buildLatheX(profile: Array<{ x: number; r: number }>, segments = 80) {
  const n = profile.length;
  const positions: number[] = [];
  const uvs: number[] = [];
  for (let j = 0; j <= segments; j += 1) {
    const theta = (j / segments) * Math.PI * 2;
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    for (let i = 0; i < n; i += 1) {
      const p = profile[i];
      positions.push(p.x, p.r * s, p.r * c);
      uvs.push(j / segments, i / (n - 1));
    }
  }
  const index: number[] = [];
  for (let j = 0; j < segments; j += 1) {
    for (let i = 0; i < n - 1; i += 1) {
      const a = j * n + i;
      const b = j * n + i + 1;
      const c = (j + 1) * n + i;
      const d = (j + 1) * n + i + 1;
      index.push(a, b, c, c, b, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  const colors = new Float32Array(geo.attributes.position.count * 3);
  colors.fill(1);
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

/** Shroud meridional section: superellipse lip, cylindrical barrel, 6.91° diffuser. */
export function ductProfile() {
  const throat = 1.4;
  const exitR = throat * Math.sqrt(1.25);
  const pts: Array<{ x: number; r: number }> = [];
  const innerN = 22;
  for (let i = 0; i <= innerN; i += 1) {
    const t = i / innerN;
    const x = -1.02 + t * 1.46;
    let r = throat;
    if (x < -0.02) {
      const u = (x + 1.02) / 1.0;
      const su = u * u * (3 - 2 * u);
      r = exitR + (throat - exitR) * su;
    }
    pts.push({ x, r });
  }
  const lipN = 18;
  for (let i = 1; i <= lipN; i += 1) {
    const a = (i / lipN) * Math.PI;
    const n = 2.5;
    const ex = 2 / n;
    const sa = Math.sin(a);
    const x = 0.44 + Math.pow(Math.abs(sa), ex) * 0.3;
    const outer = 1.72;
    const r = throat + (outer - throat) * (0.5 * (1 - Math.cos(a)));
    pts.push({ x, r });
  }
  const outerN = 16;
  for (let i = 1; i <= outerN; i += 1) {
    const t = i / outerN;
    const x = 0.44 - t * 1.46;
    const r = lerp(1.72, exitR + 0.045, t * t * (3 - 2 * t) * 0.55 + t * 0.45);
    pts.push({ x, r });
  }
  pts.push({ x: pts[0].x, r: pts[0].r });
  return pts;
}

export function buildDuct() {
  return buildLatheX(ductProfile(), 84);
}

export function buildSpinner() {
  const pts: Array<{ x: number; r: number }> = [];
  for (let i = 0; i <= 22; i += 1) {
    const t = i / 22;
    const ang = t * (Math.PI / 2);
    pts.push({ x: 0.58 * Math.cos(ang) + 0.02, r: Math.max(0.012, 0.3 * Math.sin(ang)) });
  }
  return buildLatheX(pts, 32);
}

function naca(x: number, t: number) {
  const xc = Math.min(1, Math.max(1e-4, x));
  return (
    5 * t * (0.2969 * Math.sqrt(xc) - 0.126 * xc - 0.3516 * xc * xc + 0.2843 * xc ** 3 - 0.1015 * xc ** 4)
  );
}

export function buildBlade(opts: {
  rootR: number;
  tipR: number;
  chordRoot: number;
  chordTip: number;
  thick: number;
  twistRoot: number;
  twistTip: number;
}) {
  const nr = 14;
  const nc = 22;
  const positions: number[] = [];
  const uvs: number[] = [];
  for (let i = 0; i <= nr; i += 1) {
    const t = i / nr;
    const radius = lerp(opts.rootR, opts.tipR, t);
    const chord = lerp(opts.chordRoot, opts.chordTip, t);
    const twist = lerp(opts.twistRoot, opts.twistTip, t);
    const ct = Math.cos(twist);
    const st = Math.sin(twist);
    const thick = opts.thick * (1 - 0.45 * t);
    for (let j = 0; j < nc; j += 1) {
      const u = j / nc;
      const upper = u < 0.5;
      const xt = upper ? u * 2 : 1 - (u - 0.5) * 2;
      const yt = (upper ? 1 : -1) * naca(xt, thick) * chord;
      const px = yt;
      const pz = (0.32 - xt) * chord;
      const x = px * ct - pz * st;
      const z = px * st + pz * ct;
      positions.push(x, radius, z);
      uvs.push(u, t);
    }
  }
  const index: number[] = [];
  for (let i = 0; i < nr; i += 1) {
    for (let j = 0; j < nc; j += 1) {
      const j2 = (j + 1) % nc;
      const a = i * nc + j;
      const b = i * nc + j2;
      const c = (i + 1) * nc + j;
      const d = (i + 1) * nc + j2;
      index.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

/** Wing or fin. Span runs +Z, chord runs toward −X (aft), thickness along Y. */
export function buildWing(opts: {
  span: number;
  rootChord: number;
  tipChord: number;
  thick: number;
  sweepBack: number;
}) {
  const nr = 10;
  const nc = 18;
  const positions: number[] = [];
  for (let i = 0; i <= nr; i += 1) {
    const t = i / nr;
    const chord = lerp(opts.rootChord, opts.tipChord, t);
    const thick = opts.thick * (1 - 0.25 * t);
    const z = t * opts.span;
    const sweep = opts.sweepBack * t;
    for (let j = 0; j < nc; j += 1) {
      const u = j / nc;
      const upper = u < 0.5;
      const xt = upper ? u * 2 : 1 - (u - 0.5) * 2;
      const yt = (upper ? 1 : -1) * naca(xt, thick) * chord;
      const x = -xt * chord + sweep;
      positions.push(x, yt, z);
    }
  }
  const index: number[] = [];
  for (let i = 0; i < nr; i += 1) {
    for (let j = 0; j < nc; j += 1) {
      const j2 = (j + 1) % nc;
      const a = i * nc + j;
      const b = i * nc + j2;
      const c = (i + 1) * nc + j;
      const d = (i + 1) * nc + j2;
      index.push(a, c, b, b, c, d);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(index);
  geo.computeVertexNormals();
  return geo;
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Albedo and door cutouts. u runs around the body, v runs nose → tail. */
export function makeLivery() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  if (!g) throw new Error("canvas");
  g.fillStyle = "#f4f6f3";
  g.fillRect(0, 0, w, h);
  g.strokeStyle = "rgba(47, 65, 59, 0.10)";
  g.lineWidth = 1;
  for (const station of [0.3, 0.62, 0.8]) {
    g.beginPath();
    g.moveTo(0, station * h);
    g.lineTo(w, station * h);
    g.stroke();
  }
  // A restrained longitudinal pinstripe on each side.
  g.strokeStyle = "#708b7f";
  g.lineWidth = 5;
  for (const u of [0.945, 0.555]) {
    g.beginPath();
    g.moveTo(w * u, h * 0.3);
    g.lineTo(w * u, h * 0.78);
    g.stroke();
  }

  g.save();
  g.translate(w * 0.09, h * 0.5);
  g.rotate(-Math.PI / 2);
  g.fillStyle = "#1a2330";
  g.font = "500 52px sans-serif";
  g.fillText("TARAKA", 0, 0);
  g.restore();

  g.save();
  g.translate(w * 0.59, h * 0.5);
  g.rotate(-Math.PI / 2);
  g.fillStyle = "#1a2330";
  g.font = "500 52px sans-serif";
  g.fillText("X-1", 0, 0);
  g.restore();

  // Cabin doors, split across the side meridian, and the aft ramp.
  g.globalCompositeOperation = "destination-out";
  g.fillStyle = "#000";
  roundRect(g, w * 0.0, h * 0.378, w * 0.067, h * 0.164, 12);
  g.fill();
  roundRect(g, w * 0.933, h * 0.378, w * 0.067, h * 0.164, 12);
  g.fill();
  roundRect(g, w * 0.433, h * 0.378, w * 0.067, h * 0.164, 12);
  g.fill();
  roundRect(g, w * 0.5, h * 0.378, w * 0.067, h * 0.164, 12);
  g.fill();
  roundRect(g, w * 0.66, h * 0.57, w * 0.18, h * 0.14, 24);
  g.fill();
  g.globalCompositeOperation = "source-over";

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.flipY = false;
  tex.needsUpdate = true;
  return tex;
}

export function makePlate(lines: string[], accent = "#d7ecf8") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const g = canvas.getContext("2d");
  if (!g) throw new Error("canvas");
  g.clearRect(0, 0, 512, 256);
  g.fillStyle = accent;
  g.font = "600 92px monospace";
  g.textAlign = "center";
  g.textBaseline = "middle";
  lines.forEach((line, i) => {
    g.fillText(line, 256, 100 + i * 88);
  });
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const AIRCRAFT_LENGTH = PLAN.length;
