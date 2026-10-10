import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightHero } from "@/components/flight-editorial";
import {
  ActionLink,
  Figure,
  ProgramBrief,
  RelatedPages,
  SectionLabel,
} from "@/components/editorial";
import { ModuleExplorer, RevealEffects } from "@/components/landing-interactions";
import { ArchitectureMap } from "@/components/system-diagrams";

export const metadata: Metadata = {
  title: "Modular Aerial Lift Utility System",
  description:
    "MALUS, the Modular Aerial Lift Utility System, is the research program under which electric and hybrid VTOL aircraft are developed. Taraka X-1 is its first aircraft, created for medical ambulance transport.",
};

const INTERFACES = [
  {
    number: "01",
    title: "Structure & mass properties",
    text: "A defined attachment system and load path, with allowable mass and centre-of-gravity limits for each installation.",
  },
  {
    number: "02",
    title: "Power & services",
    text: "An electrical and services interface for mission equipment, kept within the aircraft’s energy and thermal budgets.",
  },
  {
    number: "03",
    title: "Access & operation",
    text: "A common loading envelope, occupant access and restraint strategy, developed around the needs of each mission.",
  },
];

export default function ProgramPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page architecture-page">
        <FlightHero eyebrow="Aircraft / The MALUS research program" title={<>Modular Aerial<br />Lift Utility System.</>} description="A research program for electric and hybrid vertical flight. Taraka X-1 is its first aircraft concept, created for medical ambulance transport." image="/images/taraka-dawn-v2.webp" alt="Taraka X-1 aircraft concept on a coastal apron at dawn" href="#architecture-system" action="Explore the architecture" bell={false}/>
        <section className="architecture-diagram-section container" id="architecture-system">
          <ArchitectureMap />
          <p className="data-note">
            Architecture intent. Interchangeability, module interfaces and operational procedures remain to be
            engineered and validated.
          </p>
        </section>
        <section className="editorial-section container">
          <SectionLabel number="01" detail="Lift / Energy / Flight control">
            The engineering behind the program
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              A program for vertical flight.
              <br />
              <span>A coherent aircraft.</span>
            </h2>
            <div>
              <p className="body-large">
                Electric and hybrid vertical-takeoff-and-landing aircraft, developed under one research
                program.
              </p>
              <p>
                The propulsion, energy and flight-control systems form a common foundation. The central
                mission bay accommodates the installation appropriate to the task.
              </p>
              <p>
                Taraka X-1 is the first aircraft concept under MALUS. Its twin-duct configuration is developed
                for civilian medical ambulance transport.
              </p>
              <ActionLink href="/aircraft">Meet Taraka X-1</ActionLink>
            </div>
          </div>
          <Figure
            src="/images/taraka-dawn-v2.webp"
            alt="Taraka X-1 concept showing the common fuselage, twin ducts and mission cabin"
            caption="Taraka X-1 / First application of the MALUS architecture"
          />
        </section>
        <section className="editorial-section section-sage" id="modules">
          <div className="container">
            <SectionLabel number="02" detail="Medical / Cargo / Research">
              Modular architecture studies
            </SectionLabel>
            <div className="section-intro-grid" data-reveal>
              <h2>
                Designed around
                <br />
                <span>the task at hand.</span>
              </h2>
              <div>
                <p>
                  The wider architecture work explores how aircraft systems and mission installations can be
                  organised around a defined interface.
                </p>
                <p>
                  Taraka X-1’s purpose is medical ambulance transport. Cargo and flight-research installations
                  are program-level architecture studies; they do not change X-1’s primary mission.
                </p>
              </div>
            </div>
            <ModuleExplorer />
          </div>
        </section>
        <section className="editorial-section container" id="interfaces">
          <SectionLabel number="03" detail="Engineering / Integration">
            The interface makes the architecture
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              Flexibility requires
              <br />
              <span>clear boundaries.</span>
            </h2>
            <div>
              <p>
                Replacing an interior is only one part of the design. Every module must meet a common set of
                structural, electrical and operational requirements.
              </p>
              <p>Those requirements are a central part of the next engineering work.</p>
            </div>
          </div>
          <div className="principle-grid" data-reveal>
            {INTERFACES.map((item) => (
              <div key={item.number}>
                <span>{item.number} / Mission interface</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="editorial-section section-sage">
          <div className="container">
            <SectionLabel number="04" detail="Configuration rationale">
              Why the twin duct
            </SectionLabel>
            <div className="section-intro-grid">
              <h2>
                A configuration
                <br />
                <span>shaped by the mission.</span>
              </h2>
              <div>
                <p>
                  The project’s architecture study carried the twin tilting duct forward for its central cabin
                  arrangement, shrouded propulsion and two tilt stations.
                </p>
                <p>
                  Each choice has a cost. The ducts add structural mass and aerodynamic drag, while the
                  transition and failure cases require integrated control work.
                </p>
                <ActionLink href="/research">Read the design basis</ActionLink>
              </div>
            </div>
            <div className="architecture-rationale">
              <div>
                <h3>Cabin arrangement</h3>
                <p>Positioning the ducts beside the fuselage preserves a central space for the mission.</p>
              </div>
              <div>
                <h3>Shrouded propulsion</h3>
                <p>
                  The duct offers an acoustic design opportunity. Noise and ground-flow effects still require
                  measurement.
                </p>
              </div>
              <div>
                <h3>Two tilt stations</h3>
                <p>
                  The configuration concentrates conversion into two units, with demanding containment and
                  fault-tolerance requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
        <RelatedPages current="/program" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
