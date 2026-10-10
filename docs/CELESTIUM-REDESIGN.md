# Celestium redesign — 8 October 2026

## Delivered scope

The site was transformed from a compact MALUS programme presentation into a Celestium aviation research website. It retains Taraka X-1, the original medical mission and cabin, design-basis research, diameter trade, downloadable programme brief and the interactive aircraft/analytic-flow studio.

The current directory contains 71 routes: 23 core routes, 40 separately authored topic pages and eight original journal articles. Bell’s major page families are represented through aircraft studies, missions, innovation, support, company, collaboration, resources, enquiries and source information.

### Main additions

- Celestium orbital mark, cinematic homepage, six selectable flight stories, mission tabs, five mega menus, mobile accordion and whole-site search and active-section highlights across dedicated and topic routes.
- Aircraft catalogue with architecture/mission filters, sorting, Celestium-only selection, comparison of up to three studies and an explicit empty state.
- Dedicated tiltrotor and HSVTOL pages, separate flight-mode schematics, adjustable tiltrotor geometry and two on-request folding-rotor/hover clips.
- Interactive hydrogen-electric architecture connecting storage, fuel cell, battery, electrical distribution, propulsion and cooling to current research questions.
- Nine mission perspectives, lifecycle/support topics, pilot/technical/mission training research, supplier interfaces and collaboration pages.
- Eight original journal articles, category filters, linked reading paths and a flight library with 16 reference images, architecture/system/environment filters and keyboard-operated inspection.
- Local enquiry preparation, review and Markdown download. Five actual research/template downloads.
- Connected reading paths include dedicated mission, technology, resource and research pages; every configured reading path has a renderable card.
- Route directory, source credits, factual preview privacy information, metadata, social-image branding and sitemap integration.

## Reference fidelity

All 338 URLs in Bell’s public sitemap were successfully retrieved during the audit and mapped to 57 relevant Celestium destinations. The inventory and per-URL Celestium adaptation are recorded in `docs/reference/bell-inventory.json` and `bell-page-map.json`.

The pages are original Celestium adaptations, not 338 literal clones. Bell’s repeated video testimonials map to the aircraft-only flight library; its news maps to original research notes; internal test/error/form pages map to useful public destinations. Bell-specific people, military capabilities, facilities, service networks, certifications, events, legal entities and history are not represented as Celestium achievements.

The retained media consists of 16 WebP images and two MP4 animations, approximately 4 MB. Source URLs, ownership, hashes and visual-review evidence are recorded in the media manifest. A closer cockpit review excluded photographs with visible or ambiguous occupant figures, including a parked-aircraft image; crew-bearing assets were removed rather than edited.

## Current implementation boundaries

Performance figures remain research targets. Tank-vessel mass, integrated sizing, validated aerodynamics and transition dynamics remain open work in the original design basis. The 3D viewer and flow field explain the study; they do not establish flight capability or CFD validation.

The enquiry form prepares a local document and has no email-delivery backend. No customer portal, announced vacancy, physical service centre or event booking is invented. Media permissions and a real public origin are prerequisites to a public deployment.

## Verification record

- Type checking passed during implementation.
- `npm run check-flow` passed the original 11 named flow regressions.
- `npm run check-site` passed: all 71 routes, 40 topic-page records, eight journal records, 18 retained media files and 338 Bell mappings had valid destinations; media hashes matched and rejected assets were absent.
- The production build completed successfully, with 78 generated Next.js outputs including metadata and error routes. The latest build had no compiler warnings.
- Shared text contrast was improved, and the overlay header was darkened after visual review of white navigation over bright clouds.
- A 320-pixel check of all 71 primary headlines passed after replacing fixed phone topic type with responsive sizing. This checks text clipping inside image heroes as well as document boundaries.
- The final built HTML audit passed all 71 pages: one primary heading, branded page titles, image alternatives, valid fragment links and full reachability from the homepage.
- Focused interaction checks verified flight stories, mission tabs, flight modes, enquiry download, videos, journal filtering, expanded menus/search accessibility and image inspection. Follow-up checks passed the search-focus and catalogue-label fixes.
- The final complete production browser run passed **107 checks**, with **zero failures and zero flaky results**. One mobile-only navigation check was skipped in the desktop project. The suite covers all 71 route responses, 21 representative page/WCAG scans per desktop/mobile viewport, menu/search/modal/energy accessibility, responsive boundaries, all 71 main headlines at 320 px, restored reading paths, filters, downloads, videos, 3D configurations, suspension and no-JavaScript/no-WebGL fallbacks.
- The compact result record is saved in `docs/validation/celestium-browser-results.json`, with the production build ID, every case result and explicit validation boundaries.

The aircraft anchor offset was corrected against the actual fixed and sticky navigation heights. The mobile energy nodes have explicit system labels. Reference images are classified by the depicted architecture or environment: the V-22 runway image is a tiltrotor, not an HSVTOL aircraft. Long phone headlines no longer disappear inside a clipped image hero. The final production report confirms these repairs. Handoff views are generated with `scripts/capture-preview.mjs` and use the `celestium-` prefix in `docs/previews`.

## Work window

The requested two-hour redesign window began at 02:40:32 UTC (08:10:32 IST) and finished after 04:40:32 UTC (10:10:32 IST). The exact handoff timestamp is stored in the validation summary. The local production preview remains running at `http://localhost:3000` as the transient user service `celestium-preview`.
