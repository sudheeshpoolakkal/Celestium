"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import * as THREE from "three";
import { crownReading } from "@/lib/flow";
import { DESIGN } from "@/lib/spec";
import { Aircraft } from "./aircraft";
import { ViewportKeyboard } from "./viewport-keyboard";
import { FlowParticles, FlowRibbons } from "./flow-view";
import { MotionProvider, type FlowMode, type ModuleKind, type Motion } from "./motion";

type Variant = "studio" | "preview";

const VIEWS: Array<{ id: string; pos: [number, number, number]; target: [number, number, number] }> = [
  { id: "Orbit", pos: [11.8, 5.6, 11.4], target: [2.4, 1.65, 0] },
  { id: "Duct", pos: [5.8, 2.2, 4.6], target: [3.45, 1.9, 1.7] },
  { id: "Nose", pos: [9.6, 1.75, 1.1], target: [5.1, 1.25, 0] },
  { id: "Ramp", pos: [1.8, 1.45, 5.1], target: [0.7, 1.0, 0.3] },
  { id: "Tail", pos: [-4.4, 2.7, 4.6], target: [-0.2, 1.75, 0] },
];

export function Studio() {
  return <Stage variant="studio" />;
}

export function AircraftPreview({
  angle,
  flow = "both",
  onReady,
}: {
  angle: number;
  flow?: FlowMode;
  onReady?: () => void;
}) {
  return <Stage variant="preview" angle={angle} previewFlow={flow} onReady={onReady} />;
}

function Stage({
  variant,
  angle = 90,
  previewFlow = "both",
  onReady,
}: {
  variant: Variant;
  angle?: number;
  previewFlow?: FlowMode;
  onReady?: () => void;
}) {
  const motion = useRef<Motion>({
    tilt: variant === "preview" ? (angle * Math.PI) / 180 : (38 * Math.PI) / 180,
    doors: 0,
    doorsTarget: 0,
    rotor: 0,
    flow: variant === "preview" ? previewFlow : "both",
    xray: false,
    module: "medical",
    spin: true,
    reduced: false,
    showScale: false,
    showDims: false,
  }).current;

  const [tilt, setTilt] = useState(motion.tilt);
  const [studioFlow, setFlow] = useState<FlowMode>("both");
  const flow = variant === "preview" ? previewFlow : studioFlow;
  const [xray, setXray] = useState(false);
  const [ramp, setRamp] = useState(false);
  const [module, setModule] = useState<ModuleKind>("medical");
  const [spin, setSpin] = useState(true);
  const [orbit, setOrbit] = useState(false);
  const [scale, setScale] = useState(false);
  const [dims, setDims] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  const invalidate = useRef<(() => void) | null>(null);
  const read = useMemo(() => {
    const crown = crownReading({ tilt });
    return { speed: crown.speed, cp: crown.cp, cruise: crown.cruiseFraction };
  }, [tilt]);
  const flyRequest = useRef<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  useEffect(() => {
    let inView = true;
    const main = viewport.current?.closest("main");
    const update = () => setVisible(inView && !document.hidden && !main?.inert);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    if (viewport.current) observer.observe(viewport.current);
    const menuObserver = new MutationObserver(update);
    if (main) menuObserver.observe(main, { attributes: true, attributeFilter: ["inert"] });
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      menuObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      motion.reduced = media.matches;
      setReduced(media.matches);
      if (media.matches) setOrbit(false);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [motion]);

  useEffect(() => {
    motion.flow = flow;
    motion.xray = xray;
    motion.module = module;
    motion.spin = spin && !reduced;
    motion.showScale = scale;
    motion.showDims = dims;
    motion.doorsTarget = ramp ? 1 : 0;
    if (variant === "studio") motion.tilt = tilt;
    invalidate.current?.();
  }, [dims, flow, module, motion, ramp, reduced, scale, spin, tilt, variant, xray]);

  useEffect(() => {
    if (variant !== "studio") return;
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      if (tag === "INPUT" || tag === "TEXTAREA" || (event.target as HTMLElement | null)?.isContentEditable)
        return;
      if (document.querySelector("#content[inert]")) return;
      const key = event.key.toLowerCase();
      if (key === "c") setTilt(0);
      if (key === "t") setTilt((38 * Math.PI) / 180);
      if (key === "h") setTilt(Math.PI / 2);
      if (key === "x") setXray((v) => !v);
      if (key === "r") setRamp((v) => !v);
      if (key === "f") {
        setFlow((current) => {
          const order: FlowMode[] = ["none", "both", "particles", "ribbons", "surface"];
          return order[(order.indexOf(current) + 1) % order.length];
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  useEffect(() => {
    invalidate.current?.();
  }, [angle, visible]);

  const degrees = Math.round((tilt * 180) / Math.PI);
  const animate = !reduced && (spin || orbit || flow === "particles" || flow === "both");

  return (
    <div className={variant === "studio" ? "studio" : "stage-fill"}>
      <div ref={viewport} className={variant === "studio" ? "studio-view" : "stage-fill"}>
        <Canvas
          shadows
          frameloop={visible ? (animate ? "always" : "demand") : "never"}
          dpr={[1, 1.5]}
          camera={{
            position: variant === "preview" ? [11.8, 6.1, 12.4] : [11.8, 5.6, 11.4],
            fov: variant === "preview" ? 35 : 30,
            near: 0.1,
            far: 80,
          }}
          fallback={<div className="stage-wait">Enable WebGL to view the interactive aircraft.</div>}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl, invalidate: requestFrame }) => {
            invalidate.current = requestFrame;
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.setClearColor("#dce5e1");
            setReady(true);
            onReady?.();
          }}
        >
          <MotionProvider value={motion}>
            <CameraSizing variant={variant} />
            <ViewportKeyboard preview={variant === "preview"} />
            <Driver
              variant={variant}
              angle={angle}
              motion={motion}
              flyRequest={flyRequest}
              orbit={orbit && !reduced}
            />
            <Scene
              module={module}
              xray={xray}
              showScale={scale}
              showDims={dims}
              orbit={orbit && !reduced}
              flow={flow}
              reduced={reduced}
            />
          </MotionProvider>
        </Canvas>
        {!ready && <div className="stage-wait">Preparing Taraka X-1</div>}
        {ready && flow !== "none" && (
          <div className="flow-stage-legend" aria-label="Relative airflow speed legend">
            <span>Relative airspeed</span>
            <i aria-hidden="true" />
            <span>Low</span>
            <span>High</span>
          </div>
        )}
      </div>

      {variant === "studio" && (
        <>
          <aside className="hud hud-left" aria-label="Flight configuration">
            <div className="studio-heading">
              <p className="hud-kicker">Taraka X-1</p>
              <h1>Aircraft studio</h1>
              <p className="hud-note">
                Explore airflow in hover, transition and cruise. Inspect the medical cabin and
                hydrogen-electric systems.
              </p>
            </div>
            <div className="studio-flight-controls">
              <label className="slider">
                <span>Duct angle</span>
                <strong>{degrees}°</strong>
                <input
                  type="range"
                  min={0}
                  max={90}
                  step={1}
                  value={degrees}
                  aria-label="Duct angle in degrees"
                  onChange={(event) => setTilt((Number(event.target.value) * Math.PI) / 180)}
                />
              </label>
              <div className="seg">
                <button type="button" onClick={() => setTilt(0)} aria-pressed={degrees < 8}>
                  Cruise
                </button>
                <button
                  type="button"
                  onClick={() => setTilt((38 * Math.PI) / 180)}
                  aria-pressed={degrees >= 30 && degrees <= 48}
                >
                  Transition
                </button>
                <button type="button" onClick={() => setTilt(Math.PI / 2)} aria-pressed={degrees > 80}>
                  Hover
                </button>
              </div>
              <p className="readout" hidden={flow === "none"}>
                {read.cruise > 0.62 ? (
                  <>
                    Crown <b>{read.speed.toFixed(2)}</b> V∞ · Cp <b>{read.cp.toFixed(2)}</b>
                  </>
                ) : (
                  <>
                    Hover field · crown speed <b>{read.speed.toFixed(2)}</b>
                  </>
                )}
              </p>
            </div>
          </aside>

          <aside className="hud hud-right" aria-label="Aircraft studio controls">
            <h2 className="hud-kicker">Flow illustration</h2>
            <div className="seg seg-wrap">
              {(
                [
                  ["none", "Off"],
                  ["both", "Combined"],
                  ["particles", "Particles"],
                  ["ribbons", "Ribbons"],
                  ["surface", "Surface"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" aria-pressed={flow === id} onClick={() => setFlow(id)}>
                  {label}
                </button>
              ))}
            </div>
            <h2 className="hud-kicker">Aircraft display</h2>
            <div className="toggles">
              <Toggle label="Systems" on={xray} onClick={() => setXray((v) => !v)} />
              <Toggle label="Ramp" on={ramp} onClick={() => setRamp((v) => !v)} />
              <Toggle
                label="Rotor motion"
                on={spin && !reduced}
                disabled={reduced}
                onClick={() => setSpin((v) => !v)}
              />
              <Toggle
                label="Auto orbit"
                on={orbit && !reduced}
                disabled={reduced}
                onClick={() => setOrbit((v) => !v)}
              />
              <Toggle label="Scale figure" on={scale} onClick={() => setScale((v) => !v)} />
              <Toggle label="Dimensions" on={dims} onClick={() => setDims((v) => !v)} />
            </div>
            <h2 className="hud-kicker">Interior architecture study</h2>
            <div className="seg">
              {(["medical", "cargo", "research"] as const).map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={module === id}
                  onClick={() => {
                    setModule(id);
                    setRamp(true);
                  }}
                >
                  {id[0].toUpperCase() + id.slice(1)}
                </button>
              ))}
            </div>
            <h2 className="hud-kicker">Camera</h2>
            <div className="seg seg-wrap">
              {VIEWS.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  aria-label={`${view.id} camera view`}
                  onClick={() => {
                    flyRequest.current = {
                      pos: new THREE.Vector3(...view.pos),
                      target: new THREE.Vector3(...view.target),
                    };
                    invalidate.current?.();
                  }}
                >
                  {view.id}
                </button>
              ))}
            </div>
            <p className="keys">
              Model: arrow keys orbit · + / − zoom · Home resets
              <br />
              Studio: C cruise · T transition · H hover · F flow · X systems · R ramp
            </p>
            <p className="studio-model-note">
              Taraka X-1 is the medical-ambulance aircraft. Cargo and research views explore the wider
              program’s modular architecture. The flow field is analytic, not CFD.
            </p>
            <Link href="/aircraft" className="studio-return">
              Back to the aircraft <ArrowUpRight size={15} />
            </Link>
          </aside>

          <ul className="strip">
            <li>
              <span>Nominal study mass¹</span>
              <strong>{DESIGN.mtow}</strong>
            </li>
            <li>
              <span>Ducts</span>
              <strong>{DESIGN.ducts}</strong>
            </li>
            <li>
              <span>Hover power</span>
              <strong>{DESIGN.hoverPower}</strong>
            </li>
            <li>
              <span>Cruise target</span>
              <strong>{DESIGN.cruiseSpeed}</strong>
            </li>
            <li>
              <span>Range target</span>
              <strong>{DESIGN.range}</strong>
            </li>
            <li>
              <span>Noise target²</span>
              <strong>{DESIGN.noise}</strong>
            </li>
          </ul>
          <p className="studio-basis-note">
            ¹ Original sizing before tank-vessel correction. ² Below 58 dBA at 100 m, unmeasured.{" "}
            <Link href="/research#design-basis">Design basis</Link>
          </p>
        </>
      )}
    </div>
  );
}

function Toggle({
  label,
  on,
  onClick,
  disabled = false,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={on ? "toggle on" : "toggle"}
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function CameraSizing({ variant }: { variant: Variant }) {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    const aspect = size.width / Math.max(size.height, 1);
    // Keep the full configuration visible when the stage becomes tall and narrow.
    const base = variant === "preview" ? 35 : 30;
    const distance = variant === "preview" ? 16.2 : 14.8;
    const fit = (2 * Math.atan(10.4 / (2 * distance * aspect)) * 180) / Math.PI;
    camera.fov = Math.max(base, Math.min(65, fit));
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, size.height, size.width, variant]);
  return null;
}

function Driver({
  variant,
  angle,
  motion,
  flyRequest,
  orbit,
}: {
  variant: Variant;
  angle: number;
  motion: Motion;
  flyRequest: React.MutableRefObject<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>;
  orbit: boolean;
}) {
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const controls = useThree((state) => state.controls) as {
    target: THREE.Vector3;
    update: () => void;
    autoRotate: boolean;
  } | null;
  const fly = useRef<{
    t: number;
    from: THREE.Vector3;
    to: THREE.Vector3;
    ta: THREE.Vector3;
    tb: THREE.Vector3;
  } | null>(null);

  useFrame((state, dt) => {
    const step = Math.min(dt, 0.05);
    if (variant === "preview") {
      const target = (angle * Math.PI) / 180;
      motion.tilt = motion.reduced ? target : motion.tilt + (target - motion.tilt) * Math.min(1, step * 4);
      if (Math.abs(target - motion.tilt) > 0.001) invalidate();
    }
    motion.doors = motion.reduced
      ? motion.doorsTarget
      : motion.doors + (motion.doorsTarget - motion.doors) * Math.min(1, step * 2.8);
    if (Math.abs(motion.doorsTarget - motion.doors) > 0.001) invalidate();
    if (controls) controls.autoRotate = orbit && !fly.current;
    const request = flyRequest.current;
    if (request && controls) {
      fly.current = {
        t: 0,
        from: camera.position.clone(),
        to: request.pos,
        ta: controls.target.clone(),
        tb: request.target,
      };
      flyRequest.current = null;
    }
    const current = fly.current;
    if (current && controls) {
      current.t = motion.reduced ? 1 : Math.min(1, current.t + step * 0.85);
      const k = current.t * current.t * (3 - 2 * current.t);
      camera.position.lerpVectors(current.from, current.to, k);
      controls.target.lerpVectors(current.ta, current.tb, k);
      controls.update();
      if (current.t >= 1) fly.current = null;
      else invalidate();
    }
  });

  return null;
}

function Scene({
  module,
  xray,
  showScale,
  showDims,
  orbit,
  flow,
  reduced,
}: {
  module: ModuleKind;
  xray: boolean;
  showScale: boolean;
  showDims: boolean;
  orbit: boolean;
  flow: FlowMode;
  reduced: boolean;
}) {
  return (
    <>
      <color attach="background" args={["#dce5e1"]} />
      <fog attach="fog" args={["#dce5e1", 25, 50]} />
      <hemisphereLight args={["#ffffff", "#85918c", 0.9]} />
      <KeyLight />
      <Environment frames={1} resolution={256} environmentIntensity={0.55}>
        <Lightformer
          form="rect"
          intensity={2.5}
          position={[0, 6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[15, 4, 1]}
          color="#f0f2eb"
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[5, 2, 7]}
          rotation={[0, Math.PI, 0]}
          scale={[5, 4, 1]}
          color="#e8ece6"
        />
        <Lightformer form="rect" intensity={1.1} position={[-5, 3, -5]} scale={[5, 3, 1]} color="#becfca" />
      </Environment>
      <directionalLight position={[-7, 5, -6]} intensity={0.55} color="#c5d6e8" />
      <directionalLight position={[0, 4, -10]} intensity={0.65} color="#f7f4ee" />
      <Aircraft module={module} xray={xray} showScale={showScale} showDims={showDims} />
      {(flow === "both" || flow === "particles") && <FlowParticles />}
      {(flow === "both" || flow === "ribbons") && <FlowRibbons />}
      <ContactShadows
        position={[2.4, 0.015, 0]}
        opacity={0.25}
        scale={19}
        blur={2.8}
        far={5}
        resolution={256}
        frames={1}
        color="#43594f"
      />
      {showDims && <gridHelper args={[20, 20, "#2c3848", "#1c2430"]} position={[2.4, 0.01, 0]} />}
      <OrbitControls
        makeDefault
        target={[2.4, 1.65, 0]}
        enablePan={false}
        enableDamping={!reduced}
        dampingFactor={0.08}
        autoRotate={orbit}
        autoRotateSpeed={0.45}
        minDistance={6}
        maxDistance={25}
        minPolarAngle={0.6}
        maxPolarAngle={1.48}
      />
    </>
  );
}

function KeyLight() {
  const ref = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const light = ref.current;
    if (!light) return;
    light.target.position.set(2.6, 1.1, 0);
    light.parent?.add(light.target);
  }, []);
  return <directionalLight ref={ref} position={[9, 14, 8]} intensity={2.2} color="#f4f1ea" />;
}
