import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
import { FlightHero, FlightSectionHeading, FlightCTA } from "@/components/flight-editorial";
export const metadata: Metadata = {
  title: "Events & research conversations",
  description:
    "Celestium’s space for future demonstrations and research conversations. No event attendance is currently announced.",
  alternates: { canonical: "/company/events" },
};
export default function EventsPage() {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <FlightHero
          eyebrow="Company / Events & conversations"
          title={
            <>
              Ideas worth
              <br />
              gathering around.
            </>
          }
          description="A place for future research demonstrations, design reviews and technical conversations."
          image="/images/taraka-hangar-v1.webp"
          alt="Taraka X-1 aircraft concept in a hangar"
          bell={false}
          compact
        />
        <section className="c-container c-section">
          <FlightSectionHeading
            eyebrow="Research / Conversations"
            title={
              <>
                The next event
                <br />
                <em>starts with a question.</em>
              </>
            }
            description="Celestium has no announced event appearances or scheduled demonstrations. Explore the research online or prepare a collaboration enquiry."
          />
          <div className="c-detail-grid">
            <div>
              <span className="c-eyebrow">01 / Explore</span>
              <h3>An interactive introduction</h3>
              <p>
                The on-demand aircraft studio is available to inspect the geometry and flight configurations.
              </p>
              <Link href="/aircraft/studio" className="c-text-link">
                Open the studio ↗
              </Link>
            </div>
            <div>
              <span className="c-eyebrow">02 / Review</span>
              <h3>A clear design basis</h3>
              <p>Use the technical notes and nominal trade to begin a structured research conversation.</p>
              <Link href="/research" className="c-text-link">
                Explore research ↗
              </Link>
            </div>
            <div>
              <span className="c-eyebrow">03 / Connect</span>
              <h3>A research enquiry</h3>
              <p>Prepare a question for a future discussion, design review or focused collaboration.</p>
              <Link href="/contact?topic=Research%20conversation" className="c-text-link">
                Prepare an enquiry ↗
              </Link>
            </div>
          </div>
        </section>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
