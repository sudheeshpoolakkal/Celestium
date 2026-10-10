"use client";
import { useRef, useState } from "react";

const MODES = [
  {
    name: "Hover",
    number: "01",
    angle: 90,
    headline: "Lift directly from the ground.",
    description:
      "Rotor thrust supports the aircraft in a vertical configuration. Hover power, control authority and downwash are aircraft-level design questions.",
    rotor: "Vertical lift",
    wing: "Limited aerodynamic lift",
    power: "Peak lift demand",
  },
  {
    name: "Transition",
    number: "02",
    angle: 45,
    headline: "Change the direction of thrust.",
    description:
      "Propulsion rotates as forward speed and wing lift build. Control allocation must coordinate the changing aerodynamic and thrust contributions.",
    rotor: "Lift + forward thrust",
    wing: "Lift develops with speed",
    power: "Changing system demand",
  },
  {
    name: "Cruise",
    number: "03",
    angle: 0,
    headline: "Move forward on the wing.",
    description:
      "The wing supports the aircraft while propulsion provides forward thrust. The mission energy model must account for drag, reserves and the return journey.",
    rotor: "Forward thrust",
    wing: "Wing-borne flight",
    power: "Sustained cruise demand",
  },
];
export function TransitionLab({ hsvtol = false }: { hsvtol?: boolean }) {
  const [active, setActive] = useState(0);
  const [angle, setAngle] = useState(90);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const mode = MODES[active];
  const select = (i: number) => {
    setActive(i);
    setAngle(MODES[i].angle);
  };
  const discLength = hsvtol && active === 2 ? 30 : 110;
  return (
    <div className="c-transition-lab">
      <div className="c-transition-stage">
        <div className="c-lab-caption">
          <span>{hsvtol ? "HSVTOL / Folding rotor schematic" : "TILTROTOR / Orientation schematic"}</span>
          <span>
            {mode.number} / {mode.name.toUpperCase()}
          </span>
        </div>
        <svg
          className="c-aircraft-schematic"
          viewBox="0 0 800 400"
          role="img"
          aria-label={`${hsvtol ? "HSVTOL" : "Tiltrotor"} concept in ${mode.name.toLowerCase()} mode. ${hsvtol && active === 2 ? "Rotor folded; separate jet thrust" : mode.rotor}.`}
        >
          <defs>
            <pattern
              id={hsvtol ? "hsvtol-grid" : "tiltrotor-grid"}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" opacity=".055" />
            </pattern>
            <marker
              id={hsvtol ? "hsvtol-arrow" : "tiltrotor-arrow"}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#c77742" />
            </marker>
          </defs>
          <rect width="800" height="400" fill={`url(#${hsvtol ? "hsvtol-grid" : "tiltrotor-grid"})`} />
          <path d="M70 340H730" stroke="currentColor" opacity=".2" strokeDasharray="5 6" />
          <text
            x="70"
            y="365"
            fill="currentColor"
            opacity=".5"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1"
          >
            REFERENCE PLANE / ILLUSTRATIVE GEOMETRY
          </text>
          <path
            d="m195 197 42-13 42-31 145 5 89 19 61 22 19 18-25 20-72 5-189-8-67-15-45-22Z"
            fill="#e4e8df"
            stroke="#617e6d"
            strokeWidth="1.4"
          />
          <path
            d="m345 181-40-103 35 10 72 108-11 70-30 34-26-119Z"
            fill="#d2ddcf"
            stroke="#617e6d"
            strokeWidth="1.4"
          />
          <path
            d="m240 184-40-64-29-8 38 89m-5 15-26 54 26-5 53-34"
            fill="#c8d6c5"
            stroke="#617e6d"
            strokeWidth="1.4"
          />
          <path d="m520 185 38 18-20 19-28-1-8-29 18-7Z" fill="#6f8b7b" />
          <path
            d="M484 199h26v26h-26zm-33-3h23v25h-23zm-33-3h22v25h-22"
            fill="#acc3b1"
            stroke="#617e6d"
            strokeWidth="1"
          />
          <path d="M244 239v25m236-20v19" stroke="#617e6d" strokeWidth="3" />
          <circle cx="244" cy="266" r="9" fill="#68816f" />
          <circle cx="480" cy="265" r="9" fill="#68816f" />
          <g transform={`translate(365 155) rotate(${-angle})`} className="c-nacelle-geometry">
            <path d="M-28-14H42l17 14-17 14H-28Z" fill="#b0c7b5" stroke="#617e6d" strokeWidth="1.4" />
            <path
              d={`M59 ${-discLength / 2}v${discLength}`}
              stroke="#bb6436"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path d={`M62 ${-discLength / 2}v${discLength}`} stroke="#d69063" strokeWidth="1" opacity=".5" />
            <circle cx="59" r="6" fill="#b66538" />
          </g>
          <path
            d={active === 0 ? "M390 135V60" : active === 1 ? "M420 137l56-56" : "M480 153h94"}
            fill="none"
            stroke="#c77742"
            strokeWidth="2"
            markerEnd={`url(#${hsvtol ? "hsvtol-arrow" : "tiltrotor-arrow"})`}
          />
          <text
            x={active === 0 ? 405 : active === 1 ? 485 : 592}
            y={active === 0 ? 75 : active === 1 ? 81 : 157}
            fill="#9c502c"
            fontSize="11"
            fontFamily="monospace"
          >
            {hsvtol && active === 2 ? "JET THRUST" : "THRUST"}
          </text>
          {active > 0 && (
            <>
              <path d="M365 245v-45" stroke="#617e6d" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="295" y="322" fill="#617e6d" fontSize="10" fontFamily="monospace">
                INCREASING WING LIFT
              </text>
            </>
          )}
          {hsvtol && active === 2 && (
            <path
              d="M155 194h-60m60 16H85m70 12h-55"
              stroke="#c77742"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          )}
        </svg>
        <div className="c-lab-stage-bottom">
          <span>SCHEMATIC / NOT A FLIGHT SIMULATION</span>
          <span>
            {hsvtol
              ? active === 2
                ? "ROTOR FOLDED / CRUISE"
                : "ROTOR DEPLOYED"
              : `${angle}° / PROPULSION ORIENTATION`}
          </span>
        </div>
      </div>
      <div className="c-transition-controls">
        <div
          className="c-transition-tabs"
          role="tablist"
          aria-label={hsvtol ? "HSVTOL flight modes" : "Tiltrotor flight modes"}
        >
          {MODES.map((m, i) => (
            <button
              ref={(el) => {
                refs.current[i] = el;
              }}
              key={m.name}
              id={`${hsvtol ? "hsvtol" : "tiltrotor"}-mode-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls={`${hsvtol ? "hsvtol" : "tiltrotor"}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                let n = i;
                if (e.key === "ArrowRight") n = (i + 1) % 3;
                else if (e.key === "ArrowLeft") n = (i + 2) % 3;
                else if (e.key === "Home") n = 0;
                else if (e.key === "End") n = 2;
                else return;
                e.preventDefault();
                select(n);
                refs.current[n]?.focus();
              }}
            >
              <span>{m.number}</span>
              {m.name}
            </button>
          ))}
        </div>
        <div
          id={`${hsvtol ? "hsvtol" : "tiltrotor"}-panel`}
          role="tabpanel"
          aria-labelledby={`${hsvtol ? "hsvtol" : "tiltrotor"}-mode-${active}`}
          className="c-transition-mode"
        >
          <h3>{hsvtol && active === 2 ? "Fold the rotor. Cruise on the wing." : mode.headline}</h3>
          <p>
            {hsvtol && active === 2
              ? "In Bell’s HSVTOL concept, the rotor stops and folds while a separate thrust path supports high-speed cruise. This reference architecture is distinct from Taraka X-1."
              : mode.description}
          </p>
          <dl>
            <div>
              <dt>Propulsion role</dt>
              <dd>{hsvtol && active === 2 ? "Rotor folded / Jet thrust" : mode.rotor}</dd>
            </div>
            <div>
              <dt>Wing contribution</dt>
              <dd>{mode.wing}</dd>
            </div>
            <div>
              <dt>Power perspective</dt>
              <dd>{mode.power}</dd>
            </div>
          </dl>
        </div>
        {!hsvtol && (
          <label className="c-angle-control">
            Inspect the orientation <span>{angle}°</span>
            <input
              type="range"
              min="0"
              max="90"
              step="1"
              value={angle}
              aria-label="Propulsion orientation in degrees"
              onChange={(e) => {
                const n = Number(e.target.value);
                setAngle(n);
                setActive(n >= 67 ? 0 : n <= 22 ? 2 : 1);
              }}
            />
            <small>
              Geometry illustration only. Angle does not represent a validated transition schedule.
            </small>
          </label>
        )}
      </div>
    </div>
  );
}
