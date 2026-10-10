"use client";
import { useState } from "react";
import { CATALOG } from "@/lib/catalog";
import { FlightCard } from "./flight-editorial";
export function ProductBrowser() {
  const [type, setType] = useState("All architectures");
  const [mission, setMission] = useState("All missions");
  const [sort, setSort] = useState("featured");
  const [own, setOwn] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = CATALOG.filter(
    (p) =>
      (type === "All architectures" || p.type === type) &&
      (mission === "All missions" || p.mission === mission) &&
      (!own || !p.bell),
  ).sort((a, b) => (sort === "name" ? a.title.localeCompare(b.title) : 0));
  const compare = CATALOG.filter((p) => selected.includes(p.id));
  const reset = () => {
    setType("All architectures");
    setMission("All missions");
    setSort("featured");
    setOwn(false);
  };
  return (
    <div className="c-product-browser">
      <div className="c-product-filters">
        <label>
          Architecture
          <select aria-label="Architecture" value={type} onChange={(e) => setType(e.target.value)}>
            <option>All architectures</option>
            {["Tilting lift", "High-speed VTOL", "Rotorcraft reference"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Mission perspective
          <select value={mission} onChange={(e) => setMission(e.target.value)}>
            <option>All missions</option>
            {["Medical", "Utility", "Research"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
        <label className="c-own-toggle">
          <input type="checkbox" checked={own} onChange={(e) => setOwn(e.target.checked)} />
          Celestium concepts only
        </label>
      </div>
      <div className="c-product-count">
        <span role="status">
          {filtered.length} {filtered.length === 1 ? "study" : "studies"} in view
        </span>
        <button onClick={reset}>Reset filters ↺</button>
      </div>
      {filtered.length ? (
        <div className="c-route-grid c-product-grid">
          {filtered.map((p) => (
            <div className="c-product-item" key={p.id}>
              <FlightCard {...p} />
              <div className="c-product-item-footer">
                <span>{p.stage}</span>
                <button
                  aria-pressed={selected.includes(p.id)}
                  disabled={!selected.includes(p.id) && selected.length >= 3}
                  onClick={() =>
                    setSelected((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))
                  }
                  aria-label={`${selected.includes(p.id) ? "Remove" : "Compare"} ${p.title}`}
                >
                  {selected.includes(p.id) ? "✓ Selected" : "+ Compare"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="c-empty-results">
          <h3>No studies match these filters.</h3>
          <p>Try a different architecture or mission perspective.</p>
          <button className="c-button" onClick={reset}>
            Show all studies
          </button>
        </div>
      )}
      {compare.length > 0 && (
        <section className="c-comparison" aria-label="Study comparison">
          <div className="c-comparison-heading">
            <h3>Compare the perspectives.</h3>
            <button onClick={() => setSelected([])}>Clear comparison ×</button>
          </div>
          {compare.length === 1 && (
            <p>Select up to two more studies to compare their architecture and research focus.</p>
          )}
          <div
            className="c-comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label="Aircraft study comparison table"
          >
            <table>
              <caption>
                Architecture and research comparison. Technology references describe separate aircraft
                systems.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Study perspective</th>
                  {compare.map((p) => (
                    <th scope="col" key={p.id}>
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Stage", key: "stage" },
                  { label: "Propulsion perspective", key: "propulsion" },
                  { label: "Mission", key: "mission" },
                  { label: "Research focus", key: "focus" },
                ].map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.label}</th>
                    {compare.map((p) => (
                      <td key={p.id}>{p[row.key as keyof typeof p]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
