# MALUS website design system

## Identity and hierarchy

**Modular Aerial Lift Utility System** is the research program name. Introduce MALUS before expanding its full name in large type on the homepage and program page. The compact MALUS wordmark belongs in navigation, supporting labels and the footer.

**Taraka X-1** is the first aircraft concept under MALUS, created for the **medical air-ambulance mission**. The program architecture may investigate other interiors; cargo and research studies must retain that wider program context.

The three medical pages form one connected presentation:

| Page                  | Leading idea                             | Main visual                                   |
| --------------------- | ---------------------------------------- | --------------------------------------------- |
| `/mission`            | The medical purpose defines the aircraft | Full aircraft concept and medical scene       |
| `/mission/cabin`      | Patient, clinical team and equipment     | Cabin cutaway and native layout schematic     |
| `/mission/operations` | The complete transfer informs the design | Coastal flight and four-stage mission diagram |

## Visual language

Use midnight-blue cinematic aircraft chapters, off-white reading surfaces and muted sage system sections. Warm orange identifies selected architecture studies and technical points. The palette is defined in `app/globals.css`; component and editorial layouts live in `app/refined.css`. Full-screen artwork composition and its responsive framing live in `app/cinematic.css`.

| Token           | Value     | Purpose                            |
| --------------- | --------- | ---------------------------------- |
| `--bg`          | `#f6f7f4` | Main reading surface               |
| `--ink`         | `#20282c` | Body text and primary actions      |
| `--muted`       | `#5e696d` | Secondary text                     |
| `--line`        | `#d6dcd7` | Dividers and borders               |
| `--accent`      | `#bf5837` | Selected states and focus outlines |
| `--accent-ink`  | `#a64428` | Accent text on light surfaces      |
| `--accent-wash` | `#efe0d5` | Selected study background          |

Inter provides the main type. IBM Plex Mono provides chapter numbers, short technical labels and artwork captions. Fonts are self-hosted by Next.js. Headlines use a restrained weight, close tracking and generous surrounding space; paragraph widths stay short enough for comfortable reading.

The curved, two-stroke M mark is traced from the founder’s sketch. Its shared geometry lives in `lib/brand.ts` and is rendered by `components/brand-mark.tsx`. The standalone asset is `public/images/malus-mark.svg`. Preserve the crossing stem, flowing arch and curved right stroke when adding a placement.

## Page composition

Build editorial routes with the shared components in `components/editorial.tsx`: `PageIntro`, `SectionLabel`, `Figure`, `ActionLink`, `RelatedPages` and `ProgramBrief`. Use one H1 per route and keep the heading sequence meaningful.

The homepage and aircraft introduction use `CinematicStory` for original full-screen artwork, large uppercase headings, short descriptions and outlined actions. The homepage explains MALUS before its expanded name. Maintain clear negative space for copy and enough aircraft detail to identify the twin-duct architecture. On phones, the landscape images use a deliberate separate composition and fade into the reading surface rather than cropping to a narrow portrait.

Medical routes use `MissionHero`, `MedicalNavigation` and `MedicalMissionPages`. The medical navigation remains visible beneath the primary header while reading. Its active link stays within the mobile scroll area. Anchor offsets account for both navigation bars.

Use large images to introduce an aircraft or a mission, then use native diagrams for system explanations. The cabin render communicates the concept; the labelled cabin schematic explains its arrangement. Give new raster figures their actual width and height through `Figure` to reserve the right amount of space before loading.

Keep interactive controls connected to a visible result: selected architecture tabs change the layout study, the diameter selector changes the study point, and flight-mode buttons change the duct angle. Primary calls to action should reach a real page, section, model or downloadable resource.

## Responsive behavior and access

The primary navigation changes to its mobile menu below 1000 px. Editorial layouts reduce to one column around 700 px. The shared container is capped at 1360 px. Check new content at 320, 390, 768, 1024, 1440 and 1920 px, including shorter laptop screens.

Keep drawings legible. The detailed duct section scrolls within its own labelled region on small screens; the whole page remains within the viewport. Avoid reducing labels until they become unreadable.

Respect reduced-motion settings. Editorial content is available before JavaScript runs, and reveal effects are progressive enhancements. The mobile menu traps keyboard focus and makes the background inert. The skip link moves focus into the main content.

Load the 3D aircraft only when requested. A paused model renders on demand, and a hidden model suspends rendering. The inline model supports Escape and an Exit 3D control, returning focus to its launch button. Browsers without WebGL 2 receive the aircraft introduction. The no-JavaScript stylesheet preserves route navigation and static content.

## Research content and imagery

Retain the distinction between research targets and demonstrated capability. Use the twin-duct study consistently and keep unresolved tank-vessel mass, integrated sizing and configuration reconciliation visible in the research material. The public design-basis note records the source documents and separate sizing cases.

Aircraft and cabin artwork is illustrative. Do not use it as evidence of manufacture, flight tests, hospital partnerships or approved operation. The medical journey describes a design case; it does not publish operational or clinical procedures.

Current cinematic image masters, optimized website paths and exact built-in generation prompts are documented in [ARTWORK-V2.md](ARTWORK-V2.md). The original cabin cutaway is documented in [ARTWORK.md](ARTWORK.md). Presentation references are recorded in [DESIGN-REFERENCES.md](DESIGN-REFERENCES.md). The six-page PDF has an editable HTML source in `assets/resources/program-brief.html`.

## Maintaining the site

Update route metadata, related-page links and the sitemap when adding a route. Set `NEXT_PUBLIC_SITE_URL` to the actual public origin for a deployment build. Keep local previews and public metadata distinct through the existing configuration.

Run the relevant checks after a change. Type checking, flow regressions and browser verification are documented in [the README](../README.md). Review images and PDF pagination visually. Production desktop/mobile snapshots are saved in `docs/previews`; the session's validation evidence is in [REFINEMENT-SESSION.md](REFINEMENT-SESSION.md).

The aircraft viewer opens with combined streamlines and particles. Visible controls below the inline canvas select streamlines, particles, surface speed or off. Flight mode changes rotate both ducts and inlet seeding. The light sage stage, soft contact shadow and lower camera keep the aircraft readable. The speed legend describes relative speed in an analytic illustrative field, not measured or validated CFD.
