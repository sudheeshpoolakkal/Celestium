import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import {
  FlightCTA,
  FlightCard,
  FlightFAQ,
  FlightHero,
  FlightSectionHeading,
} from "@/components/flight-editorial";
import { TransitionLab } from "@/components/transition-lab";
import { MotionMedia } from "@/components/motion-media";
export const metadata: Metadata = {
  title: "HSVTOL · High-speed vertical flight",
  description:
    "Explore folding-rotor technology, runway flexibility and the architecture of high-speed vertical takeoff and landing through Celestium’s Bell reference library.",
  alternates: { canonical: "/innovation/hsvtol" },
};
export default function HSVTOLPage() {
  return (
    <Chrome tone="overlay">
      <article className="c-site">
        <FlightHero
          eyebrow="Innovation / HSVTOL"
          title={
            <>
              A higher ambition
              <br />
              for vertical flight.
            </>
          }
          description="High-speed vertical takeoff and landing. A research perspective on hover, folding rotors and a different path to cruise."
          image="/media/bell/hsvtol-formation.webp"
          alt="Bell high-speed vertical takeoff and landing aircraft concepts above golden clouds"
          href="#folding-rotor"
          action="Explore the folding rotor"
        />
        <nav className="c-page-bar" aria-label="On this page">
          <div className="c-container">
            <span>High-speed VTOL</span>
            <a href="#overview">The architecture</a>
            <a href="#folding-rotor">Stop & fold</a>
            <a href="#flight-modes">Flight modes</a>
            <a href="#questions">Questions</a>
          </div>
        </nav>
        <section className="c-container c-section" id="overview">
          <p className="c-eyebrow">01 / Beyond conventional vertical lift</p>
          <div className="c-content-grid">
            <h2>
              Hover capability.
              <br />
              <em>A different cruise.</em>
            </h2>
            <div className="c-copy">
              <p>HSVTOL asks how vertical access and high-speed flight can coexist.</p>
              <p>
                Bell’s public HSVTOL concept uses rotor systems for vertical lift, then stops and folds the
                blades as the aircraft moves into a high-speed cruise configuration. The propulsion and
                control architecture must support that change.
              </p>
              <p>
                Celestium presents HSVTOL as a technology reference. The Bell media illustrates Bell’s
                concept; this capability is separate from the hydrogen-electric Taraka X-1 research study.
              </p>
            </div>
          </div>
          <div className="c-detail-grid">
            <div>
              <span className="c-eyebrow">01 / Lift</span>
              <h3>Rotor-supported hover</h3>
              <p>
                The rotor provides the vertical lift path. Its power demand and downwash shape the aircraft
                and landing-site study.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">02 / Change</span>
              <h3>Stop. Fold. Transition.</h3>
              <p>
                The folding mechanism and the changing propulsion roles create an integrated controls and
                reliability problem.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">03 / Cruise</span>
              <h3>Wing and thrust</h3>
              <p>
                The wing and cruise propulsion path take on their forward-flight roles with rotor drag reduced
                by folding.
              </p>
            </div>
          </div>
        </section>
        <section className="c-tone-dark c-section" id="folding-rotor">
          <div className="c-container">
            <FlightSectionHeading
              eyebrow="02 / The stop-and-fold concept"
              title={
                <>
                  A rotor that changes
                  <br />
                  <em>its role.</em>
                </>
              }
              description="A locally hosted Bell concept animation. Play to inspect the aircraft-only folding sequence."
            />
            <MotionMedia
              src="/media/bell/blade-fold.mp4"
              poster="/media/bell/hsvtol-platform.webp"
              title="Folding-rotor sequence"
              description="Bell’s concept animation illustrates the change from rotor-supported vertical flight toward a folded-rotor cruise configuration."
            />
          </div>
        </section>
        <section className="c-tone-sage c-section" id="flight-modes">
          <div className="c-container">
            <FlightSectionHeading
              eyebrow="03 / Explore the architecture"
              title={
                <>
                  A different transition.
                  <br />
                  <em>A different system.</em>
                </>
              }
              description="Select hover, transition or cruise to explore the schematic. Folding rotors and jet thrust shown here are reference architecture features."
            />
            <TransitionLab hsvtol />
          </div>
        </section>
        <section className="c-container c-section">
          <FlightSectionHeading
            eyebrow="04 / Infrastructure in perspective"
            title={
              <>
                More than one way
                <br />
                <em>to leave the ground.</em>
              </>
            }
            description="Conventional, short and vertical departures represent different aircraft requirements. Their availability depends on the specific aircraft and validated envelope."
          />
          <div className="c-detail-grid">
            <div>
              <span className="c-eyebrow">CTOL / Conventional takeoff</span>
              <h3>A conventional runway</h3>
              <p>
                A runway departure can use wing lift and forward thrust. The required runway and payload
                envelope belong to the aircraft’s validated performance.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">STOL / Short takeoff</span>
              <h3>A shorter ground roll</h3>
              <p>
                Lift-system assistance can change the takeoff problem. Surface, obstacles and aircraft
                configuration remain part of the analysis.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">VTOL / Vertical takeoff</span>
              <h3>Vertical access</h3>
              <p>
                Rotor thrust supports the departure. Site geometry, power, downwash and the surrounding
                environment define the constraints.
              </p>
            </div>
          </div>
        </section>
        <section className="c-tone-dark c-section">
          <div className="c-container">
            <FlightSectionHeading
              eyebrow="05 / Hover in perspective"
              title={
                <>
                  Lift has an
                  <br />
                  <em>environment.</em>
                </>
              }
              description="The rotor wake interacts with the airframe and the landing-site environment. Bell’s aircraft-only animation offers a visual reference for that research question."
            />
            <MotionMedia
              src="/media/bell/hover-technology.mp4"
              poster="/media/bell/hsvtol-platform.webp"
              title="Hover-technology concept"
              description="Bell’s concept animation depicts rotor-supported flight above water. It is illustrative media, not measured downwash or validated performance data."
            />
          </div>
        </section>
        <section className="c-container c-section" id="questions">
          <FlightSectionHeading eyebrow="06 / A closer look" title="Understand the differences." />
          <FlightFAQ
            items={[
              {
                question: "What does HSVTOL stand for?",
                answer:
                  "High-Speed Vertical Takeoff and Landing. It describes an architecture concept that aims to combine vertical lift with high-speed cruise.",
              },
              {
                question: "How is this different from a conventional tiltrotor?",
                answer:
                  "In Bell’s HSVTOL concept, the rotor is stopped and folded during the transition to cruise. A conventional tiltrotor keeps its proprotors turning to provide forward thrust. The two concepts have different system requirements.",
              },
              {
                question: "Does Celestium have an HSVTOL aircraft?",
                answer:
                  "HSVTOL is part of Celestium’s technology-reference library. The current Celestium aircraft concept is Taraka X-1, with hydrogen-electric power and twin tilting ducts. No Celestium HSVTOL performance or flight capability is claimed.",
              },
              {
                question: "Where did the animation come from?",
                answer:
                  "The two aircraft-only clips were derived from publicly displayed Bell animations on its HSVTOL page. The media-credits page records the original source links, local files and ownership.",
              },
            ]}
          />
        </section>
        <section className="c-tone-sage c-section">
          <div className="c-container">
            <FlightSectionHeading eyebrow="Continue exploring" title="Connected flight frontiers." />
            <div className="c-route-grid">
              <FlightCard
                href="/products/tiltrotor"
                image="/media/bell/tiltrotor-coast.webp"
                eyebrow="Aircraft architecture"
                title="Tiltrotor"
                description="Explore rotating thrust and wing-borne flight."
              />
              <FlightCard
                href="/innovation/hydrogen-electric"
                image="/images/taraka-powertrain-cutaway-v1.webp"
                eyebrow="Energy research"
                title="Hydrogen-electric"
                description="Explore a different propulsion and energy architecture."
                bell={false}
              />
              <FlightCard
                href="/journal/beyond-the-runway"
                image="/media/bell/hsvtol-formation.webp"
                eyebrow="Research journal"
                title="Beyond the runway"
                description="Read the research perspective on high-speed vertical flight."
              />
            </div>
          </div>
        </section>
        <FlightCTA />
      </article>
    </Chrome>
  );
}
