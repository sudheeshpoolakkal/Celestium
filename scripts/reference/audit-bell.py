"""Create a compact Bell sitemap inventory for the Celestium reference review.

Existing cached pages are reused. Run with --sitemap and --cache to inspect an
already downloaded snapshot without network access.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
SITEMAP_URL = "https://www.bellflight.com/sitemap.xml"


class Headings(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.in_heading = False
        self.title = []
        self.headings = []

    def handle_starttag(self, tag, attrs):
        if tag == "title":
            self.in_title = True
        if tag in ("h1", "h2", "h3"):
            self.in_heading = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag in ("h1", "h2", "h3"):
            self.in_heading = False

    def handle_data(self, data):
        if self.in_title:
            self.title.append(data)
        if self.in_heading and data.strip():
            self.headings.append(data.strip())


def download(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 (Celestium design reference)"})
    with urlopen(request, timeout=35) as response:
        return response.read().decode("utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache", type=Path, default=Path("/tmp/celestium-bell-reference"))
    parser.add_argument("--sitemap", type=Path, help="Use a saved sitemap instead of downloading it")
    parser.add_argument("--output", type=Path, default=ROOT / "docs/reference/bell-inventory.json")
    args = parser.parse_args()
    args.cache.mkdir(parents=True, exist_ok=True)
    sitemap = args.sitemap or args.cache / "sitemap.xml"
    if not sitemap.exists():
        if args.sitemap:
            parser.error(f"Saved sitemap does not exist: {sitemap}")
        sitemap.write_text(download(SITEMAP_URL))
    urls = [item.text for item in ET.parse(sitemap).getroot().iter() if item.tag.endswith("loc")]
    if any(urlparse(url).netloc != "www.bellflight.com" for url in urls):
        parser.error("This tool expects the Bell page sitemap, not a sitemap index or another domain")

    def inspect(url):
        path = urlparse(url).path or "/"
        cache = args.cache / ((path.strip("/") or "home").replace("/", "__") + ".html")
        try:
            if not cache.exists():
                cache.write_text(download(url))
            headings = Headings()
            headings.feed(cache.read_text())
            return dict(url=url, path=path, status=200, title="".join(headings.title), headings=headings.headings)
        except Exception as error:
            return dict(url=url, path=path, status="error", error=str(error))

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        result = list(pool.map(inspect, urls))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n")
    successful = sum(item["status"] == 200 for item in result)
    print(f"Reviewed {len(result)} pages; {successful} successful. Saved {args.output}")
    if successful != len(result):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
