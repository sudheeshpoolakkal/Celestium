"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "./icons";
import { FlightLink, MediaCredit } from "./flight-editorial";

const slides = [
  {
    label: "Tiltrotor",
    eyebrow: "The future of vertical flight",
    title: (
      <>
        The future has
        <br />
        no runway.
      </>
    ),
    description:
      "The freedom of vertical lift. The reach of wing-borne flight. Explore a new perspective on what an aircraft can be.",
    image: "/media/bell/tiltrotor-coast.webp",
    alt: "Bell MV-75 aircraft concepts flying above a tropical coastline",
    href: "/products/tiltrotor",
    action: "Discover tiltrotor",
    bell: true,
  },
  {
    label: "MALUS",
    eyebrow: "The MALUS research program",
    title: (
      <>
        Modular Aerial
        <br />
        Lift Utility System.
      </>
    ),
    description:
      "Electric and hybrid vertical flight, developed as one research program. Taraka X-1 is its first aircraft concept.",
    image: "/images/taraka-dawn-v2.webp",
    alt: "Taraka X-1, the first aircraft concept of the Modular Aerial Lift Utility System, on a coastal apron at dawn",
    href: "/program",
    action: "Explore MALUS",
    bell: false,
  },
  {
    label: "HSVTOL",
    eyebrow: "Beyond conventional flight",
    title: (
      <>
        Vertical lift.
        <br />A higher ambition.
      </>
    ),
    description:
      "Hover, transition, accelerate. Discover the technology questions behind high-speed vertical takeoff and landing.",
    image: "/media/bell/hsvtol-formation.webp",
    alt: "Bell high-speed VTOL aircraft concepts flying above golden clouds",
    href: "/innovation/hsvtol",
    action: "Explore HSVTOL",
    bell: true,
  },
  {
    label: "Taraka X-1",
    eyebrow: "Our first aircraft concept",
    title: (
      <>
        An aircraft.
        <br />A lifeline.
      </>
    ),
    description:
      "Meet Taraka X-1. Our hydrogen-electric medical aircraft concept under the Modular Aerial Lift Utility System program.",
    image: "/images/taraka-coastal-flight-v2.webp",
    alt: "Celestium Taraka X-1 concept flying above a tropical coastline",
    href: "/aircraft",
    action: "Meet Taraka X-1",
    bell: false,
  },
  {
    label: "Missions",
    eyebrow: "Purpose defines the platform",
    title: (
      <>
        Go where
        <br />
        it matters.
      </>
    ),
    description:
      "From emergency care to offshore access. Explore the missions that inspire the next generation of aircraft.",
    image: "/media/bell/rotorcraft-alps.webp",
    alt: "Bell helicopter in flight above an Alpine landscape",
    href: "/missions",
    action: "Find your mission",
    bell: true,
  },
  {
    label: "Innovation",
    eyebrow: "An engineering mindset",
    title: (
      <>
        New questions.
        <br />
        New horizons.
      </>
    ),
    description:
      "Hydrogen-electric power. Integrated flight control. Digital engineering. Connect the systems shaping our research.",
    image: "/media/bell/tiltrotor-sunset.webp",
    alt: "Bell tiltrotor aircraft concepts in formation over a forest at sunset",
    href: "/innovation",
    action: "Inside our thinking",
    bell: true,
  },
  {
    label: "Celestium",
    eyebrow: "A new era of flight",
    title: (
      <>
        Beyond
        <br />
        the horizon.
      </>
    ),
    description:
      "A research initiative exploring aircraft with a clear purpose. Discover Celestium, the MALUS program and the work ahead.",
    image: "/images/taraka-hangar-v1.webp",
    alt: "Taraka X-1 aircraft concept in the Celestium hangar",
    href: "/company",
    action: "Our story",
    bell: false,
  },
];

export function HomeExperience() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && hero.current && hero.current.getBoundingClientRect().bottom > 100)
        setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, reduced]);
  const slide = slides[active];
  return (
    <section
      ref={hero}
      className="c-home-hero"
      aria-roledescription="carousel"
      aria-label="Explore the frontiers of flight"
    >
      <div className="c-home-hero-media" key={slide.label}>
        <Image src={slide.image} alt={slide.alt} fill sizes="100vw" priority={active === 0} />
      </div>
      <div className="c-home-hero-shade" />
      <div className="c-container c-home-hero-top">
        <span>CELESTIUM / FLIGHT FRONTIERS</span>
        <span>RESEARCH. REIMAGINED.</span>
      </div>
      <div className="c-container c-home-hero-copy" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <p className="c-eyebrow">
          <span />
          {String(active + 1).padStart(2, "0")} / {slide.eyebrow}
        </p>
        <h1>{slide.title}</h1>
        <p className="c-hero-description">{slide.description}</p>
        <FlightLink href={slide.href} light>
          {slide.action}
        </FlightLink>
      </div>
      <div className="c-container c-home-hero-bottom">
        <div className="c-hero-pagination">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span className="c-hero-divider" />
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
        <MediaCredit bell={slide.bell} />
        <a href="#flight-frontiers" className="c-scroll" aria-label="Explore flight frontiers">
          Scroll to explore
          <ArrowDown size={18} />
        </a>
      </div>
      <div className="c-hero-flight-bar">
        <div className="c-container">
          <div className="c-hero-slides" role="group" aria-label="Choose a flight story">
            {slides.map((s, i) => (
              <button
                key={s.label}
                aria-label={`Show ${s.label} story`}
                aria-pressed={active === i}
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.label}
                <span className="c-slide-track" />
              </button>
            ))}
          </div>
          <button
            className="c-slideshow-play"
            aria-label={playing ? "Pause flight stories" : "Play flight stories"}
            aria-pressed={playing}
            disabled={reduced}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <span className="c-pause-icon">Ⅱ</span>
            ) : (
              <svg width="12" height="15" viewBox="0 0 12 15" aria-hidden="true">
                <path d="M1 1v13l10-6.5L1 1Z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

const missions = [
  {
    label: "Emergency medical",
    number: "01",
    image: "/images/taraka-medical-dusk-v2.webp",
    title: "Distance shouldn’t decide access to care.",
    text: "A patient-first aircraft concept. A dedicated cabin. A mission that informs every design decision.",
    href: "/mission",
    bell: false,
  },
  {
    label: "Business & mobility",
    number: "02",
    image: "/media/bell/business-flight.webp",
    title: "Think beyond the road.",
    text: "Regional connections and direct access. Explore where vertical flight could change the journey.",
    href: "/missions/business",
    bell: true,
  },
  {
    label: "Energy & offshore",
    number: "03",
    image: "/media/bell/tiltrotor-coast.webp",
    title: "Connect the places that power our world.",
    text: "Range, weather, payload and the return journey. Offshore missions bring the full aircraft system into focus.",
    href: "/missions/energy",
    bell: true,
  },
  {
    label: "Public safety",
    number: "04",
    image: "/media/bell/rotorcraft-alps.webp",
    title: "A broader view. A faster response.",
    text: "From disaster assessment to firefighting support, public safety starts with a clear picture of the mission.",
    href: "/missions/public-safety",
    bell: true,
  },
  {
    label: "Utility & exploration",
    number: "05",
    image: "/media/bell/utility-flight.webp",
    title: "Reach beyond the familiar.",
    text: "Cargo, field research and remote access. Design for useful work where infrastructure is limited.",
    href: "/missions/utility",
    bell: true,
  },
];
export function MissionExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = missions[active];
  return (
    <div className="c-mission-explorer">
      <div className="c-mission-tabs" role="tablist" aria-label="Explore missions">
        {missions.map((mission, i) => (
          <button
            ref={(el) => {
              tabs.current[i] = el;
            }}
            key={mission.label}
            id={`mission-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="mission-explorer-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              let n = i;
              if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % missions.length;
              else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                n = (i + missions.length - 1) % missions.length;
              else if (e.key === "Home") n = 0;
              else if (e.key === "End") n = missions.length - 1;
              else return;
              e.preventDefault();
              setActive(n);
              tabs.current[n]?.focus();
            }}
          >
            <span>{mission.number}</span>
            {mission.label}
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div
        className="c-mission-panel"
        id="mission-explorer-panel"
        role="tabpanel"
        aria-labelledby={`mission-tab-${active}`}
      >
        <Image
          src={m.image}
          alt={
            m.bell
              ? "Bell aircraft imagery illustrating the selected mission"
              : "Taraka X-1 medical aircraft concept at dusk"
          }
          fill
          sizes="(max-width: 900px) 100vw, 65vw"
        />
        <div className="c-mission-panel-copy">
          <span className="c-eyebrow">Mission perspective / {m.number}</span>
          <h3>{m.title}</h3>
          <p>{m.text}</p>
          <Link className="c-text-link" href={m.href}>
            Explore the mission
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <MediaCredit bell={m.bell} />
      </div>
    </div>
  );
}
