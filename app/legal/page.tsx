import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
export const metadata: Metadata = {
  title: "Site information",
  description:
    "Information about Celestium’s concept-development website, research targets, reference imagery and local enquiry preparation.",
};
export default function LegalPage() {
  return (
    <Chrome>
      <article className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Site information</p>
          <h1>
            A clear
            <br />
            research context.
          </h1>
          <p>
            This website presents a concept-development initiative. The following notes explain how its
            research content and reference media should be understood.
          </p>
        </header>
        <div className="c-container c-article-body c-information-body">
          <section>
            <h2>Concepts and research targets</h2>
            <p>
              Taraka X-1 is an aircraft concept under the MALUS research program. The website does not claim a
              manufactured, flight-tested, certified or commercially available Celestium aircraft. Published
              performance figures are research targets and design points, with assumptions recorded in the
              research material.
            </p>
          </section>
          <section>
            <h2>Explanatory models</h2>
            <p>
              The interactive studio, transition schematics and airflow illustrations explain geometry and
              system ideas. They are not flight simulators, validated CFD, maintenance data, clinical guidance
              or operational procedures.
            </p>
          </section>
          <section>
            <h2>Reference imagery</h2>
            <p>
              Bell aircraft imagery and animations are credited technology references. They do not represent
              Celestium aircraft, partnerships or endorsement. Copyright remains with the source owners;
              source availability does not establish a reuse licence.
            </p>
            <Link className="c-text-link" href="/media-credits">
              Inspect media credits ↗
            </Link>
          </section>
          <section>
            <h2>Enquiry preparation</h2>
            <p>
              The enquiry builder prepares a local file for review and download. It does not send messages,
              establish an employment application, create a supplier contract or form a research agreement.
            </p>
          </section>
          <section>
            <h2>Research resources</h2>
            <p>
              The public design-basis note records the current assumptions, separate mass cases and unresolved
              engineering work. Consult that context when reviewing a number or illustration.
            </p>
            <Link className="c-text-link" href="/research">
              Explore the design basis ↗
            </Link>
          </section>
          <Link href="/legal/privacy" className="c-text-link">
            Read privacy information ↗
          </Link>
        </div>
      </article>
    </Chrome>
  );
}
