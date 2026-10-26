# Celestium

An aviation research website built around **MALUS — Modular Aerial Lift Utility System** and its **Taraka X-1** hydrogen-electric medical aircraft concept. The Celestium redesign introduces a cinematic brand, aircraft architecture library, mission perspectives, innovation, support, company, collaboration and journal pages. Built with Next.js 15, React 19, TypeScript and React Three Fiber.

The site contains **71 authored routes**, including 40 topic pages and eight original journal articles. [The site directory](http://localhost:3000/site-directory) lists every destination. Aircraft values remain research targets; the existing mass assumptions, unresolved tank-vessel mass and illustrative airflow model are retained.

## Run locally

Use Node.js 22.18 or later; this project was checked with Node.js 24.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). For a production preview:

```bash
npm run build
npm run start
```

Development output uses `.next-dev`; production output uses `.next`. `NEXT_DIST_DIR` can select a separate build directory. Stop a production server before rebuilding its output.

The final session preview runs at [localhost:3000](http://localhost:3000) as the transient user service `celestium-preview`. To stop it:

```bash
systemctl --user stop celestium-preview
```

## Explore the website

| Area           | Main destinations and behavior                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| Home           | Seven flight stories starting with the MALUS research program, manual selection, optional playback and five keyboard-operated mission tabs |
| Aircraft       | `/products`: six filterable architecture studies, sorting, empty states and comparison of up to three studies       |
| Tiltrotor      | `/products/tiltrotor`: hover, transition and cruise schematic with an adjustable propulsion angle                   |
| HSVTOL         | `/innovation/hsvtol`: folding-rotor perspective, flight modes and two aircraft-only Bell animations                 |
| Taraka X-1     | `/aircraft`, `/program`, `/aircraft/studio`: original concept, modular platform, on-demand 3D and analytic airflow  |
| Missions       | `/missions` and nine mission perspectives, including the dedicated medical mission, cabin and transfer sequence     |
| Innovation     | Hydrogen-electric systems, autonomy, digital engineering, technology and design-basis research                      |
| Support        | Maintainability, blades, composites, replaceable systems, training, flight safety and upgrade philosophy            |
| Company        | Research approach, responsibility, collaboration, engineering/students/operations, events and suppliers             |
| Journal        | `/journal`: eight original research notes, category filters and connected reading paths                             |
| Flight library | `/videos`: two on-request animations and 16 reviewed reference images with filters and keyboard-operated inspection |
| Enquiries      | `/contact`: prepare, review and download a local research brief; the form does not send email or submit to a server |
| Resources      | `/products/literature`, `/support/resources`: five real downloads including mission and systems-review templates    |
| Information    | Media credits, privacy, site terms and the complete route directory                                                 |

The shared navigation has five mega menus, a mobile accordion, site search, keyboard focus handling and Escape dismissal. With JavaScript disabled, direct navigation, research text and downloads remain available. Motion is optional; reduced-motion settings disable automatic stories and the existing 3D motion. WebGL-disabled browsers receive an aircraft introduction.

## Bell reference review

All **338 URLs** from Bell’s public sitemap were retrieved for the design-reference audit. The redesign adapts its page families to Celestium’s actual concept-development context rather than adopting Bell’s product names, military capabilities, executives, facilities, past events or testimonials as Celestium claims.

- [Reference coverage](docs/reference/BELL-COVERAGE.md) and [per-page mapping](docs/reference/bell-page-map.json).
- [Media-review record](docs/reference/MEDIA-REVIEW.md) and [retained-media manifest](docs/reference/bell-media.json).
- [Celestium design system](docs/CELESTIUM-DESIGN-SYSTEM.md).
- [Redesign and validation record](docs/CELESTIUM-REDESIGN.md).

The reference audit can use a saved sitemap and cache: `python3 scripts/reference/audit-bell.py --sitemap /path/to/sitemap.xml --cache /path/to/html-cache`. It keeps a compact title/heading inventory, then `python3 scripts/reference/map-bell-pages.py` refreshes the per-page adaptation map. Existing audited data is already checked in.

Bell photographs and concept animations are locally hosted and visibly credited. Images with visible people were excluded after review, including cockpit occupants discovered at full resolution. Copyright remains with the source owners; public availability is not a reuse licence. Review media permissions before public deployment. There is no stated affiliation with Bell.

## Verification

```bash
npm run check
npm run check-site
npm run check-flow
npm run build
npm run check:browser
```

Browser checks cover production routes, WCAG A/AA scans, desktop/mobile menus, search, keyboard interactions, responsive boundaries, filters/comparison, local enquiry downloads, image inspection, animation controls, 3D modes, rendering suspension and no-JavaScript/no-WebGL fallbacks. Tests use installed Google Chrome when available; otherwise install Chromium with `npx playwright install chromium`. `PLAYWRIGHT_CHROME_BIN` can select an executable, and `PLAYWRIGHT_BASE_URL` can target an existing preview.

```bash
npm run format
```

With a local preview running, `node scripts/capture-preview.mjs` captures the Celestium desktop/mobile handoff views into `docs/previews`. Set `PLAYWRIGHT_BASE_URL` for another local port. The original MALUS screenshots remain historical records; current views use the `celestium-` prefix.

## Research resources and original artwork

- `public/resources/malus-taraka-x1-program-brief.pdf` — six-page research-program introduction.
- `public/resources/taraka-x1-design-basis.md` — assumptions and reconciliation notes.
- `public/resources/taraka-x1-duct-trade.csv` — five nominal diameter-study points.
- `public/resources/celestium-mission-brief-template.md` — mission-requirements template.
- `public/resources/celestium-systems-review.md` — interfaces, maintainability and validation template.

The PDF source is `assets/resources/program-brief.html`; regenerate with `npm run brief`, then inspect pagination. The original MALUS mark and concept artwork remain part of the research programme. Generation records are preserved in [ARTWORK.md](docs/ARTWORK.md) and [ARTWORK-V2.md](docs/ARTWORK-V2.md). Native diagrams explain concepts and do not define manufacturing geometry. Analytic airflow is illustrative and is not validated CFD.

## Public origin

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the actual public HTTPS origin before a deployment build. This supplies metadata links and sitemap URLs. Without a public origin, the preview uses localhost metadata and omits public sitemap entries.

The site runs on a Next.js-compatible host. All displayed imagery and animation media are self-hosted; the viewer requests no external HDR maps or analytics. The contact form has no delivery backend, customer portal or persistent storage.
