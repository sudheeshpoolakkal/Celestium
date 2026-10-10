import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Download } from "./icons";
import { RELATED_PAGES, SITE, TARGETS } from "@/lib/site";

export function SectionLabel({
  number,
  children,
  detail,
}: {
  number?: string;
  children: ReactNode;
  detail?: string;
}) {
  return (
    <div className="chapter-label">
      <p>
        {number && <span>{number}</span>}
        {children}
      </p>
      {detail && <span>{detail}</span>}
    </div>
  );
}

export function ActionLink({
  href,
  children,
  solid = false,
  download = false,
}: {
  href: string;
  children: ReactNode;
  solid?: boolean;
  download?: boolean;
}) {
  const className = solid ? "action-button" : "action-link";
  if (download)
    return (
      <a className={className} href={href} download>
        {children}
        <Download />
      </a>
    );
  return (
    <Link className={className} href={href}>
      {children}
      <ArrowUpRight />
    </Link>
  );
}

export function PageIntro({
  chapter,
  title,
  description,
  children,
  dark = false,
}: {
  chapter: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={`editorial-intro ${dark ? "editorial-intro-dark" : ""}`}>
      <div className="container">
        <div className="editorial-breadcrumb">
          <Link href="/">Celestium</Link>
          <span>/</span>
          <span>{chapter}</span>
        </div>
        <p className="kicker">{chapter}</p>
        <div className="editorial-intro-grid">
          <h1>{title}</h1>
          <div>
            <p className="intro-description">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DesignTargets({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`design-targets ${compact ? "design-targets-compact" : ""}`}>
      <div className="target-values">
        {TARGETS.map((target) => (
          <div key={target.label}>
            <strong>
              {target.value}
              <span>{target.unit}</span>
            </strong>
            <p>{target.label}</p>
          </div>
        ))}
      </div>
      <p className="target-caption">
        Research targets for the twin-duct configuration. Subject to validation.
        <Link href="/research#design-basis">
          Design basis <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  detail,
  className = "",
  priority = false,
  width = 1672,
  height = 941,
}: {
  src: string;
  alt: string;
  caption: string;
  detail?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <figure className={`editorial-figure ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 800px) 100vw, 92vw"
        priority={priority}
      />
      <figcaption>
        <span>{caption}</span>
        <span>{detail ?? "Illustrative concept rendering"}</span>
      </figcaption>
    </figure>
  );
}

export function RelatedPages({ current }: { current: string }) {
  const order = RELATED_ROUTE_ORDER[current];
  const pages = order
    ? order.map((href) => RELATED_PAGES.find((page) => page.href === href)!)
    : RELATED_PAGES.filter((page) => page.href !== current).slice(0, 3);
  return (
    <section className="related-section container">
      <SectionLabel>Continue exploring</SectionLabel>
      <div className="related-grid">
        {pages.map((page) => (
          <Link key={page.href} href={page.href}>
            <div className="related-image">
              <Image src={page.image} alt="" fill sizes="(max-width: 700px) 90vw, 30vw" />
            </div>
            <p>{page.label}</p>
            <h3>
              {page.title}
              <ArrowUpRight />
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

const RELATED_ROUTE_ORDER: Record<string, readonly (typeof RELATED_PAGES)[number]["href"][]> = {
  "/program": ["/aircraft", "/mission", "/research"],
  "/aircraft": ["/technology", "/mission", "/research"],
  "/technology": ["/aircraft", "/research", "/program"],
  "/mission": ["/aircraft", "/program", "/research"],
  "/research": ["/program", "/technology", "/aircraft"],
};

export function ProgramBrief({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`program-brief-band ${dark ? "program-brief-dark" : ""}`}>
      <div className="container">
        <div>
          <p className="kicker">The program at a glance</p>
          <h2>
            One research program.
            <br />
            An aircraft created for care.
          </h2>
        </div>
        <div>
          <p>
            A concise introduction to MALUS, the Taraka X-1 concept, its design targets and the engineering
            questions that remain.
          </p>
          <ActionLink href={SITE.brief} download solid>
            Download the program brief
          </ActionLink>
          <span className="brief-format">PDF · Research concept overview</span>
        </div>
      </div>
    </section>
  );
}
