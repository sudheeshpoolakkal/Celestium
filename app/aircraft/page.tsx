import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import {
  ActionLink,
  DesignTargets,
  Figure,
  ProgramBrief,
  RelatedPages,
  SectionLabel,
} from "@/components/editorial";
import { AircraftExplorer, RevealEffects } from "@/components/landing-interactions";
import { FlightHero } from "@/components/flight-editorial";
import { DESIGN } from "@/lib/spec";
import { AircraftSectionNavigation } from "@/components/section-navigation";

export const metadata: Metadata = {
  title: "Taraka X-1 — The first MALUS aircraft",
  description:
    "Introducing Taraka X-1, the first aircraft concept under MALUS: twin tilting ducts, a hydrogen-electric powertrain and a dedicated medical cabin.",
};

export default function AircraftPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site aircraft-product editorial-page">
        <FlightHero
          eyebrow="Aircraft / Taraka X-1"
          title={<>Taraka X-1.<br />Created for care.</>}
          description="Hydrogen-electric propulsion. Twin tilting ducts. A dedicated medical cabin. The first aircraft concept under the MALUS research program."
          image="/images/taraka-coastal-flight-v2.webp"
          alt="Celestium Taraka X-1 twin-duct aircraft concept above a tropical coastline"
          href="#explore"
          action="Explore aircraft & airflow"
          bell={false}
        />
        <AircraftSectionNavigation />

        <section className="editorial-section container" id="overview">
          <SectionLabel number="01" detail="MALUS / First aircraft concept">
            Designed for useful flight
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              Vertical lift.
              <br />
              <span>Regional ambition.</span>
            </h2>
            <div>
              <p className="body-large">The medical-ambulance mission defines Taraka X-1.</p>
              <p>
                Two tilting ducts provide lift for vertical takeoff and landing, then turn forward for cruise.
                A hydrogen-electric system supplies the energy. The cabin is organised around the patient,
                clinical team and medical equipment.
              </p>
              <p>
                Patient access, clinical seating, equipment integration and ground loading inform the aircraft
                from the start. Cargo and research installations belong to the wider program’s architecture
                studies.
              </p>
            </div>
          </div>
          <div className="product-target-band">
            <DesignTargets />
          </div>
          <div className="principle-grid" data-reveal>
            <div>
              <span>01 / Propulsion</span>
              <h3>Two ducts. One flight envelope.</h3>
              <p>Shrouded propulsion units tilt between vertical lift and forward thrust.</p>
            </div>
            <div>
              <span>02 / Energy</span>
              <h3>A shared electrical system.</h3>
              <p>A fuel cell supplies sustained cruise power; a battery supports peak demand.</p>
            </div>
            <div>
              <span>03 / Mission</span>
              <h3>A cabin with a clear purpose.</h3>
              <p>A dedicated medical installation accommodates one patient and the clinical team.</p>
            </div>
          </div>
        </section>

        <section className="editorial-section section-sage" id="explore">
          <div className="container">
            <SectionLabel number="02" detail="Interactive / Research geometry">
              A configuration that changes in flight
            </SectionLabel>
            <div className="section-intro-grid" data-reveal>
              <h2>
                From vertical.
                <br />
                <span>To forward.</span>
              </h2>
              <div>
                <p>
                  Select a flight mode to explore the duct positions in the interactive aircraft model. Drag
                  to orbit once the 3D view is loaded.
                </p>
                <p className="small-note">
                  The model presents a research configuration. The transition sequence illustrates the
                  concept; it does not simulate validated aircraft flight dynamics.
                </p>
              </div>
            </div>
            <AircraftExplorer />
            <div className="section-bottom-link">
              <span>
                The full studio includes mission modules, subsystem views and an analytic flow illustration.
              </span>
              <ActionLink href="/aircraft/studio">Open the aircraft studio</ActionLink>
            </div>
          </div>
        </section>

        <section className="editorial-section container" id="mission-bay">
          <SectionLabel number="03" detail="Patient / Clinical team / Medical equipment">
            The mission at the centre
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              Space for
              <br />
              <span>what matters.</span>
            </h2>
            <div>
              <p className="body-large">
                The mid-fuselage is a mission bay, designed within a common structural and systems framework.
              </p>
              <p>
                The medical concept combines a patient litter, clinical seating and equipment. Side access and
                an aft loading ramp inform the cabin arrangement, with the lift system positioned at the
                aircraft’s shoulders.
              </p>
              <ActionLink href="/mission">The first mission</ActionLink>
            </div>
          </div>
          <Figure
            src="/images/taraka-dawn-v2.webp"
            alt="Side access, cabin window and aft loading ramp of the Taraka X-1 aircraft concept"
            caption="Common aircraft platform / Accessible mission bay"
          />
          <div className="editorial-columns" data-reveal>
            <div>
              <h3>Common platform</h3>
              <p>
                Lift, energy and flight control form the baseline. The design intent is to retain those
                systems while changing the cabin installation.
              </p>
            </div>
            <div>
              <h3>Defined interfaces</h3>
              <p>
                Structural attachment, electrical services, mass properties and loading access must be
                specified and validated for every mission module.
              </p>
            </div>
          </div>
        </section>

        <section className="editorial-section section-sage" id="specifications">
          <div className="container">
            <SectionLabel number="04" detail="Twin-duct architecture study">
              The current design basis
            </SectionLabel>
            <div className="section-intro-grid">
              <h2>
                A research point.
                <br />
                <span>A basis for the next work.</span>
              </h2>
              <div>
                <p>
                  The figures below describe the nominal twin-duct study. They are preliminary engineering
                  inputs, rather than measured aircraft performance.
                </p>
                <p>
                  The original mass convergence omitted the hydrogen tank vessel. The corrected configuration
                  requires a new integrated sizing run.
                </p>
                <ActionLink href="/research#design-basis">Review the assumptions</ActionLink>
              </div>
            </div>
            <div className="specification-grid">
              <div>
                <h3>Configuration</h3>
                <dl>
                  <div>
                    <dt>Propulsion</dt>
                    <dd>Twin tilting ducts</dd>
                  </div>
                  <div>
                    <dt>Duct diameter</dt>
                    <dd>{DESIGN.ducts}</dd>
                  </div>
                  <div>
                    <dt>Total disk area</dt>
                    <dd>{DESIGN.diskArea}</dd>
                  </div>
                  <div>
                    <dt>Energy architecture</dt>
                    <dd>Hydrogen-electric hybrid</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3>Nominal study point</h3>
                <dl>
                  <div>
                    <dt>Takeoff mass¹</dt>
                    <dd>{DESIGN.mtow}</dd>
                  </div>
                  <div>
                    <dt>Mission load target²</dt>
                    <dd>{DESIGN.payload}</dd>
                  </div>
                  <div>
                    <dt>Hover power</dt>
                    <dd>{DESIGN.hoverPower}</dd>
                  </div>
                  <div>
                    <dt>Cruise power</dt>
                    <dd>{DESIGN.cruisePower}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <p className="data-note">
              ¹ Original nominal point before tank-vessel correction; conservative study mass approximately{" "}
              {DESIGN.conservativeMtow}. ² The medical mission load includes the pilot, clinical team, patient
              and equipment. All performance targets remain subject to validation.
            </p>
          </div>
        </section>
        <RelatedPages current="/aircraft" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
