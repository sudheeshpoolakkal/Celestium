"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MEGA_NAV, FOUNDATION_LINKS } from "@/lib/celestium";
import { ALL_ROUTES } from "@/lib/routes";
import { SITE } from "@/lib/site";
import { ArrowUpRight, ArrowRight, Download } from "./icons";
import { CelestiumMark } from "./celestium-mark";
import { BrandMark as Mark } from "./brand-mark";

export function Chrome({
  tone = "solid",
  children,
}: {
  tone?: "solid" | "overlay";
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routeCategory = ALL_ROUTES.find((route) => route.path === pathname)?.category;
  const navigationCategory = routeCategory === "Journal" ? "Company" : routeCategory;
  const previousPathname = useRef(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [group, setGroup] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const header = useRef<HTMLElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const expanded = mobileOpen || group !== null || searchOpen;
  const searchLinks = Array.from(
    new Map(
      [
        ...FOUNDATION_LINKS,
        ...ALL_ROUTES.map((r) => ({ label: r.label, href: r.path })),
        ...MEGA_NAV.flatMap((g) => g.columns.flatMap((c) => c.links)),
      ].map((l) => [l.href, l]),
    ).values(),
  );
  const results = searchLinks
    .filter((link) =>
      `${link.label} ${link.href} ${("note" in link && link.note) || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 10);

  const close = () => {
    setMobileOpen(false);
    setGroup(null);
    setSearchOpen(false);
  };
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      close();
      setQuery("");
      previousPathname.current = pathname;
    }
  }, [pathname]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const priorOverflow = document.body.style.overflow;
    if (mobileOpen || searchOpen) document.body.style.overflow = "hidden";
    if (searchOpen) searchInput.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        requestAnimationFrame(() => trigger.current?.focus());
      }
      if (e.key !== "Tab") return;
      const items = Array.from(
        (searchOpen
          ? header.current?.querySelector(".c-search-panel")
          : header.current
        )?.querySelectorAll<HTMLElement>("a[href], button, input") ?? [],
      ).filter(
        (el) => el.getClientRects().length > 0 && !el.hasAttribute("disabled") && !el.closest("[inert]"),
      );
      const first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1100 && mobileOpen) close();
    };
    window.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [expanded, mobileOpen, searchOpen]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header
        ref={header}
        className={`site-header celestium-header ${tone === "overlay" && !scrolled && !expanded ? "c-header-overlay" : "c-header-solid"} ${scrolled ? "header-scrolled" : ""} ${mobileOpen ? "c-menu-open" : ""}`}
      >
        <div className="c-header-inner">
          <Link href="/" className="c-brand" aria-label="Celestium home" onClick={close}>
            <CelestiumMark />
            <span>
              CELESTIUM<small>A NEW ERA OF FLIGHT</small>
            </span>
          </Link>
          <nav
            className="c-primary-nav"
            id="primary-navigation"
            aria-label="Primary"
            inert={searchOpen || undefined}
          >
            {MEGA_NAV.map((item, i) => (
              <div className="c-nav-group" key={item.label}>
                <button
                  className="c-nav-trigger"
                  aria-expanded={group === i}
                  aria-controls={group === i ? `mega-${i}` : undefined}
                  data-current={navigationCategory === item.label || undefined}
                  onClick={(e) => {
                    trigger.current = e.currentTarget;
                    setGroup(group === i ? null : i);
                    setSearchOpen(false);
                  }}
                >
                  {item.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                    <path d="m1 1 4 4 4-4" stroke="currentColor" />
                  </svg>
                </button>
                {group === i && (
                  <div className="c-mega" id={`mega-${i}`}>
                    <div className="c-mega-intro">
                      <span className="c-eyebrow">{item.eyebrow}</span>
                      <Link href={item.href} onClick={close}>
                        {item.label}
                        <ArrowUpRight />
                      </Link>
                      <p>{item.description}</p>
                      <div className="c-mega-image">
                        <Image src={item.image} alt="" fill sizes="300px" />
                      </div>
                    </div>
                    {item.columns.map((column) => (
                      <div className="c-mega-column" key={column.title}>
                        <p>{column.title}</p>
                        {column.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={close}
                            aria-current={pathname === link.href ? "page" : undefined}
                          >
                            <span>
                              {link.label}
                              {link.note && <small>{link.note}</small>}
                            </span>
                            <ArrowUpRight size={15} />
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link className="c-mobile-contact" href="/contact" onClick={close}>
              Let’s talk <ArrowUpRight />
            </Link>
          </nav>
          <div className="c-header-actions" inert={searchOpen || undefined}>
            <button
              className="c-search-trigger"
              aria-label="Search Celestium"
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setSearchOpen(true);
                setGroup(null);
                setMobileOpen(false);
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.5" />
                <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <Link className="c-header-contact" href="/contact">
              Let’s talk <ArrowUpRight size={16} />
            </Link>
            <button
              id="menu-toggle"
              className="c-menu-toggle"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="primary-navigation"
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setMobileOpen(!mobileOpen);
                setGroup(null);
                setSearchOpen(false);
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <noscript>
          <nav className="c-noscript-nav" aria-label="Primary without JavaScript">
            {MEGA_NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/program">MALUS program</Link>
            <Link href="/aircraft">Taraka X-1</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </noscript>
        {searchOpen && (
          <div
            className="c-search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search the Celestium website"
          >
            <div className="c-search-top">
              <label htmlFor="site-search">Find your flight path.</label>
              <button
                aria-label="Close search"
                onClick={() => {
                  setSearchOpen(false);
                  requestAnimationFrame(() => trigger.current?.focus());
                }}
              >
                ×
              </button>
            </div>
            <input
              ref={searchInput}
              id="site-search"
              type="search"
              value={query}
              placeholder="Aircraft, missions, technology…"
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <p className="c-search-count" role="status">
              {query ? `${results.length} matching destinations` : "Explore popular destinations"}
            </p>
            <div className="c-search-results">
              {results.map((link) => (
                <Link key={link.href} href={link.href} onClick={close}>
                  {link.label}
                  <ArrowUpRight size={18} />
                </Link>
              ))}
              {!results.length && (
                <p>No destinations match “{query}”. Try “medical”, “tiltrotor” or “research”.</p>
              )}
            </div>
          </div>
        )}
      </header>
      {expanded && (
        <button className="c-menu-backdrop" aria-label="Dismiss navigation" tabIndex={-1} onClick={close} />
      )}
      <main id="content" tabIndex={-1} inert={expanded || undefined}>
        {children}
      </main>
      <footer className="c-footer" inert={expanded || undefined}>
        <div className="c-container c-footer-heading">
          <span className="c-eyebrow">A purpose for every flight.</span>
          <Link href="/contact">
            The next horizon
            <br />
            starts with a conversation.
            <ArrowUpRight />
          </Link>
        </div>
        <div className="c-container c-footer-grid">
          <div className="c-footer-brand">
            <Link href="/" className="c-brand" aria-label="Celestium home">
              <CelestiumMark />
              <span>
                CELESTIUM<small>A NEW ERA OF FLIGHT</small>
              </span>
            </Link>
            <p>
              Aircraft research.
              <br />
              Mission-driven engineering.
              <br />
              Possibilities beyond the runway.
            </p>
            <a href={SITE.brief} download className="c-footer-download">
              MALUS program brief <Download size={17} />
            </a>
          </div>
          {MEGA_NAV.map((item) => (
            <div className="c-footer-column" key={item.label}>
              <Link className="c-footer-label" href={item.href}>
                {item.label}
              </Link>
              {item.columns
                .flatMap((c) => c.links)
                .filter((l) => l.href !== item.href)
                .slice(0, 5)
                .map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
            </div>
          ))}
        </div>
        <div className="c-container c-footer-bottom">
          <span>© {new Date().getFullYear()} Celestium</span>
          <div>
            <Link href="/legal">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/media-credits">Media credits</Link>
            <Link href="/site-directory">Site directory</Link>
          </div>
          <a href="#content" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
        <div className="c-container c-footer-note">
          Celestium is a concept-development initiative. Aircraft performance figures are research targets.
          Bell aircraft appear as credited technology references.
        </div>
      </footer>
    </>
  );
}
export { Mark };
