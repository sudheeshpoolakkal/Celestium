"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { DUCT, ductLocalToWorld, sectionAt } from "@/lib/planform";
import {
  buildBlade,
  buildCanopy,
  buildCanopyFrame,
  buildDuct,
  buildFuselage,
  buildSpinner,
  buildSidePanel,
  buildWing,
  makeLivery,
  makePlate,
} from "@/lib/geo";
import { paintSpeed } from "@/lib/paint";
import { useMotion, type ModuleKind } from "./motion";

const paint = new THREE.MeshPhysicalMaterial({
  color: "#e7edf2",
  metalness: 0.08,
  roughness: 0.46,
  clearcoat: 0.22,
  clearcoatRoughness: 0.4,
});

const paintDark = new THREE.MeshStandardMaterial({
  color: "#9aa3ad",
  metalness: 0.12,
  roughness: 0.42,
});

const bladeMat = new THREE.MeshStandardMaterial({
  color: "#2c333c",
  metalness: 0.48,
  roughness: 0.36,
  side: THREE.DoubleSide,
});

const statorMat = new THREE.MeshStandardMaterial({
  color: "#aeb6bf",
  metalness: 0.28,
  roughness: 0.4,
  side: THREE.DoubleSide,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  color: "#14232b",
  metalness: 0.32,
  roughness: 0.12,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  side: THREE.DoubleSide,
});

const linerMat = new THREE.MeshStandardMaterial({
  color: "#14181e",
  roughness: 0.92,
  side: THREE.BackSide,
});

export function Aircraft({
  module,
  xray,
  showScale,
  showDims,
}: {
  module: ModuleKind;
  xray: boolean;
  showScale: boolean;
  showDims: boolean;
}) {
  const motion = useMotion();
  const fuselage = useMemo(() => buildFuselage(), []);
  const canopy = useMemo(() => buildCanopy(), []);
  const canopyFrame = useMemo(() => buildCanopyFrame(), []);
  const ductGeo = useMemo(() => buildDuct(), []);
  const ductLeft = useMemo(() => ductGeo.clone(), [ductGeo]);
  const ductRight = useMemo(() => ductGeo.clone(), [ductGeo]);
  const spinner = useMemo(() => buildSpinner(), []);
  const rotor = useMemo(
    () =>
      buildBlade({
        rootR: 0.28,
        tipR: 1.34,
        chordRoot: 0.42,
        chordTip: 0.16,
        thick: 0.11,
        twistRoot: 0.62,
        twistTip: 0.16,
      }),
    [],
  );
  const stator = useMemo(
    () =>
      buildBlade({
        rootR: 0.3,
        tipR: 1.32,
        chordRoot: 0.34,
        chordTip: 0.18,
        thick: 0.09,
        twistRoot: 0.15,
        twistTip: 0.04,
      }),
    [],
  );
  const pylon = useMemo(
    () => buildWing({ span: 0.7, rootChord: 1.35, tipChord: 1.2, thick: 0.22, sweepBack: 0.2 }),
    [],
  );
  const tail = useMemo(
    () => buildWing({ span: 2.5, rootChord: 1.05, tipChord: 0.72, thick: 0.11, sweepBack: 0.38 }),
    [],
  );
  const fin = useMemo(
    () => buildWing({ span: 1.55, rootChord: 1.2, tipChord: 0.62, thick: 0.12, sweepBack: 0.46 }),
    [],
  );
  const vane = useMemo(
    () => buildWing({ span: 1.55, rootChord: 0.28, tipChord: 0.2, thick: 0.1, sweepBack: 0.04 }),
    [],
  );

  const shellMat = useMemo(() => paint.clone(), []);
  const cowlMat = useMemo(() => paint.clone(), []);
  const shell = useRef<THREE.Mesh>(null);
  const tiltL = useRef<THREE.Group>(null);
  const tiltR = useRef<THREE.Group>(null);
  const spinL1 = useRef<THREE.Group>(null);
  const spinL2 = useRef<THREE.Group>(null);
  const spinR1 = useRef<THREE.Group>(null);
  const spinR2 = useRef<THREE.Group>(null);
  const ramp = useRef<THREE.Group>(null);
  const hatch = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.MeshStandardMaterial>(null);
  const painted = useRef(-10);
  const appearance = useRef({ surface: false, xray: false, livery: null as THREE.Texture | null });
  const livery = useRef<THREE.Texture | null>(null);
  const plate = useRef<THREE.Texture | null>(null);
  const plateMesh = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const tex = makeLivery();
    const mark = makePlate(["X-1"], "#304b42");
    livery.current = tex;
    plate.current = mark;
    if (plateMesh.current) {
      const mat = plateMesh.current.material as THREE.MeshBasicMaterial;
      mat.map = mark;
      mat.needsUpdate = true;
    }
    return () => {
      tex.dispose();
      mark.dispose();
    };
  }, []);

  useFrame((state, dt) => {
    const tilt = motion.tilt;
    const step = Math.min(dt, 0.033);
    if (tiltL.current) tiltL.current.rotation.z = tilt;
    if (tiltR.current) tiltR.current.rotation.z = tilt;
    if (motion.spin && !motion.reduced) {
      const hover = tilt / 1.5707963;
      motion.rotor += step * (24 + hover * 28);
    }
    if (spinL1.current) spinL1.current.rotation.x = motion.rotor;
    if (spinL2.current) spinL2.current.rotation.x = -motion.rotor * 0.92;
    if (spinR1.current) spinR1.current.rotation.x = -motion.rotor;
    if (spinR2.current) spinR2.current.rotation.x = motion.rotor * 0.92;

    const open = motion.doors;
    if (ramp.current) ramp.current.rotation.z = open * 1.08;
    if (hatch.current) hatch.current.rotation.z = -open * 1.2;

    const surface = motion.flow === "surface";
    const previous = appearance.current;
    if (previous.surface !== surface || previous.xray !== xray || previous.livery !== livery.current) {
      shellMat.vertexColors = surface;
      shellMat.map = surface || xray ? null : livery.current;
      shellMat.opacity = xray ? 0.13 : 1;
      shellMat.transparent = xray;
      shellMat.depthWrite = !xray;
      shellMat.alphaTest = surface || xray ? 0 : 0.35;
      shellMat.color.set(surface ? "#ffffff" : "#edf1ed");
      shellMat.needsUpdate = true;
      cowlMat.vertexColors = surface;
      cowlMat.map = null;
      cowlMat.color.set(surface ? "#ffffff" : "#e0e6e1");
      cowlMat.opacity = xray ? 0.72 : 1;
      cowlMat.transparent = xray;
      cowlMat.depthWrite = !xray;
      cowlMat.needsUpdate = true;
      appearance.current = { surface, xray, livery: livery.current };
    }
    if (motion.flow === "surface" && Math.abs(painted.current - tilt) > 0.03) {
      paintSpeed(fuselage, tilt);
      paintSpeed(ductLeft, tilt, (x, y, z, out) => ductLocalToWorld(1, tilt, x, y, z, out));
      paintSpeed(ductRight, tilt, (x, y, z, out) => ductLocalToWorld(-1, tilt, x, y, z, out));
      painted.current = tilt;
    }
    if (beacon.current && !motion.reduced) {
      beacon.current.emissiveIntensity = 0.25 + Math.max(0, Math.sin(state.clock.elapsedTime * 3.4));
    }
  });

  const tailSec = sectionAt(0.9);
  const cabin = sectionAt(0.46);

  return (
    <group>
      <mesh ref={shell} geometry={fuselage} material={shellMat} castShadow />
      <group visible={!xray}>
        <mesh geometry={canopy} material={glassMat} />
        {canopyFrame.map((geometry, index) => (
          <mesh key={index} geometry={geometry} material={paintDark} />
        ))}
      </group>

      <CabinDoor side={1} xray={xray} />
      <CabinDoor side={-1} xray={xray} />

      <group ref={ramp} position={[rampHinge.x, rampHinge.y, 0]}>
        <mesh position={[-0.62, -0.015, 0]} castShadow>
          <boxGeometry args={[1.22, 0.055, 1.2]} />
          <meshStandardMaterial color="#c9d0d7" metalness={0.08} roughness={0.5} />
        </mesh>
      </group>
      <group ref={hatch} position={[rampHinge.x, hatchY, 0]}>
        <mesh position={[-0.5, 0.02, 0]} castShadow>
          <boxGeometry args={[0.98, 0.05, 1.05]} />
          <meshStandardMaterial color="#c9d0d7" metalness={0.08} roughness={0.5} />
        </mesh>
      </group>

      <DuctSide
        side={1}
        duct={ductLeft}
        cowl={cowlMat}
        spinner={spinner}
        rotor={rotor}
        stator={stator}
        pylon={pylon}
        vane={vane}
        tiltRef={tiltL}
        spinA={spinL1}
        spinB={spinL2}
      />
      <DuctSide
        side={-1}
        duct={ductRight}
        cowl={cowlMat}
        spinner={spinner}
        rotor={rotor}
        stator={stator}
        pylon={pylon}
        vane={vane}
        tiltRef={tiltR}
        spinA={spinR1}
        spinB={spinR2}
      />

      <group position={[tailSec.x + 0.05, tailSec.cy + 0.08, 0]}>
        <mesh geometry={tail} position={[0.15, 0.15, -1.25]} material={paint} castShadow />
        <mesh
          geometry={fin}
          position={[0.2, 0.15, 1.22]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={paint}
          castShadow
        />
        <mesh
          geometry={fin}
          position={[0.2, 0.15, -1.22]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={paint}
          castShadow
        />
        <mesh ref={plateMesh} position={[0.05, 0.95, 1.28]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.62, 0.28]} />
          <meshBasicMaterial transparent depthWrite={false} color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, 1.72, 1.18]}>
          <sphereGeometry args={[0.035, 12, 10]} />
          <meshStandardMaterial ref={beacon} color="#3a1214" emissive="#ff3b30" emissiveIntensity={0.8} />
        </mesh>
      </group>

      <Gear />

      <mesh position={[cabin.x, cabin.cy - 0.02, 0]}>
        <boxGeometry args={[2.15, 1.22, 1.42]} />
        <meshStandardMaterial color="#12161c" side={THREE.BackSide} />
      </mesh>
      {module === "medical" && <MedicalBay />}
      {module === "cargo" && <CargoBay />}
      {module === "research" && <ResearchBay />}

      <Systems xray={xray} />
      <group visible={showScale}>
        <Figure />
      </group>
      {showDims && <Dimensions />}
    </group>
  );
}

const rampSec = sectionAt(0.62);
const rampHinge = { x: rampSec.x, y: rampSec.cy - rampSec.belly + 0.04 };
const hatchY = rampSec.cy + rampSec.crown * 0.72;

function CabinDoor({ side, xray }: { side: 1 | -1; xray: boolean }) {
  const motion = useMotion();
  const group = useRef<THREE.Group>(null);
  const panel = useMemo(() => buildSidePanel(side), [side]);
  const window = useMemo(() => buildSidePanel(side, true), [side]);
  const sec = sectionAt(0.51);
  useFrame(() => {
    if (group.current) group.current.position.x = -motion.doors * 1.28;
  });
  return (
    <group ref={group} visible={!xray}>
      <mesh geometry={panel.geometry} material={paint} />
      <mesh geometry={panel.frame} material={paintDark} />
      <mesh geometry={window.geometry} material={glassMat} />
      <mesh geometry={window.frame} material={paintDark} />
      <mesh position={[sec.x, sec.cy - 0.04, side * (sec.rx + 0.035)]}>
        <boxGeometry args={[0.15, 0.024, 0.022]} />
        <meshStandardMaterial color="#40574b" metalness={0.5} roughness={0.32} />
      </mesh>
      <group position={[sec.x + 0.78, sec.cy - 0.12, side * (sec.rx + 0.046)]}>
        <mesh>
          <boxGeometry args={[0.18, 0.045, 0.012]} />
          <meshBasicMaterial color="#ae543c" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.045, 0.18, 0.012]} />
          <meshBasicMaterial color="#ae543c" />
        </mesh>
      </group>
    </group>
  );
}

function DuctSide({
  side,
  duct,
  cowl,
  spinner,
  rotor,
  stator,
  pylon,
  vane,
  tiltRef,
  spinA,
  spinB,
}: {
  side: 1 | -1;
  duct: THREE.BufferGeometry;
  cowl: THREE.Material;
  spinner: THREE.BufferGeometry;
  rotor: THREE.BufferGeometry;
  stator: THREE.BufferGeometry;
  pylon: THREE.BufferGeometry;
  vane: THREE.BufferGeometry;
  tiltRef: React.RefObject<THREE.Group | null>;
  spinA: React.RefObject<THREE.Group | null>;
  spinB: React.RefObject<THREE.Group | null>;
}) {
  const roll = side === 1 ? -DUCT.dihedral : DUCT.dihedral;
  return (
    <group position={[DUCT.x, DUCT.y, 0]} rotation={[roll, 0, 0]}>
      <mesh
        geometry={pylon}
        material={paintDark}
        position={[0.42, 0, side * 0.55]}
        scale={[1, 1, side]}
        castShadow
      />
      <group position={[0, 0, side * DUCT.z]}>
        <group ref={tiltRef}>
          <mesh geometry={duct} material={cowl} castShadow />
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.15, 0, 0]}>
            <cylinderGeometry args={[1.385, 1.385, 0.85, 48, 1, true]} />
            <primitive object={linerMat} attach="material" />
          </mesh>
          <mesh geometry={spinner} material={bladeMat} position={[0.2, 0, 0]} />
          <group ref={spinA} position={[0.02, 0, 0]}>
            <Blades geo={rotor} count={5} material={bladeMat} />
          </group>
          <group ref={spinB} position={[-0.28, 0, 0]}>
            <Blades geo={rotor} count={5} material={bladeMat} phase={0.31} />
          </group>
          <group position={[-0.55, 0, 0]}>
            <Blades geo={stator} count={7} material={statorMat} phase={0.12} />
          </group>
          <mesh geometry={vane} material={statorMat} position={[-0.82, 0.15, -0.78]} />
          <mesh geometry={vane} material={statorMat} position={[-0.82, -0.42, -0.78]} />
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.26, 0.7, 20]} />
            <meshStandardMaterial color="#3a4048" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0.62, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[1.56, 0.02, 10, 64]} />
            <meshStandardMaterial color="#f4f7fa" metalness={0.55} roughness={0.22} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Blades({
  geo,
  count,
  material,
  phase = 0,
}: {
  geo: THREE.BufferGeometry;
  count: number;
  material: THREE.Material;
  phase?: number;
}) {
  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          geometry={geo}
          material={material}
          rotation={[(i / count) * Math.PI * 2 + phase, 0, 0]}
          castShadow
        />
      ))}
    </group>
  );
}

function Gear() {
  const nose = sectionAt(0.12);
  const main = sectionAt(0.5);
  return (
    <group>
      <Leg x={nose.x} yTop={nose.cy - nose.belly} z={0} />
      <Leg x={main.x} yTop={main.cy - main.belly} z={0.58} />
      <Leg x={main.x} yTop={main.cy - main.belly} z={-0.58} />
    </group>
  );
}

function Leg({ x, yTop, z }: { x: number; yTop: number; z: number }) {
  const height = Math.max(0.25, yTop - 0.2);
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.2 + height / 2, 0]}>
        <cylinderGeometry args={[0.035, 0.045, height, 10]} />
        <meshStandardMaterial color="#2a3036" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
        <meshStandardMaterial color="#171d20" roughness={0.85} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, 0.2, side * 0.064]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.015, 24]} />
          <meshStandardMaterial color="#879392" metalness={0.72} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function MedicalBay() {
  const sec = sectionAt(0.47);
  const floor = sec.cy - sec.belly + 0.2;
  return (
    <group position={[sec.x, floor, 0]}>
      <mesh position={[-0.05, 0.22, -0.16]}>
        <boxGeometry args={[1.9, 0.08, 0.56]} />
        <meshStandardMaterial color="#ece8e1" />
      </mesh>
      <mesh position={[-0.05, 0.3, -0.16]}>
        <boxGeometry args={[1.72, 0.08, 0.46]} />
        <meshStandardMaterial color="#d97845" />
      </mesh>
      {[0.6, -0.03, -0.66].map((x) => (
        <group key={x} position={[x, 0.12, 0.46]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.14, 10]} />
            <meshStandardMaterial color="#87948d" metalness={0.5} />
          </mesh>
          <RoundedBox args={[0.4, 0.09, 0.34]} radius={0.025} position={[0, 0.14, 0]}>
            <meshStandardMaterial color="#354c46" />
          </RoundedBox>
          <RoundedBox args={[0.4, 0.42, 0.07]} radius={0.025} position={[0, 0.35, 0.15]}>
            <meshStandardMaterial color="#354c46" />
          </RoundedBox>
        </group>
      ))}
      <mesh position={[0.72, 0.42, -0.05]}>
        <boxGeometry args={[0.28, 0.46, 0.7]} />
        <meshStandardMaterial color="#242b33" />
      </mesh>
      <mesh position={[0.72, 0.58, -0.05]}>
        <boxGeometry args={[0.02, 0.22, 0.48]} />
        <meshStandardMaterial color="#163246" emissive="#7fd4ff" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function CargoBay() {
  const sec = sectionAt(0.48);
  const floor = sec.cy - sec.belly + 0.2;
  return (
    <group position={[sec.x, floor, 0]}>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.7, 0.06, 1.15]} />
        <meshStandardMaterial color="#3a332c" />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.15, 0.64, 0.85]} />
        <meshStandardMaterial color="#8a8175" roughness={0.7} />
      </mesh>
    </group>
  );
}

function ResearchBay() {
  const sec = sectionAt(0.48);
  const floor = sec.cy - sec.belly + 0.2;
  return (
    <group position={[sec.x, floor, 0]}>
      <mesh position={[0.15, 0.45, 0]}>
        <boxGeometry args={[0.55, 0.8, 1.05]} />
        <meshStandardMaterial color="#232a32" />
      </mesh>
      {[-0.28, 0, 0.28].map((z) => (
        <mesh key={z} position={[0.44, 0.62, z]}>
          <sphereGeometry args={[0.035, 10, 8]} />
          <meshStandardMaterial color="#123" emissive="#7CFFB2" emissiveIntensity={0.9} />
        </mesh>
      ))}
      <mesh position={[-0.55, 0.28, 0.15]}>
        <boxGeometry args={[0.7, 0.42, 0.42]} />
        <meshStandardMaterial color="#31404c" />
      </mesh>
    </group>
  );
}

function Systems({ xray }: { xray: boolean }) {
  const tank = sectionAt(0.58);
  const cell = sectionAt(0.42);
  return (
    <group>
      <mesh position={[tank.x, tank.cy - 0.18, 0]} visible={xray}>
        <capsuleGeometry args={[0.32, 0.95, 6, 12]} />
        <meshStandardMaterial color="#d5f2ff" emissive="#8ad8ff" emissiveIntensity={0.45} roughness={0.25} />
      </mesh>
      <mesh position={[cell.x, cell.cy + 0.05, 0]} visible={xray}>
        <boxGeometry args={[0.7, 0.42, 0.5]} />
        <meshStandardMaterial color="#d5dbe2" />
      </mesh>
      <mesh position={[cell.x - 0.15, cell.cy - 0.28, 0.15]} visible={xray}>
        <boxGeometry args={[0.48, 0.28, 0.36]} />
        <meshStandardMaterial color="#e3c49a" emissive="#e3a56a" emissiveIntensity={0.22} />
      </mesh>
      {xray && (
        <group>
          <Html position={[tank.x, tank.cy + 0.55, 0]} center distanceFactor={8} zIndexRange={[8, 0]}>
            <div className="tag">LH₂ · 42 kg + tank</div>
          </Html>
          <Html position={[cell.x, cell.cy + 0.55, 0]} center distanceFactor={8} zIndexRange={[8, 0]}>
            <div className="tag">235 kW fuel cell</div>
          </Html>
        </group>
      )}
    </group>
  );
}

function Figure() {
  return (
    <group position={[0.15, 0, 2.05]}>
      <mesh position={[0, 0.48, 0]} castShadow>
        <capsuleGeometry args={[0.13, 0.42, 4, 8]} />
        <meshStandardMaterial color="#24344a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <capsuleGeometry args={[0.16, 0.42, 4, 8]} />
        <meshStandardMaterial color="#24344a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.12, 16, 12]} />
        <meshStandardMaterial color="#d2bba8" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.02, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.28, 0.16, 0.04]} />
        <meshStandardMaterial color="#1b1f24" />
      </mesh>
    </group>
  );
}

function Dimensions() {
  const nose = sectionAt(0);
  const tail = sectionAt(1);
  return (
    <group>
      <Html position={[DUCT.x, 3.55, 2.3]} center distanceFactor={10} zIndexRange={[8, 0]}>
        <div className="tag">Duct Ø 2.80 m</div>
      </Html>
      <Html position={[(nose.x + tail.x) / 2, 0.35, 3.3]} center distanceFactor={11} zIndexRange={[8, 0]}>
        <div className="tag">Length 8.62 m</div>
      </Html>
      <Html position={[DUCT.x, 3.15, 0]} center distanceFactor={10} zIndexRange={[8, 0]}>
        <div className="tag">Pylon dihedral +7°</div>
      </Html>
    </group>
  );
}
