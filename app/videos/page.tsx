import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightCTA, FlightHero, FlightSectionHeading, FlightLink } from "@/components/flight-editorial";
import { FlightGallery } from "@/components/flight-gallery";
import { MotionMedia } from "@/components/motion-media";
export const metadata: Metadata = {
  title: "Flight library",
  description:
    "Credited Bell aircraft and system imagery, two concept animations, and Celestium’s interactive aircraft model.",
  alternates: { canonical: "/videos" },
};
export default function VideosPage() {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <FlightHero
          eyebrow="Innovation / Flight library"
          title={
            <>
              The ideas.
              <br />
              In motion.
            </>
          }
          description="Reference imagery, aircraft-only animations and an interactive geometry study. Look closer at the systems behind the concept."
          image="/media/bell/hsvtol-formation.webp"
          alt="Bell high-speed VTOL concept aircraft above clouds"
          href="#flight-library"
          action="Explore the library"
          compact
        />
        <section className="c-container c-section" id="flight-library">
          <FlightSectionHeading
            eyebrow="Bell / Concept animations"
            title={
              <>
                A changing
                <br />
                <em>configuration.</em>
              </>
            }
            description="Both animations are hosted locally and play only when requested. Bell owns the reference aircraft and imagery."
          />
          <div className="c-media-grid">
            <MotionMedia
              src="/media/bell/blade-fold.mp4"
              poster="/media/bell/hsvtol-platform.webp"
              title="Folding-rotor sequence"
              description="Bell’s aircraft-only concept sequence illustrates the transition toward a folded-rotor cruise configuration."
            />
            <MotionMedia
              src="/media/bell/hover-technology.mp4"
              poster="/media/bell/hsvtol-platform.webp"
              title="Hover-technology concept"
              description="Bell’s aircraft-only concept sequence depicts rotor-supported flight above a marine environment."
            />
          </div>
        </section>
        <section className="c-container c-section" id="photography">
          <FlightSectionHeading
            eyebrow="Bell / Reference imagery"
            title={
              <>
                A closer look.
                <br />
                <em>A wider horizon.</em>
              </>
            }
            description="Explore aircraft concepts, system hardware, empty interiors and mission environments. Filter the reference images, then inspect the detail. Images were screened for visible people."
          />
          <FlightGallery />
        </section>
        <section className="c-tone-sage c-section">
          <div className="c-container c-content-grid">
            <h2>
              Inspect the aircraft.
              <br />
              <em>Explore the geometry.</em>
            </h2>
            <div className="c-copy">
              <p>Taraka X-1 is available as an on-demand interactive model.</p>
              <p>
                Explore flight configurations, system views, mission installation studies and an analytic
                airflow illustration. The viewer is explanatory research geometry, not a flight simulation or
                validated CFD.
              </p>
              <FlightLink href="/aircraft/studio">Open the aircraft studio</FlightLink>
            </div>
          </div>
        </section>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
