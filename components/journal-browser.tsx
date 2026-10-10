"use client";
import { useState } from "react";
import { JOURNAL } from "@/lib/journal";
import { FlightCard } from "./flight-editorial";
export function JournalBrowser() {
  const [category, setCategory] = useState("All notes");
  const articles = JOURNAL.filter((a) => category === "All notes" || a.category === category);
  return (
    <div className="c-journal-list">
      <div className="c-filter-bar" role="group" aria-label="Filter journal notes">
        {["All notes", "Technology", "Mission design", "Research"].map((c) => (
          <button key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
        <span role="status">{articles.length} research notes</span>
      </div>
      <div className="c-journal-grid">
        {articles.map((a) => (
          <FlightCard
            key={a.slug}
            href={`/journal/${a.slug}`}
            image={a.image}
            eyebrow={`${a.category} / ${a.readTime}`}
            title={a.title}
            description={a.excerpt}
            bell={a.bell}
          />
        ))}
      </div>
    </div>
  );
}
