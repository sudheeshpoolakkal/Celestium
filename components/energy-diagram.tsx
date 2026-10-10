"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";

type Diagram = { width: number; height: number; paths: string[] };
type NodeBox = { left: number; right: number; top: number; bottom: number; x: number; y: number };

/** Connect the actual node boxes, so the topology survives font and viewport changes. */
export function EnergyDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const marker = `energy-arrow-${useId().replace(/:/g, "")}`;
  const [diagram, setDiagram] = useState<Diagram>({ width: 1, height: 1, paths: [] });

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const box = (name: string): NodeBox => {
        const node = element.querySelector<HTMLElement>(`[data-energy="${name}"]`)!;
        const rect = node.getBoundingClientRect();
        return {
          left: rect.left - bounds.left,
          right: rect.right - bounds.left,
          top: rect.top - bounds.top,
          bottom: rect.bottom - bounds.top,
          x: rect.left - bounds.left + rect.width / 2,
          y: rect.top - bounds.top + rect.height / 2,
        };
      };
      const storage = box("storage");
      const fuel = box("fuel");
      const bus = box("bus");
      const battery = box("battery");
      const left = box("left");
      const right = box("right");
      let paths: string[];
      if (window.innerWidth >= 1000) {
        paths = [
          `M${storage.right} ${storage.y}H${fuel.left - 3}`,
          `M${fuel.right} ${fuel.y}H${bus.left - 3}`,
          `M${battery.right} ${battery.y}H${bus.left}V${bus.bottom - 15}`,
          `M${bus.left} ${left.y}H${left.left - 3}`,
          `M${bus.left} ${right.y}H${right.left - 3}`,
        ];
      } else {
        const fuelJoin = bus.top + 20;
        const fork = bus.bottom + (left.top - bus.bottom) * 0.55;
        paths = [
          `M${storage.right} ${storage.y}H${fuel.left - 3}`,
          `M${fuel.x} ${fuel.bottom}V${fuelJoin - 18}H${bus.left}V${fuelJoin - 3}`,
          `M${battery.right} ${battery.y}H${bus.left - 3}`,
          `M${bus.left} ${bus.bottom - 8}V${fork}H${left.x}V${left.top - 3}`,
          `M${bus.left} ${bus.bottom - 8}V${fork}H${right.x}V${right.top - 3}`,
        ];
      }
      setDiagram({ width: bounds.width, height: bounds.height, paths });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll<HTMLElement>("[data-energy]").forEach((node) => observer.observe(node));
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="energy-diagram technical-figure">
      <div
        ref={root}
        className="energy-path"
        aria-label="Hydrogen storage supplies the fuel cell, which feeds a shared electrical bus. The battery buffer also connects to the bus. The bus supplies both duct motors."
      >
        <svg
          className="energy-connections"
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          aria-hidden="true"
        >
          <defs>
            <marker
              id={marker}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="m0 0 10 5-10 5" fill="none" stroke="#5a785f" strokeWidth="1.4" />
            </marker>
          </defs>
          {diagram.paths.map((path, index) => (
            <path
              key={index}
              d={path}
              stroke="#5a785f"
              strokeWidth="1"
              fill="none"
              markerEnd={`url(#${marker})`}
            />
          ))}
        </svg>
        <div data-energy="storage" className="energy-source energy-node">
          <span>Storage</span>
          <strong>Liquid hydrogen</strong>
          <p>Fuel + cryogenic vessel</p>
        </div>
        <div data-energy="fuel" className="energy-fuel-cell energy-node">
          <span>Conversion</span>
          <strong>Fuel cell</strong>
          <p>Sustained electrical power</p>
        </div>
        <div data-energy="bus" className="energy-bus">
          <span>Common DC bus</span>
        </div>
        <div className="energy-motors">
          <div data-energy="left" className="energy-node">
            <span>Left duct</span>
            <strong>Inverter + motor</strong>
          </div>
          <div data-energy="right" className="energy-node">
            <span>Right duct</span>
            <strong>Inverter + motor</strong>
          </div>
        </div>
        <div data-energy="battery" className="energy-battery energy-node">
          <span>Peak demand</span>
          <strong>Battery buffer</strong>
          <p>Connected to the DC bus</p>
        </div>
      </div>
      <figcaption>
        <span>Fuel cell and battery feed a shared electrical architecture.</span>
        <span>Conceptual system path</span>
      </figcaption>
    </figure>
  );
}
