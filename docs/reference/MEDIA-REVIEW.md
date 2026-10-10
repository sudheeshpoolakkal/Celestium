# Bell media review

Reviewed 8 October 2026. The website retains **16 WebP images and two MP4 concept animations** (approximately 4 MB in total). Sources were taken from Bell’s publicly displayed site assets and are hosted locally.

The checked-in `bell-media.json` records each retained asset’s original URL, source page, dimensions, ownership statement, visual-review note and SHA-256 hash. `bell-rejected-media.json` records the closer-review exclusions; those files are absent from the website’s public media folder.

## Selection rule

Use aircraft, system hardware, empty cabins, empty cockpits, aircraft concept renders and aerial landscapes. Exclude images with visible ground crews, rescue personnel, passengers or identifiable cockpit occupants. The closer review also excluded ambiguous occupant silhouettes rather than treating a small thumbnail as evidence that no people were present.

A visual screen is limited to the source resolution. It does not establish who may have been aboard an aircraft outside visible detail. Source aircraft and cabins remain Bell references and are labelled as such.

## Motion

The two original GIF sequences on the official HSVTOL page were converted to H.264 MP4 with no audio. Representative frames across the sequences were inspected. Their controls start paused, use an explicit play action, and pause when outside the viewport. The animation descriptions distinguish illustrative concept media from validated flight or downwash data.

## Source ownership

Copyright remains with Bell Textron Inc. and the respective source owners. Public availability does not establish a reuse licence. The retained manifest and source links support review before public deployment. There is no stated affiliation between Celestium and Bell. Bell imagery is never presented as a photograph of Taraka X-1.

## Restoring assets

Run `python3 scripts/reference/sync-bell-media.py` to verify the existing media hashes. The optional `--download-missing` restores missing files from the manifest’s exact original URLs. It requires network access, Pillow with AVIF/WebP support and ffmpeg. A restored file may differ after compression or source changes; the script reports a hash mismatch for explicit review rather than silently updating the manifest.

Run `npm run check-site` to verify that all assets are manifested, no rejected assets remain in the public folder, and each source mapping has a real Celestium destination.
