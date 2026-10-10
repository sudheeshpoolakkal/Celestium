"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { WebGLGate, WebGLFallback } from "./webgl-gate";
import type { FlowMode } from "./motion";

const AircraftPreview = dynamic(() => import("./studio").then((mod) => mod.AircraftPreview), {
  ssr: false,
  loading: () => (
    <div className="preview-loading">
      <span className="loading-ring" />
      <p className="mono">Preparing the aircraft…</p>
    </div>
  ),
});

const MISSIONS = [
  {
    id: "medical",
    label: "Critical care",
    number: "01",
    title: "Care, carried further.",
    text: "A patient litter, three clinical seats and a critical-care console. A dedicated medical module designed around the people on board.",
    feature: "Patient + clinical team",
    detail: "Side access / aft loading",
    icon: "+",
  },
  {
    id: "cargo",
    label: "Essential cargo",
    number: "02",
    title: "Deliver what matters.",
    text: "A utility pallet and tie-down grid replace the medical interior. The same lift system connects essential supplies to their destination.",
    feature: "Utility pallet + tie-downs",
    detail: "Common mission bay",
    icon: "□",
  },
  {
    id: "research",
    label: "Flight research",
    number: "03",
    title: "Turn questions into progress.",
    text: "Instrument racks, water ballast and an engineer’s station make the bay a flying laboratory for future envelope expansion.",
    feature: "Instrumentation + ballast",
    detail: "Flight-test configuration",
    icon: "⌁",
  },
] as const;

export function RevealEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}

export function ModuleExplorer() {
  const [selected, setSelected] = useState(0);
  const instance = useId().replace(/:/g, "");
  const panelId = `${instance}-mission-panel`;
  const mission = MISSIONS[selected];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    let next = selected;
    if (event.key === "ArrowRight") next = (selected + 1) % MISSIONS.length;
    else if (event.key === "ArrowLeft") next = (selected + MISSIONS.length - 1) % MISSIONS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = MISSIONS.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }
  return (
    <div className="module-explorer" data-reveal>
      <div className="module-tabs" role="tablist" aria-label="Explore mission modules">
        {MISSIONS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${instance}-tab-${item.id}`}
            aria-selected={selected === i}
            aria-controls={panelId}
            tabIndex={selected === i ? 0 : -1}
            ref={(element) => {
              tabs.current[i] = element;
            }}
            onKeyDown={onKey}
            onClick={() => setSelected(i)}
          >
            <span className="mono">{item.number}</span>
            {item.label}
            <span className="module-tab-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        ))}
      </div>
      <div
        className="module-content"
        role="tabpanel"
        id={panelId}
        aria-labelledby={`${instance}-tab-${mission.id}`}
        tabIndex={0}
      >
        <div className="module-blueprint">
          <span className="mono blueprint-label">MALUS / Common platform + mission module</span>
          <ModuleDrawing kind={mission.id} />
          <div className="blueprint-legend">
            <span>
              <i /> Common flight systems
            </span>
            <span>
              <i /> Interchangeable module
            </span>
          </div>
        </div>
        <div className="module-description" key={mission.id}>
          <div className="module-symbol" aria-hidden="true">
            {mission.icon}
          </div>
          <span className="eyebrow">Mission module / {mission.number}</span>
          <h3>{mission.title}</h3>
          <p>{mission.text}</p>
          <div className="module-features">
            <span>{mission.feature}</span>
            <span>{mission.detail}</span>
          </div>
          <Link href={mission.id === "medical" ? "/mission" : "/program"} className="text-link">
            Explore this mission <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="architecture-system">
        <span className="mono">The common foundation</span>
        <span>Lift system</span>
        <span>Energy system</span>
        <span>Flight control</span>
        <Link href="/program#interfaces">
          Mission interface <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );
}

function ModuleDrawing({ kind }: { kind: (typeof MISSIONS)[number]["id"] }) {
  const grid = `blueprint-${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 680 390"
      role="img"
      aria-label={`Top-view schematic of the common MALUS aircraft and its ${kind} mission module`}
      className="module-drawing"
    >
      <defs>
        <pattern id={grid} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="currentColor" strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="680" height="390" fill={`url(#${grid})`} />
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M335 53c-22 0-48 40-50 86v95c1 48 24 84 36 119h28c12-35 35-71 36-119v-95c-2-46-28-86-50-86Z"
          fill="var(--blueprint-bg)"
        />
        <path
          d="m288 135 28-31h38l28 31M318 112v34h34v-34M292 257l86 0M320 330h30M335 28v341"
          strokeDasharray="4 5"
          strokeOpacity=".45"
        />
        <path d="M285 165h-34v30h34M385 165h34v30h-34M320 304H230v22h93M347 304h93v22h-93" />
        {[180, 490].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="182" r="73" fill="var(--blueprint-bg)" />
            <circle cx={cx} cy="182" r="62" />
            <circle cx={cx} cy="182" r="13" />
            <g strokeOpacity=".55">
              {Array.from({ length: 5 }, (_, i) => (
                <path
                  key={i}
                  d={`M${cx + 13} 177Q${cx + 40} 159 ${cx + 59} 177L${cx + 60} 188Q${cx + 32} 177 ${cx + 13} 186Z`}
                  transform={`rotate(${i * 72} ${cx} 182)`}
                />
              ))}
            </g>
          </g>
        ))}
      </g>
      <g stroke="var(--accent)" fill="var(--accent-wash)" strokeWidth="1.6">
        <rect x="298" y="159" width="74" height="97" rx="5" />
        {kind === "medical" && (
          <>
            <rect x="305" y="169" width="27" height="69" rx="5" />
            <path d="M309 187h19M314 182v10M342 174h21v20h-21zM342 211h21v20h-21z" fill="none" />
            <path d="M343 246h17" />
          </>
        )}
        {kind === "cargo" && (
          <>
            <rect x="307" y="171" width="56" height="71" rx="2" />
            <path d="m308 172 55 70m0-70-55 70M334 172v70" fill="none" />
          </>
        )}
        {kind === "research" && (
          <>
            <rect x="307" y="171" width="56" height="34" rx="2" />
            <path d="M314 180h41M314 188h41M314 196h28" />
            <circle cx="319" cy="226" r="10" />
            <rect x="342" y="215" width="20" height="23" rx="2" />
          </>
        )}
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1">
        <path d="M372 246h91l28 35h103" />
        <circle cx="372" cy="246" r="3" fill="var(--accent)" />
      </g>
      <g fill="currentColor" fontFamily="var(--mono)" fontSize="10" letterSpacing="1">
        <text x="45" y="73">
          TWIN TILTING DUCTS
        </text>
        <path d="M150 83v22" stroke="currentColor" fill="none" />
        <text x="487" y="299" fill="var(--accent)">
          {kind.toUpperCase()} MODULE
        </text>
        <text x="285" y="377">
          TOP VIEW / SCHEMATIC
        </text>
        <text x="30" y="350">
          +
        </text>
        <text x="627" y="40">
          +
        </text>
      </g>
    </svg>
  );
}

const FLIGHT_MODES = [
  {
    label: "Hover",
    angle: 90,
    number: "01",
    title: "Lift, without a runway.",
    text: "The ducts turn to direct thrust vertically for takeoff and landing.",
  },
  {
    label: "Transition",
    angle: 38,
    number: "02",
    title: "A different direction.",
    text: "The ducts tilt forward as lift and forward thrust blend through the transition.",
  },
  {
    label: "Cruise",
    angle: 0,
    number: "03",
    title: "Built for the horizon.",
    text: "The ducts face forward, delivering thrust for regional cruise.",
  },
];

export function AircraftExplorer() {
  const [mode, setMode] = useState(1);
  const [live, setLive] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [flow, setFlow] = useState<FlowMode>("both");
  const launch = useRef<HTMLButtonElement>(null);
  const flight = FLIGHT_MODES[mode];
  const closeModel = useCallback(() => {
    setLive(false);
    setModelReady(false);
    setSupported(null);
    requestAnimationFrame(() => launch.current?.focus());
  }, []);
  useEffect(() => {
    if (!live) return;
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("#content[inert]")) {
        closeModel();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [live, closeModel]);
  return (
    <div className="aircraft-explorer" data-reveal>
      <div className={`aircraft-preview ${live && supported !== false ? "is-live" : ""}`}>
        {live && !modelReady && supported !== false && (
          <Image
            className="preview-poster"
            src="/images/taraka-dawn-v2.webp"
            alt=""
            width={1672}
            height={941}
            sizes="(max-width: 720px) 100vw, 85vw"
          />
        )}
        {live ? (
          <WebGLGate onSupportChange={setSupported}>
            <PreviewBoundary>
              <AircraftPreview angle={flight.angle} flow={flow} onReady={() => setModelReady(true)} />
            </PreviewBoundary>
          </WebGLGate>
        ) : (
          <>
            <Image
              src="/images/taraka-dawn-v2.webp"
              alt="Taraka X-1 twin-duct aircraft concept"
              width={1672}
              height={941}
              sizes="(max-width: 720px) 100vw, 85vw"
            />
            <button ref={launch} className="launch-preview" onClick={() => setLive(true)} type="button">
              <span className="play-icon" aria-hidden="true">
                ▷
              </span>
              <span>
                Explore in 3D<span className="mono">Aircraft + airflow</span>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          </>
        )}
        <div className="preview-top">
          <span className="mono">
            TARAKA X-1 / {live && supported === true ? "Aircraft + airflow" : "Concept visualization"}
          </span>
          <span className="preview-status" role="status">
            <span className="status-dot" />
            {live
              ? supported === false
                ? "3D unavailable"
                : modelReady
                  ? "Live 3D"
                  : "Loading 3D"
              : "Experimental"}
          </span>
        </div>
        {live && supported === true && modelReady && (
          <span className="preview-hint mono">Drag to orbit · Scroll to zoom · Arrow keys when focused</span>
        )}
        {live && (
          <button type="button" className="preview-exit" onClick={closeModel}>
            Exit 3D <span aria-hidden="true">×</span>
          </button>
        )}
      </div>
      {live && supported === true && (
        <div className="preview-flow-controls">
          <div>
            <span className="kicker">Airflow visualization</span>
            <div role="group" aria-label="Airflow display">
              {(
                [
                  ["both", "Combined"],
                  ["ribbons", "Streamlines"],
                  ["particles", "Particles"],
                  ["surface", "Surface speed"],
                  ["none", "Off"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" aria-pressed={flow === id} onClick={() => setFlow(id)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p>
            Particle traces and streamlines follow the selected flight configuration. Analytic airflow
            illustration.
          </p>
        </div>
      )}
      <div className="flight-controls">
        <div className="flight-buttons" role="group" aria-label="Aircraft flight mode">
          {FLIGHT_MODES.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={mode === index}
              onClick={() => {
                setMode(index);
                setLive(true);
              }}
            >
              <span className="mono">{item.number}</span>
              {item.label}
              <span className="flight-angle mono">{item.angle}°</span>
            </button>
          ))}
        </div>
        <div className="flight-explanation" aria-live="polite">
          <strong>{flight.title}</strong>
          <p>{flight.text}</p>
        </div>
        <Link
          href="/aircraft/studio"
          className="full-studio-link"
          aria-label="Open the full aircraft and flow studio"
        >
          <span className="mono">Full studio</span>↗
        </Link>
      </div>
    </div>
  );
}

class PreviewBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) return <WebGLFallback />;
    return this.props.children;
  }
}
