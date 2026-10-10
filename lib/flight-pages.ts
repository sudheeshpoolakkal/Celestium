export type FlightPage = {
  path: string;
  category: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  bell: boolean;
  overview: { title: string; lead: string; paragraphs: string[] };
  priorities: { title: string; text: string }[];
  feature: { title: string; text: string; image?: string; href: string; action: string };
  related: string[];
  faq?: { question: string; answer: string }[];
};
const bell = (name: string) => `/media/bell/${name}.webp`;
const concept = (name: string) => `/images/${name}.webp`;
const make = (p: FlightPage) => p;
export const FLIGHT_PAGES: FlightPage[] = [
  make({
    path: "/innovation",
    category: "Innovation",
    label: "Innovation",
    title: "The next horizon starts with a question.",
    subtitle:
      "Explore the architectures, energy systems and engineering ideas shaping the future of vertical flight.",
    image: bell("hsvtol-formation"),
    bell: true,
    overview: {
      title: "From a possibility. To a design question.",
      lead: "Innovation becomes useful when the systems connect.",
      paragraphs: [
        "Celestium brings aircraft architecture, energy, flight control and mission design into one research conversation. The MALUS program is where those questions meet; Taraka X-1 is the first aircraft concept that applies them to a specific purpose.",
        "Our technology library also explores tiltrotor and high-speed VTOL architectures through credited Bell references. Each architecture has its own trade-offs. Understanding the differences helps define our own work.",
      ],
    },
    priorities: [
      {
        title: "Aircraft architecture",
        text: "Explore how rotor orientation, wing lift, cabin layout and propulsion interact across hover and cruise.",
      },
      {
        title: "Energy integration",
        text: "Connect fuel storage, electrical power, thermal rejection and mission demand within one aircraft mass model.",
      },
      {
        title: "Digital understanding",
        text: "Make geometry, assumptions and uncertainty visible through connected analysis and interactive tools.",
      },
    ],
    feature: {
      title: "HSVTOL. Another way forward.",
      text: "Discover the folding-rotor concept and the technology questions behind a runway-independent high-speed aircraft.",
      image: bell("hsvtol-platform"),
      href: "/innovation/hsvtol",
      action: "Explore HSVTOL",
    },
    related: ["/products/tiltrotor", "/innovation/hydrogen-electric", "/innovation/digital-engineering"],
    faq: [
      {
        question: "Which technologies are part of Taraka X-1?",
        answer:
          "The current concept studies twin tilting ducts, hydrogen-electric energy and integrated flight control. HSVTOL folding rotors are a separate reference architecture, not a declared Taraka X-1 capability.",
      },
      {
        question: "Where can I inspect the assumptions?",
        answer:
          "The research page includes the design basis, an interactive diameter trade and downloadable technical resources. Open mass and integration questions remain visible there.",
      },
    ],
  }),
  make({
    path: "/innovation/hydrogen-electric",
    category: "Innovation",
    label: "Hydrogen-electric propulsion",
    title: "Energy for the journey.",
    subtitle:
      "A fuel cell for sustained cruise. A battery buffer for peak demand. One integrated electrical architecture.",
    image: concept("taraka-powertrain-cutaway-v1"),
    bell: false,
    overview: {
      title: "Follow the energy. Account for the system.",
      lead: "Hydrogen-electric propulsion is an aircraft integration problem.",
      paragraphs: [
        "The Taraka X-1 study proposes a fuel cell supplying sustained electrical power, with a battery buffer supporting the higher demand of vertical flight. The shared DC bus feeds the propulsion motors and aircraft systems.",
        "The complete architecture must account for the hydrogen vessel, fuel-cell balance of plant, power electronics and thermal management. The design-basis note explicitly retains unresolved storage mass and the need for integrated sizing.",
      ],
    },
    priorities: [
      {
        title: "Storage & handling",
        text: "Study liquid hydrogen, the vessel, insulation, venting and handling interfaces as a complete storage system.",
      },
      {
        title: "Power & reserves",
        text: "Connect flight-mode power demand to battery buffering, energy reserves and fault-tolerant electrical distribution.",
      },
      {
        title: "Heat & packaging",
        text: "Account for cooling flow, heat rejection, equipment volume and their effects on mass and drag.",
      },
    ],
    feature: {
      title: "The architecture, made visible.",
      text: "Explore the energy path, ducted propulsion and control interfaces of Taraka X-1 in the existing engineering presentation.",
      href: "/technology#energy",
      action: "Explore the energy system",
    },
    related: ["/innovation/autonomy", "/innovation/digital-engineering", "/support/flight-safety"],
    faq: [
      {
        question: "Is the aircraft fully electric?",
        answer:
          "The proposed propulsion motors are electrically driven. The energy study combines a hydrogen fuel cell and a battery buffer, rather than treating a battery as the sole mission energy store.",
      },
      {
        question: "Are the power and range values validated?",
        answer:
          "They are research design points and targets. The aircraft mass, hydrogen storage, thermal integration, mission reserves and performance must be reconciled and validated.",
      },
    ],
  }),
  make({
    path: "/innovation/autonomy",
    category: "Innovation",
    label: "Autonomy & flight control",
    title: "Control across every configuration.",
    subtitle:
      "Connect thrust, tilt and aerodynamic surfaces across the transition from vertical lift to wing-borne flight.",
    image: bell("tiltrotor-sunset"),
    bell: true,
    overview: {
      title: "A changing aircraft. A coordinated response.",
      lead: "Flight control must work with the entire configuration.",
      paragraphs: [
        "A tilting-lift aircraft changes the direction of propulsion as wing lift grows with forward speed. Those changes need coordinated control allocation, a defined flight envelope and a model that accounts for the aircraft’s mass properties.",
        "For Taraka X-1, the research begins with piloted mission requirements and the geometry of the twin ducts. Autonomy is a wider research topic; an autonomous operating capability is not claimed for the current aircraft concept.",
      ],
    },
    priorities: [
      {
        title: "Control allocation",
        text: "Study the roles of differential thrust, duct tilt and aerodynamic surfaces through hover, transition and cruise.",
      },
      {
        title: "Sensing & estimation",
        text: "Identify the aircraft states and sensor information required for a controllable, observable system.",
      },
      {
        title: "Fault response",
        text: "Define actuator, power and sensor failure cases before selecting a control architecture or operational envelope.",
      },
    ],
    feature: {
      title: "See the configuration change.",
      text: "Use the aircraft studio to inspect geometry and tilt angles. The viewer illustrates the concept while validated dynamics remain separate research work.",
      href: "/aircraft/studio",
      action: "Open the aircraft studio",
    },
    related: ["/innovation/digital-engineering", "/products/uncrewed", "/support/flight-safety"],
  }),
  make({
    path: "/innovation/digital-engineering",
    category: "Innovation",
    label: "Digital engineering",
    title: "Understand the aircraft before building it.",
    subtitle: "Bring geometry, mission assumptions and design trades into a connected research workflow.",
    image: bell("rotorcraft-wireframe"),
    bell: true,
    overview: {
      title: "One connected design conversation.",
      lead: "A useful model makes its assumptions inspectable.",
      paragraphs: [
        "The MALUS research presentation connects aircraft geometry, a duct-diameter trade, energy architecture and mission allocations. Together, they help readers understand what the concept is trying to achieve.",
        "The next step is a consistent aircraft model in which mass, aerodynamics, propulsion and mission energy share the same configuration. Digital engineering should expose dependencies and uncertainty, rather than hide them behind a finished-looking rendering.",
      ],
    },
    priorities: [
      {
        title: "Geometry & interfaces",
        text: "Keep propulsion placement, cabin access, system volumes and mass properties consistent across design studies.",
      },
      {
        title: "Analysis & sizing",
        text: "Connect diameter choices, power demand and mission assumptions to a reconciled integrated sizing model.",
      },
      {
        title: "Evidence & uncertainty",
        text: "Record model limitations, sensitivity to assumptions and the validation work required for each conclusion.",
      },
    ],
    feature: {
      title: "Explore a design trade.",
      text: "The diameter-study selector exposes how the nominal study changes with duct size. Follow the numbers back to the design basis.",
      href: "/research#design-basis",
      action: "Inspect the research",
    },
    related: ["/innovation/hydrogen-electric", "/innovation/autonomy", "/support/resources"],
  }),
  make({
    path: "/products/commercial",
    category: "Aircraft",
    label: "Commercial applications",
    title: "Designed around useful flight.",
    subtitle: "Explore civil aircraft applications through the lens of mission, access and aircraft systems.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "A mission before a specification.",
      lead: "The work begins with what an aircraft needs to do.",
      paragraphs: [
        "Business mobility, emergency care, offshore access and utility missions each define a different aircraft problem. Payload, reserve policy, cabin configuration and available infrastructure shape the architecture.",
        "Celestium’s current aircraft concept is Taraka X-1, dedicated to the medical air-ambulance mission. Other commercial applications appear as research perspectives within the wider MALUS platform study.",
      ],
    },
    priorities: [
      {
        title: "Mission definition",
        text: "Describe the complete journey, including both landing sites, payload changes, weather assumptions and alternates.",
      },
      {
        title: "Cabin & access",
        text: "Account for occupants, equipment and loading paths from the first aircraft layout.",
      },
      {
        title: "Operational fit",
        text: "Study infrastructure, support needs and approval pathways alongside aircraft performance.",
      },
    ],
    feature: {
      title: "Taraka X-1. Created for care.",
      text: "Meet the first MALUS aircraft concept and explore the hydrogen-electric architecture behind its dedicated medical cabin.",
      image: concept("taraka-medical-dusk-v2"),
      href: "/aircraft",
      action: "Discover Taraka X-1",
    },
    related: ["/missions/business", "/missions/energy", "/missions/utility"],
  }),
  make({
    path: "/products/utility",
    category: "Aircraft",
    label: "Utility platforms",
    title: "A platform for useful work.",
    subtitle: "Explore cargo, field research and mission installations within the wider MALUS architecture.",
    image: bell("utility-flight"),
    bell: true,
    overview: {
      title: "A common platform. Defined interfaces.",
      lead: "Modularity starts with the constraints that stay constant.",
      paragraphs: [
        "The wider MALUS studies consider cargo and research installations around common lift, energy and flight-control systems. Each module changes the payload and the mission; it also changes mass properties and service requirements.",
        "Those interfaces need to be specified before a module can be treated as interchangeable. Taraka X-1 retains its dedicated medical mission, while utility layouts remain broader platform investigations.",
      ],
    },
    priorities: [
      {
        title: "Structural attachment",
        text: "Define the load paths, attachment geometry and restraint required for each mission installation.",
      },
      {
        title: "Electrical services",
        text: "Identify power quality, connectors, isolation and data interfaces for mission equipment.",
      },
      {
        title: "Mass properties",
        text: "Keep payload location, loading access and the allowable centre-of-gravity envelope connected.",
      },
    ],
    feature: {
      title: "Explore the MALUS architecture.",
      text: "Compare medical, cargo and research installation studies within the common platform presentation.",
      href: "/program",
      action: "Explore the platform",
    },
    related: ["/missions/utility", "/missions/special-missions", "/innovation/digital-engineering"],
  }),
  make({
    path: "/products/uncrewed",
    category: "Aircraft",
    label: "Uncrewed systems",
    title: "A wider field of possibilities.",
    subtitle: "A research perspective on remotely operated and autonomous aircraft for useful missions.",
    image: bell("hsvtol-night"),
    bell: true,
    overview: {
      title: "Remove the crew. Redefine the requirements.",
      lead: "Uncrewed operation changes the aircraft system beyond the cabin.",
      paragraphs: [
        "An uncrewed platform requires a command-and-control concept, an operating environment and a defined response when communications or navigation are lost. The absence of an onboard pilot does not remove those requirements.",
        "Celestium treats uncrewed systems as a wider architecture topic. The current Taraka X-1 medical concept is a piloted design case; no autonomous fleet or operational service is announced here.",
      ],
    },
    priorities: [
      {
        title: "Mission & supervision",
        text: "Define who supervises the flight, how commands are issued and what conditions require intervention.",
      },
      {
        title: "Lost-link behaviour",
        text: "Study communication failures, navigation degradation and safe recovery within a specified operating environment.",
      },
      {
        title: "Payload integration",
        text: "Connect sensors, cargo or research equipment to power, data, structural and mass-property interfaces.",
      },
    ],
    feature: {
      title: "Control is the common thread.",
      text: "Explore the sensing, estimation and control questions that span piloted and uncrewed architectures.",
      href: "/innovation/autonomy",
      action: "Explore flight control",
    },
    related: ["/innovation/hsvtol", "/missions/special-missions", "/support/flight-safety"],
  }),
  make({
    path: "/missions/business",
    category: "Missions",
    label: "Business & regional mobility",
    title: "A different connection.",
    subtitle:
      "Explore how vertical flight could connect regions, workplaces and places beyond conventional airport access.",
    image: bell("business-flight"),
    bell: true,
    overview: {
      title: "Look at the complete journey.",
      lead: "Time in the air is one part of travel time.",
      paragraphs: [
        "Regional mobility studies need to account for ground access, boarding, infrastructure and the route between usable landing sites. Direct flight is valuable only within a practical door-to-door journey.",
        "For Celestium, this is a wider MALUS mission perspective. The commercial reference imagery shows Bell aircraft; it does not announce a Celestium passenger service or a business-aircraft product.",
      ],
    },
    priorities: [
      {
        title: "Access & infrastructure",
        text: "Identify usable landing sites, local access, ground transfer and the facilities required to support a route.",
      },
      {
        title: "Cabin & capacity",
        text: "Study occupant needs, baggage, accessibility and the effect of interior choices on the payload budget.",
      },
      {
        title: "Energy & economics",
        text: "Connect utilisation, reserves, maintenance and energy supply to a realistic route study.",
      },
    ],
    feature: {
      image: bell("cabin-interior"),
      title: "A platform begins with a purpose.",
      text: "Explore the MALUS architecture and see how a defined mission informs the systems that surround it.",
      href: "/program",
      action: "Discover MALUS",
    },
    related: ["/products/commercial", "/missions/energy", "/missions/adventure"],
  }),
  make({
    path: "/missions/energy",
    category: "Missions",
    label: "Energy & offshore",
    title: "Reach the places that power our world.",
    subtitle:
      "Explore the aircraft requirements behind offshore access, energy infrastructure and remote operations.",
    image: bell("tiltrotor-coast"),
    bell: true,
    overview: {
      title: "Beyond the coastline.",
      lead: "The return journey belongs in the design case.",
      paragraphs: [
        "Offshore missions combine distance, changing weather, constrained landing sites and a need for dependable reserves. Passenger or equipment payloads have to fit within that complete mission.",
        "Celestium uses offshore transport as a reference for aircraft-level trade-offs. The credited Bell aircraft imagery illustrates a separate technology reference; it does not establish offshore approval or capability for Taraka X-1.",
      ],
    },
    priorities: [
      {
        title: "Range & alternates",
        text: "Study outbound and return energy, time on station, diversion options and the selected reserve policy.",
      },
      {
        title: "Landing environment",
        text: "Account for deck geometry, wind, motion and ground handling within the mission requirements.",
      },
      {
        title: "Environmental resilience",
        text: "Consider corrosion, salt exposure, weather limits and maintainability in a marine environment.",
      },
    ],
    feature: {
      title: "Energy is an integrated system.",
      text: "Follow the hydrogen-electric architecture and the open storage and thermal questions in the Taraka X-1 study.",
      href: "/innovation/hydrogen-electric",
      action: "Explore the energy research",
    },
    related: ["/missions/search-and-rescue", "/products/commercial", "/support/maintenance"],
  }),
  make({
    path: "/missions/public-safety",
    category: "Missions",
    label: "Public safety",
    title: "A clearer view. A useful response.",
    subtitle:
      "A mission perspective on disaster assessment, observation and airborne support for communities.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "See the need. Define the response.",
      lead: "Public safety missions begin with a specific operational problem.",
      paragraphs: [
        "Observation, disaster mapping and firefighting support place different demands on sensors, crew, equipment and aircraft performance. A mission study needs to identify the intended role before selecting a configuration.",
        "Celestium’s public-safety pages are research perspectives. They describe requirements to investigate, rather than a deployed aviation unit, emergency service or approved aircraft capability.",
      ],
    },
    priorities: [
      {
        title: "Situation awareness",
        text: "Connect sensor field of view, data links, crew workload and information needed on the ground.",
      },
      {
        title: "Mission endurance",
        text: "Account for transit, time on station, payload power demand and the return journey.",
      },
      {
        title: "Community interface",
        text: "Study noise, landing-site access, coordination and the operating environment alongside performance.",
      },
    ],
    feature: {
      title: "A mission needs a complete brief.",
      text: "Use the local mission brief builder to capture the scenario, payload and questions for further research.",
      href: "/contact?topic=Public%20safety",
      action: "Create a mission brief",
    },
    related: [
      "/missions/search-and-rescue",
      "/missions/public-safety/starting-up",
      "/missions/public-safety/disaster-response",
    ],
  }),
  make({
    path: "/missions/search-and-rescue",
    category: "Missions",
    label: "Search & rescue",
    title: "Distance. Terrain. Time.",
    subtitle:
      "Explore the design requirements behind search, access and recovery in challenging environments.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "Design for the environment.",
      lead: "A rescue scenario connects access, visibility and payload.",
      paragraphs: [
        "Terrain, weather, altitude and the available landing surface shape a search-and-rescue aircraft study. Sensor coverage and endurance matter during search; access and equipment matter during recovery.",
        "The Taraka X-1 medical design case focuses on patient transport. Rescue, hoist operations and austere-site recovery would require additional equipment, analysis and approvals, and are not declared capabilities of that concept.",
      ],
    },
    priorities: [
      {
        title: "Search coverage",
        text: "Define the search area, sensor fit, crew tasking and time required on station.",
      },
      {
        title: "Site assessment",
        text: "Investigate obstacles, landing surface, wind, visibility and the need for alternate recovery methods.",
      },
      {
        title: "Patient transfer",
        text: "Connect recovery and cabin access to the wider transport and receiving-handover design case.",
      },
    ],
    feature: {
      title: "Care continues through the journey.",
      text: "Explore how the dedicated medical concept links aircraft, cabin and transfer design.",
      href: "/mission/operations",
      action: "Follow the medical journey",
    },
    related: ["/mission/cabin", "/missions/public-safety", "/support/flight-safety"],
  }),
  make({
    path: "/missions/utility",
    category: "Missions",
    label: "Utility & cargo",
    title: "Useful flight. Wherever the work is.",
    subtitle: "Cargo, field equipment and remote access as research cases within the MALUS architecture.",
    image: bell("utility-flight"),
    bell: true,
    overview: {
      title: "A payload with a purpose.",
      lead: "Cargo is a set of loads, interfaces and operating assumptions.",
      paragraphs: [
        "A utility study needs to define what is carried, how it is restrained, how it is loaded and where the aircraft must go. Payload location influences the centre of gravity; equipment power affects mission energy.",
        "The MALUS architecture explorer includes cargo and research layouts as wider program studies. They share the platform conversation while Taraka X-1 remains the dedicated medical aircraft concept.",
      ],
    },
    priorities: [
      {
        title: "Load & restraint",
        text: "Define payload dimensions, attachment, access and the structural loads produced by the installation.",
      },
      {
        title: "Remote infrastructure",
        text: "Account for site access, energy supply, handling equipment and support away from a base.",
      },
      {
        title: "Mission equipment",
        text: "Connect sensors or field instruments to electrical, data and mounting requirements.",
      },
    ],
    feature: {
      title: "Explore a common platform.",
      text: "Compare wider architecture studies and inspect the mission interfaces in the MALUS program.",
      href: "/program",
      action: "Explore mission modules",
    },
    related: ["/products/utility", "/missions/special-missions", "/missions/adventure"],
  }),
  make({
    path: "/missions/adventure",
    category: "Missions",
    label: "Remote exploration",
    title: "Beyond the familiar.",
    subtitle:
      "A research perspective on remote access, field science and the places that prompt new questions.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "Reach with a reason.",
      lead: "Remote access brings the infrastructure question into focus.",
      paragraphs: [
        "A field expedition may need to move instruments, supplies and a research team between sites with limited facilities. Weather, terrain and support logistics define the practical value of an aircraft.",
        "Celestium studies these requirements as a wider mission perspective. This page does not offer a travel service, expedition operation or approved aircraft for remote landings.",
      ],
    },
    priorities: [
      {
        title: "Field requirements",
        text: "Describe team size, equipment, time on site and the conditions required to preserve research data.",
      },
      {
        title: "Route & reserves",
        text: "Include the return payload, diversion options and energy supply at each location.",
      },
      {
        title: "Environmental care",
        text: "Consider landing access, noise, habitat disturbance and local constraints when defining a mission.",
      },
    ],
    feature: {
      title: "An aircraft around a mission.",
      text: "Explore how a common platform could accommodate different research installations.",
      href: "/products/utility",
      action: "Explore utility platforms",
    },
    related: ["/missions/utility", "/company/responsibility", "/innovation/hydrogen-electric"],
  }),
  make({
    path: "/missions/special-missions",
    category: "Missions",
    label: "Special missions",
    title: "When the mission asks for more.",
    subtitle:
      "Sensor integration, field research and specialised payloads within a common aircraft framework.",
    image: bell("utility-flight"),
    bell: true,
    overview: {
      title: "Define the installation.",
      lead: "Specialised payloads need explicit aircraft interfaces.",
      paragraphs: [
        "A sensor platform can impose vibration, field-of-view, cooling and electrical-power requirements. Those requirements affect the aircraft layout and the mission, and should be captured before the payload is selected.",
        "MALUS investigates mission installations as a research architecture. No military product, surveillance service or flight-approved special-mission configuration is announced by Celestium.",
      ],
    },
    priorities: [
      {
        title: "Sensors & mounting",
        text: "Connect view geometry, vibration isolation, attachment and calibration needs to the airframe.",
      },
      {
        title: "Power & data",
        text: "Define equipment loads, data storage, links and the thermal consequences of the payload.",
      },
      {
        title: "Mission envelope",
        text: "Study operating altitude, endurance, route geometry and reserve assumptions for the specific task.",
      },
    ],
    feature: {
      title: "Make the interfaces visible.",
      text: "The aircraft studio includes a research installation perspective within the wider platform studies.",
      href: "/aircraft/studio",
      action: "Open the research configuration",
    },
    related: ["/products/uncrewed", "/missions/utility", "/innovation/digital-engineering"],
  }),
  make({
    path: "/missions/training",
    category: "Missions",
    label: "Training & simulation",
    title: "Understanding before operating.",
    subtitle: "A research perspective on flight-mode awareness, simulation and aircraft-system knowledge.",
    image: bell("cockpit-empty"),
    bell: true,
    overview: {
      title: "A changing aircraft needs a clear mental model.",
      lead: "Training requirements belong in the architecture study.",
      paragraphs: [
        "Pilots and technicians would need to understand the relationship between flight mode, propulsion, energy demand and system state. A tilting-lift architecture makes those relationships especially important.",
        "Celestium’s interactive tools explain the concept and its assumptions. They are not approved pilot training, a flight simulator or a qualification program.",
      ],
    },
    priorities: [
      {
        title: "Configuration awareness",
        text: "Explain how hover, transition and cruise change the propulsion and aerodynamic roles.",
      },
      {
        title: "System understanding",
        text: "Connect electrical power, energy reserves and thermal state to mission demands.",
      },
      {
        title: "Failure-case learning",
        text: "Develop training requirements around the failure and recovery cases identified by safety analysis.",
      },
    ],
    feature: {
      title: "Start with the geometry.",
      text: "Inspect hover, transition and cruise configurations in the interactive aircraft studio.",
      href: "/aircraft/studio",
      action: "Explore flight modes",
    },
    related: ["/support/training", "/support/training/pilot", "/support/training/technical"],
  }),
  make({
    path: "/support",
    category: "Support",
    label: "Support & lifecycle",
    title: "Think beyond takeoff.",
    subtitle: "Supportability, maintenance and safety as design requirements from the beginning.",
    image: bell("rotor-detail"),
    bell: true,
    overview: {
      title: "The complete aircraft lifecycle.",
      lead: "Useful flight depends on the systems around the aircraft.",
      paragraphs: [
        "Inspection access, replaceable equipment, technical documentation and training all influence an aircraft’s usefulness. They should enter the design while the architecture is still flexible.",
        "Celestium’s support pages describe research priorities and a lifecycle design philosophy. They do not represent a certified service organisation, a fielded fleet or operating service centres.",
      ],
    },
    priorities: [
      {
        title: "Maintainability",
        text: "Study inspection coverage, equipment access and the work needed to replace major subsystems.",
      },
      {
        title: "Safety & knowledge",
        text: "Connect hazard analysis to documentation, training requirements and a defined operating envelope.",
      },
      {
        title: "Evolving systems",
        text: "Specify interfaces that make configuration control and future upgrades understandable.",
      },
    ],
    feature: {
      title: "Support starts in the layout.",
      text: "Explore the rotor, tilt mechanism, electrical and hydrogen-system interfaces that will shape maintenance research.",
      href: "/support/maintenance",
      action: "Explore maintainability",
    },
    related: ["/support/training", "/support/flight-safety", "/support/resources"],
  }),
  make({
    path: "/support/maintenance",
    category: "Support",
    label: "Maintainability",
    title: "Designed to be understood. Designed to be accessed.",
    subtitle: "Inspection, component access and replacement as part of the aircraft architecture.",
    image: bell("rotor-detail"),
    bell: true,
    overview: {
      title: "Access is an engineering choice.",
      lead: "A system that fits still needs to be supported.",
      paragraphs: [
        "Packaging studies should consider how motors, actuators, fuel-cell equipment and power electronics can be inspected and removed. The maintenance path can influence the same layout as the mission path.",
        "For Taraka X-1, the next work includes tilt-system access, high-energy electrical isolation, hydrogen interfaces and a defined inspection concept. These are design investigations, not maintenance instructions.",
      ],
    },
    priorities: [
      {
        title: "Tilt & lift systems",
        text: "Study actuator access, bearing inspection, duct structure and wiring routes through moving interfaces.",
      },
      {
        title: "Energy isolation",
        text: "Define research requirements for safe isolation of electrical and hydrogen equipment before inspection.",
      },
      {
        title: "Replaceable modules",
        text: "Identify subsystem boundaries and removal paths while retaining configuration and mass-property records.",
      },
    ],
    feature: {
      title: "Maintenance requirements belong in the model.",
      text: "Connect supportability questions to the digital aircraft layout and research assumptions.",
      href: "/innovation/digital-engineering",
      action: "Explore digital engineering",
    },
    related: [
      "/support/maintenance/blades",
      "/support/maintenance/composites",
      "/support/maintenance/spares",
    ],
  }),
  make({
    path: "/support/training",
    category: "Support",
    label: "Training research",
    title: "Knowledge for every configuration.",
    subtitle: "Understanding the aircraft, the mission and the systems that connect them.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    overview: {
      title: "Learning starts with a clear aircraft model.",
      lead: "Training should follow the system’s actual responsibilities.",
      paragraphs: [
        "Pilot, technician and mission-team knowledge each address a different interface with the aircraft. Flight-mode awareness, isolation, loading and equipment status need to be defined in the research requirements.",
        "The website offers explanatory models and technical notes. Celestium does not provide approved courses, training academies, certificates or flight qualifications.",
      ],
    },
    priorities: [
      {
        title: "Pilot perspective",
        text: "Connect configuration awareness, aircraft limits and energy state to a future training requirements study.",
      },
      {
        title: "Technical perspective",
        text: "Explain subsystem architecture and identify the documentation needed for inspection and isolation.",
      },
      {
        title: "Mission-team perspective",
        text: "Study loading, cabin services and communication requirements around a defined mission installation.",
      },
    ],
    feature: {
      title: "Inspect the aircraft. Ask the next question.",
      text: "The on-demand studio connects geometry and flight modes for a visual introduction to Taraka X-1.",
      href: "/aircraft/studio",
      action: "Open the learning tool",
    },
    related: ["/support/training/pilot", "/support/training/technical", "/support/training/mission"],
  }),
  make({
    path: "/support/flight-safety",
    category: "Support",
    label: "Flight safety research",
    title: "Safety is part of the architecture.",
    subtitle: "A defined envelope, explicit hazards and a validation plan for the complete aircraft system.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "Begin with the hazards.",
      lead: "Safety analysis should shape the configuration.",
      paragraphs: [
        "Propulsion, energy storage, flight control and mission equipment interact. A failure in one system can change the demands on another, so the analysis needs an aircraft-level view.",
        "Taraka X-1 remains a concept-development study. This page sets out research priorities and does not provide operational safety guidance, emergency procedures or a certification claim.",
      ],
    },
    priorities: [
      {
        title: "System hazards",
        text: "Identify failures, interactions and recovery requirements across propulsion, energy, control and mission systems.",
      },
      {
        title: "Operating envelope",
        text: "Define the environmental and aircraft-state limits that the analysis must address.",
      },
      {
        title: "Validation evidence",
        text: "Connect modelling, component tests and eventual integrated tests to specific research claims.",
      },
    ],
    feature: {
      title: "Targets need evidence.",
      text: "Review the current assumptions, sizing cases and validation questions in the public design basis.",
      href: "/research#design-basis",
      action: "Read the design basis",
    },
    related: ["/innovation/autonomy", "/innovation/hydrogen-electric", "/support/training"],
  }),
  make({
    path: "/support/upgrades",
    category: "Support",
    label: "Upgrade philosophy",
    title: "An architecture that can evolve.",
    subtitle: "Configuration control, explicit interfaces and a research path for changing mission systems.",
    image: bell("rotor-detail"),
    bell: true,
    overview: {
      title: "Change the system. Keep the dependencies visible.",
      lead: "An upgrade is an aircraft-level change.",
      paragraphs: [
        "New equipment can affect electrical load, cooling, mass properties and mission performance. A defined interface makes those consequences easier to inspect; it does not make them disappear.",
        "The MALUS modular-platform study is an opportunity to specify those interfaces early. No approved retrofit, warranty plan or commercial upgrade package is offered here.",
      ],
    },
    priorities: [
      {
        title: "Interface definition",
        text: "Document structural, electrical, data and environmental limits for each subsystem boundary.",
      },
      {
        title: "Configuration records",
        text: "Keep model versions, installed equipment and analysis assumptions aligned.",
      },
      {
        title: "Revalidation",
        text: "Identify which aircraft-level conclusions need to be revisited when a subsystem changes.",
      },
    ],
    feature: {
      title: "One platform. Purpose-led installations.",
      text: "Explore the architectural studies that connect a common systems framework to different mission needs.",
      href: "/program",
      action: "Explore the platform",
    },
    related: ["/innovation/digital-engineering", "/support/maintenance", "/products/utility"],
  }),
  make({
    path: "/company",
    category: "Company",
    label: "About Celestium",
    title: "A horizon worth pursuing.",
    subtitle:
      "Celestium is a research initiative exploring a new era of vertical flight, with a purpose for every aircraft.",
    image: concept("taraka-dawn-v2"),
    bell: false,
    overview: {
      title: "Aircraft research. Mission-driven engineering.",
      lead: "We begin with the reason to fly.",
      paragraphs: [
        "Celestium brings the MALUS research program and Taraka X-1 into a wider presentation of vertical-flight possibilities. The work connects architecture, propulsion, energy and mission requirements.",
        "Our first aircraft concept is a medical air ambulance. Its dedicated cabin and hydrogen-electric study give the research a concrete design case, while a broader technology library helps explore related architectures.",
      ],
    },
    priorities: [
      {
        title: "Purpose",
        text: "Keep the mission visible through every choice of platform, payload and system architecture.",
      },
      {
        title: "Clarity",
        text: "Expose assumptions and distinguish research targets, reference technology and validated evidence.",
      },
      {
        title: "Curiosity",
        text: "Use models, design trades and disciplined questions to understand what the next aircraft could be.",
      },
    ],
    feature: {
      title: "Meet the MALUS program.",
      text: "Modular Aerial Lift Utility System connects common lift, energy and control systems to purpose-led aircraft studies.",
      href: "/program",
      action: "Explore our research program",
    },
    related: ["/company/approach", "/company/responsibility", "/company/partners"],
  }),
  make({
    path: "/company/approach",
    category: "Company",
    label: "Our approach",
    title: "Make the questions visible.",
    subtitle:
      "A research approach built around explicit assumptions, connected systems and reviewable evidence.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    overview: {
      title: "Understand before claiming.",
      lead: "A compelling concept is the beginning of the work.",
      paragraphs: [
        "Celestium uses concept imagery and interactive tools to explain aircraft ideas. The design basis, technical notes and model limitations provide the context needed to assess them.",
        "Our approach is to connect the mission with integrated sizing, identify uncertainties and prioritise the validation work that changes the most important conclusions.",
      ],
    },
    priorities: [
      {
        title: "Define the case",
        text: "Record payload, route, reserves, environmental assumptions and the intended aircraft role.",
      },
      {
        title: "Connect the systems",
        text: "Reconcile mass, geometry, aerodynamics, power and energy within one configuration.",
      },
      {
        title: "Test the assumptions",
        text: "Use sensitivity analysis and targeted validation to distinguish promising choices from unsupported claims.",
      },
    ],
    feature: {
      title: "A target is a starting point.",
      text: "Read our research note on the relationship between performance ambition and evidence.",
      href: "/journal/a-target-is-a-starting-point",
      action: "Read the research note",
    },
    related: ["/innovation/digital-engineering", "/support/flight-safety", "/company/partners"],
  }),
  make({
    path: "/company/responsibility",
    category: "Company",
    label: "Responsibility",
    title: "Consider the world beneath the flight.",
    subtitle:
      "Environmental effects, community needs and transparent research as part of the aircraft conversation.",
    image: bell("rotorcraft-alps"),
    bell: true,
    overview: {
      title: "Useful flight has a wider context.",
      lead: "An aircraft design exists within a community and an environment.",
      paragraphs: [
        "Noise, energy supply, resource use, landing access and habitat effects influence where vertical flight can be useful. Those considerations should be visible while the concept is being defined.",
        "Hydrogen-electric propulsion does not by itself establish an environmental benefit. Production pathways, infrastructure, materials and the full mission need to be considered before making lifecycle claims.",
      ],
    },
    priorities: [
      {
        title: "Community access",
        text: "Study the intended benefit, landing-site context, accessibility and the effects of operations near communities.",
      },
      {
        title: "Environmental evidence",
        text: "Account for energy origin, noise, material choices and lifecycle boundaries when evaluating a concept.",
      },
      {
        title: "Research transparency",
        text: "Keep uncertainties and limitations available alongside design targets and illustrative imagery.",
      },
    ],
    feature: {
      title: "Care is the first design case.",
      text: "Explore the medical mission that gives Taraka X-1 its purpose.",
      href: "/mission",
      action: "Discover the medical mission",
    },
    related: ["/innovation/hydrogen-electric", "/company/approach", "/missions/adventure"],
  }),
  make({
    path: "/company/partners",
    category: "Company",
    label: "Research collaborations",
    title: "Connect the disciplines.",
    subtitle:
      "A space for conversations across aircraft design, electrical systems, controls and mission research.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    overview: {
      title: "Better questions cross boundaries.",
      lead: "The aircraft problem connects many kinds of expertise.",
      paragraphs: [
        "Aerodynamics, structures, hydrogen systems, electrical power, thermal engineering and flight control each influence the same aircraft. Mission researchers add requirements that can change the preferred architecture.",
        "Celestium welcomes research conversations through a locally generated enquiry brief. The website does not claim existing university, hospital or industry partnerships.",
      ],
    },
    priorities: [
      {
        title: "Technical research",
        text: "Bring a defined question, an analysis method and the assumptions needed to evaluate the result.",
      },
      {
        title: "Mission research",
        text: "Connect a real use case to payload, access, infrastructure and operating-environment requirements.",
      },
      {
        title: "Review & critique",
        text: "Inspect the current design basis and identify where a different assumption would change the conclusion.",
      },
    ],
    feature: {
      title: "Start with a research brief.",
      text: "Capture your area of interest and proposed question in a document you can review and share.",
      href: "/contact?topic=Research%20collaboration",
      action: "Create an enquiry brief",
    },
    related: ["/careers/students", "/research", "/company/approach"],
  }),
  make({
    path: "/careers",
    category: "Company",
    label: "Work with Celestium",
    title: "Find your trajectory.",
    subtitle:
      "Explore the disciplines behind a vertical-flight research program and prepare a collaboration enquiry.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    overview: {
      title: "A place for the next question.",
      lead: "Aircraft research rewards curiosity across disciplines.",
      paragraphs: [
        "The MALUS concept spans aircraft geometry, electrical power, controls, thermal systems and mission design. Each offers questions that students, researchers and engineers can help examine.",
        "These pages describe areas of contribution, not advertised vacancies or paid employment offers. Use the enquiry brief builder to prepare your interests and proposed research question.",
      ],
    },
    priorities: [
      {
        title: "Engineering",
        text: "Investigate propulsion integration, structures, systems sizing or flight-control concepts.",
      },
      {
        title: "Students & researchers",
        text: "Define a focused analysis, model comparison, literature review or mission study.",
      },
      {
        title: "Operations & communication",
        text: "Improve the clarity of mission assumptions, documentation and the research presentation.",
      },
    ],
    feature: {
      title: "The work starts with a question.",
      text: "Explore the engineering disciplines and identify a research area that fits your interests.",
      href: "/careers/engineering",
      action: "Explore engineering",
    },
    related: ["/careers/engineering", "/careers/students", "/careers/operations"],
  }),
  make({
    path: "/suppliers",
    category: "Collaboration",
    label: "Supplier collaboration",
    title: "Interfaces that connect the aircraft.",
    subtitle:
      "A research perspective on component requirements, quality and responsible technical collaboration.",
    image: bell("rotor-detail"),
    bell: true,
    overview: {
      title: "Specify the requirement before the component.",
      lead: "A supplier interface should make the aircraft constraints clear.",
      paragraphs: [
        "A component study needs electrical, mechanical, thermal and environmental requirements. It also needs a clear statement of the aircraft assumptions that produced them.",
        "Celestium does not operate a production procurement portal or announce supplier contracts. These pages set out the kinds of information needed for a future research component evaluation.",
      ],
    },
    priorities: [
      {
        title: "Technical interfaces",
        text: "Define load cases, electrical characteristics, cooling and installation geometry for a candidate subsystem.",
      },
      {
        title: "Quality & traceability",
        text: "Record component identity, test evidence, revision history and the assumptions used in analysis.",
      },
      {
        title: "Data & responsibility",
        text: "Protect technical information and clarify its intended use before sharing a research package.",
      },
    ],
    feature: {
      title: "Build a reviewable component enquiry.",
      text: "Capture the technical question and relevant constraints in a local brief before approaching a potential collaborator.",
      href: "/contact?topic=Supplier%20research",
      action: "Prepare an enquiry",
    },
    related: ["/suppliers/quality", "/suppliers/cybersecurity", "/suppliers/terms"],
  }),
];

// Smaller supporting topics keep their own requirements, rather than borrowing claims from a fielded aircraft organisation.
type Supporting = {
  path: string;
  category: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  bell?: boolean;
  lead: string;
  paragraphs: string[];
  priorities: { title: string; text: string }[];
  related: string[];
  actionHref: string;
  action: string;
};
const SUPPORTING: Supporting[] = [
  {
    path: "/support/maintenance/blades",
    category: "Support",
    label: "Rotor & blade research",
    title: "Understand the rotating system.",
    subtitle: "A research perspective on blade loads, inspection and the structure of ducted lift.",
    image: bell("rotor-detail"),
    lead: "The blade, duct and support structure form an integrated lift system.",
    paragraphs: [
      "The Taraka X-1 geometry includes coaxial blade sets within shrouded propulsion units. Their structural loads, clearances and inspection requirements need to be studied together.",
      "This page outlines research requirements. It does not provide blade-repair instructions, inspection intervals or approved maintenance data.",
    ],
    priorities: [
      {
        title: "Loads & vibration",
        text: "Define aerodynamic and inertial load cases, dynamic behaviour and the sensitivity to operating conditions.",
      },
      {
        title: "Clearance & access",
        text: "Study blade-tip clearance, duct distortion and the access needed to inspect the rotating system.",
      },
      {
        title: "Damage & evidence",
        text: "Identify failure and damage cases that would require material tests and structural validation.",
      },
    ],
    related: ["/support/maintenance", "/support/maintenance/composites", "/technology"],
    actionHref: "/technology#ducted-lift",
    action: "Explore ducted lift",
  },
  {
    path: "/support/maintenance/composites",
    category: "Support",
    label: "Composite structures",
    title: "Materials with a mission.",
    subtitle: "Structural requirements, inspection access and material evidence for an aircraft concept.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    lead: "A material choice needs a load case and an inspection concept.",
    paragraphs: [
      "Composite structures can influence aircraft mass and geometry, but the result depends on laminate design, joints, manufacturing quality and damage tolerance.",
      "MALUS is not a defined manufacturing design. Material selection, structural sizing and inspection requirements remain research work.",
    ],
    priorities: [
      {
        title: "Load paths",
        text: "Connect wing, duct, fuselage and mission-installation loads to a consistent structural model.",
      },
      {
        title: "Joints & interfaces",
        text: "Define attachment and access at subsystem boundaries before selecting a material architecture.",
      },
      {
        title: "Inspection evidence",
        text: "Study damage visibility, test requirements and the methods needed to assess structural condition.",
      },
    ],
    related: ["/support/maintenance/blades", "/innovation/digital-engineering", "/support/flight-safety"],
    actionHref: "/research",
    action: "Inspect the design basis",
  },
  {
    path: "/support/maintenance/spares",
    category: "Support",
    label: "Replaceable systems",
    title: "A component. A clear boundary.",
    subtitle: "A research approach to subsystem replacement, identification and configuration records.",
    image: bell("rotor-detail"),
    lead: "Replacement should be understandable in the aircraft model.",
    paragraphs: [
      "Replaceable equipment needs an installation boundary, a removal path and a record of its effect on the aircraft configuration. Electrical and hydrogen interfaces add isolation requirements.",
      "Celestium does not sell spare parts or support a fielded fleet. The research focus is how subsystem boundaries can improve a future support concept.",
    ],
    priorities: [
      {
        title: "Access paths",
        text: "Identify what must be removed to reach a subsystem and how the replacement affects nearby equipment.",
      },
      {
        title: "Identification",
        text: "Keep equipment versions, performance assumptions and mass records aligned.",
      },
      {
        title: "Verification",
        text: "Define which checks would be needed after a configuration change, informed by safety analysis.",
      },
    ],
    related: ["/support/upgrades", "/support/resources", "/support/maintenance"],
    actionHref: "/innovation/digital-engineering",
    action: "Explore configuration thinking",
  },
  {
    path: "/support/training/pilot",
    category: "Support",
    label: "Pilot training studies",
    title: "Understand the flight state.",
    subtitle: "Configuration, energy and control awareness as future training requirements.",
    image: bell("cockpit-empty"),
    bell: true,
    lead: "A flight mode describes the state of the whole aircraft.",
    paragraphs: [
      "The pilot perspective connects aircraft attitude, propulsion tilt, control authority and available energy. A future training concept must follow a validated aircraft model and operating envelope.",
      "The geometry viewer explains the research concept. It is not a pilot simulator, flight manual or approved training course.",
    ],
    priorities: [
      {
        title: "Flight-mode awareness",
        text: "Explain the changing roles of rotor thrust and wing lift during hover, transition and cruise.",
      },
      {
        title: "Energy awareness",
        text: "Connect reserve assumptions and peak power demand to aircraft-state information.",
      },
      {
        title: "Failure cases",
        text: "Identify training requirements from aircraft-level hazards and recovery analysis.",
      },
    ],
    related: ["/missions/training", "/innovation/autonomy", "/support/flight-safety"],
    actionHref: "/aircraft/studio",
    action: "Inspect the flight configurations",
  },
  {
    path: "/support/training/technical",
    category: "Support",
    label: "Technical training studies",
    title: "Know the systems. Understand the interfaces.",
    subtitle: "A research view of the knowledge needed around a hydrogen-electric aircraft.",
    image: bell("rotor-detail"),
    lead: "Technical understanding follows the architecture.",
    paragraphs: [
      "Motors, power electronics, energy storage and cooling each require a clear explanation of their interfaces and states. Maintenance access must be understood alongside isolation.",
      "These are future documentation and training requirements. Celestium does not issue technical qualifications or approved maintenance procedures.",
    ],
    priorities: [
      {
        title: "Architecture knowledge",
        text: "Explain how the fuel cell, battery, electrical bus, motors and cooling systems interact.",
      },
      {
        title: "Isolation requirements",
        text: "Identify the system states and access constraints that safety analysis must address.",
      },
      {
        title: "Configuration records",
        text: "Connect equipment revisions and installation details to the aircraft’s technical documentation.",
      },
    ],
    related: ["/support/maintenance", "/innovation/hydrogen-electric", "/support/resources"],
    actionHref: "/technology",
    action: "Explore the systems",
  },
  {
    path: "/support/training/mission",
    category: "Support",
    label: "Mission-team studies",
    title: "A shared understanding of the mission.",
    subtitle: "Loading, equipment and communication requirements around a dedicated installation.",
    image: concept("medical-cabin-cutaway-v1"),
    bell: false,
    lead: "The cabin is part of the aircraft system.",
    paragraphs: [
      "The Taraka X-1 medical study connects clinical working space, equipment attachment and patient access. A future mission-team training concept would need to follow a validated cabin and operation.",
      "The cabin illustrations are explanatory design studies. They do not provide clinical procedures, operational checklists or staffing recommendations.",
    ],
    priorities: [
      {
        title: "Access & loading",
        text: "Study the loading path, restraint requirements and communication around a transfer.",
      },
      {
        title: "Equipment interfaces",
        text: "Define the electrical services, mounting and status information required by the mission installation.",
      },
      {
        title: "Task coordination",
        text: "Connect cabin roles and communication needs to the full transfer design case.",
      },
    ],
    related: ["/mission/cabin", "/mission/operations", "/support/training"],
    actionHref: "/mission/cabin",
    action: "Explore the cabin study",
  },
  {
    path: "/missions/public-safety/starting-up",
    category: "Missions",
    label: "Aviation-unit planning",
    title: "Start with the operational question.",
    subtitle: "A research brief for understanding an airborne public-safety requirement.",
    image: bell("city-aerial"),
    lead: "Define the task before the aircraft.",
    paragraphs: [
      "An aviation-unit study needs to identify which information or response the organisation is missing. That defines the sensor, crew, aircraft and coordination requirements.",
      "Celestium offers a framework for a mission research brief, not advice to launch an operational emergency service.",
    ],
    priorities: [
      {
        title: "The use case",
        text: "Identify the recurring task, current limitations and information needed by teams on the ground.",
      },
      {
        title: "The support model",
        text: "Account for personnel, documentation, training, maintenance and infrastructure.",
      },
      {
        title: "The evidence",
        text: "Define the measurements needed to assess whether airborne support changes the outcome.",
      },
    ],
    related: ["/missions/public-safety", "/support/training", "/support/flight-safety"],
    actionHref: "/contact?topic=Aviation%20unit%20research",
    action: "Create a planning brief",
  },
  {
    path: "/missions/public-safety/disaster-response",
    category: "Missions",
    label: "Disaster-response studies",
    title: "Clarity when conditions change.",
    subtitle: "Observation, access and coordination as design requirements in a disaster-response scenario.",
    image: bell("rotorcraft-alps"),
    lead: "A changing environment needs a well-defined role.",
    paragraphs: [
      "A disaster-response aircraft study may focus on mapping, communications support, transport or infrastructure assessment. Each requires a different payload and mission profile.",
      "These pages explore research scenarios. They do not represent an emergency service or provide disaster-response instructions.",
    ],
    priorities: [
      {
        title: "Information needs",
        text: "Define the data required, the area to cover and the route from airborne sensor to ground decision-maker.",
      },
      {
        title: "Operating context",
        text: "Study visibility, obstacles, landing access and coordination within the scenario.",
      },
      {
        title: "Support endurance",
        text: "Connect time on station, payload power and replenishment to the wider mission.",
      },
    ],
    related: ["/missions/public-safety", "/missions/search-and-rescue", "/products/uncrewed"],
    actionHref: "/contact?topic=Disaster%20response%20study",
    action: "Prepare a mission brief",
  },
  {
    path: "/careers/engineering",
    category: "Company",
    label: "Engineering contributions",
    title: "Bring an engineering question.",
    subtitle: "Explore aircraft, electrical, thermal and control-system research within MALUS.",
    image: concept("taraka-powertrain-cutaway-v1"),
    bell: false,
    lead: "The best contribution starts with a defined problem.",
    paragraphs: [
      "The current concept leaves open integrated sizing, storage mass, transition aerodynamics and thermal management. Those questions can be approached through analysis, literature review and model comparison.",
      "This is a research collaboration page, not an advertised engineering vacancy or employment offer.",
    ],
    priorities: [
      {
        title: "Aircraft & structures",
        text: "Investigate geometry, load paths, aerodynamics or the sensitivity of sizing assumptions.",
      },
      {
        title: "Electrical & energy",
        text: "Study power distribution, fuel-cell integration, battery buffering and thermal limits.",
      },
      {
        title: "Controls & modelling",
        text: "Explore control allocation, state estimation and the connection between aircraft models.",
      },
    ],
    related: ["/careers/students", "/company/partners", "/innovation/digital-engineering"],
    actionHref: "/contact?topic=Engineering%20research",
    action: "Prepare a research enquiry",
  },
  {
    path: "/careers/students",
    category: "Company",
    label: "Students & researchers",
    title: "A focused question can go a long way.",
    subtitle: "Explore student-sized research questions with clear assumptions and a reviewable result.",
    image: concept("taraka-hangar-v1"),
    bell: false,
    lead: "Choose a question that can be examined with the available evidence.",
    paragraphs: [
      "A literature comparison, sensitivity study or subsystem model can contribute useful understanding without requiring a complete aircraft prototype. The scope should be explicit and the result reproducible.",
      "Celestium does not announce internships, stipends or university agreements. This page helps prepare a research collaboration enquiry.",
    ],
    priorities: [
      {
        title: "Define a scope",
        text: "Identify one question, a method, the inputs needed and the limits of the expected result.",
      },
      {
        title: "Use the design basis",
        text: "Begin with the published assumptions and record where your study uses a different case.",
      },
      {
        title: "Make it reproducible",
        text: "Keep model inputs, sources and analysis steps available for review.",
      },
    ],
    related: ["/research", "/careers/engineering", "/company/approach"],
    actionHref: "/contact?topic=Student%20research",
    action: "Create a student research brief",
  },
  {
    path: "/careers/operations",
    category: "Company",
    label: "Mission & documentation contributions",
    title: "Connect the aircraft to its purpose.",
    subtitle: "Mission definition, research documentation and the clarity of the aircraft presentation.",
    image: concept("taraka-medical-dusk-v2"),
    bell: false,
    lead: "A clear design case is an engineering contribution.",
    paragraphs: [
      "Mission requirements and technical communication influence how a concept is understood. A route study, payload definition or assumption audit can reveal issues that a rendering does not.",
      "This page describes areas of collaboration. It does not advertise an operations vacancy or an operational aviation role.",
    ],
    priorities: [
      {
        title: "Mission definition",
        text: "Describe a complete scenario with payload, infrastructure, reserves and environmental assumptions.",
      },
      {
        title: "Documentation",
        text: "Improve the connection between design claims, model inputs and technical references.",
      },
      {
        title: "Research communication",
        text: "Help make uncertainty and trade-offs approachable without implying validated capability.",
      },
    ],
    related: ["/missions", "/company/approach", "/company/partners"],
    actionHref: "/contact?topic=Mission%20research",
    action: "Prepare a collaboration enquiry",
  },
  {
    path: "/suppliers/quality",
    category: "Collaboration",
    label: "Quality & traceability",
    title: "Evidence that follows the component.",
    subtitle: "Requirements, revisions and test evidence as part of a research component study.",
    image: bell("rotor-detail"),
    lead: "Traceability makes a technical claim reviewable.",
    paragraphs: [
      "A candidate component needs an identity, revision and performance evidence that match the aircraft assumptions. Test conditions should remain visible when a result enters a model.",
      "These are research information requirements, not a supplier approval program, audit certification or production quality manual.",
    ],
    priorities: [
      {
        title: "Requirements",
        text: "Record the environmental, electrical, mechanical and thermal conditions the component must meet.",
      },
      {
        title: "Revision control",
        text: "Link component versions and test evidence to the model using them.",
      },
      {
        title: "Test context",
        text: "Keep measured conditions and limitations attached to every performance result.",
      },
    ],
    related: ["/suppliers", "/support/upgrades", "/innovation/digital-engineering"],
    actionHref: "/contact?topic=Component%20research",
    action: "Prepare a component brief",
  },
  {
    path: "/suppliers/cybersecurity",
    category: "Collaboration",
    label: "Technical data stewardship",
    title: "Clear boundaries for technical information.",
    subtitle: "A research perspective on data access, intended use and responsible collaboration.",
    image: bell("city-aerial"),
    lead: "Technical collaboration starts with an agreed information boundary.",
    paragraphs: [
      "A research package should identify which information is public, who needs access and the purpose of sharing it. Credentials and private files do not belong in a public concept presentation.",
      "The local enquiry builder creates a file on your device. It does not send technical data to Celestium or a third-party service.",
    ],
    priorities: [
      {
        title: "Data classification",
        text: "Identify the information being shared and distinguish public assumptions from private technical material.",
      },
      {
        title: "Access purpose",
        text: "Agree the intended analysis and recipients before transferring a research package.",
      },
      {
        title: "Configuration integrity",
        text: "Record file versions and sources so the analysis can be reviewed consistently.",
      },
    ],
    related: ["/suppliers", "/legal/privacy", "/support/resources"],
    actionHref: "/contact?topic=Technical%20collaboration",
    action: "Prepare a collaboration brief",
  },
  {
    path: "/suppliers/terms",
    category: "Collaboration",
    label: "Collaboration principles",
    title: "A clear purpose for a technical conversation.",
    subtitle: "Scope, evidence and intended use before a research collaboration develops.",
    image: bell("rotor-detail"),
    lead: "A research enquiry does not establish a contract.",
    paragraphs: [
      "The enquiry builder is a preparation tool. It captures a proposed topic and requirements for the sender to review and share through a separately agreed channel.",
      "Celestium’s website does not create supplier contracts, purchase orders, licensing agreements or confidentiality commitments.",
    ],
    priorities: [
      {
        title: "Research scope",
        text: "Describe the question, methods, assumptions and expected deliverable before beginning work.",
      },
      {
        title: "Source ownership",
        text: "Keep ownership, source attribution and permitted use clear for shared technical material.",
      },
      {
        title: "Separate agreements",
        text: "Any formal collaboration needs its own agreed terms outside this website.",
      },
    ],
    related: ["/suppliers/quality", "/suppliers/cybersecurity", "/company/partners"],
    actionHref: "/contact?topic=Research%20collaboration",
    action: "Prepare a research enquiry",
  },
];
for (const p of SUPPORTING)
  FLIGHT_PAGES.push({
    ...p,
    bell: p.bell ?? true,
    overview: { title: p.title, lead: p.lead, paragraphs: p.paragraphs },
    feature: {
      title: "Continue the research.",
      text: "Connect this question to the wider aircraft architecture, mission requirements and current design basis.",
      href: p.actionHref,
      action: p.action,
    },
    related: p.related,
  });
export const findFlightPage = (path: string) => FLIGHT_PAGES.find((page) => page.path === path);
