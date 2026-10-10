export const CELESTIUM = {
  name: "Celestium",
  tagline: "Beyond the horizon.",
  description:
    "Exploring the next era of vertical flight. Aircraft concepts, mission systems and the research that connects them.",
} as const;

export type NavItem = { label: string; href: string; note?: string };
export type NavGroup = {
  label: string;
  href: string;
  eyebrow: string;
  description: string;
  image: string;
  columns: { title: string; links: NavItem[] }[];
};
export const MEGA_NAV: NavGroup[] = [
  {
    label: "Aircraft",
    href: "/products",
    eyebrow: "Built around a purpose",
    description: "Explore the aircraft, architectures and possibilities of vertical flight.",
    image: "/images/taraka-coastal-flight-v2.webp",
    columns: [
      {
        title: "Aircraft & platforms",
        links: [
          { label: "All aircraft studies", href: "/products" },
          { label: "Taraka X-1", href: "/aircraft", note: "Medical aircraft concept" },
          { label: "Commercial applications", href: "/products/commercial" },
          { label: "Utility platforms", href: "/products/utility" },
          { label: "Uncrewed systems", href: "/products/uncrewed" },
        ],
      },
      {
        title: "Explore the architecture",
        links: [
          { label: "Tiltrotor", href: "/products/tiltrotor" },
          { label: "High-speed VTOL", href: "/innovation/hsvtol" },
          { label: "MALUS platform", href: "/program" },
          { label: "Aircraft & airflow studio", href: "/aircraft/studio" },
          { label: "Product literature", href: "/products/literature" },
        ],
      },
    ],
  },
  {
    label: "Missions",
    href: "/missions",
    eyebrow: "Where flight makes a difference",
    description: "Start with the mission. Work back to the aircraft.",
    image: "/media/bell/tiltrotor-coast.webp",
    columns: [
      {
        title: "Civil missions",
        links: [
          { label: "All missions", href: "/missions" },
          { label: "Emergency medical", href: "/mission" },
          { label: "Business & regional mobility", href: "/missions/business" },
          { label: "Energy & offshore", href: "/missions/energy" },
          { label: "Public safety", href: "/missions/public-safety" },
        ],
      },
      {
        title: "Beyond the everyday",
        links: [
          { label: "Search & rescue", href: "/missions/search-and-rescue" },
          { label: "Utility & cargo", href: "/missions/utility" },
          { label: "Remote exploration", href: "/missions/adventure" },
          { label: "Special missions", href: "/missions/special-missions" },
          { label: "Training & simulation", href: "/missions/training" },
        ],
      },
    ],
  },
  {
    label: "Innovation",
    href: "/innovation",
    eyebrow: "A different flight path",
    description: "From tilting lift systems to high-speed concepts. Follow the questions shaping our work.",
    image: "/media/bell/hsvtol-formation.webp",
    columns: [
      {
        title: "Frontiers of flight",
        links: [
          { label: "Innovation overview", href: "/innovation" },
          { label: "HSVTOL", href: "/innovation/hsvtol" },
          { label: "Tiltrotor technology", href: "/products/tiltrotor" },
          { label: "Hydrogen-electric propulsion", href: "/innovation/hydrogen-electric" },
          { label: "Autonomy & control", href: "/innovation/autonomy" },
        ],
      },
      {
        title: "Inside the research",
        links: [
          { label: "Engineering & systems", href: "/technology" },
          { label: "Digital engineering", href: "/innovation/digital-engineering" },
          { label: "Research & design basis", href: "/research" },
          { label: "Research journal", href: "/journal" },
          { label: "Flight library", href: "/videos" },
        ],
      },
    ],
  },
  {
    label: "Support",
    href: "/support",
    eyebrow: "Think beyond takeoff",
    description: "Maintenance, safety and training belong in the design from the beginning.",
    image: "/media/bell/rotor-detail.webp",
    columns: [
      {
        title: "The complete lifecycle",
        links: [
          { label: "Support overview", href: "/support" },
          { label: "Maintainability", href: "/support/maintenance" },
          { label: "Training", href: "/support/training" },
          { label: "Flight safety", href: "/support/flight-safety" },
          { label: "Upgrade philosophy", href: "/support/upgrades" },
        ],
      },
      {
        title: "Knowledge & resources",
        links: [
          { label: "Technical resources", href: "/support/resources" },
          { label: "Pilot training studies", href: "/support/training/pilot" },
          { label: "Technical training studies", href: "/support/training/technical" },
          { label: "Supplier collaboration", href: "/suppliers" },
          { label: "Start a conversation", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/company",
    eyebrow: "A horizon worth pursuing",
    description: "Meet Celestium. A research initiative with a purpose for every aircraft.",
    image: "/images/taraka-hangar-v1.webp",
    columns: [
      {
        title: "About Celestium",
        links: [
          { label: "Our story", href: "/company" },
          { label: "Our approach", href: "/company/approach" },
          { label: "Responsibility", href: "/company/responsibility" },
          { label: "Research collaborations", href: "/company/partners" },
          { label: "Journal & insights", href: "/journal" },
        ],
      },
      {
        title: "Find your trajectory",
        links: [
          { label: "Work with us", href: "/careers" },
          { label: "Engineering", href: "/careers/engineering" },
          { label: "Students & researchers", href: "/careers/students" },
          { label: "Events & conversations", href: "/company/events" },
          { label: "Contact Celestium", href: "/contact" },
        ],
      },
    ],
  },
];

export const FOUNDATION_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "MALUS research program", href: "/program" },
  { label: "Taraka X-1", href: "/aircraft" },
  { label: "Medical cabin", href: "/mission/cabin" },
  { label: "Medical operations", href: "/mission/operations" },
  { label: "Research & design basis", href: "/research" },
  { label: "Media credits", href: "/media-credits" },
  { label: "Site directory", href: "/site-directory" },
];
