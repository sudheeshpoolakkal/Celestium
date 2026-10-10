import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "@/components/chrome";
import { ALL_ROUTES } from "@/lib/routes";
export const metadata: Metadata = {
  title: "Site directory",
  description: "Explore every Celestium aircraft, mission, innovation, research, support and company page.",
  alternates: { canonical: "/site-directory" },
};
export default function DirectoryPage() {
  const categories = [
    "Start here",
    "Aircraft",
    "Missions",
    "Innovation",
    "Support",
    "Company",
    "Journal",
    "Contact & information",
  ];
  return (
    <Chrome>
      <div className="c-site">
        <header className="c-container c-journal-heading">
          <p className="c-eyebrow">Celestium / Site directory</p>
          <h1>
            Choose your
            <br />
            flight path.
          </h1>
          <p>
            {ALL_ROUTES.length} destinations across aircraft, missions, technology and the research behind
            them.
          </p>
        </header>
        <section className="c-container c-directory-grid" aria-label="Website pages">
          {categories.map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              {ALL_ROUTES.filter((r) => r.category === category).map((r) => (
                <Link href={r.path} key={r.path}>
                  {r.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          ))}
        </section>
      </div>
    </Chrome>
  );
}
