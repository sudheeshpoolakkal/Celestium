import * as THREE from "three";
import { sampleVelocity, speedColor, speedOf, type Vec3 } from "./flow";

const p: Vec3 = { x: 0, y: 0, z: 0 };
const q: Vec3 = { x: 0, y: 0, z: 0 };
const vel: Vec3 = { x: 0, y: 0, z: 0 };
const col = { r: 1, g: 1, b: 1 };

/** Paint speed onto a mesh. Samples just outside the surface, then just inside the flipped normal. */
export function paintSpeed(
  geo: THREE.BufferGeometry,
  tilt: number,
  toWorld?: (x: number, y: number, z: number, out: Vec3) => void,
) {
  const pos = geo.attributes.position;
  const nor = geo.attributes.normal;
  let color = geo.getAttribute("color") as THREE.BufferAttribute | undefined;
  if (!color || color.count !== pos.count) {
    color = new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3);
    geo.setAttribute("color", color);
  }
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const nx = nor ? nor.getX(i) : 0;
    const ny = nor ? nor.getY(i) : 1;
    const nz = nor ? nor.getZ(i) : 0;
    write(x + nx * 0.07, y + ny * 0.07, z + nz * 0.07, tilt, toWorld);
    if (vel.x === 0 && vel.y === 0 && vel.z === 0) {
      write(x - nx * 0.07, y - ny * 0.07, z - nz * 0.07, tilt, toWorld);
    }
    color.setXYZ(i, col.r, col.g, col.b);
  }
  color.needsUpdate = true;
}

function write(
  x: number,
  y: number,
  z: number,
  tilt: number,
  toWorld?: (x: number, y: number, z: number, out: Vec3) => void,
) {
  if (toWorld) toWorld(x, y, z, p);
  else {
    p.x = x;
    p.y = y;
    p.z = z;
  }
  const ok = sampleVelocity(p.x, p.y, p.z, { tilt }, q);
  if (!ok) {
    vel.x = 0;
    vel.y = 0;
    vel.z = 0;
    speedColor(0.12, col);
    return;
  }
  vel.x = q.x;
  vel.y = q.y;
  vel.z = q.z;
  speedColor(speedOf(q), col);
}
