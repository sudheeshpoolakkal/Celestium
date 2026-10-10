"use client";

import { useState } from "react";
import { Download } from "./icons";

const POINTS = [
  { diameter: 2.4, mass: 1744, hover: 747, loading: 1891, battery: 223 },
  { diameter: 2.6, mass: 1596, hover: 599, loading: 1475, battery: 164 },
  { diameter: 2.8, mass: 1537, hover: 495, loading: 1224, battery: 123 },
  { diameter: 3.0, mass: 1425, hover: 433, loading: 989, battery: 99 },
  { diameter: 3.2, mass: 1372, hover: 381, loading: 837, battery: 78 },
] as const;

export function ResearchTrade() {
  const [selected, setSelected] = useState(2);
  const point = POINTS[selected];
  const x = (index: number) => 65 + index * 135;
  const y = (power: number) => 233 - ((power - 300) / 500) * 180;
  return (
    <div className="research-trade">
      <div className="trade-visual">
        <p className="diagram-kicker">Duct diameter / Nominal hover demand</p>
        <svg
          viewBox="0 0 670 300"
          role="img"
          aria-label="In the nominal study, hover demand falls from 747 kilowatts at 2.4 metres duct diameter to 381 kilowatts at 3.2 metres. The 2.8 metre design point uses 495 kilowatts."
        >
          {[400, 600, 800].map((power) => (
            <g key={power}>
              <path d={`M65 ${y(power)}H605`} stroke="#bfcebd" strokeWidth="1" />
              <text
                x="43"
                y={y(power) + 4}
                textAnchor="end"
                fill="#536958"
                fontSize="11"
                fontFamily="var(--mono)"
              >
                {power}
              </text>
            </g>
          ))}
          <text x="20" y="25" fill="#536958" fontSize="10" fontFamily="var(--mono)">
            kW
          </text>
          <path
            d={POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${x(i)} ${y(p.hover)}`).join(" ")}
            stroke="#577c60"
            strokeWidth="2"
            fill="none"
          />
          <path d={`M${x(selected)} ${y(point.hover)}V255`} stroke="#78947b" strokeDasharray="4 5" />
          {POINTS.map((p, i) => (
            <g key={p.diameter}>
              <circle
                cx={x(i)}
                cy={y(p.hover)}
                r={i === selected ? 7 : 4}
                fill={i === selected ? "#284d35" : "#7a977e"}
                stroke="#e8ede6"
                strokeWidth="2"
              />
              <text
                x={x(i)}
                y="278"
                textAnchor="middle"
                fill="#536958"
                fontSize="12"
                fontFamily="var(--mono)"
              >
                {p.diameter.toFixed(1)} m
              </text>
            </g>
          ))}
          <text
            x={x(selected) + (selected === 4 ? -14 : 14)}
            textAnchor={selected === 4 ? "end" : "start"}
            y={y(point.hover) - 13}
            fill="#284d35"
            fontSize="17"
            className="trade-value-label"
            fontFamily="var(--sans)"
          >
            {point.hover} kW
          </text>
        </svg>
        <div className="trade-selector" role="group" aria-label="Select nominal duct diameter">
          {POINTS.map((p, i) => (
            <button
              key={p.diameter}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              {p.diameter.toFixed(1)}
              <span>m</span>
            </button>
          ))}
        </div>
      </div>
      <div className="trade-point" aria-live="polite">
        <span className="diagram-kicker">
          {selected === 2 ? "Primary design point" : "Diameter trade point"}
        </span>
        <h3>
          {point.diameter.toFixed(2)}
          <span>m duct diameter</span>
        </h3>
        <dl>
          <div>
            <dt>Nominal takeoff mass</dt>
            <dd>{point.mass.toLocaleString("en-IN")} kg</dd>
          </div>
          <div>
            <dt>Hover power</dt>
            <dd>{point.hover} kW</dd>
          </div>
          <div>
            <dt>Corrected disk loading</dt>
            <dd>{point.loading.toLocaleString("en-IN")} Pa</dd>
          </div>
          <div>
            <dt>Battery mass</dt>
            <dd>{point.battery} kg</dd>
          </div>
        </dl>
        <p>
          Larger disks reduce the modelled hover demand, at the cost of a wider aircraft footprint. These
          points inherit the original sizing assumptions.
        </p>
        <a href="/resources/taraka-x1-duct-trade.csv" download>
          Download study data <Download size={16} />
        </a>
      </div>
      <p className="trade-note">
        Source: twin-duct architecture study, September 2026. The hydrogen vessel was omitted from the
        original mass convergence. Hover power and battery values await integrated re-convergence; this chart
        shows the reported study, not a validated performance curve.
      </p>
    </div>
  );
}
