"use client";

import { useRef, useState } from "react";

const SYSTEMS = [
  {
    name: "Hydrogen storage",
    short: "Storage",
    heading: "Fuel mass is only the beginning.",
    description:
      "The hydrogen path starts with a complete storage system: fuel, vessel, mounting, lines and isolation. The Taraka X-1 design basis explicitly leaves tank-vessel mass unresolved.",
    interface: "Fuel supply, pressure and isolation",
    question: "What mass and volume does the complete installed storage system require?",
    className: "storage",
  },
  {
    name: "Fuel-cell system",
    short: "Fuel cell",
    heading: "Make sustained power an installed system.",
    description:
      "The fuel-cell path supplies the sustained electrical-power perspective in the concept. Balance of plant, environmental conditions and thermal rejection belong in the same installed-system estimate.",
    interface: "Electrical output and thermal rejection",
    question: "How does installed power change with altitude, cooling demand and system auxiliaries?",
    className: "fuelcell",
  },
  {
    name: "Battery buffer",
    short: "Battery",
    heading: "A buffer for changing demand.",
    description:
      "The concept uses a battery buffer on the peak-power path. Its useful contribution depends on power capability, energy, state of charge, temperature and a defined mission reserve.",
    interface: "Peak power, usable energy and isolation",
    question: "How much usable energy remains after the complete departure, transition and reserve case?",
    className: "battery",
  },
  {
    name: "Electrical bus",
    short: "DC bus",
    heading: "Connect power with control.",
    description:
      "Power conversion and distribution connect the sources to the propulsion system and mission loads. The research must account for protection, segmentation, monitoring and a coherent response to faults.",
    interface: "Distribution, conversion and protection",
    question: "What is the system response when a source, converter or bus segment becomes unavailable?",
    className: "bus",
  },
  {
    name: "Motors & ducts",
    short: "Propulsion",
    heading: "Power becomes a lift-system question.",
    description:
      "The duct motors translate electrical power into shaft work and rotor thrust. Motor, inverter, rotor and duct performance have to be integrated with the aircraft mass and flight-mode model.",
    interface: "Torque, speed, thrust and tilt geometry",
    question:
      "What installed propulsion mass and demand support the mission across hover, transition and cruise?",
    className: "propulsion",
  },
  {
    name: "Thermal system",
    short: "Cooling",
    heading: "Heat has to leave the aircraft.",
    description:
      "Fuel-cell, power-electronics and motor losses create thermal loads. Cooling equipment, airflow, drag and ambient conditions affect the energy and mass budget, especially when forward speed is low.",
    interface: "Heat rejection and aerodynamic installation",
    question: "Can the installation reject heat in the demanding hover and environmental conditions?",
    className: "cooling",
  },
];

export function EnergyExplorer() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const system = SYSTEMS[active];
  return (
    <div className="c-energy-explorer">
      <div className="c-energy-diagram">
        <div className="c-lab-caption">
          <span>MALUS / Hydrogen-electric system</span>
          <span>Concept architecture</span>
        </div>
        <div className="c-energy-map" role="tablist" aria-label="Explore the hydrogen-electric powertrain">
          <svg viewBox="0 0 700 450" aria-hidden="true">
            <defs>
              <marker
                id="energy-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="m0 0 10 5-10 5Z" fill="currentColor" />
              </marker>
            </defs>
            <path
              d="M140 220h56M308 220h77M497 220h63M441 117v63"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              markerEnd="url(#energy-arrow)"
            />
            <path
              d="M252 261v85h133M616 261v85H497"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="4 5"
            />
            <text x="165" y="208">
              H₂
            </text>
            <text x="360" y="208">
              DC
            </text>
            <text x="560" y="208">
              POWER
            </text>
            <text x="350" y="426">
              THERMAL INTERFACES
            </text>
          </svg>
          {SYSTEMS.map((item, i) => (
            <button
              ref={(el) => {
                refs.current[i] = el;
              }}
              key={item.name}
              id={`energy-system-${i}`}
              className={`c-energy-node c-energy-${item.className}`}
              role="tab"
              aria-label={item.name}
              aria-selected={active === i}
              aria-controls="energy-system-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let n = i;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % SYSTEMS.length;
                else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
                  n = (i + SYSTEMS.length - 1) % SYSTEMS.length;
                else if (e.key === "Home") n = 0;
                else if (e.key === "End") n = SYSTEMS.length - 1;
                else return;
                e.preventDefault();
                setActive(n);
                refs.current[n]?.focus();
              }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{item.short}</strong>
              <small>{item.name}</small>
            </button>
          ))}
        </div>
        <p className="c-energy-map-note">
          Solid lines: conceptual power path. Dashed lines: supporting system interfaces. Diagram shows the
          proposed architecture, without rated performance or redundancy claims.
        </p>
      </div>
      <div
        className="c-energy-copy"
        id="energy-system-panel"
        role="tabpanel"
        aria-labelledby={`energy-system-${active}`}
      >
        <p className="c-eyebrow">
          {String(active + 1).padStart(2, "0")} / {system.name}
        </p>
        <h3>{system.heading}</h3>
        <p>{system.description}</p>
        <dl>
          <div>
            <dt>Interface to study</dt>
            <dd>{system.interface}</dd>
          </div>
          <div>
            <dt>The next question</dt>
            <dd>{system.question}</dd>
          </div>
        </dl>
        <a href="/resources/taraka-x1-design-basis.md" download>
          Download the design basis ↗
        </a>
      </div>
    </div>
  );
}
