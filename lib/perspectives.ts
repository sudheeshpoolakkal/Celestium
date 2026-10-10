import { FLIGHT_PAGES, type FlightPage } from "./flight-pages";

type Perspective = Pick<FlightPage, "path" | "category" | "label" | "subtitle" | "image" | "bell">;

/** Dedicated pages also participate in the topic-page reading paths. */
export const PERSPECTIVES: Perspective[] = [
  ...FLIGHT_PAGES,
  {
    path: "/products/tiltrotor",
    category: "Aircraft",
    label: "Tiltrotor technology",
    subtitle: "Inspect vertical lift, transition and wing-borne cruise in the interactive orientation study.",
    image: "/media/bell/tiltrotor-coast.webp",
    bell: true,
  },
  {
    path: "/innovation/hsvtol",
    category: "Innovation",
    label: "HSVTOL",
    subtitle: "Explore folding rotors, a separate cruise thrust path and Bell’s concept animations.",
    image: "/media/bell/hsvtol-formation.webp",
    bell: true,
  },
  {
    path: "/support/resources",
    category: "Support",
    label: "Technical resources",
    subtitle: "Open the programme brief, design basis, diameter trade and research templates.",
    image: "/images/taraka-powertrain-cutaway-v1.webp",
    bell: false,
  },
  {
    path: "/mission/cabin",
    category: "Missions",
    label: "Medical cabin",
    subtitle: "Study the patient, clinical team, equipment and access within the dedicated medical concept.",
    image: "/images/taraka-medical-dusk-v2.webp",
    bell: false,
  },
  {
    path: "/mission/operations",
    category: "Missions",
    label: "Medical mission sequence",
    subtitle: "Connect dispatch, preparation, flight and handover in the complete transfer scenario.",
    image: "/images/taraka-medical-dusk-v2.webp",
    bell: false,
  },
  {
    path: "/research",
    category: "Innovation",
    label: "Research & design basis",
    subtitle: "Inspect the current assumptions, nominal diameter trade and unresolved integration questions.",
    image: "/images/taraka-powertrain-cutaway-v1.webp",
    bell: false,
  },
  {
    path: "/technology",
    category: "Innovation",
    label: "Engineering & systems",
    subtitle: "Follow the hydrogen-electric architecture, tilting ducts and control interfaces.",
    image: "/images/taraka-powertrain-cutaway-v1.webp",
    bell: false,
  },
  {
    path: "/missions",
    category: "Missions",
    label: "Mission perspectives",
    subtitle: "Explore nine mission contexts and the requirements that connect each to aircraft design.",
    image: "/images/taraka-medical-dusk-v2.webp",
    bell: false,
  },
  {
    path: "/legal/privacy",
    category: "Contact & information",
    label: "Privacy information",
    subtitle: "Understand the local enquiry form, browser state and actual preview data handling.",
    image: "/images/taraka-dawn-v2.webp",
    bell: false,
  },
];
