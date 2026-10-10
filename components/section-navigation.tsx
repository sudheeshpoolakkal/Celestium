"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "explore", label: "Flight configuration" },
  { id: "mission-bay", label: "Mission bay" },
  { id: "specifications", label: "Design basis" },
] as const;

export function AircraftSectionNavigation() {
  const [active, setActive] = useState<string>("overview");
  const navigation = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nav = navigation.current;
      if (!nav) return;
      const threshold = nav.getBoundingClientRect().bottom + 45;
      let current: string = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) current = section.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const nav = navigation.current;
    const link = nav?.querySelector<HTMLElement>(`[href="#${active}"]`);
    if (!nav || !link) return;
    const bounds = nav.getBoundingClientRect();
    const target = link.getBoundingClientRect();
    if (target.left < bounds.left || target.right > bounds.right) {
      nav.scrollLeft += target.left - bounds.left - (bounds.width - target.width) / 2;
    }
  }, [active]);

  return (
    <nav ref={navigation} className="product-section-nav container" aria-label="On this page">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-current={active === section.id ? "location" : undefined}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
