import { PLAN, sectionAt, ductLocalToWorld, ductPose, worldToDuct } from "../lib/planform";
import { crownReading, sampleVelocity, speedOf } from "../lib/flow";

let failed = 0;
function check(name: string, ok: boolean, detail: string) {
  if (!ok) failed += 1;
  console.log(`${ok ? "ok" : "FAIL"}  ${name}  ${detail}`);
}

const p = { x: 0, y: 0, z: 0 };
ductLocalToWorld(1, 0.4, 0.2, -0.3, 0.4, p);
const back = worldToDuct(1, 0.4, p.x, p.y, p.z);
check(
  "duct roundtrip",
  Math.abs(back.x - 0.2) < 1e-6 && Math.abs(back.y + 0.3) < 1e-6 && Math.abs(back.z - 0.4) < 1e-6,
  `local ${back.x.toFixed(5)} ${back.y.toFixed(5)} ${back.z.toFixed(5)}`,
);

const pose = ductPose(1, 0.7);
const centre = worldToDuct(1, 0.7, pose.x, pose.y, pose.z);
check(
  "duct centre",
  Math.hypot(centre.x, centre.y, centre.z) < 1e-6,
  `r ${Math.hypot(centre.x, centre.y, centre.z).toExponential(2)}`,
);

const far = { x: 0, y: 0, z: 0 };
sampleVelocity(14, 2.2, 0.4, { tilt: 0 }, far);
check(
  "freestream",
  far.x < -0.8 && far.x > -1.25 && speedOf(far) < 1.35,
  `v ${far.x.toFixed(3)} ${far.y.toFixed(3)} ${far.z.toFixed(3)}`,
);

const inside = { x: 0, y: 0, z: 0 };
const solid = sampleVelocity(3.4, 1.35, 0, { tilt: 0 }, inside);
check("fuselage solid", solid === false, `returned ${solid}`);

const jet = { x: 0, y: 0, z: 0 };
ductLocalToWorld(1, 0, -0.45, 0.2, 0.1, jet);
const jv = { x: 0, y: 0, z: 0 };
const jok = sampleVelocity(jet.x, jet.y, jet.z, { tilt: 0 }, jv);
check("cruise jet aft", jok && jv.x < -0.7, `v ${jv.x.toFixed(3)} ${jv.y.toFixed(3)} ${jv.z.toFixed(3)}`);

ductLocalToWorld(1, Math.PI / 2, -0.55, 0.15, 0.1, jet);
const hv = { x: 0, y: 0, z: 0 };
const hok = sampleVelocity(jet.x, jet.y, jet.z, { tilt: Math.PI / 2 }, hv);
check("hover jet down", hok && hv.y < -0.6, `v ${hv.x.toFixed(3)} ${hv.y.toFixed(3)} ${hv.z.toFixed(3)}`);

const fountain = { x: 0, y: 0, z: 0 };
sampleVelocity(pose.x, 0.35, 0.05, { tilt: Math.PI / 2 }, fountain);
check("fountain up", fountain.y > 0.25, `vy ${fountain.y.toFixed(3)}`);

let nans = 0;
let samples = 0;
const v = { x: 0, y: 0, z: 0 };
for (let ix = 0; ix < 10; ix += 1) {
  for (let iy = 0; iy < 8; iy += 1) {
    for (let iz = 0; iz < 8; iz += 1) {
      const x = -2 + ix * 1.3;
      const y = 0.1 + iy * 0.55;
      const z = -3.5 + iz;
      sampleVelocity(x, y, z, { tilt: ix % 2 ? 0.2 : 1.2 }, v);
      samples += 1;
      if (!Number.isFinite(v.x) || !Number.isFinite(v.y) || !Number.isFinite(v.z)) nans += 1;
    }
  }
}
check("finite field", nans === 0, `${nans} NaN in ${samples}`);

const crown = crownReading({ tilt: 0.05 });
check("crown sample", Number.isFinite(crown.cp), `q ${crown.speed.toFixed(2)} Cp ${crown.cp.toFixed(2)}`);

let geometryBounds = true;
let stationMatch = true;
for (const station of PLAN.stations) {
  const sample = sectionAt(station.s);
  for (const key of ["rx", "crown", "belly", "cy"] as const) {
    if (Math.abs(sample[key] - station[key]) > 1e-9) stationMatch = false;
  }
}
for (let i = 0; i < PLAN.stations.length - 1; i += 1) {
  const a = PLAN.stations[i];
  const b = PLAN.stations[i + 1];
  for (let j = 0; j <= 20; j += 1) {
    const sample = sectionAt(a.s + ((b.s - a.s) * j) / 20);
    for (const key of ["rx", "crown", "belly", "cy"] as const) {
      if (sample[key] < Math.min(a[key], b[key]) - 1e-9 || sample[key] > Math.max(a[key], b[key]) + 1e-9)
        geometryBounds = false;
    }
  }
}
check("design stations", stationMatch, "all loft station dimensions retained");
check("loft bounds", geometryBounds, "no radius or height overshoot between stations");

console.log(failed === 0 ? "FLOW OK" : `FLOW FAILED ${failed}`);
process.exit(failed === 0 ? 0 : 1);
