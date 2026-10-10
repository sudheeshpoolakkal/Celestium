import Image from "next/image";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
import { HomeExperience, MissionExplorer } from "@/components/home-experience";
import {
  FlightCard,
  FlightCTA,
  FlightLink,
  FlightSectionHeading,
  MediaCredit,
} from "@/components/flight-editorial";
import { ArrowUpRight } from "@/components/icons";
import { JOURNAL } from "@/lib/journal";

export default function HomePage() {
  return (
    <Chrome tone="overlay">
      <div className="c-site">
        <HomeExperience />
        <section className="c-container c-home-intro c-section" id="flight-frontiers">
          <div className="c-section-index">
            <span className="c-eyebrow">01 / Flight frontiers</span>
            <span>VERTICAL FLIGHT. UNLIMITED QUESTIONS.</span>
          </div>
          <div className="c-home-intro-grid">
            <h2>
              A different way
              <br />
              to look at <em>up.</em>
            </h2>
            <div>
              <p className="c-lead">Some horizons need a different kind of aircraft.</p>
              <p>
                Celestium explores the space between vertical lift and forward flight. Through the MALUS
                research program, we connect aircraft architecture, energy systems and a mission that gives
                them purpose.
              </p>
              <Link className="c-text-link" href="/company">
                Meet Celestium <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
          <div className="c-frontier-grid">
            <FlightCard
              href="/products/tiltrotor"
              image="/media/bell/tiltrotor-coast.webp"
              eyebrow="Lift. Transition. Cruise."
              title="Tiltrotor"
              description="The freedom to lift vertically. The possibility to go farther."
            />
            <FlightCard
              href="/innovation/hsvtol"
              image="/media/bell/hsvtol-formation.webp"
              eyebrow="The next flight frontier"
              title="High-speed VTOL"
              description="An architecture that asks more of vertical flight."
            />
          </div>
        </section>
        <section className="c-home-aircraft" aria-labelledby="home-aircraft-title">
          <Image
            src="/images/taraka-coastal-flight-v2.webp"
            alt="Celestium Taraka X-1 aircraft concept above a tropical coastline"
            fill
            sizes="100vw"
          />
          <div className="c-home-aircraft-shade" />
          <div className="c-container">
            <p className="c-eyebrow">02 / Introducing our first aircraft concept</p>
            <h2 id="home-aircraft-title">
              Taraka X-1.
              <br />A purpose.
              <br />
              <em>A lifeline.</em>
            </h2>
            <p>
              Hydrogen-electric energy. Twin tilting ducts. A medical cabin designed around care. The first
              aircraft concept under MALUS.
            </p>
            <FlightLink href="/aircraft" light>
              Discover the aircraft
            </FlightLink>
            <Link href="/aircraft/studio" className="c-text-link">
              Explore the aircraft in 3D
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <MediaCredit bell={false} />
          <div className="c-home-targets c-container">
            <div>
              <strong>
                450 <small>km/h</small>
              </strong>
              <span>Target cruise speed</span>
            </div>
            <div>
              <strong>
                1,500 <small>km</small>
              </strong>
              <span>Target design range</span>
            </div>
            <div>
              <strong>
                600 <small>kg</small>
              </strong>
              <span>Mission load target</span>
            </div>
            <Link href="/research">
              Research targets.
              <br />
              Explore the design basis <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
        <section className="c-container c-section c-home-missions">
          <FlightSectionHeading
            eyebrow="03 / Where it matters"
            title={
              <>
                Every mission.
                <br />
                <em>A reason to fly.</em>
              </>
            }
            description="Begin with the problem on the ground. Explore the possibilities in the air."
            href="/missions"
            action="Explore all missions"
          />
          <MissionExplorer />
        </section>
        <section className="c-innovation-band">
          <div className="c-container">
            <p className="c-eyebrow">04 / The systems behind the ambition</p>
            <div className="c-section-heading">
              <h2>
                Good questions.
                <br />
                <em>Better engineering.</em>
              </h2>
              <FlightLink href="/innovation" outline>
                Explore innovation
              </FlightLink>
            </div>
            <div className="c-innovation-list">
              {[
                {
                  number: "01",
                  title: "Hydrogen-electric energy",
                  text: "Sustained cruise power. A battery for peak demand.",
                  href: "/innovation/hydrogen-electric",
                },
                {
                  number: "02",
                  title: "Integrated flight control",
                  text: "Coordinate thrust, tilt and the transition between them.",
                  href: "/innovation/autonomy",
                },
                {
                  number: "03",
                  title: "Digital engineering",
                  text: "Connect geometry, mission assumptions and design trades.",
                  href: "/innovation/digital-engineering",
                },
              ].map((x) => (
                <Link key={x.number} href={x.href}>
                  <span>{x.number}</span>
                  <h3>{x.title}</h3>
                  <p>{x.text}</p>
                  <ArrowUpRight size={24} />
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="c-container c-section c-home-journal">
          <FlightSectionHeading
            eyebrow="05 / Notes from the horizon"
            title={
              <>
                Ideas taking
                <br />
                <em>shape.</em>
              </>
            }
            href="/journal"
            action="Read the journal"
            description="A closer look at the technologies, trade-offs and missions that guide our research."
          />
          <div className="c-journal-grid">
            {JOURNAL.slice(0, 3).map((article) => (
              <FlightCard
                key={article.slug}
                href={`/journal/${article.slug}`}
                image={article.image}
                eyebrow={article.category}
                title={article.title}
                description={article.excerpt}
                bell={article.bell}
              />
            ))}
          </div>
        </section>
        <FlightCTA />
      </div>
    </Chrome>
  );
}
