export type JournalArticle = {
  slug: string;
  title: string;
  category: "Technology" | "Mission design" | "Research";
  excerpt: string;
  image: string;
  bell: boolean;
  readTime: string;
  sections: { heading: string; paragraphs: string[] }[];
  related: { label: string; href: string }[];
};
const ARTICLES: JournalArticle[] = [
  {
    slug: "the-tiltrotor-perspective",
    title: "The tiltrotor perspective",
    category: "Technology",
    excerpt: "What changes when one aircraft can lift vertically and cruise on a wing?",
    image: "/media/bell/tiltrotor-coast.webp",
    bell: true,
    readTime: "4 min",
    sections: [
      {
        heading: "Two flight regimes. One aircraft.",
        paragraphs: [
          "A rotor in hover accelerates air downwards to support the aircraft. A wing in forward flight generates lift as air flows around it. Tiltrotor architectures connect those two regimes by changing the direction of rotor thrust during flight.",
          "That connection is the central engineering challenge. The wing, propulsion system, control laws and aircraft mass properties must behave as an integrated system throughout transition. A compelling cruise configuration is only part of the problem.",
        ],
      },
      {
        heading: "Begin with the mission",
        paragraphs: [
          "Vertical access can matter at both ends of a journey. Cruise efficiency and travel time matter in between. A mission study needs to account for reserves, alternates, weather, landing-site constraints and the full payload, rather than comparing a single headline speed.",
          "For Celestium, the relevance of tiltrotor research is architectural. Taraka X-1 studies a twin-tilting-duct arrangement. The open-rotor aircraft in the reference imagery belong to Bell; they illustrate a wider family of vertical-lift ideas.",
        ],
      },
      {
        heading: "The next questions",
        paragraphs: [
          "Our design work needs a transition envelope, a validated aerodynamic model and a consistent mass estimate. These are dependencies of the aircraft study, rather than details to fill in after choosing a range target.",
          "Exploring the geometry is a useful starting point. The interactive aircraft studio changes duct position and presents an analytic airflow illustration. It helps explain the concept, while flight dynamics and validated CFD remain separate work.",
        ],
      },
    ],
    related: [
      { label: "Explore tiltrotor technology", href: "/products/tiltrotor" },
      { label: "Open the aircraft studio", href: "/aircraft/studio" },
    ],
  },
  {
    slug: "beyond-the-runway",
    title: "Beyond the runway",
    category: "Technology",
    excerpt: "The engineering questions behind high-speed vertical flight.",
    image: "/media/bell/hsvtol-formation.webp",
    bell: true,
    readTime: "4 min",
    sections: [
      {
        heading: "A different relationship with infrastructure",
        paragraphs: [
          "A runway constrains where an aircraft can begin and end a journey. Vertical takeoff changes that relationship, but it also changes the aircraft’s power demand, control requirements and landing-site environment.",
          "High-speed vertical takeoff and landing, or HSVTOL, investigates how hover capability might coexist with much faster cruise. Bell’s public concept uses folding rotors to reduce rotor drag in forward flight. The Bell animations on this site illustrate that idea.",
        ],
      },
      {
        heading: "Transition is an aircraft-level problem",
        paragraphs: [
          "Changing from rotor-supported lift to wing-supported flight involves more than turning a rotor. Lift must remain controlled as propulsion roles change. Rotor stopping and folding add mechanisms, control requirements and failure cases that have to be considered together.",
          "The value of a technology demonstrator is the opportunity to test those interfaces in a real system. A concept illustration can explain intent; it cannot establish handling qualities, reliability or performance.",
        ],
      },
      {
        heading: "Where Celestium fits",
        paragraphs: [
          "HSVTOL appears in our technology library as an architectural reference. It is not a declared capability of Taraka X-1. Our hydrogen-electric aircraft study has its own energy and mass constraints, and cannot inherit the performance of a different propulsion architecture.",
          "The useful comparison is between design choices: open or shrouded rotors, rotor thrust or jet thrust, conventional or vertical departures, and the resulting mission trade-offs.",
        ],
      },
    ],
    related: [
      { label: "Explore HSVTOL", href: "/innovation/hsvtol" },
      { label: "Explore our energy study", href: "/innovation/hydrogen-electric" },
    ],
  },
  {
    slug: "an-aircraft-around-care",
    title: "An aircraft around care",
    category: "Mission design",
    excerpt: "Why the medical cabin belongs at the beginning of an aircraft design.",
    image: "/images/taraka-medical-dusk-v2.webp",
    bell: false,
    readTime: "3 min",
    sections: [
      {
        heading: "The mission starts before takeoff",
        paragraphs: [
          "For a medical transfer, the journey includes loading, access to the patient and handover at the destination. A fast cruise is useful only within a complete transport system.",
          "Taraka X-1 is organised around a dedicated medical mission. The design case includes a patient and litter, clinical personnel and critical-care equipment. Their positions affect access, restraint, visibility and the aircraft’s mass distribution.",
        ],
      },
      {
        heading: "Make the interfaces visible",
        paragraphs: [
          "A cabin study should account for the loading path, working space around the patient, equipment attachment and electrical services. A clear rendering helps communicate the arrangement. A dimensioned layout and a validated access study are still necessary.",
          "The clinical team and equipment allocation in the research material are study assumptions. They are not clinical staffing recommendations or an approved operating configuration.",
        ],
      },
      {
        heading: "Design around the whole transfer",
        paragraphs: [
          "Ground access and destination infrastructure influence whether vertical flight adds value. Hospital coordination, landing permissions and operational approval would all be required for a real service.",
          "Our medical pages connect the cabin, aircraft and transfer design case. That connection keeps the mission visible while the engineering evolves.",
        ],
      },
    ],
    related: [
      { label: "Explore the medical mission", href: "/mission" },
      { label: "Inside the medical cabin", href: "/mission/cabin" },
    ],
  },
  {
    slug: "energy-is-a-system",
    title: "Energy is a system",
    category: "Research",
    excerpt: "Fuel, storage, electrical power and cooling belong in the same conversation.",
    image: "/images/taraka-powertrain-cutaway-v1.webp",
    bell: false,
    readTime: "4 min",
    sections: [
      {
        heading: "Follow the complete energy path",
        paragraphs: [
          "The Taraka X-1 concept places a hydrogen fuel cell on the sustained cruise-power path and a battery buffer on peak demand. Both ultimately supply the electrical bus and duct motors.",
          "That architecture is only useful if the fuel, tank, balance of plant, battery, power electronics and cooling can be integrated within the mass and volume budget. Fuel mass alone does not describe the storage system.",
        ],
      },
      {
        heading: "Keep the mass cases separate",
        paragraphs: [
          "The published research material carries a nominal sizing point and a more conservative mass case. Unresolved tank-vessel mass and integrated sizing are explicitly recorded in the design-basis note.",
          "Those open items should remain visible. A range target cannot become a demonstrated capability simply because an attractive aircraft concept is shown beside it.",
        ],
      },
      {
        heading: "What must be validated",
        paragraphs: [
          "The next engineering work includes a reconciled aircraft mass model, mission energy accounting, reserve policy, thermal rejection, hydrogen handling and fault response. Each has consequences for the others.",
          "The website’s energy diagram is an explanation of the proposed architecture. The research downloads provide the assumptions needed to understand its limits.",
        ],
      },
    ],
    related: [
      { label: "Hydrogen-electric propulsion", href: "/innovation/hydrogen-electric" },
      { label: "Read the design basis", href: "/research#design-basis" },
    ],
  },
  {
    slug: "designing-the-transition",
    title: "Designing the transition",
    category: "Technology",
    excerpt: "A flight mode is an integrated configuration, not just a rotor angle.",
    image: "/media/bell/tiltrotor-sunset.webp",
    bell: true,
    readTime: "3 min",
    sections: [
      {
        heading: "Between hover and cruise",
        paragraphs: [
          "During transition, rotor thrust direction and wing lift change together. The aircraft’s control system must coordinate those changes while maintaining a controllable flight state.",
          "Taraka X-1 uses tilting ducts in the concept geometry. The website lets readers inspect hover, transition and cruise positions, making the arrangement easier to understand.",
        ],
      },
      {
        heading: "What a viewer can explain",
        paragraphs: [
          "An interactive model can show geometry, moving parts and a proposed flow direction. It can help a reader see why the propulsion system interacts with the wing and cabin arrangement.",
          "Our streamlines are derived from an analytic illustrative field. They do not represent validated CFD, measured wake velocities or a stability analysis. Those require their own models and evidence.",
        ],
      },
      {
        heading: "Connect the disciplines",
        paragraphs: [
          "Useful transition research connects aerodynamics, propulsion, structures and flight control. The result should be a defined envelope with clear assumptions and fault cases.",
          "The digital engineering pages describe how we intend to link those studies rather than allowing a visual model to stand in for the full aircraft analysis.",
        ],
      },
    ],
    related: [
      { label: "Aircraft & airflow studio", href: "/aircraft/studio" },
      { label: "Flight control research", href: "/innovation/autonomy" },
    ],
  },
  {
    slug: "useful-flight-in-remote-places",
    title: "Useful flight in remote places",
    category: "Mission design",
    excerpt: "Designing for cargo, field research and places with limited infrastructure.",
    image: "/media/bell/utility-flight.webp",
    bell: true,
    readTime: "3 min",
    sections: [
      {
        heading: "Access is a design requirement",
        paragraphs: [
          "Remote missions expose the practical side of vertical flight. The landing surface, wind, available fuel or energy, weather and support equipment can be as important as the distance on a map.",
          "A field-research payload also brings its own requirements: sensor field of view, vibration limits, power quality, mounting, data storage and the ability to change equipment.",
        ],
      },
      {
        heading: "A platform needs defined interfaces",
        paragraphs: [
          "The wider MALUS program includes cargo and research installation studies. They are architecture investigations; the medical role remains the dedicated Taraka X-1 mission.",
          "A modular concept must define structural attachments, electrical services and allowed mass properties. The payload cannot be treated as an interchangeable box without those constraints.",
        ],
      },
      {
        heading: "Study the return journey",
        paragraphs: [
          "A remote mission study should describe the outbound and return payload, time on station, reserves and possible diversion. That produces a more useful design case than a single maximum-range figure.",
          "The mission brief builder on this site helps collect those questions in a local document that a researcher can refine.",
        ],
      },
    ],
    related: [
      { label: "Utility mission studies", href: "/missions/utility" },
      { label: "MALUS architecture", href: "/program" },
    ],
  },
  {
    slug: "maintainability-from-day-one",
    title: "Maintainability from day one",
    category: "Research",
    excerpt: "Access, inspection and replacement should influence the first layout.",
    image: "/media/bell/rotor-detail.webp",
    bell: true,
    readTime: "3 min",
    sections: [
      {
        heading: "An aircraft has a lifecycle",
        paragraphs: [
          "Maintenance begins as a design question. Component access, inspection coverage and the work needed to remove a subsystem all affect how an aircraft can be supported.",
          "An electric architecture does not remove the need for maintenance. It creates a different mix of motors, power electronics, thermal systems, insulation and energy-storage interfaces.",
        ],
      },
      {
        heading: "Design for inspection",
        paragraphs: [
          "The research layout should show which components can be reached without removing unrelated systems. High-energy electrical and hydrogen interfaces need clear isolation and handling concepts.",
          "For tilting ducts, the bearings, actuators, wiring paths and structural joints deserve particular attention. Their access requirements can influence the nacelle and wing arrangement.",
        ],
      },
      {
        heading: "Keep support claims grounded",
        paragraphs: [
          "Celestium’s support pages describe a lifecycle design philosophy. They do not announce service centres, certified maintenance procedures or a fielded fleet.",
          "The goal at this stage is to make supportability an explicit part of the engineering work, with evidence that can mature alongside the aircraft.",
        ],
      },
    ],
    related: [
      { label: "Maintainability studies", href: "/support/maintenance" },
      { label: "Technical resources", href: "/support/resources" },
    ],
  },
  {
    slug: "a-target-is-a-starting-point",
    title: "A target is a starting point",
    category: "Research",
    excerpt: "How to read the performance ambitions of a concept aircraft.",
    image: "/images/taraka-hangar-v1.webp",
    bell: false,
    readTime: "3 min",
    sections: [
      {
        heading: "Ambition and evidence",
        paragraphs: [
          "The Taraka X-1 website publishes cruise-speed, range and mission-load targets to make the research ambition understandable. They identify what the design aims to investigate.",
          "They do not establish a demonstrated aircraft capability. Integrated mass, aerodynamics, energy storage, reserves and operating constraints must support those figures before that claim could be made.",
        ],
      },
      {
        heading: "Make the assumptions inspectable",
        paragraphs: [
          "The research page exposes the design basis and the diameter trade. The downloadable technical note records reconciliation issues and the distinction between sizing cases.",
          "A useful public concept gives readers a way to inspect those dependencies. Numbers should lead back to assumptions rather than appearing as isolated marketing claims.",
        ],
      },
      {
        heading: "The next milestone is understanding",
        paragraphs: [
          "Before a prototype roadmap can be credible, the research needs a consistent aircraft model and a prioritised validation plan. That includes uncertainty and failure cases alongside the preferred configuration.",
          "The work ahead is the substance of the program. The website is a way to make that work approachable and reviewable.",
        ],
      },
    ],
    related: [
      { label: "Research & development", href: "/research" },
      { label: "Our engineering approach", href: "/company/approach" },
    ],
  },
];

export const JOURNAL: JournalArticle[] = ARTICLES.map((article) => ({
  ...article,
  readTime: `${Math.max(
    1,
    Math.ceil(
      article.sections
        .flatMap((section) => section.paragraphs)
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  )} min`,
}));
