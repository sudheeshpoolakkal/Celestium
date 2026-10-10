import { FLIGHT_PAGES } from "./flight-pages";
import { JOURNAL } from "./journal";
export const CORE_ROUTES = [
  { path: "/", label: "Home", category: "Start here" },
  { path: "/products", label: "Aircraft & architecture studies", category: "Aircraft" },
  { path: "/products/tiltrotor", label: "Tiltrotor technology", category: "Aircraft" },
  { path: "/aircraft", label: "Taraka X-1", category: "Aircraft" },
  { path: "/aircraft/studio", label: "Aircraft & airflow studio", category: "Aircraft" },
  { path: "/program", label: "MALUS research program", category: "Aircraft" },
  { path: "/products/literature", label: "Program literature", category: "Aircraft" },
  { path: "/missions", label: "Mission perspectives", category: "Missions" },
  { path: "/mission", label: "Emergency medical mission", category: "Missions" },
  { path: "/mission/cabin", label: "Medical cabin", category: "Missions" },
  { path: "/mission/operations", label: "Medical mission sequence", category: "Missions" },
  { path: "/innovation/hsvtol", label: "HSVTOL", category: "Innovation" },
  { path: "/technology", label: "Engineering & systems", category: "Innovation" },
  { path: "/research", label: "Research & design basis", category: "Innovation" },
  { path: "/videos", label: "Flight library", category: "Innovation" },
  { path: "/support/resources", label: "Technical resources", category: "Support" },
  { path: "/journal", label: "Research journal", category: "Journal" },
  { path: "/company/events", label: "Events & research conversations", category: "Company" },
  { path: "/contact", label: "Research enquiry builder", category: "Contact & information" },
  { path: "/media-credits", label: "Media credits", category: "Contact & information" },
  { path: "/site-directory", label: "Site directory", category: "Contact & information" },
  { path: "/legal", label: "Site information & terms", category: "Contact & information" },
  { path: "/legal/privacy", label: "Privacy information", category: "Contact & information" },
];
export const ALL_ROUTES = [
  ...CORE_ROUTES,
  ...FLIGHT_PAGES.map((p) => ({
    path: p.path,
    label: p.label,
    category: p.category === "Collaboration" ? "Company" : p.category,
  })),
  ...JOURNAL.map((a) => ({ path: `/journal/${a.slug}`, label: a.title, category: "Journal" })),
];
