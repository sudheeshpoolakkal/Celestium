"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FLOW_SCALE, integrate, sampleVelocity, spawnParticle, speedColor, speedOf } from "@/lib/flow";
import { DUCT, PLAN, ductLocalToWorld } from "@/lib/planform";
import { useMotion } from "./motion";

const color = { r: 1, g: 1, b: 1 };
const vel = { x: 0, y: 0, z: 0 };
const scratch = { x: 0, y: 0, z: 0 };
const params = { tilt: 0.45 };

export function FlowParticles() {
  const motion = useMotion();
  const count = 3600;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const colors = useMemo(() => new Float32Array(count * 3), [count]);
  const geom = useRef<THREE.BufferGeometry>(null);
  const points = useRef<THREE.Points>(null);
  const ready = useRef(false);
  const seedTilt = useRef(motion.tilt);
  const sprite = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 32;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(16, 16, 13, 0, Math.PI * 2);
    context.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);
  useLayoutEffect(() => () => sprite.dispose(), [sprite]);

  useLayoutEffect(() => {
    const g = geom.current;
    if (!g) return;
    params.tilt = motion.tilt;
    seedParticles(count, positions, colors);
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    ready.current = true;
  }, [colors, count, motion, positions]);

  useFrame((_, dt) => {
    const show = motion.flow === "both" || motion.flow === "particles";
    if (points.current) points.current.visible = show;
    if (!show || !ready.current || !geom.current) return;
    if (motion.reduced && Math.abs(seedTilt.current - motion.tilt) < 0.01) return;
    params.tilt = motion.tilt;
    if (motion.reduced) {
      seedTilt.current = motion.tilt;
      seedParticles(count, positions, colors);
    } else {
      const step = Math.min(dt, 0.033);
      for (let i = 0; i < count; i += 1) stepParticle(i, positions, colors, step);
    }
    (geom.current.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geom.current.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points name="airflow-particles" ref={points} frustumCulled={false}>
      <bufferGeometry ref={geom} />
      <pointsMaterial
        size={0.045}
        map={sprite}
        alphaTest={0.2}
        vertexColors
        transparent
        opacity={0.92}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function seedParticles(count: number, positions: Float32Array, colors: Float32Array) {
  for (let i = 0; i < count; i += 1) {
    spawnParticle(params.tilt / (Math.PI / 2), scratch, Math.random);
    positions.set([scratch.x, scratch.y, scratch.z], i * 3);
  }
  for (let pass = 0; pass < 26; pass += 1) {
    for (let i = 0; i < count; i += 1) stepParticle(i, positions, colors, 0.05);
  }
}

function stepParticle(i: number, positions: Float32Array, colors: Float32Array, step: number) {
  let x = positions[i * 3];
  let y = positions[i * 3 + 1];
  let z = positions[i * 3 + 2];
  let ok = sampleVelocity(x, y, z, params, vel);
  const speed = ok ? speedOf(vel) : 0;
  const lost =
    !ok || speed < 0.045 || x < -9 || x > PLAN.noseX + 5.5 || y < 0.02 || y > 8.2 || Math.abs(z) > 7.4;
  if (lost) {
    const hover = params.tilt / 1.5707963;
    for (let n = 0; n < 6; n += 1) {
      spawnParticle(hover, scratch, Math.random);
      x = scratch.x;
      y = scratch.y;
      z = scratch.z;
      ok = sampleVelocity(x, y, z, params, vel);
      if (ok && speedOf(vel) > 0.05) break;
    }
  } else {
    const h = FLOW_SCALE * step;
    x += vel.x * h;
    y += vel.y * h;
    z += vel.z * h;
  }
  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
  speedColor(ok ? speedOf(vel) : 0.2, color);
  colors[i * 3] = color.r;
  colors[i * 3 + 1] = color.g;
  colors[i * 3 + 2] = color.b;
}

export function FlowRibbons() {
  const motion = useMotion();
  const geom = useRef<THREE.BufferGeometry>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const lastTilt = useRef(-99);

  useLayoutEffect(() => {
    const g = geom.current;
    if (!g) return;
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(48 * 100 * 6), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(48 * 100 * 6), 3));
  }, []);

  useFrame(() => {
    const show = motion.flow === "both" || motion.flow === "ribbons";
    if (mesh.current) mesh.current.visible = show;
    if (!show || !geom.current) return;
    if (Math.abs(motion.tilt - lastTilt.current) < 0.01) return;
    lastTilt.current = motion.tilt;
    rebuild(geom.current, motion.tilt);
  });

  return (
    <mesh name="airflow-streamlines" ref={mesh} frustumCulled={false}>
      <bufferGeometry ref={geom} />
      <meshBasicMaterial vertexColors transparent opacity={0.88} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function rebuild(geo: THREE.BufferGeometry, tilt: number) {
  params.tilt = tilt;
  const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
  const colAttr = geo.getAttribute("color") as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;
  const cols = colAttr.array as Float32Array;
  const index: number[] = [];
  let vCount = 0;
  const cap = pos.length / 3;
  const pts: number[] = [];

  for (const seed of ribbonSeeds(tilt)) {
    let x = seed[0];
    let y = seed[1];
    let z = seed[2];
    pts.length = 0;
    for (let n = 0; n < 96; n += 1) {
      const ok = integrate(x, y, z, params, 0.12, vel);
      if (!ok) break;
      const speed = speedOf(vel);
      if (speed < 0.05) break;
      pts.push(x, y, z, speed);
      x += vel.x * 0.12;
      y += vel.y * 0.12;
      z += vel.z * 0.12;
      if (x < -9.2 || y < 0 || y > 8.2 || Math.abs(z) > 7.6) break;
    }
    const nPts = pts.length / 4;
    if (nPts < 8 || vCount + nPts * 2 > cap) continue;
    const base = vCount;
    for (let i = 0; i < nPts; i += 1) {
      const x0 = pts[i * 4];
      const y0 = pts[i * 4 + 1];
      const z0 = pts[i * 4 + 2];
      const speed = pts[i * 4 + 3];
      const i0 = Math.max(0, i - 1);
      const i1 = Math.min(nPts - 1, i + 1);
      const tx = pts[i1 * 4] - pts[i0 * 4];
      const ty = pts[i1 * 4 + 1] - pts[i0 * 4 + 1];
      const tz = pts[i1 * 4 + 2] - pts[i0 * 4 + 2];
      let sx = -tz;
      let sy = 0;
      let sz = tx;
      let sl = Math.hypot(sx, sy, sz);
      if (sl < 1e-4) {
        sx = ty;
        sy = -tx;
        sz = 0;
        sl = Math.hypot(sx, sy, sz) || 1;
      }
      const w = 0.018 + Math.min(speed, 2.2) * 0.013;
      sx = (sx / sl) * w;
      sy = (sy / sl) * w;
      sz = (sz / sl) * w;
      const o = vCount * 3;
      pos[o] = x0 + sx;
      pos[o + 1] = y0 + sy;
      pos[o + 2] = z0 + sz;
      pos[o + 3] = x0 - sx;
      pos[o + 4] = y0 - sy;
      pos[o + 5] = z0 - sz;
      speedColor(speed, color);
      const fade = 1;
      cols[o] = color.r * fade;
      cols[o + 1] = color.g * fade;
      cols[o + 2] = color.b * fade;
      cols[o + 3] = color.r * fade;
      cols[o + 4] = color.g * fade;
      cols[o + 5] = color.b * fade;
      vCount += 2;
    }
    for (let i = 0; i < nPts - 1; i += 1) {
      const a = base + i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }

  geo.setIndex(index);
  posAttr.needsUpdate = true;
  colAttr.needsUpdate = true;
  if (geo.boundingSphere) geo.computeBoundingSphere();
}

function ribbonSeeds(tilt: number) {
  const seeds: Array<[number, number, number]> = [];
  for (let iy = 0; iy < 3; iy += 1) {
    for (const z of [-2.8, -1.8, 1.8, 2.8]) {
      seeds.push([PLAN.noseX + 1.4, 0.6 + iy * 0.9, z]);
    }
  }
  for (const side of [1, -1] as const) {
    for (const [axial, count, radius] of [
      [DUCT.inletX + 1.4, 8, 0.82],
      [DUCT.exitX - 0.05, 6, 0.75],
    ]) {
      for (let k = 0; k < count; k += 1) {
        const a = (k / count) * Math.PI * 2;
        ductLocalToWorld(side, tilt, axial, Math.cos(a) * radius, Math.sin(a) * radius, scratch);
        seeds.push([scratch.x, scratch.y, scratch.z]);
      }
    }
  }
  return seeds;
}
