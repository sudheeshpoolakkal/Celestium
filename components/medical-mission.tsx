import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";
import { SectionLabel } from "./editorial";
import { MedicalNavigation } from "./medical-navigation";

const PAGES = [
  {
    href: "/mission",
    number: "01",
    label: "The air-ambulance mission",
    title: "Created for medical transport.",
    text: "The purpose that defines Taraka X-1.",
    image: "/images/taraka-medical-dusk-v2.webp",
  },
  {
    href: "/mission/cabin",
    number: "02",
    label: "The medical cabin",
    title: "A place for care, in flight.",
    text: "Patient access, clinical team and equipment.",
    image: "/images/medical-cabin-cutaway-v1.webp",
  },
  {
    href: "/mission/operations",
    number: "03",
    label: "The mission sequence",
    title: "From handover to handover.",
    text: "The complete transfer informs the aircraft.",
    image: "/images/medical-journey.svg",
  },
] as const;

export function MissionHero({
  title,
  description,
  chapter,
  image = "/images/taraka-medical-dusk-v2.webp",
  alt = "Illustrative Taraka X-1 medical air-ambulance concept",
  current,
  action,
}: {
  title: ReactNode;
  description: string;
  chapter: string;
  image?: string;
  alt?: string;
  current: string;
  action?: ReactNode;
}) {
  return (
    <>
      <section className="medical-hero">
        <Image src={image} alt={alt} fill sizes="100vw" priority className="medical-hero-image" />
        <div className="medical-hero-shade" aria-hidden="true" />
        <div className="container medical-hero-content">
          <div className="medical-breadcrumb">
            <Link href="/">Celestium</Link>
            <span>/</span>
            <Link href="/aircraft">Taraka X-1</Link>
            <span>/</span>
            <span>{chapter}</span>
          </div>
          <p className="kicker">Taraka X-1 / Medical air ambulance</p>
          <h1>{title}</h1>
          <p className="medical-hero-description">{description}</p>
          {action}
        </div>
        <div className="container medical-hero-foot">
          <span>Dedicated medical mission · Concept development</span>
          <span>Illustrative concept rendering</span>
        </div>
      </section>
      <MedicalNavigation current={current} pages={PAGES} />
    </>
  );
}

export function MedicalMissionPages({ current }: { current: string }) {
  return (
    <section className="editorial-section container medical-explore">
      <SectionLabel detail="Taraka X-1 / The medical mission">Explore the complete mission</SectionLabel>
      <div className="medical-page-cards">
        {PAGES.filter((page) => page.href !== current).map((page) => (
          <Link key={page.href} href={page.href}>
            <div className="medical-page-card-image">
              <Image src={page.image} alt="" fill sizes="(max-width:700px) 90vw, 45vw" />
            </div>
            <span className="kicker">
              {page.number} / {page.label}
            </span>
            <h3>
              {page.title}
              <ArrowUpRight />
            </h3>
            <p>{page.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MissionJourneyDiagram() {
  const stops = [
    { number: "01", title: "Mission definition", detail: "Transfer requirements" },
    { number: "02", title: "Ground transfer", detail: "Patient + team + equipment" },
    { number: "03", title: "Regional flight", detail: "Vertical lift / Cruise" },
    { number: "04", title: "Receiving handover", detail: "Destination coordination" },
  ];
  return (
    <figure className="mission-journey-diagram">
      <div className="mission-journey-nodes">
        {stops.map((stop) => (
          <div key={stop.number}>
            <span>{stop.number}</span>
            <div className="journey-symbol" aria-hidden="true">
              {stop.number === "03" ? (
                <svg viewBox="0 0 80 64">
                  <g fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M35 52V15q5-13 10 0v37M36 24H22m22 0h14M31 49h18" />
                    <circle cx="16" cy="26" r="12" />
                    <circle cx="64" cy="26" r="12" />
                    <circle cx="16" cy="26" r="4" />
                    <circle cx="64" cy="26" r="4" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 80 64">
                  <g fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M19 52V14h42v38M14 52h52M34 52V37h12v15M34 21h12m-6-6v12" />
                    <path d="M26 31h4m20 0h4M26 39h4m20 0h4" />
                  </g>
                </svg>
              )}
            </div>
            <h3>{stop.title}</h3>
            <p>{stop.detail}</p>
          </div>
        ))}
      </div>
      <figcaption>Concept mission sequence / Requirements to be developed and validated.</figcaption>
    </figure>
  );
}
