# MALUS website refinement

Requested work window: 7 October 2026, 10:09:52–12:09:52 IST (04:39:52–06:39:52 UTC).

The user requested two continuous hours of work on a professional, elegant aerospace-company presentation. The site remains a TypeScript / React / Next.js project in the existing Website directory.

## Design direction

Restrained aircraft-focused identity, deliberate typography and spacing, useful engineering explanations, credible project status, and a coherent experience across every route. Keep research targets distinct from demonstrated performance. Use existing research geometry rather than inventing physical dimensions or flight-test achievements. Do not invent partners, customers, certifications, facilities, or company history.

## Work sequence

1. Audit project sources and establish the aircraft and brand presentation.
2. Refine homepage and create a complete Taraka X-1 product page.
3. Give architecture, technology, missions and research pages equivalent visual quality.
4. Improve the model presentation and the full engineering studio.
5. Review responsive behavior, accessibility, performance, links and resource downloads.
6. Finish with a production build, running local preview, and a verified change record.

## Evidence policy

The website describes the twin-duct configuration carried in `docs/07_TWIN_DUCT_AMBULANCE_ARCHITECTURE.md` in the parent research repository. Parent studies also contain other configurations; this site must identify which configuration its figures describe. The 1,537 kg sizing point omits the tank mass in its original convergence. The tank correction and re-convergence are open work. Range, noise, cruise speed and useful load must be labelled as research targets.

## Session record

- 10:09 IST: Started the requested refinement session. Existing production preview is running on port 3000. Inspected site implementation, project sources and the earlier validation artifacts.
- 10:34 IST: Rebuilt all editorial routes around the shared visual system; added a dedicated aircraft product page and moved the studio to `/aircraft/studio`. Added native architecture, duct, energy and cabin diagrams, plus the interactive five-point diameter trade.
- 10:36 IST: Created and visually reviewed the six-page program brief. Converted print images to JPEG, reducing the PDF from 4.9 MB to approximately 690 KB. Added downloadable design-basis notes and CSV data.
- 10:39 IST: Corrected a mobile preview aspect-ratio overflow. Added glazing that follows the fuselage loft, canopy frame curves, procedural environment reflections and wheel hubs. Material shader settings now change only with appearance state, rather than every frame. Type checking and the nine existing flow regressions pass after geometry refinement.
- 10:52 IST: Production browser audit identified and corrected muted text contrast on the architecture map, technical diagrams and resource cards. All six main pages now pass the automated WCAG A/AA scan at desktop and mobile widths. Studio interactions, resources, no-WebGL fallback and 320/768/1024 px boundary checks passed. Repaired a stale navigation-test selector and confirmed focus trapping, Escape and route navigation.
- 10:57 IST: Responsive image processing delivers the mobile hangar hero at approximately 12 KB in the measured AVIF response. Under the same 2 Mbps / 40 ms / 4× CPU test, measured LCP improved from 1.55 s to 1.12 s, with CLS near 0.00023. These are local lab measurements, not field data.
- 11:00 IST: Continued refinement of studio rendering: observe the actual canvas viewport, suspend beneath the mobile menu, use demand rendering while motion is paused, and avoid unnecessary flow readout updates. Reworked the energy diagram connections to follow real node positions as the layout changes.
- Subsequent studio review: Refined the desktop and mobile control layout, corrected camera projection updates during resize, added keyboard orbit and zoom, and verified that reduced-motion and hidden viewers produce no idle draw calls. Added progressive navigation and a usable aircraft introduction without JavaScript or WebGL.
- Afternoon clarification: The user specified that MALUS is the **Modular Aerial Lift Utility System research program** and Taraka X-1 is its **medical-ambulance aircraft**. Made the full name the large homepage and program-page headline; updated the aircraft description, navigation, metadata, social card, design-basis note and six-page PDF. Qualified cargo and research modules as wider program architecture studies.
- Browser verification: All 50 desktop/mobile browser checks completed: 49 passed, one intentional desktop skip for mobile navigation. Eight main routes passed automated WCAG A/AA scans at both viewport sizes. The viewer now exits with Escape even while loading and restores focus to its launch button.
- Responsive review: Expanded the 320/768/1024 px boundary checks to all eight editorial routes, and verified medical hero anchors beneath both sticky navigation bars. All four targeted checks passed. Reviewed 16 additional screenshots at 320, 768, 1024 and 1920 px. Verified 35 internal links and anchors across 12 destinations.
- Cross-engine review: Firefox passed all 16 route/viewport checks plus architecture tabs, the diameter selector and medical-page navigation. WebKit could not launch with this host's library versions; Safari engine behavior is not claimed as verified.
- Cabin artwork review: Added a dedicated medical cabin cutaway with one patient litter, three clinical seats, equipment and a separate cockpit. Saved the master and an approximately 90 KB optimized website asset, documented the exact built-in image-generation prompt, and visually reviewed its desktop/mobile presentation. All 30 images across the seven editorial detail routes decoded successfully.

## Mobile loading review

Local lab run with a 390 × 844 px viewport, device scale 2, disabled browser cache, 2 Mbps download throughput, 40 ms network latency, 4× CPU throttling and reduced motion. These measurements describe this local test, not field performance. No external resources or 3D canvases were loaded on these introductions.

| Route                 | Measured LCP | Measured CLS | Responsive image bytes during measurement |
| --------------------- | -----------: | -----------: | ----------------------------------------: |
| `/`                   |       736 ms |            0 |                                   11.9 KB |
| `/mission`            |       744 ms |            0 |                                   30.7 KB |
| `/mission/cabin`      |       708 ms |            0 |                                    9.6 KB |
| `/mission/operations` |       728 ms |            0 |                                   18.7 KB |

The cabin cutaway is lazy-loaded below the introduction. The on-demand 3D viewer remains separately loaded only when requested. All performance figures displayed for the aircraft remain research targets.

## Final production verification

The final `.next` production build includes all eight editorial routes, the interactive aircraft studio, custom 404, social image and metadata routes. TypeScript checking, formatting and whitespace checks passed. The nine existing analytic-flow regression checks passed, and the production dependency audit reported zero vulnerabilities.

The complete browser suite against `http://127.0.0.1:3000` finished with **51 passed and one intentional skip**. The skip is the desktop run of the mobile-only navigation check. Coverage includes 16 accessibility scans across eight routes, page boundaries, menu focus and route changes, the medical chapter anchors, downloads, architecture tabs, the diameter trade, skip-link focus, no-JavaScript navigation, WebGL fallback, 3D controls, reduced-motion rendering, offscreen suspension and exiting/reopening the model.

The independent Firefox review also passed all 16 route/viewport checks and its architecture-tab, diameter-selector and medical-navigation checks. All 35 local links and section anchors resolved successfully across 12 destinations. Safari/WebKit was unavailable on this host and is not included in those results.

The terminal-managed preview process stopped during an initial final-check attempt. Restarted the same production build as the transient user service `malus-taraka-preview` and reran the complete suite successfully. The main preview remains at **http://localhost:3000**. Stop it before rebuilding `.next` or starting another server on port 3000 with `systemctl --user stop malus-taraka-preview`.

Eight final production screenshots are saved in `docs/previews`. The reusable brand, page-composition and content conventions are documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

A final medical-hero shading refinement keeps white navigation legible over the brighter concept images. Rebuilt production, visually reviewed the updated header, refreshed all eight screenshots and reran the affected desktop/mobile accessibility and anchor checks: all eight passed.

## Brand and airflow follow-up - 7 October 2026

Replaced the filled geometric M with a curved two-stroke vector traced from the supplied sketch. Shared paths now drive the navigation, footer, icon and social card; the PDF uses the same geometry. The standalone mark is `public/images/malus-mark.svg`.

The homepage now introduces MALUS before the large expanded name and explains hydrogen-electric propulsion in the opening description. The program introduction, metadata and six-page brief follow the same terminology.

The inline viewer previously disabled the flow field. Both inline and studio viewers now open with combined particles and streamlines, with visible controls for individual layers, surface speed and off. Inlet seeding follows the tilted duct axes; reduced-motion configurations receive static, correctly aligned traces. The speed palette uses linear vertex colours and a relative-speed legend. This remains an analytic illustration, not validated CFD.

Corrected the inverted second tail fin and joined the horizontal tail at the fin roots. Cabin doors and windows follow the fuselage surface and move together. The medical interior now has three clinical seats. Monotone station interpolation removes the previous surface ripples without changing station dimensions or allowing radius/height overshoot. A light sage stage, lower camera, restrained livery and soft contact shadow replace the dark floor and hard shadows.

Verification: production build and TypeScript checks pass; formatting and `git diff --check` pass; all 11 flow/geometry regressions pass. The first 54-check browser run passed 50 checks with one intentional skip, and exposed two reduced-motion idle-render failures plus a Chrome protocol timeout on the research page. Removed the polling readout that caused the idle redraws. The final affected desktop/mobile recheck passed all 20 checks, including airflow render changes, surface colouring, keyboard controls, no-WebGL fallback, zero idle draws, offscreen/menu suspension, responsive boundaries, program/mission copy and research accessibility.

Refreshed all eight homepage/medical screenshots and added desktop/mobile airflow views and a studio view in `docs/previews`. Regenerated the six-page PDF and inspected its rendered pages. The local production preview runs at `http://localhost:3000` through the `malus-taraka-preview` user service.

## Cinematic presentation and original artwork - 7 October 2026

Reviewed the rendered SpaceX and Stellar Aircraft websites, including Stellar's hydrogen-electric powertrain page. Their image scale, short mission headlines and restrained actions informed the composition. Sources and the specific presentation choices are recorded in [DESIGN-REFERENCES.md](DESIGN-REFERENCES.md).

Generated three entirely new scenes with built-in imagegen: the coastal-apron dawn introduction, a prospective coastal flight and a medical-centre loading scene. Preserved the selected PNG masters, encoded optimized WebP website assets and JPEG print derivatives, and recorded every exact generation prompt in [ARTWORK-V2.md](ARTWORK-V2.md). Inspected all three selected scenes; none has a visible Gemini watermark or corner mark. The medical scene uses anonymous crew preparing an empty litter at an unbranded prospective facility.

Rebuilt the homepage introduction around full-screen artwork and large uppercase program-name typography, retaining the explicit MALUS introduction and hydrogen-electric medical description. Added large aircraft and medical story chapters, and replaced the aircraft page's opening with a full-screen coastal-flight composition. The medical mission, cabin and journey pages use their own relevant scenes. Phone layouts preserve the aircraft silhouette with separate image placement and soft CSS fades; short laptop and large-display compositions were also reviewed. Existing diagrams and on-demand aircraft/airflow controls remain available.

All visible legacy exterior-image references have been replaced, including model posters, related-page thumbnails, the social card and the six-page program brief. Figures reserve the actual 1672 × 941 asset proportions. Earlier source assets remain preserved. Regenerated and rendered all six PDF pages and inspected the cover, aircraft and medical pages at full review size; the final PDF is approximately 1 MB.

Validation: the production build and its TypeScript checks passed; all 11 flow/geometry regressions passed; formatting and whitespace checks passed. The full 54-check desktop/mobile suite passed 51 checks with one intentional desktop skip of the mobile-menu test. Two mobile checks initially failed: a viewport-sweep timeout and a native horizontal-scrolling assertion. Both passed in an isolated fresh-browser recheck without changing drawing behavior. After the final figure-proportion correction, all 16 affected-page, resource, navigation, responsive-boundary and drawing checks passed on the main production preview. A subsequent large-screen heading-width adjustment was built and visually verified.

Refreshed 17 desktop/mobile review images in `docs/previews`, including the homepage, both cinematic chapters, aircraft introduction, all medical pages, inline airflow and the studio. The capture review reported no page errors. The original performance timings recorded earlier in this document predate this artwork and should not be treated as a new cinematic-page benchmark.

The completed site runs at `http://localhost:3000` through the `malus-taraka-preview` user service. The temporary port-3001 verification service has been stopped.
