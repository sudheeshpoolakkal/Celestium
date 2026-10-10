"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "./icons";

export function MedicalNavigation({
  current,
  pages,
}: {
  current: string;
  pages: readonly { href: string; number: string; label: string }[];
}) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const revealCurrent = () => {
      const container = scroller.current;
      const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!container || !active) return;
      const frame = container.getBoundingClientRect();
      const link = active.getBoundingClientRect();
      if (link.left < frame.left || link.right > frame.right) {
        container.scrollLeft += link.left - frame.left - (frame.width - link.width) / 2;
      }
    };
    revealCurrent();
    window.addEventListener("resize", revealCurrent);
    return () => window.removeEventListener("resize", revealCurrent);
  }, [current]);
  return (
    <nav className="medical-navigation" aria-label="Medical mission pages">
      <div className="container" ref={scroller}>
        {pages.map((page) => (
          <Link key={page.href} href={page.href} aria-current={current === page.href ? "page" : undefined}>
            <span>{page.number}</span>
            {page.label}
            <ArrowUpRight size={15} />
          </Link>
        ))}
      </div>
    </nav>
  );
}
