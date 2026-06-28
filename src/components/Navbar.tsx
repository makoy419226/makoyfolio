import { useEffect, useState } from "react";
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
  const [active, setActive] = useState<string>(links[0].href);

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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
          "flex items-center gap-1 sm:gap-2 rounded-full px-3 sm:px-4 py-2 transition-all duration-500",
          scrolled
            ? "glass-strong ring-glow scale-100"
            : "glass scale-[0.98]"
        )}
      >
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight px-3 py-1.5 rounded-full bg-gradient-accent text-white"
          aria-label="Home"
        >
          MA<span className="opacity-70">.</span>
        </a>
        <ul className="hidden md:flex items-center">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onClick={() => setActive(l.href)}
                  className={cn(
                    "relative z-10 inline-block px-3 py-1.5 text-sm rounded-full transition-colors duration-300",
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
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
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#contact"
          className="ml-1 hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background/40 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          Let's talk
          <span aria-hidden>→</span>
        </a>
      </nav>
    </motion.header>
  );
};

export default Navbar;