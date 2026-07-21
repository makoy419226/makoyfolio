import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#top");
  const activeLockUntil = useRef(0);
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);
  const navScrollRef = useRef<HTMLDivElement | null>(null);

  const holdActive = (hash: string) => {
    activeLockUntil.current = performance.now() + 2200;
    setActive(hash);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const centerActiveLink = () => {
      const container = navScrollRef.current;
      const activeLink = activeLinkRef.current;
      if (!container || !activeLink) return;

      if (window.innerWidth >= 1024) {
        container.scrollTo({ left: 0, behavior: "auto" });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const activeLinkRect = activeLink.getBoundingClientRect();
      const centeredLeft = container.scrollLeft
        + activeLinkRect.left
        - containerRect.left
        - (container.clientWidth - activeLinkRect.width) / 2;
      const safeLeft = Math.max(0, Math.min(container.scrollWidth - container.clientWidth, centeredLeft));

      if (Math.abs(container.scrollLeft - safeLeft) < 1) return;

      container.scrollTo({
        left: safeLeft,
        behavior: "auto",
      });
    };

    const frameId = requestAnimationFrame(centerActiveLink);
    window.addEventListener("resize", centerActiveLink);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", centerActiveLink);
    };
  }, [active]);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    let rafId = 0;
    let sectionPositions: Array<{ id: string; top: number }> = [];

    const updateActive = () => {
      rafId = 0;
      if (performance.now() < activeLockUntil.current) return;

      if (window.scrollY < 160) {
        setActive("#top");
        return;
      }

      const marker = window.scrollY + 140;
      const current = sectionPositions.reduce((match, section) => {
        return section.top <= marker ? `#${section.id}` : match;
      }, "#top");
      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(updateActive);
    };

    const measureSections = () => {
      sectionPositions = sections.map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + window.scrollY,
      }));
      scheduleUpdate();
    };

    const layoutObserver = new ResizeObserver(measureSections);
    sections.forEach((section) => layoutObserver.observe(section));

    measureSections();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", measureSections);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      layoutObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", measureSections);
    };
  }, []);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          "material-app-bar mx-auto flex max-w-7xl flex-nowrap items-center gap-2 px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "material-app-bar--raised"
            : "material-app-bar--resting"
        )}
      >
        <a
          href="#top"
          onClick={() => holdActive("#top")}
          className="material-brand hidden min-h-12 items-center gap-3 rounded-2xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
          aria-label="Mark Angelou Egam Idusma — home"
        >
          <span className="material-brand__mark">MI</span>
          <span className="block">
            <span className="block whitespace-nowrap font-display text-sm font-semibold leading-tight">Mark Angelou Egam Idusma</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Computer Engineer</span>
          </span>
        </a>

        <div ref={navScrollRef} className="material-nav-scroll min-w-0 flex-1">
          <ul className="flex w-max min-w-full items-center justify-center gap-2 lg:gap-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href} className="relative">
                  <a
                    ref={isActive ? activeLinkRef : undefined}
                    href={l.href}
                    onClick={() => holdActive(l.href)}
                    className={cn(
                      "material-nav-link relative inline-flex min-h-12 items-center whitespace-nowrap rounded-full px-3 text-sm font-medium",
                      isActive ? "material-nav-link--active" : "text-muted-foreground"
                    )}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <a
            href="#cv"
            onClick={() => holdActive("#education")}
            className="material-tonal-button inline-flex min-h-12 items-center rounded-full px-5 text-sm font-semibold"
          >
            View CV
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
