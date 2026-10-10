import { Chrome } from "./chrome";
import { FlightCTA, FlightHero, FlightResource, FlightSectionHeading } from "./flight-editorial";
import { SITE } from "@/lib/site";
export function ResourcePage({ support = false }: { support?: boolean }) {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <FlightHero
          eyebrow={support ? "Support / Technical resources" : "Aircraft / Product literature"}
          title={
            <>
              Go deeper
              <br />
              into the work.
            </>
          }
          description="The program, the design basis and the research trade. Download the current documents and inspect the assumptions."
          image="/images/taraka-hangar-v1.webp"
          alt="Taraka X-1 aircraft concept in a hangar"
          bell={false}
          href="#documents"
          action="Explore the documents"
          compact
        />
        <section className="c-container c-section" id="documents">
          <FlightSectionHeading
            eyebrow="MALUS / Taraka X-1"
            title={
              <>
                A reviewable
                <br />
                <em>research foundation.</em>
              </>
            }
            description="These files describe the concept-development study. They do not constitute flight manuals, operating procedures or certification data."
          />
          <div className="c-resource-list">
            <FlightResource
              href={SITE.brief}
              title="MALUS · Taraka X-1 program brief"
              type="PDF / Six-page program introduction"
            />
            <FlightResource
              href="/resources/taraka-x1-design-basis.md"
              title="Taraka X-1 design basis"
              type="Markdown / Source assumptions & reconciliation"
            />
            <FlightResource
              href="/resources/taraka-x1-duct-trade.csv"
              title="Nominal duct-diameter trade"
              type="CSV / Five study points"
            />
            <FlightResource
              href="/resources/celestium-systems-review.md"
              title="Systems & maintainability review template"
              type="Markdown / Interfaces, evidence & open questions"
            />
            <FlightResource
              href="/resources/celestium-mission-brief-template.md"
              title="Mission research brief template"
              type="Markdown / A starting point for a study"
            />
          </div>
          <div className="c-detail-grid">
            <div>
              <span className="c-eyebrow">01 / Performance</span>
              <h3>Targets, with context</h3>
              <p>
                Cruise speed, design range and mission load are research targets. The documents retain the
                assumptions needed to assess them.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">02 / Mass</span>
              <h3>Cases kept visible</h3>
              <p>
                The nominal and conservative sizing cases remain separate. Unresolved tank-vessel mass and
                integration questions are recorded.
              </p>
            </div>
            <div>
              <span className="c-eyebrow">03 / Modelling</span>
              <h3>Tools that explain</h3>
              <p>
                The viewer and airflow field are illustrative tools. Validated CFD, flight dynamics and
                integrated sizing remain separate work.
              </p>
            </div>
          </div>
        </section>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
