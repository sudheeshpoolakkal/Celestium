import type { Metadata } from "next";
import Image from "next/image";
import { Chrome } from "@/components/chrome";
import media from "@/docs/reference/bell-media.json";
export const metadata: Metadata = {
  title: "Media credits & sources",
  description:
    "Source attribution for Bell aircraft imagery and animations used as technology references in the Celestium redesign.",
  alternates: { canonical: "/media-credits" },
};
export default function CreditsPage() {
  return (
    <Chrome>
      <div className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Reference library</p>
          <h1>
            Every image.
            <br />A clear source.
          </h1>
          <p>
            Bell aircraft and animations appear as technology references. The aircraft belong to Bell and
            their respective programs; Celestium has no stated affiliation with Bell.
          </p>
        </header>
        <section className="c-container c-credits-intro">
          <h2>Aircraft-only references.</h2>
          <p>
            The selected Bell media was screened at its available source resolution for visible people. Images
            showing ground crews, rescuers or identifiable pilots were excluded. Files are hosted locally in
            optimised formats.
          </p>
          <p>
            Copyright remains with Bell Textron Inc. and the respective source owners. Public availability
            does not establish a reuse licence. Source links and the media manifest are retained for review
            before any public deployment.
          </p>
          <p>
            Taraka X-1 and the MALUS illustrations are the separate concept artwork already created for this
            project. The original generation records are preserved in the project’s artwork documentation.
          </p>
        </section>
        <section className="c-container c-credits-grid" aria-label="Bell media source inventory">
          {media.map((m) => (
            <article className="c-credit-item" key={m.id}>
              <div className="c-credit-image">
                <Image
                  src={m.path.endsWith(".mp4") ? "/media/bell/hsvtol-platform.webp" : m.path}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 700px) 90vw, 30vw"
                />
              </div>
              <span className="c-eyebrow">
                {m.path.endsWith(".mp4") ? "Animation / MP4" : "Aircraft reference / WebP"}
              </span>
              <h3>{m.alt}</h3>
              <p>{m.copyright}</p>
              <div>
                <a href={m.source} target="_blank" rel="noreferrer">
                  Source page ↗
                </a>
                <a href={m.originalUrl} target="_blank" rel="noreferrer">
                  Original media ↗
                </a>
              </div>
              <code>{m.path}</code>
            </article>
          ))}
        </section>
      </div>
    </Chrome>
  );
}
