import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightCTA, FlightCard, FlightHero, FlightSectionHeading } from "@/components/flight-editorial";
import { MISSIONS } from "@/lib/catalog";
export const metadata: Metadata = {
  title: "Missions · A reason to fly",
  description:
    "Explore medical, business, energy, public-safety, utility and research mission perspectives with Celestium.",
  alternates: { canonical: "/missions" },
};
export default function MissionsPage() {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <FlightHero
          eyebrow="Missions / A reason to fly"
          title={
            <>
              Start with
              <br />
              what matters.
            </>
          }
          description="Care. Connection. Useful work. The mission on the ground defines the questions we ask in the air."
          image="/media/bell/rotorcraft-alps.webp"
          alt="Bell 525 in flight above a mountain landscape"
          href="#mission-perspectives"
          action="Find your mission"
        />
        <section className="c-container c-section" id="mission-perspectives">
          <FlightSectionHeading
            eyebrow="Purpose defines the platform"
            title={
              <>
                Every mission.
                <br />
                <em>A different perspective.</em>
              </>
            }
            description="Taraka X-1 has a dedicated medical design case. The other missions are wider research perspectives, each with its own requirements."
          />
          <div className="c-route-grid">
            {MISSIONS.map((m) => (
              <FlightCard key={m.href} {...m} />
            ))}
          </div>
        </section>
        <FlightCTA
          title="Bring a mission. Begin a conversation."
          description="Capture the route, payload and operating questions in a local enquiry brief."
          action="Create a mission brief"
        />
      </div>
    </Chrome>
  );
}
