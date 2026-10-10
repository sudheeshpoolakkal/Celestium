import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";

export function FlightLink({
  href,
  children,
  light = false,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link
      className={`c-button ${light ? "c-button-light" : ""} ${outline ? "c-button-outline" : ""}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}

export function MediaCredit({ bell = true, label }: { bell?: boolean; label?: string }) {
  return (
    <Link className="c-media-credit" href={bell ? "/media-credits" : "/research"}>
      {label || (bell ? "Bell imagery / Technology reference" : "Celestium / Concept visualization")}
      <ArrowUpRight size={10} />
    </Link>
  );
}

export function FlightHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  href,
  action = "Explore the possibilities",
  bell = true,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image: string;
  alt: string;
  href?: string;
  action?: string;
  bell?: boolean;
  compact?: boolean;
}) {
  return (
    <section className={`c-flight-hero ${compact ? "c-flight-hero-compact" : ""}`}>
      <Image src={image} alt={alt} fill sizes="100vw" priority className="c-flight-hero-image" />
      <div className="c-flight-hero-shade" />
      <div className="c-container c-flight-hero-copy">
        <div className="c-breadcrumb">
          <Link href="/">Celestium</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <p className="c-eyebrow">
          <span />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="c-hero-description">{description}</p>
        {href && (
          <FlightLink href={href} light>
            {action}
          </FlightLink>
        )}
      </div>
      <MediaCredit bell={bell} />
    </section>
  );
}

export function FlightSectionHeading({
  eyebrow,
  title,
  description,
  href,
  action,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="c-section-heading">
      <div>
        <p className="c-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div>
        {description && <p>{description}</p>}
        {href && (
          <Link className="c-text-link" href={href}>
            {action || "Explore more"}
            <ArrowUpRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}

export function FlightCard({
  href,
  image,
  eyebrow,
  title,
  description,
  bell = true,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  description?: string;
  bell?: boolean;
}) {
  return (
    <Link className="c-flight-card" href={href}>
      <div className="c-card-image">
        <Image src={image} alt="" fill sizes="(max-width: 700px) 90vw, 45vw" />
        <span className="c-card-arrow">
          <ArrowUpRight size={23} />
        </span>
        <span className="c-card-credit">
          {bell ? "Bell / Reference imagery" : "Celestium / Concept study"}
        </span>
      </div>
      <div className="c-card-copy">
        <span className="c-eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
    </Link>
  );
}

export function FlightCTA({
  title = "Let’s explore the next horizon.",
  description = "Bring a mission, a research question or an engineering challenge. Start a conversation with Celestium.",
  href = "/contact",
  action = "Start a conversation",
}: {
  title?: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="c-cta">
      <div className="c-container">
        <p className="c-eyebrow">From possibility to purpose</p>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <FlightLink href={href} light>
            {action}
          </FlightLink>
        </div>
        <svg viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <circle cx="150" cy="150" r="100" stroke="currentColor" />
          <circle cx="150" cy="150" r="140" stroke="currentColor" />
          <path d="M0 300 300 0M0 150h300M150 0v300" stroke="currentColor" />
        </svg>
      </div>
    </section>
  );
}

export function FlightFAQ({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="c-faq">
      {items.map((item, i) => (
        <details key={item.question}>
          <summary>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {item.question}
            <span className="c-faq-plus">+</span>
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FlightResource({ href, title, type }: { href: string; title: string; type: string }) {
  return (
    <a href={href} className="c-resource" download>
      <span className="c-resource-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" />
          <path d="M14 3v5h4M9 12h6M9 16h6" stroke="currentColor" />
        </svg>
      </span>
      <span>
        <strong>{title}</strong>
        <small>{type}</small>
      </span>
      <ArrowRight size={20} />
    </a>
  );
}
