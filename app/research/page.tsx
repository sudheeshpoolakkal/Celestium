import type { Metadata } from "next";
import { Chrome } from "@/components/chrome";
import { FlightHero } from "@/components/flight-editorial";
import { ActionLink, ProgramBrief, RelatedPages, SectionLabel } from "@/components/editorial";
import { RevealEffects } from "@/components/landing-interactions";
import { ResearchTrade } from "@/components/research-trade";
import { Download } from "@/components/icons";
import { DESIGN } from "@/lib/spec";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research & design basis",
  description:
    "The Taraka X-1 research basis: the twin-duct study, preliminary sizing, duct-diameter trade, open engineering questions and downloadable program resources.",
};

const WORK = [
  {
    number: "01",
    title: "Close the mass budget",
    text: "Carry the hydrogen vessel, insulation, plumbing and cooling through a new integrated sizing run. Reconcile empty mass, hover power and range rather than adding the vessel after convergence.",
  },
  {
    number: "02",
    title: "Validate structures & containment",
    text: "Replace the optimistic structural fraction with a credible load and mass model, including duct containment, tilt mechanisms, landing loads and crashworthy occupant provisions.",
  },
  {
    number: "03",
    title: "Establish the conversion envelope",
    text: "Study aerodynamic interactions, control authority and fault response through hover and transition. Resolve the empennage configuration against those requirements.",
  },
  {
    number: "04",
    title: "Integrate energy & thermal systems",
    text: "Define usable fuel, reserves, battery duty cycle, cooling and hydrogen-system provisions. Establish a mission energy budget under the intended environmental conditions.",
  },
  {
    number: "05",
    title: "Measure acoustics & ground effects",
    text: "Test the duct and liner concepts, quantify ground interaction and define practical operating limits. The noise target and ground-operation assumptions are unverified.",
  },
  {
    number: "06",
    title: "Define the mission interface",
    text: "Specify attachments, equipment services, occupant restraints and module mass limits. Validate the cabin and loading arrangement against the medical design case.",
  },
];

export default function ResearchPage() {
  return (
    <Chrome tone="overlay">
      <RevealEffects />
      <article className="c-site editorial-page research-page">
        <FlightHero
          eyebrow="Innovation / Research & development"
          title={
            <>
              A clear ambition.
              <br />
              An open design basis.
            </>
          }
          description="The aircraft concept, the assumptions and the work ahead. Explore the Taraka X-1 research design point, open mass questions and validation priorities."
          image="/images/taraka-hangar-v1.webp"
          alt="Taraka X-1 aircraft concept in a hangar"
          href="#design-basis"
          action="Review the design basis"
          bell={false}
        />
        <section className="editorial-section container section-first" id="design-basis">
          <SectionLabel number="01" detail="September 2026 / Twin-duct study">
            The configuration behind the figures
          </SectionLabel>
          <div className="section-intro-grid">
            <h2>
              One named study.
              <br />
              <span>Explicit assumptions.</span>
            </h2>
            <div>
              <p>
                The public presentation uses the twin 2.80 m duct medical configuration described in the
                project’s twin-duct architecture study.
              </p>
              <p>
                The repository also contains other configurations and sizing runs. Their results are not
                combined into this design point. A consistent integrated baseline is still required.
              </p>
            </div>
          </div>
          <div className="basis-status">
            <span>Current stage</span>
            <strong>Concept development</strong>
            <p>Architecture selection, preliminary sizing and exploratory geometry.</p>
          </div>
          <table className="data-table basis-table">
            <caption className="sr-only">Preliminary design basis for the twin 2.80 metre duct study</caption>
            <thead>
              <tr>
                <th scope="col">Study parameter</th>
                <th scope="col">Nominal point</th>
                <th scope="col">How to read it</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Takeoff mass</th>
                <td>{DESIGN.mtow}</td>
                <td>Original convergence; hydrogen vessel omitted.</td>
              </tr>
              <tr>
                <th scope="row">Conservative study mass</th>
                <td>≈ {DESIGN.conservativeMtow}</td>
                <td>Sensitivity estimate with a higher structural fraction.</td>
              </tr>
              <tr>
                <th scope="row">Operational empty mass</th>
                <td>{DESIGN.owe}</td>
                <td>Original nominal sizing result.</td>
              </tr>
              <tr>
                <th scope="row">Mission load</th>
                <td>{DESIGN.payload}</td>
                <td>Target allocation including pilot and medical team.</td>
              </tr>
              <tr>
                <th scope="row">Total disk area</th>
                <td>{DESIGN.diskArea}</td>
                <td>Two ducts of 2.80 m diameter.</td>
              </tr>
              <tr>
                <th scope="row">Disk loading</th>
                <td>{DESIGN.diskLoading}</td>
                <td>Recomputed from nominal mass and total disk area.</td>
              </tr>
              <tr>
                <th scope="row">Hover / cruise power</th>
                <td>495 / 235 kW</td>
                <td>Original model outputs, pending integrated re-sizing.</td>
              </tr>
              <tr>
                <th scope="row">Cruise speed / range</th>
                <td>450 km/h / 1,500 km</td>
                <td>Research targets, not demonstrated performance.</td>
              </tr>
              <tr>
                <th scope="row">Sideline noise</th>
                <td>Below 58 dBA at 100 m</td>
                <td>Acoustic objective; no aircraft measurement.</td>
              </tr>
            </tbody>
          </table>
          <p className="data-note">
            Source: “Taraka X-1 — Twin Tilting Ducted Fan Air Ambulance Architecture,” September 2026. The
            approximately 68 kg vessel estimate assumes 38% tank gravimetric efficiency. A 30% assumption
            would increase that estimate to approximately 98 kg.
          </p>
        </section>
        <section className="editorial-section section-sage" id="diameter-trade">
          <div className="container">
            <SectionLabel number="02" detail="Exploratory sizing / Five study points">
              The duct-diameter trade
            </SectionLabel>
            <div className="section-intro-grid" data-reveal>
              <h2>
                Every advantage
                <br />
                <span>has a trade.</span>
              </h2>
              <div>
                <p>
                  The reported diameter study explores a central compromise: disk area and hover demand versus
                  aircraft footprint.
                </p>
                <p>
                  Select a diameter below to inspect its nominal study values. The 2.80 m configuration is the
                  public design point.
                </p>
              </div>
            </div>
            <ResearchTrade />
          </div>
        </section>
        <section className="editorial-section container" id="open-work">
          <SectionLabel number="03" detail="The next engineering work">
            Questions that move the program forward
          </SectionLabel>
          <div className="section-intro-grid" data-reveal>
            <h2>
              The work ahead
              <br />
              <span>is well defined.</span>
            </h2>
            <div>
              <p>
                Targets only become credible through a connected engineering model, component evidence and
                test results. The current priorities are the gaps between the concept and that evidence.
              </p>
            </div>
          </div>
          <div className="research-work-list">
            {WORK.map((item) => (
              <div key={item.number} data-reveal>
                <span>{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="editorial-section section-sage" id="resources">
          <div className="container">
            <SectionLabel number="04" detail="Download / Read / Explore">
              Program resources
            </SectionLabel>
            <div className="resource-grid">
              <a href={SITE.brief} download>
                <span>01 / Program overview</span>
                <h3>
                  MALUS & Taraka X-1
                  <br />
                  Program brief <Download />
                </h3>
                <p>The architecture, first aircraft concept, mission and next engineering work.</p>
                <small>PDF · Concept overview</small>
              </a>
              <a href="/resources/taraka-x1-design-basis.md" download>
                <span>02 / Research basis</span>
                <h3>
                  Design basis
                  <br />& open assumptions <Download />
                </h3>
                <p>A readable account of the sizing point, source discrepancies and validation limits.</p>
                <small>Markdown · Technical note</small>
              </a>
              <a href="/resources/taraka-x1-duct-trade.csv" download>
                <span>03 / Study data</span>
                <h3>
                  Duct-diameter
                  <br />
                  trade study <Download />
                </h3>
                <p>The five reported diameter cases, with mass, power and disk-loading values.</p>
                <small>CSV · Preliminary study data</small>
              </a>
            </div>
            <p className="data-note">
              Resources describe the research concept as presented on this website. None are an aircraft
              operating manual, certification document or flight-test report.
            </p>
          </div>
        </section>
        <RelatedPages current="/research" />
        <ProgramBrief dark />
      </article>
    </Chrome>
  );
}
