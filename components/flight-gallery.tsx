"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import media from "@/docs/reference/bell-media.json";
import { ArrowUpRight } from "./icons";

const PHOTOS = media.filter((item) => item.path.endsWith(".webp"));
const group = (id: string) =>
  id === "city-aerial"
    ? "Missions & environments"
    : /interior|cockpit|wireframe|rotor-detail/.test(id)
      ? "Systems & interiors"
      : id.startsWith("hsvtol")
        ? "HSVTOL"
        : /tiltrotor|osprey|valor/.test(id) || id === "short-takeoff"
          ? "Tiltrotor"
          : "Rotorcraft";
const FILTERS = [
  "All imagery",
  "Tiltrotor",
  "HSVTOL",
  "Rotorcraft",
  "Systems & interiors",
  "Missions & environments",
];

export function FlightGallery() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const photos = PHOTOS.filter((item) => filter === FILTERS[0] || group(item.id) === filter);
  const selected = active === null ? null : photos[active];
  const move = (delta: number) =>
    setActive((current) => (current === null ? null : (current + delta + photos.length) % photos.length));
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (active !== null && !element.open) element.showModal();
    if (active === null && element.open) {
      element.close();
      opener.current?.focus();
    }
    if (active === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
  return (
    <div className="c-flight-gallery">
      <div className="c-filter-bar" role="group" aria-label="Filter reference imagery">
        {FILTERS.map((item) => (
          <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
        <span role="status">{photos.length} reference images</span>
      </div>
      <div className="c-photo-grid">
        {photos.map((item, i) => (
          <figure key={item.id}>
            <button
              className="c-photo-open"
              aria-label={`Inspect ${item.alt}`}
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(i);
              }}
            >
              <Image
                src={item.path}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 30vw"
              />
              <span className="c-photo-inspect" aria-hidden="true">
                Inspect image <ArrowUpRight size={15} />
              </span>
            </button>
            <figcaption>
              <span>{group(item.id)} / Bell reference</span>
              <h3>{item.alt}</h3>
              <a href={item.source} target="_blank" rel="noopener noreferrer">
                View official source <ArrowUpRight size={13} />
              </a>
            </figcaption>
            <noscript>
              <a href={item.path}>Open the aircraft reference image</a>
            </noscript>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="c-lightbox"
        aria-labelledby="gallery-image-title"
        onCancel={(e) => {
          e.preventDefault();
          setActive(null);
        }}
        onClose={() => setActive(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {selected && (
          <>
            <div className="c-lightbox-top">
              <span>Bell / Reference imagery</span>
              <button autoFocus aria-label="Close aircraft image" onClick={() => setActive(null)}>
                Close ×
              </button>
            </div>
            <div className="c-lightbox-image">
              <Image src={selected.path} alt={selected.alt} fill sizes="95vw" />
            </div>
            <div className="c-lightbox-bottom">
              <div>
                <h2 id="gallery-image-title">{selected.alt}</h2>
                <p>© Bell Textron Inc. / source owner. Reference imagery.</p>
                <a href={selected.source} target="_blank" rel="noopener noreferrer">
                  View official Bell source ↗
                </a>
              </div>
              <div className="c-gallery-pager">
                <button aria-label="Previous aircraft image" onClick={() => move(-1)}>
                  ←
                </button>
                <span aria-live="polite">
                  {(active ?? 0) + 1} / {photos.length}
                </span>
                <button aria-label="Next aircraft image" onClick={() => move(1)}>
                  →
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
