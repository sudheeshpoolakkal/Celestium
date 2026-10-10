/**
 * Analytic flow model for the Taraka X-1 demonstrator.
 *
 * The field is a visualisation, assembled so a visitor can see the same
 * mechanisms the design depends on:
 *   - slender-body blockage from the fuselage area rule
 *   - a sink at each duct inlet and an actuator-disk jet inside the cowl
 *   - contra-rotating swirl in the two ducts
 *   - cruise trailing vortices
 *   - a hover ground sheet and the fountain between the ducts
 *
 * It is not a Navier–Stokes solution. Speeds are nondimensional on the
 * cruise freestream. The hot path allocates nothing.
 */

import {
  DUCT,
  PLAN,
  ductLocalToWorld,
  ductOrigin,
  ductVectorToWorld,
  sectionAt,
  sectionInto,
  worldToDuctInto,
  type DuctLocal,
  type SectionSample,
} from "./planform";

export type Vec3 = { x: number; y: number; z: number };

export type FieldParams = {
  /** 0 cruise (duct axis forward) … π/2 hover (duct axis up). */
  tilt: number;
};

type Source = { x: number; y: number; z: number; k: number };

const BODY_SOURCES: Source[] = buildBodySources();
const SIDES: Array<1 | -1> = [1, -1];

const secA: SectionSample = { s: 0, x: 0, rx: 1, crown: 1, belly: 1, cy: 0, nCrown: 2, nBelly: 2 };
const secB: SectionSample = { s: 0, x: 0, rx: 1, crown: 1, belly: 1, cy: 0, nCrown: 2, nBelly: 2 };
const localA: DuctLocal = { x: 0, y: 0, z: 0, radial: 0 };
const localB: DuctLocal = { x: 0, y: 0, z: 0, radial: 0 };
const scratch = { x: 0, y: 0, z: 0 };
const scratchB = { x: 0, y: 0, z: 0 };
const origin = { x: 0, y: 0, z: 0 };

function buildBodySources(): Source[] {
  const n = 18;
  const sources: Source[] = [];
  let prevA = 0;
  const sec = { s: 0, x: 0, rx: 1, crown: 1, belly: 1, cy: 0, nCrown: 2, nBelly: 2 };
  const mid = { s: 0, x: 0, rx: 1, crown: 1, belly: 1, cy: 0, nCrown: 2, nBelly: 2 };
  for (let i = 0; i <= n; i += 1) {
    const s = i / n;
    sectionInto(s, sec);
    const area = Math.PI * sec.rx * ((sec.crown + sec.belly) * 0.5) * 0.9;
    if (i > 0) {
      const dA = area - prevA;
      sectionInto((i - 0.5) / n, mid);
      sources.push({
        x: mid.x,
        y: mid.cy + (mid.crown - mid.belly) * 0.05,
        z: 0,
        k: dA / (4 * Math.PI),
      });
    }
    prevA = area;
  }
  return sources;
}

function addSource(
  px: number,
  py: number,
  pz: number,
  sx: number,
  sy: number,
  sz: number,
  m: number,
  out: Vec3,
) {
  const dx = px - sx;
  const dy = py - sy;
  const dz = pz - sz;
  const r2 = dx * dx + dy * dy + dz * dz;
  const r = Math.sqrt(r2);
  const rc = Math.max(r, 0.22);
  const f = m / (rc * rc * rc);
  out.x += dx * f;
  out.y += dy * f;
  out.z += dz * f;
}

function addFilament(
  px: number,
  py: number,
  pz: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  gamma: number,
  out: Vec3,
) {
  const r1x = px - ax;
  const r1y = py - ay;
  const r1z = pz - az;
  const r2x = px - bx;
  const r2y = py - by;
  const r2z = pz - bz;
  const r0x = bx - ax;
  const r0y = by - ay;
  const r0z = bz - az;
  const cx = r1y * r2z - r1z * r2y;
  const cy = r1z * r2x - r1x * r2z;
  const cz = r1x * r2y - r1y * r2x;
  const c2 = cx * cx + cy * cy + cz * cz + 0.08;
  const r1 = Math.hypot(r1x, r1y, r1z) + 1e-5;
  const r2 = Math.hypot(r2x, r2y, r2z) + 1e-5;
  const term = (r0x * r1x + r0y * r1y + r0z * r1z) / r1 - (r0x * r2x + r0y * r2y + r0z * r2z) / r2;
  const k = ((gamma / (4 * Math.PI)) * term) / c2;
  out.x += k * cx;
  out.y += k * cy;
  out.z += k * cz;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v));
}

function rhoOf(x: number, y: number, z: number, sec: SectionSample) {
  const nz = z / Math.max(sec.rx, 1e-4);
  const above = y >= sec.cy;
  const ry = above ? sec.crown : sec.belly;
  const ny = (above ? y - sec.cy : sec.cy - y) / Math.max(ry, 1e-4);
  const n = above ? sec.nCrown : sec.nBelly;
  return Math.pow(Math.pow(Math.abs(nz), n) + Math.pow(Math.abs(ny), n), 1 / n);
}

function insideSolid(x: number, y: number, z: number, tilt: number) {
  if (y < -0.02) return true;
  const s = (PLAN.noseX - x) / PLAN.length;
  if (s >= 0 && s <= 1) {
    sectionInto(s, secA);
    if (rhoOf(x, y, z, secA) < 0.86) return true;
  }
  worldToDuctInto(1, tilt, x, y, z, localA);
  if (inCowl(localA)) return true;
  worldToDuctInto(-1, tilt, x, y, z, localB);
  if (inCowl(localB)) return true;
  return false;
}

function inCowl(local: DuctLocal) {
  return (
    local.x < DUCT.inletX - 0.02 &&
    local.x > DUCT.exitX + 0.02 &&
    local.radial > DUCT.innerR * 0.98 &&
    local.radial < DUCT.outerLip * 0.98
  );
}

/** Push streamlines off the skin so the body reads as a solid in the flow. */
function deflectBody(x: number, y: number, z: number, uInf: number, out: Vec3) {
  const s = (PLAN.noseX - x) / PLAN.length;
  if (s < -0.04 || s > 1.04) return;
  sectionInto(Math.min(1, Math.max(0, s)), secB);
  const sec = secB;
  // The underbody belongs to the hover fountain and the ground sheet.
  if (y < sec.cy - sec.belly * 0.98) return;
  const above = y >= sec.cy;
  const n = above ? sec.nCrown : sec.nBelly;
  const ry = Math.max(above ? sec.crown : sec.belly, 1e-4);
  const nz = z / Math.max(sec.rx, 1e-4);
  const ny = (above ? y - sec.cy : sec.cy - y) / ry;
  const rho = Math.pow(Math.pow(Math.abs(nz), n) + Math.pow(Math.abs(ny), n), 1 / n);
  if (rho < 1.02 || rho > 2.4) return;
  const gz = (n * Math.pow(Math.abs(nz) + 1e-3, n - 1) * Math.sign(z || 1)) / sec.rx;
  const gy = (above ? 1 : -1) * ((n * Math.pow(Math.abs(ny) + 1e-3, n - 1)) / ry);
  const gl = Math.hypot(gz, gy) || 1;
  const nyN = gy / gl;
  const nzN = gz / gl;
  const approach = out.y * nyN + out.z * nzN;
  if (approach < 0) {
    out.y -= approach * nyN;
    out.z -= approach * nzN;
  }
  if (rho < 1.35) {
    const push = (1.35 - rho) * 1.6 * uInf;
    out.y += nyN * push;
    out.z += nzN * push;
  }
}

/**
 * Writes the nondimensional velocity at a world point.
 * Returns false when the point lies inside a solid.
 */
export function sampleVelocity(x: number, y: number, z: number, params: FieldParams, out: Vec3): boolean {
  const tilt = params.tilt < 0 ? 0 : params.tilt > 1.5707963 ? 1.5707963 : params.tilt;
  const hover = smoothstep(0.08, 1.15, tilt / 1.5707963);
  const cruise = 1 - hover;
  const U = cruise + 0.1 * hover;

  if (insideSolid(x, y, z, tilt)) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    return false;
  }

  out.x = -U;
  out.y = 0;
  out.z = 0;

  for (let i = 0; i < BODY_SOURCES.length; i += 1) {
    const src = BODY_SOURCES[i];
    addSource(x, y, z, src.x, src.y, src.z, src.k * U, out);
  }

  const induced = 0.62 * cruise + 2.15 * hover;
  const swirlMag = 0.32 * cruise + 1.05 * hover;

  for (let s = 0; s < 2; s += 1) {
    const side = SIDES[s];
    const local = s === 0 ? localA : localB;
    worldToDuctInto(side, tilt, x, y, z, local);
    const sinkM = (DUCT.innerR * DUCT.innerR * induced) / 4;
    ductLocalToWorld(side, tilt, 0.55, 0, 0, scratch);
    if (local.radial > DUCT.innerR * 0.96 || local.x < DUCT.exitX || local.x > DUCT.inletX) {
      addSource(x, y, z, scratch.x, scratch.y, scratch.z, -sinkM, out);
    }

    if (local.radial < DUCT.innerR * 0.98 && local.x < 0.62 && local.x > DUCT.exitX - 0.05) {
      const core = smoothstep(DUCT.innerR * 0.98, DUCT.innerR * 0.45, local.radial);
      const axial = -(0.15 * U + induced * (0.55 + 0.45 * core));
      const decay = Math.exp(-Math.max(0, -local.x) / 1.6);
      const swirl = side * swirlMag * core * decay;
      const r = Math.max(local.radial, 0.08);
      ductVectorToWorld(side, tilt, axial, (-swirl * local.z) / r, (swirl * local.y) / r, scratchB);
      out.x = out.x * 0.15 + scratchB.x;
      out.y = out.y * 0.15 + scratchB.y;
      out.z = out.z * 0.15 + scratchB.z;
    }

    if (cruise > 0.15) {
      const gamma = 1.15 * cruise * side;
      ductLocalToWorld(side, tilt, -0.2, 1.15, 0, scratch);
      addFilament(
        x,
        y,
        z,
        scratch.x,
        scratch.y,
        scratch.z,
        scratch.x - 7.5,
        scratch.y + 0.15,
        scratch.z + side * 0.25,
        gamma,
        out,
      );
      ductLocalToWorld(side, tilt, -0.2, -1.15, 0, scratch);
      addFilament(
        x,
        y,
        z,
        scratch.x,
        scratch.y,
        scratch.z,
        scratch.x - 7.5,
        scratch.y + 0.15,
        scratch.z - side * 0.25,
        -gamma,
        out,
      );
    }

    if (hover > 0.25 && y < 1.35) {
      ductOrigin(side, origin);
      const columnR = Math.hypot(x - origin.x, z - origin.z);
      const sheet = hover * 1.55 * Math.exp(-y / 0.42) * Math.exp(-((columnR - 1.15) ** 2) / 0.95);
      const denom = columnR + 0.25;
      out.x += (sheet * (x - origin.x)) / denom;
      out.z += (sheet * (z - origin.z)) / denom;
      if (y < 0.35 && columnR < 1.5) out.y *= 1 - hover * (1 - y / 0.35);
    }
  }

  if (hover > 0.3 && y < 1.5) {
    const fountain =
      hover *
      1.85 *
      Math.exp(-(z * z) / 0.42) *
      Math.exp(-((x - DUCT.x) ** 2) / 1.15) *
      Math.exp(-Math.max(0, y) / 0.72);
    out.y += fountain;
  }

  deflectBody(x, y, z, U, out);

  if (y < 0.06) out.y = Math.max(out.y, 0.05);

  const speed = Math.hypot(out.x, out.y, out.z);
  if (speed > 3.4) {
    const k = 3.4 / speed;
    out.x *= k;
    out.y *= k;
    out.z *= k;
  }
  return true;
}

const vMid = { x: 0, y: 0, z: 0 };

export function integrate(
  x: number,
  y: number,
  z: number,
  params: FieldParams,
  step: number,
  out: Vec3,
): boolean {
  if (!sampleVelocity(x, y, z, params, vMid)) return false;
  const ok = sampleVelocity(
    x + vMid.x * step * 0.5,
    y + vMid.y * step * 0.5,
    z + vMid.z * step * 0.5,
    params,
    out,
  );
  if (!ok) {
    out.x = vMid.x;
    out.y = vMid.y;
    out.z = vMid.z;
  }
  return true;
}

export function speedOf(v: Vec3) {
  return Math.hypot(v.x, v.y, v.z);
}

// RGB swatches are converted to linear values for Three.js vertex colours.
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const PALETTE: Array<[number, number, number, number]> = [
  [0.0, 0.06, 0.2, 0.39],
  [0.22, 0.09, 0.36, 0.63],
  [0.42, 0.04, 0.52, 0.57],
  [0.6, 0.02, 0.61, 0.45],
  [0.78, 0.77, 0.61, 0.2],
  [1.0, 0.96, 0.34, 0.1],
].map(([t, r, g, b]) => [t, toLinear(r), toLinear(g), toLinear(b)]);

export function speedColor(speed: number, out: { r: number; g: number; b: number }) {
  const t = clamp(speed / 2.15, 0, 1);
  let i = 0;
  while (i < PALETTE.length - 2 && PALETTE[i + 1][0] < t) i += 1;
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  const u = (t - a[0]) / (b[0] - a[0] || 1);
  out.r = a[1] + (b[1] - a[1]) * u;
  out.g = a[2] + (b[2] - a[2]) * u;
  out.b = a[3] + (b[3] - a[3]) * u;
}

export function crownReading(params: FieldParams) {
  const sec = sectionAt(0.22);
  const v = { x: 0, y: 0, z: 0 };
  const ok = sampleVelocity(sec.x, sec.cy + sec.crown + 0.06, 0, params, v);
  const q = speedOf(v);
  const hover = smoothstep(0.08, 1.15, params.tilt / 1.5707963);
  const uInf = 1 * (1 - hover) + 0.1 * hover;
  const cp = ok ? 1 - (q / Math.max(uInf, 0.25)) ** 2 : 0;
  return { speed: q, cp, cruiseFraction: 1 - hover };
}

export const FLOW_SCALE = 2.75;

export function spawnParticle(hover: number, out: Vec3, random: () => number) {
  const mode = random();
  if (mode < 0.35 + 0.2 * (1 - hover)) {
    out.x = PLAN.noseX + 0.7 + random() * 3.4;
    out.y = 0.2 + random() * 3.5;
    out.z = (random() - 0.5) * 8.6;
    return;
  }
  const side: 1 | -1 = random() > 0.5 ? 1 : -1;
  const angle = random() * Math.PI * 2;
  const radius = Math.sqrt(random()) * DUCT.innerR * 0.92;
  // Seed in the inlet plane as it rotates, including in forward flight.
  ductLocalToWorld(
    side,
    (hover * Math.PI) / 2,
    DUCT.inletX + 0.35 + random() * 2.0,
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    out,
  );
}
