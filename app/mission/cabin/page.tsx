import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { ActionLink, Figure, ProgramBrief, SectionLabel } from "@/components/editorial";
import { MissionHero, MedicalMissionPages } from "@/components/medical-mission";
import { CabinDiagram } from "@/components/system-diagrams";
import { RevealEffects } from "@/components/landing-interactions";
import { CREW, DESIGN } from "@/lib/spec";

export const metadata: Metadata = {
  title: "The medical cabin — Taraka X-1",
  description:
    "Inside the Taraka X-1 medical air-ambulance concept: one patient litter, three clinical seats, medical equipment and a cabin developed around access and care.",
};

export default function MedicalCabinPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page medical-detail-page">
        <MissionHero
          current="/mission/cabin"
          chapter="The medical cabin"
          image="/images/taraka-dawn-v2.webp"
          alt="Taraka X-1 concept with open medical-cabin access and aft loading ramp"
          title={
            <>
              The patient.
              <br />
              <span>At the centre.</span>
            </>
          }
          description="A medical ambulance starts with the people on board. Taraka X-1’s cabin concept brings the patient, clinical team and equipment into one dedicated medical installation."
          action={<ActionLink href="#cabin-layout">Explore the cabin concept</ActionLink>}
        />
        <section className="editorial-section container" id="cabin-layout">
          <SectionLabel number="01" detail="Patient / Clinical team / Equipment">
            A cabin organised around care
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              One patient.
              <br />
              <span>A complete team.</span>
            </h2>
            <div>
              <p className="body-large">
                One patient litter, three clinical seats and a critical-care console define the medical
                interior.
              </p>
              <p>
                The cockpit is separate from the medical mission bay. Side access and an aft ramp inform the
                loading arrangement, while equipment retention and occupant provisions shape the installation.
              </p>
            </div>
          </div>
          <Figure
            src="/images/medical-cabin-cutaway-v1.webp"
            alt="Illustrative cabin cutaway with a separate pilot cockpit, one patient litter, three clinical seats, medical equipment and an aft loading ramp"
            caption="Medical interior / Illustrative cutaway study"
            detail="Concept artwork / Layout to be developed"
            width={1672}
            height={941}
            className="medical-interior-figure"
          />
          <div className="medical-cabin-stage">
            <CabinDiagram />
          </div>
          <p className="data-note">
            Conceptual arrangement. This schematic does not define cabin dimensions, a released restraint
            system or a validated clinical workspace.
          </p>
        </section>
        <section className="editorial-section section-sage">
          <div className="container">
            <SectionLabel number="02" detail="The requirements behind the layout">
              Care is an integration problem
            </SectionLabel>
            <div className="section-intro-grid">
              <h2>
                Every space.
                <br />
                <span>Every connection.</span>
              </h2>
              <div>
                <p>
                  The cabin has to work with the aircraft’s structure, electrical supply, loading access and
                  mass limits. These interfaces belong in the design from the beginning.
                </p>
              </div>
            </div>
            <div className="medical-requirements-grid">
              <div>
                <span>01 / Access</span>
                <h3>From ground to cabin.</h3>
                <p>
                  Develop the patient-loading envelope, ramp and side-door clearances, together with a defined
                  ground-transfer arrangement.
                </p>
              </div>
              <div>
                <span>02 / Occupants</span>
                <h3>Space for the team.</h3>
                <p>
                  Resolve clinical seat placement, reach, visibility, restraints and the interaction between
                  the team and the patient litter.
                </p>
              </div>
              <div>
                <span>03 / Equipment</span>
                <h3>A retained installation.</h3>
                <p>
                  Define equipment attachments, storage, electrical demand and services within the aircraft’s
                  mass and energy budgets.
                </p>
              </div>
              <div>
                <span>04 / Interior</span>
                <h3>A complete cabin system.</h3>
                <p>
                  Develop materials, environmental provisions, inspection access and equipment interfaces as
                  part of the medical installation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="editorial-section container" id="medical-load">
          <SectionLabel number="03" detail="Twin-duct study / Preliminary allocation">
            The people and equipment on board
          </SectionLabel>
          <div className="mission-load-grid">
            <div>
              <h2>
                600<span>kg</span>
              </h2>
              <p className="body-large">
                The target mission load includes the pilot, medical team, patient and equipment.
              </p>
              <p>
                The allocation is part of the nominal research case. It is not spare cargo capacity in
                addition to the occupants.
              </p>
              <ActionLink href="/research#design-basis">Read the mass-basis notes</ActionLink>
            </div>
            <div>
              <table className="data-table">
                <caption className="sr-only">Medical mission mass allocation</caption>
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
                Reported preliminary allocation. The nominal aircraft mass requires integrated re-sizing with
                the hydrogen vessel and associated systems included.
              </p>
            </div>
          </div>
        </section>
        <section className="medical-statement section-graphite">
          <div className="container">
            <p className="kicker">Taraka X-1 / Dedicated medical mission</p>
            <h2>
              The cabin is part
              <br />
              of the aircraft’s purpose.
            </h2>
            <p>
              It is the reason for the mission, the basis of the load allocation and a central part of the
              engineering work.
            </p>
            <ActionLink href="/aircraft/studio" solid>
              Explore the medical configuration in 3D
            </ActionLink>
          </div>
        </section>
        <MedicalMissionPages current="/mission/cabin" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
