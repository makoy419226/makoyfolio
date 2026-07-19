import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#top");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLockUntil = useRef(0);

  const holdActive = (hash: string) => {
    activeLockUntil.current = performance.now() + 2200;
    setActive(hash);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    let rafId = 0;
    const updateActive = () => {
      rafId = 0;
      if (performance.now() < activeLockUntil.current) return;

      if (window.scrollY < 160) {
        setActive("#top");
        return;
      }

      const marker = window.scrollY + 140;
      const current = sections.reduce((match, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        return sectionTop <= marker ? `#${section.id}` : match;
      }, "#top");
      setActive(current);
    };

    const scheduleUpdate = () => {
      if (!rafId) rafId = requestAnimationFrame(updateActive);
    };

    const onSectionChange = (event: Event) => {
      const hash = (event as CustomEvent<string>).detail;
      if (hash) holdActive(hash);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("portfolio:section-change", onSectionChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("portfolio:section-change", onSectionChange);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.38, ease: [0.2, 0, 0, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <nav
        aria-label="Primary navigation"
        className={cn(
          "material-app-bar mx-auto flex max-w-7xl items-center justify-between px-3 py-2 transition-all duration-300 sm:px-4",
          scrolled
            ? "material-app-bar--raised"
            : "material-app-bar--resting"
        )}
      >
        <a
          href="#top"
          onClick={() => holdActive("#top")}
          className="material-brand flex min-h-12 items-center gap-3 rounded-2xl px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Mark Angelou Egam Idusma — home"
        >
          <span className="material-brand__mark">MI</span>
          <span className="hidden sm:block">
            <span className="block whitespace-nowrap font-display text-sm font-semibold leading-tight">Mark Angelou Egam Idusma</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Computer Engineer</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className="relative">
                <a
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

        <div className="flex items-center gap-1">
          <a
            href="#cv"
            onClick={() => holdActive("#education")}
            className="material-tonal-button hidden min-h-12 items-center rounded-full px-5 text-sm font-semibold sm:inline-flex"
          >
            View CV
          </a>
          <button
            type="button"
            className="material-icon-button inline-flex h-12 w-12 items-center justify-center rounded-full lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 -z-10 bg-foreground/30 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-navigation"
              className="material-nav-sheet mx-auto mt-2 max-w-7xl p-3 lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {links.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => holdActive(link.href)}
                        className={cn(
                          "material-mobile-link flex min-h-12 items-center rounded-2xl px-4 text-sm font-medium",
                          isActive && "material-mobile-link--active"
                        )}
                        aria-current={isActive ? "location" : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
