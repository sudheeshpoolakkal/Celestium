import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chrome } from "@/components/chrome";
import { FlightCard, FlightCTA, FlightHero, FlightSectionHeading } from "@/components/flight-editorial";
import { JOURNAL } from "@/lib/journal";
export function generateStaticParams() {
  return JOURNAL.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = JOURNAL.find((a) => a.slug === slug);
  return a
    ? {
        title: a.title,
        description: a.excerpt,
        alternates: { canonical: `/journal/${a.slug}` },
        openGraph: { type: "article", title: a.title, description: a.excerpt, images: [a.image] },
      }
    : {};
}
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = JOURNAL.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <Chrome tone="overlay">
      <article className="c-site">
        <FlightHero
          eyebrow={`Journal / ${a.category}`}
          title={a.title}
          description={a.excerpt}
          image={a.image}
          alt={
            a.bell
              ? `Bell aircraft reference for ${a.title}`
              : `Celestium concept illustration for ${a.title}`
          }
          bell={a.bell}
          compact
        />
        <div className="c-container c-article-body">
          <div className="c-article-meta">
            <span>CELESTIUM / RESEARCH NOTE</span>
            <span>{a.readTime} read / Concept development</span>
          </div>
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <aside className="c-article-related" aria-label="Related research">
            <span className="c-eyebrow">Follow the research</span>
            {a.related.map((r) => (
              <Link className="c-text-link" key={r.href} href={r.href}>
                {r.label} ↗
              </Link>
            ))}
            {a.bell && (
              <a
                className="c-text-link"
                href={
                  a.slug === "beyond-the-runway"
                    ? "https://www.bellflight.com/innovation/hsvtol"
                    : "https://www.bellflight.com/products/tiltrotor"
                }
                target="_blank"
                rel="noreferrer"
              >
                Bell technology reference ↗
              </a>
            )}
            <Link className="c-text-link" href="/journal">
              ← All journal notes
            </Link>
          </aside>
        </div>
        <section className="c-section c-tone-sage">
          <div className="c-container">
            <FlightSectionHeading eyebrow="Continue exploring" title="Another perspective." />
            <div className="c-route-grid">
              {JOURNAL.filter((j) => j.slug !== slug)
                .slice(0, 3)
                .map((j) => (
                  <FlightCard
                    key={j.slug}
                    href={`/journal/${j.slug}`}
                    image={j.image}
                    title={j.title}
                    eyebrow={j.category}
                    description={j.excerpt}
                    bell={j.bell}
                  />
                ))}
            </div>
          </div>
        </section>
        <FlightCTA />
      </article>
    </Chrome>
  );
}
