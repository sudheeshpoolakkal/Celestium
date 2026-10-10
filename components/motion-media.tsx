"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MediaCredit } from "./flight-editorial";

export function MotionMedia({
  src,
  poster,
  title,
  description,
}: {
  src: string;
  poster: string;
  title: string;
  description: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);
  const toggle = async () => {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      setPlaying(false);
    } else {
      try {
        await video.current.play();
        setPlaying(true);
        setError(false);
      } catch {
        setError(true);
      }
    }
  };
  return (
    <figure className="c-motion-media">
      <div className="c-motion-stage">
        <Image src={poster} alt={description} fill sizes="(max-width: 800px) 100vw, 60vw" />
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          preload="none"
          aria-label={title}
          onError={() => {
            setError(true);
            setPlaying(false);
          }}
        />
        <button
          className="c-video-toggle"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${title}`}
          aria-pressed={playing}
        >
          {playing ? (
            <span aria-hidden="true">Ⅱ</span>
          ) : (
            <svg width="17" height="20" viewBox="0 0 17 20" fill="none" aria-hidden="true">
              <path d="M1 1v18l15-9L1 1Z" fill="currentColor" />
            </svg>
          )}
          <span>{playing ? "Pause animation" : "Play animation"}</span>
        </button>
        <MediaCredit label="Bell / Aircraft concept animation" />
      </div>
      <figcaption>
        <strong>{title}</strong>
        <p>{description}</p>
        {error && (
          <p role="status">
            The animation could not play. The reference image and explanation remain available.
          </p>
        )}
      </figcaption>
    </figure>
  );
}
