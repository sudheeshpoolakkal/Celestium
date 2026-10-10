# Celestium design system

Celestium is the website brand. MALUS is the research programme; Taraka X-1 is its first aircraft concept. Keep those roles visible in headings, navigation and illustrations.

## Visual direction

Use large aircraft imagery, a quiet dark navigation bar, spacious editorial sections and direct typography. The palette is deep green, warm white, sage and restrained copper. Aircraft and mission photography should carry the story; diagrams should explain the interfaces.

| Token        | Value     | Use                                   |
| ------------ | --------- | ------------------------------------- |
| `--c-bg`     | `#f4f4f0` | Main reading surface                  |
| `--c-ink`    | `#16201e` | Headings, body text and solid actions |
| `--c-dark`   | `#101b1a` | Navigation, dark sections and footer  |
| `--c-deep`   | `#0a1313` | Deeper image and modal surfaces       |
| `--c-muted`  | `#536159` | Secondary text on light surfaces      |
| `--c-accent` | `#d47f4b` | Small markers and selected controls   |
| `--c-white`  | `#f7f7f2` | White text and light actions          |

Inter is the main typeface; IBM Plex Mono labels research context, sequence and source details. Use sentence case for editorial headings. Uppercase mono labels should remain short. Reserve very large type for hero headlines and section introductions.

The native Celestium mark is defined in `components/celestium-mark.tsx`. It combines an open orbital C with a forward flight vector. The original MALUS mark remains part of the subprogramme and downloadable research brief.

## Components and content

- `Chrome`: navigation, search, page frame and footer. Navigation data comes from `lib/celestium.ts` and the search catalogue from `lib/routes.ts`.
- `FlightHero`: cinematic introduction with source credit, breadcrumb, one h1 and a concrete next action.
- `FlightSectionHeading`, `FlightCard`, `FlightLink`: the shared editorial rhythm and connected reading paths.
- `TopicPage`: authored topic content from `lib/flight-pages.ts`; overview, distinct research priorities, visual feature, optional questions, resources and related destinations. `lib/perspectives.ts` includes dedicated pages in those reading paths; the site-data check verifies that none are silently dropped.
- `HomeExperience`, `MissionExplorer`: the homepage’s flight stories and mission perspectives.
- `ProductBrowser`: filters and comparison based on actual catalogue entries. A comparison describes architecture and research focus, without adopting Bell performance figures.
- `TransitionLab`: a native schematic distinguishing rotating tiltrotor thrust from the folding-rotor/jet-thrust HSVTOL reference.
- `EnergyExplorer`: the proposed MALUS energy path and six connected system questions.
- `MotionMedia`: locally hosted Bell clips, paused initially and controlled by the reader.
- `FlightGallery`: credited reference imagery with architecture, system and environment filters and a native modal. Arrow keys move between images; Escape closes and restores focus.
- `EnquiryBuilder`: local brief preparation and download. State is held in memory; there is no submission endpoint or persistent storage.

Topic copy should explain the particular mission or system, then connect the next question to an existing model or source document. Company, careers, support and supplier pages describe current research interests. Do not create fictitious staff, approved courses, facilities, jobs, certifications or past milestones.

## Layout and behavior

The main container has a 1440 px maximum width. Navigation switches to the mobile accordion below 1100 px; layouts become simpler at 800 and 500 px. Long tables and the existing duct-section diagram scroll inside their own labelled regions.

The fixed header is 88 px on larger screens and 74 px on compact phones. Sticky chapter navigation sits beneath it. Anchor offsets must include both bars while avoiding a large empty gap; test medical and aircraft chapters when adjusting navigation height.

Topic hero headlines scale between 38 and 58 px on compact phones; verify the text itself fits, since an image hero can hide overflow without widening the document.

Use a single h1, semantic heading order, descriptive link text, visible focus and meaningful control labels. Mega menus and search make background content inert while open and restore focus on dismissal. Reduced-motion preferences suppress automatic stories and existing 3D motion. Videos are on request and suspend outside the viewport.

The site keeps readable research content, direct navigation and actual downloads available without JavaScript. The 3D model retains a no-WebGL fallback and keyboard controls.

## Media and evidence

Bell media must come from `docs/reference/bell-media.json`; every retained file has a source URL and a visual review. The public folder must contain no unmanifested or rejected Bell assets. Use `npm run check-site` after changing media or destinations.

Keep Bell aircraft explicitly separate from Taraka X-1. Empty Bell cabins can illustrate installed-system questions, but cannot be labelled as a Celestium cabin. Existing Taraka imagery remains illustrative concept artwork. A native diagram is not manufacturing geometry, and analytic flow is not validated CFD.

Review media permissions before a public deployment. Attribution does not itself establish a reuse licence.

## Verification and maintenance

Run type checking, site-data/media checks, the original flow regressions and a production build. Browser checks cover route rendering, WCAG A/AA scans, responsive boundaries, downloads, menus, filters, geometry controls and viewer suspension. Take desktop and phone snapshots after substantial visual changes; inspect the actual rendered result before relying on a passing build.

The previous MALUS design notes remain in `docs/DESIGN-SYSTEM.md` as historical context for the original diagrams and research content. This document defines the current Celestium website presentation.
