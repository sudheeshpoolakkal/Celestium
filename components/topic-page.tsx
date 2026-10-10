import Link from "next/link";
import Image from "next/image";
import { Chrome } from "./chrome";
import {
  FlightCTA,
  FlightCard,
  FlightFAQ,
  FlightHero,
  FlightLink,
  FlightResource,
  FlightSectionHeading,
  MediaCredit,
} from "./flight-editorial";
import { type FlightPage } from "@/lib/flight-pages";
import { PERSPECTIVES } from "@/lib/perspectives";
import { EnergyExplorer } from "./energy-explorer";
import { SITE } from "@/lib/site";

export function TopicPage({ page }: { page: FlightPage }) {
  const related = page.related
    .map((path) => PERSPECTIVES.find((p) => p.path === path))
    .filter((p) => p !== undefined);
  return (
    <Chrome tone="overlay">
      <article className="c-site c-topic-content">
        <FlightHero
          eyebrow={`${page.category} / ${page.label}`}
          title={page.title}
          description={page.subtitle}
          image={page.image}
          alt={
            page.bell
              ? `Bell aircraft reference imagery for ${page.label}`
              : `Celestium concept illustration for ${page.label}`
          }
          href="#overview"
          action="Explore the perspective"
          bell={page.bell}
        />
        <nav className="c-page-bar" aria-label="On this page">
          <div className="c-container">
            <span>{page.label}</span>
            <a href="#overview">Overview</a>
            <a href="#priorities">Research priorities</a>
            {page.path === "/innovation/hydrogen-electric" && <a href="#powertrain">Powertrain</a>}
            <a href="#explore">Explore more</a>
            <a href="#resources">Resources</a>
          </div>
        </nav>
        <section className="c-container c-section" id="overview">
          <p className="c-eyebrow">01 / The perspective</p>
          <div className="c-content-grid">
            <h2>{page.overview.title}</h2>
            <div className="c-copy">
              <p>{page.overview.lead}</p>
              {page.overview.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="c-detail-grid" id="priorities">
            {page.priorities.map((item, i) => (
              <div key={item.title}>
                <span className="c-eyebrow">{String(i + 1).padStart(2, "0")} / Research priority</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        {page.path === "/innovation/hydrogen-electric" && (
          <section className="c-tone-sage c-section" id="powertrain">
            <div className="c-container">
              <FlightSectionHeading
                eyebrow="System architecture / Explore the interfaces"
                title={
                  <>
                    Follow the energy.
                    <br />
                    <em>Connect the aircraft.</em>
                  </>
                }
                description="Select a system in the schematic to inspect its role and the next research question. Each interface contributes to the complete mass and energy budget."
              />
              <EnergyExplorer />
            </div>
          </section>
        )}
        <section className="c-split-feature" id="explore">
          <div className="c-split-feature-image">
            <Image
              src={page.feature.image || page.image}
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
            <MediaCredit bell={(page.feature.image || page.image).startsWith("/media/bell")} />
          </div>
          <div className="c-split-feature-copy">
            <p className="c-eyebrow">02 / Connect the thinking</p>
            <h2>{page.feature.title}</h2>
            <p>{page.feature.text}</p>
            <FlightLink href={page.feature.href} light>
              {page.feature.action}
            </FlightLink>
          </div>
        </section>
        {page.faq && (
          <section className="c-container c-section">
            <FlightSectionHeading eyebrow="03 / Your questions" title="A closer look." />
            <FlightFAQ items={page.faq} />
          </section>
        )}
        <section className="c-container c-section" id="resources">
          <FlightSectionHeading
            eyebrow="Research / Open assumptions"
            title="Go further into the work."
            description="The research documents describe the current study assumptions. Aircraft performance values remain targets requiring validation."
          />
          <div className="c-resource-list">
            {page.category === "Support" || page.category === "Collaboration" ? (
              <FlightResource
                href="/resources/celestium-systems-review.md"
                title="Systems & maintainability review template"
                type="Markdown / Interfaces, evidence & open questions"
              />
            ) : (
              <FlightResource
                href="/resources/celestium-mission-brief-template.md"
                title="Mission research brief template"
                type="Markdown / Mission requirements & assumptions"
              />
            )}
            <FlightResource
              href={SITE.brief}
              title="MALUS · Taraka X-1 program brief"
              type="PDF / Program introduction"
            />
            <FlightResource
              href="/resources/taraka-x1-design-basis.md"
              title="Taraka X-1 design basis"
              type="Markdown / Technical research note"
            />
          </div>
          <Link className="c-text-link" href="/research" style={{ marginTop: 30 }}>
            Explore the research →
          </Link>
        </section>
        {related.length > 0 && (
          <section className="c-tone-sage c-section">
            <div className="c-container">
              <FlightSectionHeading eyebrow="Continue your flight path" title="Connected perspectives." />
              <div className="c-route-grid">
                {related.map((item) => (
                  <FlightCard
                    key={item.path}
                    href={item.path}
                    image={item.image}
                    eyebrow={item.category}
                    title={item.label}
                    description={item.subtitle}
                    bell={item.bell}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        <FlightCTA />
      </article>
    </Chrome>
  );
}
