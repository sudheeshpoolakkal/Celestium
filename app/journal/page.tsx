import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { JournalBrowser } from "@/components/journal-browser";
import { FlightCTA } from "@/components/flight-editorial";
export const metadata: Metadata = {
  title: "Research journal",
  description:
    "Original Celestium research notes on aircraft architecture, energy, mission design and engineering trade-offs.",
  alternates: { canonical: "/journal" },
};
export default function JournalPage() {
  return (
    <Chrome>
      <div className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Research journal</p>
          <h1>
            Notes from
            <br />
            the horizon.
          </h1>
          <p>Ideas, trade-offs and mission perspectives from the vertical-flight research conversation.</p>
        </header>
        <div className="c-container">
          <JournalBrowser />
        </div>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
