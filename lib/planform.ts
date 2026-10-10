/** Taraka X-1 research geometry. Units are metres. Nose points toward +X. */

export type Station = {
  s: number;
  rx: number;
  crown: number;
  belly: number;
  cy: number;
  nCrown?: number;
  nBelly?: number;
};

export const PLAN = {
  noseX: 6.72,
  length: 8.62,
  /** Research design point, carried from the Taraka X-1 twin-duct study. */
  ductInnerDiameter: 2.8,
  ductInnerRadius: 1.4,
  stations: [
    { s: 0.0, rx: 0.045, crown: 0.05, belly: 0.045, cy: 1.22, nCrown: 2.2, nBelly: 2.2 },
    { s: 0.045, rx: 0.3, crown: 0.34, belly: 0.28, cy: 1.18, nCrown: 2.2, nBelly: 2.6 },
    { s: 0.1, rx: 0.58, crown: 0.66, belly: 0.5, cy: 1.16, nCrown: 2.15, nBelly: 2.8 },
    { s: 0.17, rx: 0.74, crown: 0.84, belly: 0.62, cy: 1.2, nCrown: 2.2, nBelly: 3.1 },
    { s: 0.26, rx: 0.84, crown: 0.94, belly: 0.68, cy: 1.28, nCrown: 2.25, nBelly: 3.3 },
    { s: 0.4, rx: 0.88, crown: 0.96, belly: 0.7, cy: 1.32, nCrown: 2.3, nBelly: 3.4 },
    { s: 0.54, rx: 0.86, crown: 0.92, belly: 0.68, cy: 1.36, nCrown: 2.3, nBelly: 3.3 },
    { s: 0.66, rx: 0.7, crown: 0.74, belly: 0.54, cy: 1.48, nCrown: 2.25, nBelly: 3.0 },
    { s: 0.78, rx: 0.42, crown: 0.46, belly: 0.32, cy: 1.66, nCrown: 2.2, nBelly: 2.7 },
    { s: 0.9, rx: 0.18, crown: 0.2, belly: 0.13, cy: 1.82, nCrown: 2.1, nBelly: 2.4 },
    { s: 1.0, rx: 0.02, crown: 0.025, belly: 0.018, cy: 1.9, nCrown: 2.0, nBelly: 2.0 },
  ] as Station[],
};

export const DUCT = {
  /** Pivot root on the centreline, before dihedral. */
  x: 3.42,
  y: 1.62,
  /** Lateral offset of the duct centre from the centreline, before dihedral. */
  z: 2.62,
  dihedral: (7 * Math.PI) / 180,
  innerR: 1.4,
  outerLip: 1.7,
  /** Axial extent of the cowl, inlet (+) to exhaust (−), metres. */
  inletX: 0.72,
  exitX: -1.02,
};

export type SectionSample = {
  s: number;
  x: number;
  rx: number;
  crown: number;
  belly: number;
  cy: number;
  nCrown: number;
  nBelly: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type ShapeKey = "rx" | "crown" | "belly" | "cy";
const shapeKeys: ShapeKey[] = ["rx", "crown", "belly", "cy"];
/** Matched monotone tangents preserve stations without the former flat-ended ripples. */
const shapeTangents = Object.fromEntries(
  shapeKeys.map((key) => {
    const stations = PLAN.stations;
    const secants = stations
      .slice(1)
      .map((station, i) => (station[key] - stations[i][key]) / (station.s - stations[i].s));
    const tangents = stations.map((station, i) => {
      if (i === 0) return secants[0];
      if (i === stations.length - 1) return secants[i - 1];
      const left = secants[i - 1];
      const right = secants[i];
      if (left * right <= 0) return 0;
      const before = station.s - stations[i - 1].s;
      const after = stations[i + 1].s - station.s;
      const w1 = 2 * after + before;
      const w2 = after + 2 * before;
      return (w1 + w2) / (w1 / left + w2 / right);
    });
    return [key, tangents];
  }),
) as Record<ShapeKey, number[]>;

export function sectionInto(s: number, out: SectionSample): SectionSample {
  const stations = PLAN.stations;
  const clamped = Math.min(1, Math.max(0, s));
  let i = 0;
  while (i < stations.length - 2 && stations[i + 1].s < clamped) i += 1;
  const a = stations[i];
  const b = stations[i + 1];
  const span = b.s - a.s || 1;
  const t = (clamped - a.s) / span;
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = (t3 - 2 * t2 + t) * span;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = (t3 - t2) * span;
  out.s = clamped;
  out.x = PLAN.noseX - clamped * PLAN.length;
  out.rx = h00 * a.rx + h10 * shapeTangents.rx[i] + h01 * b.rx + h11 * shapeTangents.rx[i + 1];
  out.crown = h00 * a.crown + h10 * shapeTangents.crown[i] + h01 * b.crown + h11 * shapeTangents.crown[i + 1];
  out.belly = h00 * a.belly + h10 * shapeTangents.belly[i] + h01 * b.belly + h11 * shapeTangents.belly[i + 1];
  out.cy = h00 * a.cy + h10 * shapeTangents.cy[i] + h01 * b.cy + h11 * shapeTangents.cy[i + 1];
  out.nCrown = lerp(a.nCrown ?? 2.3, b.nCrown ?? 2.3, t);
  out.nBelly = lerp(a.nBelly ?? 3.2, b.nBelly ?? 3.2, t);
  return out;
}

export function sectionAt(s: number): SectionSample {
  return sectionInto(s, {
    s: 0,
    x: 0,
    rx: 0,
    crown: 0,
    belly: 0,
    cy: 0,
    nCrown: 0,
    nBelly: 0,
  });
}

export function insideFuselage(x: number, y: number, z: number, margin = 0.92) {
  const s = (PLAN.noseX - x) / PLAN.length;
  if (s < -0.01 || s > 1.01) return false;
  const sec = sectionAt(s);
  const nz = Math.abs(z) / Math.max(sec.rx, 1e-4);
  const above = y >= sec.cy;
  const ny = above ? (y - sec.cy) / Math.max(sec.crown, 1e-4) : (sec.cy - y) / Math.max(sec.belly, 1e-4);
  const n = above ? sec.nCrown : sec.nBelly;
  return Math.pow(nz, n) + Math.pow(Math.abs(ny), n) < margin;
}

export type DuctPose = {
  side: 1 | -1;
  tilt: number;
  x: number;
  y: number;
  z: number;
  roll: number;
};

/** World position of a duct centre after the 7° pylon dihedral. */
export function ductOrigin(side: 1 | -1, out: { x: number; y: number; z: number }) {
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  const lz = side * DUCT.z;
  out.x = DUCT.x;
  out.y = DUCT.y - lz * Math.sin(roll);
  out.z = lz * Math.cos(roll);
  return out;
}

export function ductPose(side: 1 | -1, tilt: number): DuctPose {
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  const origin = ductOrigin(side, { x: 0, y: 0, z: 0 });
  return { side, tilt, x: origin.x, y: origin.y, z: origin.z, roll };
}

/** Duct-local point (inlet is +X) to world. */
export function ductLocalToWorld(
  side: 1 | -1,
  tilt: number,
  lx: number,
  ly: number,
  lz: number,
  out: { x: number; y: number; z: number },
) {
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  const x = lx * c - ly * s;
  const y = lx * s + ly * c;
  const z = lz + side * DUCT.z;
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  out.x = x + DUCT.x;
  out.y = DUCT.y + y * cr - z * sr;
  out.z = y * sr + z * cr;
}

export type DuctLocal = { x: number; y: number; z: number; radial: number };

/** World point into duct-local axes. Local +X points out of the inlet. */
export function worldToDuctInto(
  side: 1 | -1,
  tilt: number,
  wx: number,
  wy: number,
  wz: number,
  out: DuctLocal,
): DuctLocal {
  const x0 = wx - DUCT.x;
  const y0 = wy - DUCT.y;
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  const y1 = y0 * cr + wz * sr;
  const z1 = -y0 * sr + wz * cr;
  const c = Math.cos(tilt);
  const sn = Math.sin(tilt);
  out.x = x0 * c + y1 * sn;
  out.y = -x0 * sn + y1 * c;
  out.z = z1 - side * DUCT.z;
  out.radial = Math.hypot(out.y, out.z);
  return out;
}

export function worldToDuct(side: 1 | -1, tilt: number, wx: number, wy: number, wz: number) {
  return worldToDuctInto(side, tilt, wx, wy, wz, { x: 0, y: 0, z: 0, radial: 0 });
}

export function ductVectorToWorld(
  side: 1 | -1,
  tilt: number,
  vx: number,
  vy: number,
  vz: number,
  out: { x: number; y: number; z: number },
) {
  const c = Math.cos(tilt);
  const s = Math.sin(tilt);
  const x = vx * c - vy * s;
  const y = vx * s + vy * c;
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  const cr = Math.cos(roll);
  const sr = Math.sin(roll);
  out.x = x;
  out.y = y * cr - vz * sr;
  out.z = y * sr + vz * cr;
}
