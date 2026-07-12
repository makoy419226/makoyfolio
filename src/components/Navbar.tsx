import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
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
  const activeLockUntil = useRef(0);

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
        return section.offsetTop <= marker ? `#${section.id}` : match;
      }, "#about");
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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          "flex w-max max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto overscroll-x-contain rounded-full px-3 py-2 transition-all duration-500 sm:gap-2 sm:px-4 md:max-w-none md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          scrolled
            ? "glass-strong ring-glow scale-100"
            : "glass scale-[0.98]"
        )}
      >
        <ul className="flex flex-none items-center">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className="relative">
                <motion.a
                  href={l.href}
                  onClick={() => holdActive(l.href)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative z-10 inline-block whitespace-nowrap px-3 py-1.5 text-sm rounded-full transition-colors duration-300",
                    !isActive && "hover-link-line",
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-accent shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Navbar;
