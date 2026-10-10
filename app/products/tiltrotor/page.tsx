import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
import {
  FlightCTA,
  FlightCard,
  FlightFAQ,
  FlightHero,
  FlightSectionHeading,
} from "@/components/flight-editorial";
import { TransitionLab } from "@/components/transition-lab";
export const metadata: Metadata = {
  title: "Tiltrotor technology",
  description:
    "Explore vertical lift, transition and wing-borne cruise with Celestium’s interactive tiltrotor explainer and credited Bell aircraft references.",
  alternates: { canonical: "/products/tiltrotor" },
};
export default function TiltrotorPage() {
  return (
    <Chrome tone="overlay">
      <article className="c-site">
        <FlightHero
          eyebrow="Aircraft / Tiltrotor"
          title={
            <>
              Two ways to fly.
              <br />
              One horizon.
            </>
          }
          description="Vertical freedom meets wing-borne flight. Explore the architecture that connects lift, transition and cruise."
          image="/media/bell/tiltrotor-coast.webp"
          alt="Bell tiltrotor aircraft concepts above a tropical coastline"
          href="#transition"
          action="Explore the transition"
        />
        <nav className="c-page-bar" aria-label="On this page">
          <div className="c-container">
            <span>Tiltrotor technology</span>
            <a href="#perspective">The perspective</a>
            <a href="#transition">Flight modes</a>
            <a href="#architectures">Architectures</a>
            <a href="#questions">Questions</a>
          </div>
        </nav>
        <section className="c-container c-section" id="perspective">
          <p className="c-eyebrow">01 / A different perspective on lift</p>
          <div className="c-content-grid">
            <h2>
              Lift vertically.
              <br />
              <em>Think horizontally.</em>
            </h2>
            <div className="c-copy">
              <p>A rotor for vertical access. A wing for forward flight.</p>
              <p>
                Tiltrotor architectures change the direction of propulsion as the aircraft transitions from
                hover to cruise. They connect the access of vertical lift with the possibilities of wing-borne
                flight.
              </p>
              <p>
                The complete aircraft has to manage that transition. Rotor aerodynamics, wing lift, control
                allocation and power demand belong in the same design conversation.
              </p>
            </div>
          </div>
          <div className="c-detail-grid">
            <div>
              <span className="c-eyebrow">01 / Access</span>
              <h3>Beyond the runway</h3>
              <p>
                Vertical takeoff creates possibilities for different landing sites. Ground access, obstacles
                and the site environment still define the mission.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">02 / Transition</span>
              <h3>A coordinated change</h3>
              <p>
                Thrust direction changes while wing lift develops. The flight envelope must account for the
                interaction between systems.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">03 / Mission</span>
              <h3>The complete journey</h3>
              <p>
                Payload, reserves, alternates and landing conditions give a speed or range target its meaning.
              </p>
            </div>
          </div>
        </section>
        <section className="c-tone-sage c-section" id="transition">
          <div className="c-container">
            <FlightSectionHeading
              eyebrow="02 / Explore the configuration"
              title={
                <>
                  From vertical.
                  <br />
                  <em>To forward.</em>
                </>
              }
              description="Select a flight mode or inspect the propulsion angle. This schematic explains the architecture; it does not simulate flight dynamics."
            />
            <TransitionLab />
          </div>
        </section>
        <section className="c-container c-section" id="architectures">
          <FlightSectionHeading
            eyebrow="03 / Architectures in perspective"
            title={
              <>
                Different systems.
                <br />
                <em>A common question.</em>
              </>
            }
            description="Bell aircraft illustrate open-rotor technology. Celestium’s Taraka X-1 studies a separate twin-duct configuration. HSVTOL explores another propulsion transition."
          />
          <div className="c-route-grid">
            <FlightCard
              href="/journal/the-tiltrotor-perspective"
              image="/media/bell/valor-flight.webp"
              eyebrow="Bell / Technology reference"
              title="Open-rotor tiltrotor"
              description="Explore the design perspective behind rotating proprotors and wing-borne cruise."
            />
            <FlightCard
              href="/aircraft"
              image="/images/taraka-coastal-flight-v2.webp"
              eyebrow="Celestium / Aircraft concept"
              title="Taraka X-1"
              description="Twin tilting ducts and hydrogen-electric power for a dedicated medical design case."
              bell={false}
            />
            <FlightCard
              href="/innovation/hsvtol"
              image="/media/bell/hsvtol-formation.webp"
              eyebrow="Bell / Concept reference"
              title="High-speed VTOL"
              description="A folding-rotor concept with a different approach to the cruise propulsion path."
            />
          </div>
        </section>
        <section className="c-tone-dark c-section">
          <div className="c-container c-content-grid">
            <h2>
              The question is
              <br />
              <em>what comes next.</em>
            </h2>
            <div className="c-copy">
              <p style={{ color: "#d6e0d7" }}>
                Our next research work connects geometry, mass and flight control.
              </p>
              <p style={{ color: "#a8baad" }}>
                The Taraka X-1 studio illustrates the configuration and analytic airflow. Validated transition
                dynamics, integrated sizing and the operating envelope remain engineering work.
              </p>
              <Link href="/research" className="c-button c-button-light">
                Inspect the design basis ↗
              </Link>
            </div>
          </div>
        </section>
        <section className="c-container c-section" id="questions">
          <FlightSectionHeading eyebrow="04 / A closer look" title="Your questions. A clear perspective." />
          <FlightFAQ
            items={[
              {
                question: "How does a tiltrotor transition between flight modes?",
                answer:
                  "The proprotor thrust direction changes from predominantly vertical toward forward thrust while wing lift grows with airspeed. The specific sequence depends on the aircraft architecture and validated control envelope.",
              },
              {
                question: "Is Taraka X-1 the same aircraft as the Bell references?",
                answer:
                  "No. Bell aircraft belong to Bell and appear as credited technology references. Taraka X-1 is Celestium’s separate hydrogen-electric twin-duct research concept under MALUS.",
              },
              {
                question: "What can the interactive model demonstrate?",
                answer:
                  "The schematic shows propulsion orientation and the conceptual roles of rotor thrust and wing lift. It does not establish a transition schedule, aerodynamic performance or safe operating procedure.",
              },
              {
                question: "Why compare different architectures?",
                answer:
                  "Comparing open rotors, tilting ducts and folding-rotor concepts makes the design choices easier to understand. Each has different propulsion, structural, control and mission constraints.",
              },
            ]}
          />
        </section>
        <FlightCTA />
      </article>
    </Chrome>
  );
}
