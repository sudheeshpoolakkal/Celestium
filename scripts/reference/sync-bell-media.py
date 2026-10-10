"""Restore only the reviewed Bell assets listed in the checked-in manifest.

Usage: python3 scripts/reference/sync-bell-media.py --download-missing
Requires Pillow with AVIF/WebP support, and ffmpeg for the two animation files.
Existing files are verified rather than replaced. Re-review a changed source.
"""
import argparse
import hashlib
import json
import pathlib
import subprocess
import tempfile
import urllib.request

REPO = pathlib.Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--download-missing', action='store_true')
args = parser.parse_args()
manifest = json.loads((REPO / 'docs/reference/bell-media.json').read_text())
failures = []
for item in manifest:
    destination = REPO / 'public' / item['path'].lstrip('/')
    if not destination.exists():
        if not args.download_missing:
            failures.append('Missing: ' + item['path'])
            continue
        destination.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix='celestium-reference-') as folder:
            source = pathlib.Path(folder) / ('reference.gif' if destination.suffix == '.mp4' else 'reference.image')
            request = urllib.request.Request(item['originalUrl'], headers={'User-Agent': 'Mozilla/5.0 (Celestium reference restoration)'})
            with urllib.request.urlopen(request, timeout=60) as response:
                source.write_bytes(response.read())
            if destination.suffix == '.mp4':
                subprocess.run(['ffmpeg', '-y', '-i', str(source), '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(destination)], check=True)
            else:
                from PIL import Image
                picture = Image.open(source).convert('RGB')
                picture.thumbnail((item['width'], item['height']))
                picture.save(destination, 'WEBP', quality=86, method=6)
        print('Restored; visually re-review:', item['path'])
    digest = hashlib.sha256(destination.read_bytes()).hexdigest()
    if digest != item['sha256']:
        failures.append('Review required (hash differs): ' + item['path'])
    else:
        print('Verified:', item['path'])
if failures:
    raise SystemExit('\n'.join(failures))
