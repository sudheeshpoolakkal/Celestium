import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { ActionLink, ProgramBrief, SectionLabel } from "@/components/editorial";
import { MissionHero, MedicalMissionPages, MissionJourneyDiagram } from "@/components/medical-mission";
import { RevealEffects } from "@/components/landing-interactions";
import { CORRIDORS } from "@/lib/spec";

export const metadata: Metadata = {
  title: "The air-ambulance mission sequence — Taraka X-1",
  description:
    "The Taraka X-1 medical mission concept, from transfer requirements and ground loading to regional flight and receiving handover. A research design sequence, not an operating procedure.",
};
const STAGES = [
  {
    n: "01",
    title: "Define the transfer.",
    subtitle: "Mission requirements",
    text: "The patient transfer, clinical team and equipment define the aircraft’s mission case. The research must connect those requirements with payload, range, reserve energy and the intended ground interfaces.",
    needs: [
      "People and equipment allocation",
      "Origin and destination interfaces",
      "Mission energy and reserve assumptions",
    ],
  },
  {
    n: "02",
    title: "Bring the mission on board.",
    subtitle: "Ground integration",
    text: "The loading arrangement connects the medical cabin with the ground transfer. Patient access, crew movement, equipment retention and the aircraft’s propulsion environment need a coordinated design.",
    needs: [
      "Patient-loading and access envelope",
      "Medical installation and restraint definition",
      "Ground-clearance and duct-flow validation",
    ],
  },
  {
    n: "03",
    title: "Connect the region.",
    subtitle: "Aircraft configuration",
    text: "The concept uses vertical lift, transition and forward flight to connect the medical mission with a regional destination. Each phase must be carried through the aircraft’s control, power and energy model.",
    needs: [
      "Hover and conversion control authority",
      "Cruise and usable-energy model",
      "Environmental and fault-response cases",
    ],
  },
  {
    n: "04",
    title: "Complete the handover.",
    subtitle: "Receiving interface",
    text: "The design case continues through arrival, unloading and transfer to the receiving team. The aircraft cabin and ground interfaces need to support that complete sequence.",
    needs: [
      "Destination loading and access compatibility",
      "Equipment and occupant transfer arrangement",
      "Defined coordination and validation requirements",
    ],
  },
] as const;

export default function MedicalOperationsPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page medical-detail-page">
        <MissionHero
          current="/mission/operations"
          chapter="The mission sequence"
          image="/images/taraka-coastal-flight-v2.webp"
          alt="Illustrative Taraka X-1 aircraft concept over a tropical coastal landscape"
          title={
            <>
              From handover.
              <br />
              <span>To handover.</span>
            </>
          }
          description="The air-ambulance mission extends beyond the flight. Taraka X-1’s research considers the patient transfer, ground interfaces, regional journey and receiving handover as one connected design case."
          action={<ActionLink href="#mission-sequence">Follow the concept mission</ActionLink>}
        />
        <section className="editorial-section container" id="mission-sequence">
          <SectionLabel number="01" detail="Requirements / Ground transfer / Flight / Handover">
            The complete journey informs the aircraft
          </SectionLabel>
          <div className="section-intro-grid">
            <h2>
              A flight is one part
              <br />
              <span>of the mission.</span>
            </h2>
            <div>
              <p>
                This sequence explains the intended design case. Aircraft limits, procedures, dispatch
                conditions and ground arrangements have to be established through the research and validation
                work.
              </p>
              <p className="small-note">
                Concept mission sequence. No available ambulance service, flight plan, clinical response time
                or approved operating procedure is implied.
              </p>
            </div>
          </div>
          <MissionJourneyDiagram />
        </section>
        <section className="editorial-section section-sage">
          <div className="container">
            <SectionLabel number="02" detail="A mission-led engineering brief">
              Four connected design stages
            </SectionLabel>
            <div className="medical-sequence-list">
              {STAGES.map((stage) => (
                <div key={stage.n} data-reveal>
                  <span>{stage.n}</span>
                  <div>
                    <p className="kicker">{stage.subtitle}</p>
                    <h2>{stage.title}</h2>
                    <p>{stage.text}</p>
                  </div>
                  <ul aria-label={`${stage.subtitle} research requirements`}>
                    {stage.needs.map((need) => (
                      <li key={need}>{need}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="editorial-section container" id="regional-connections">
          <SectionLabel number="03" detail="India / Illustrative distances from the study">
            A regional medical transport design case
          </SectionLabel>
          <div className="section-intro-grid">
            <h2>
              Regional reach.
              <br />
              <span>Defined by the mission.</span>
            </h2>
            <div>
              <p>
                The project studies intercity distances as examples for medical transport. They inform the
                research context; they are not routes offered by an operator.
              </p>
              <p>
                The 450 km/h cruise speed and 1,500 km range remain research targets. Integrated sizing,
                reserves, infrastructure and the operating envelope still need validation.
              </p>
            </div>
          </div>
          <div className="corridor-rows">
            {CORRIDORS.map((route, i) => (
              <div key={`${route.from}-${route.to}`}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>
                  {route.from}
                  <span aria-hidden="true">—</span>
                  {route.to}
                </h3>
                <p>
                  {route.km}
                  <span>Approximate study distance</span>
                </p>
              </div>
            ))}
          </div>
          <p className="data-note">
            Approximate examples carried from the project study. No clinical response-time estimate or actual
            flight routing is derived from them.
          </p>
        </section>
        <section className="medical-statement section-graphite">
          <div className="container">
            <p className="kicker">The engineering work ahead</p>
            <h2>
              A mission becomes credible
              <br />
              through evidence.
            </h2>
            <p>
              Mass and energy closure, transition control, cabin integration and ground-flow validation
              connect the design ambition with a credible aircraft.
            </p>
            <ActionLink href="/research" solid>
              Explore the research basis
            </ActionLink>
          </div>
        </section>
        <MedicalMissionPages current="/mission/operations" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
