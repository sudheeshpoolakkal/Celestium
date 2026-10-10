export const SITE = {
  name: "MALUS",
  expandedName: "Modular Aerial Lift Utility System",
  aircraft: "Taraka X-1",
  stage: "Concept development",
  brief: "/resources/malus-taraka-x1-program-brief.pdf",
} as const;

export const NAVIGATION = [
  { href: "/program", label: "Architecture", section: "architecture" },
  { href: "/aircraft", label: "Taraka X-1", section: "aircraft" },
  { href: "/technology", label: "Technology", section: "technology" },
  { href: "/mission", label: "Air ambulance", section: "missions" },
  { href: "/research", label: "Research", section: "research" },
] as const;

export const TARGETS = [
  { value: "450", unit: "km/h", label: "Target cruise speed" },
  { value: "1,500", unit: "km", label: "Target design range" },
  { value: "600", unit: "kg", label: "Mission load target" },
] as const;

export const RELATED_PAGES = [
  {
    href: "/program",
    title: "The MALUS program",
    label: "Modular Aerial Lift Utility System",
    image: "/images/malus-architecture.svg",
  },
  {
    href: "/aircraft",
    title: "Taraka X-1",
    label: "The first aircraft concept",
    image: "/images/taraka-dawn-v2.webp",
  },
  {
    href: "/technology",
    title: "The engineering",
    label: "Lift, energy and flight control",
    image: "/images/duct-section.svg",
  },
  {
    href: "/mission",
    title: "The air-ambulance mission",
    label: "The purpose of Taraka X-1",
    image: "/images/taraka-medical-dusk-v2.webp",
  },
  {
    href: "/research",
    title: "Research & development",
    label: "Design assumptions and the work ahead",
    image: "/images/design-trade.svg",
  },
] as const;
