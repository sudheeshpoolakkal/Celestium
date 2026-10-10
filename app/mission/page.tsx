import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { ActionLink, Figure, ProgramBrief, RelatedPages, SectionLabel } from "@/components/editorial";
import { RevealEffects } from "@/components/landing-interactions";
import { CabinDiagram } from "@/components/system-diagrams";
import { CORRIDORS, CREW, DESIGN } from "@/lib/spec";
import { MissionHero, MedicalMissionPages } from "@/components/medical-mission";

export const metadata: Metadata = {
  title: "The medical air-ambulance mission — Taraka X-1",
  description:
    "Taraka X-1 was created for medical ambulance transport. Explore its dedicated medical mission, patient-focused cabin and regional transfer design case under the MALUS research program.",
};

export default function MissionPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page mission-page">
        <MissionHero
          current="/mission"
          chapter="The air-ambulance mission"
          image="/images/taraka-medical-dusk-v2.webp"
          title={
            <>
              Designed for
              <br />
              <span>the medical mission.</span>
            </>
          }
          description="Taraka X-1 was created for medical ambulance transport. The first aircraft under MALUS is designed around a patient, a clinical team and the equipment they need to carry."
          action={<ActionLink href="#medical-module">Explore the air-ambulance concept</ActionLink>}
        />
        <section className="medical-purpose container" aria-label="The purpose of Taraka X-1">
          <p className="kicker">An aircraft with a specific purpose</p>
          <h2>
            Medical ambulance.
            <br />
            <span>From the first design decision.</span>
          </h2>
          <p>
            Vertical lift, a regional flight ambition and a dedicated medical cabin are brought together for
            the air-ambulance mission. This purpose defines Taraka X-1 within the Modular Aerial Lift Utility
            System research program.
          </p>
          <div className="medical-mission-facts">
            <div>
              <strong>01</strong>
              <span>Patient litter</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Clinical seats</span>
            </div>
            <div>
              <strong>
                600 <small>kg</small>
              </strong>
              <span>Target mission load, including pilot</span>
            </div>
          </div>
          <Figure
            src="/images/taraka-medical-dusk-v2.webp"
            alt="Illustrative medical team preparing an empty patient litter beside the Taraka X-1 air-ambulance concept"
            caption="Taraka X-1 / Medical ambulance mission"
            className="medical-purpose-figure"
          />
        </section>
        <section className="editorial-section container" id="medical-module">
          <SectionLabel number="01" detail="People / Equipment / Access">
            A cabin organised around care
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              The patient
              <br />
              <span>sets the design case.</span>
            </h2>
            <div>
              <p className="body-large">
                The medical installation is built around one patient litter, three clinical seats and a
                critical-care console.
              </p>
              <p>
                Side access and aft loading inform the concept. Interior clearances, restraints, clinical
                access, equipment power and loading procedures all need to be developed as an integrated cabin
                system.
              </p>
            </div>
          </div>
          <CabinDiagram />
          <div className="editorial-columns" data-reveal>
            <div>
              <h3>Access from the ground</h3>
              <p>
                The concept studies wide side doors and a low loading arrangement. Ground operations must
                account for duct clearance, rotor hazards and downwash before any operational procedure is
                established.
              </p>
            </div>
            <div>
              <h3>Space for the clinical team</h3>
              <p>
                The interior has to support the patient and the people delivering care. Equipment retention,
                seat placement and reach are as important as the cabin’s overall dimensions.
              </p>
            </div>
          </div>
        </section>
        <section className="editorial-section section-sage" id="mission-load">
          <div className="container">
            <SectionLabel number="02" detail="Medical configuration / Preliminary mass allocation">
              The mission load
            </SectionLabel>
            <div className="mission-load-grid">
              <div data-reveal>
                <h2>
                  600<span>kg</span>
                </h2>
                <p className="body-large">
                  A mission load target that includes everyone and everything on board.
                </p>
                <p>
                  The study’s 600 kg allocation includes the pilot. It is not an additional cargo allowance
                  above the crew.
                </p>
                <ActionLink href="/research#design-basis">Review the sizing assumptions</ActionLink>
              </div>
              <div>
                <table className="data-table">
                  <caption className="sr-only">Preliminary medical mission load allocation</caption>
                  <thead>
                    <tr>
                      <th scope="col">On board</th>
                      <th scope="col">Study mass</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CREW.map((row) => (
                      <tr key={row.role}>
                        <th scope="row">{row.role}</th>
                        <td>{row.mass}</td>
                      </tr>
                    ))}
                    <tr className="table-total">
                      <th scope="row">Mission load total</th>
                      <td>{DESIGN.payload}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="data-note">
                  Preliminary mass allocation from the twin-duct medical architecture study. Cabin equipment
                  and occupant provisions require detailed definition.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="editorial-section container" id="regional-mission">
          <SectionLabel number="03" detail="Indian regional transport / Illustrative design cases">
            The regional connection
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              Connecting the mission
              <br />
              <span>to a wider region.</span>
            </h2>
            <div>
              <p>
                The project uses intercity distances to explore the reach of a regional medical transport
                concept. These are illustrative sizing cases, rather than planned routes or available
                services.
              </p>
              <p>
                The 1,500 km range and 450 km/h cruise speed are research targets. Dispatch range, reserves,
                weather, infrastructure and approval would determine any eventual operation.
              </p>
            </div>
          </div>
          <div className="corridor-rows">
            {CORRIDORS.map((corridor, i) => (
              <div key={`${corridor.from}-${corridor.to}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  {corridor.from}
                  <span aria-hidden="true">—</span>
                  {corridor.to}
                </h3>
                <p>
                  {corridor.km}
                  <span>Approximate study distance</span>
                </p>
              </div>
            ))}
          </div>
          <p className="data-note">
            Distances are approximate examples carried from the project study. They are not flight plans or
            estimates of clinical response time.
          </p>
        </section>
        <section className="medical-statement section-graphite">
          <div className="container">
            <p className="kicker">Taraka X-1 / The mission behind the aircraft</p>
            <h2>
              One aircraft.
              <br />A dedicated medical purpose.
            </h2>
            <p>
              The cabin, the ground transfer and the regional journey form one connected design case. Explore
              the medical installation and the concept mission sequence.
            </p>
            <ActionLink href="/mission/cabin" solid>
              Inside the medical cabin
            </ActionLink>
          </div>
        </section>
        <MedicalMissionPages current="/mission" />
        <RelatedPages current="/mission" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
