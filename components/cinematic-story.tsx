import Image from "next/image";
import type { ReactNode } from "react";

export function CinematicStory({
  id,
  headingId,
  image,
  alt,
  eyebrow,
  title,
  description,
  children,
  className = "",
  primary = false,
}: {
  id?: string;
  headingId: string;
  image: string;
  alt: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
  className?: string;
  primary?: boolean;
}) {
  const Heading = primary ? "h1" : "h2";
  return (
    <section id={id} className={`cinematic-story ${className}`} aria-labelledby={headingId}>
      <Image src={image} alt={alt} fill sizes="100vw" priority={primary} className="cinematic-story-image" />
      <div className="cinematic-story-shade" aria-hidden="true" />
      <div className="container cinematic-story-content">
        <p className="kicker">{eyebrow}</p>
        <Heading id={headingId}>{title}</Heading>
        <p className="cinematic-story-description">{description}</p>
        <div className="cinematic-story-actions">{children}</div>
      </div>
      <div className="container cinematic-story-foot">
        <span>MALUS / Concept development</span>
        <span>Illustrative concept visualization</span>
      </div>
    </section>
  );
}
