import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

const NAV_OFFSET = 24;
const scrollEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Mounts a global Lenis instance for buttery scroll.
 * Disabled automatically for native mobile scrolling and reduced motion.
 */
const SmoothScroll = () => {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersNativeMobileScroll = window.matchMedia(
      "(max-width: 767px), (max-width: 1023px) and (pointer: coarse)",
    ).matches;

    const lenis = prefersReduced || prefersNativeMobileScroll
      ? null
      : new Lenis({
          duration: 1.15,
          easing: scrollEasing,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
        });

    let rafId = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    if (lenis) rafId = requestAnimationFrame(raf);

    const snapMedia = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    let sectionSnap: Snap | null = null;
    let snapSetupFrame = 0;

    const configureSectionSnap = () => {
      sectionSnap?.destroy();
      sectionSnap = null;

      if (!lenis || !snapMedia.matches) return;

      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-swipe-page]"));
      if (!sections.length) return;

      sectionSnap = new Snap(lenis, {
        type: "proximity",
        duration: 0.68,
        easing: scrollEasing,
        distanceThreshold: "24%",
        debounce: 140,
      });
      sectionSnap.addElements(sections, { align: "start", ignoreTransform: true });
    };

    if (lenis) snapSetupFrame = requestAnimationFrame(configureSectionSnap);
    snapMedia.addEventListener("change", configureSectionSnap);

    const scrollToHash = (hash: string) => {
      const id = decodeURIComponent(hash.slice(1));
      const target = id === "top" ? document.getElementById("top") : document.getElementById(id);
      if (!target) return;

      const top = id === "top" ? 0 : window.scrollY + target.getBoundingClientRect().top - NAV_OFFSET;
      const nextHash = `#${id}`;

      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }

      const dispatchSectionChange = () => {
        window.dispatchEvent(new CustomEvent("portfolio:section-change", { detail: nextHash }));
      };

      dispatchSectionChange();

      if (lenis) {
        lenis.scrollTo(top, {
          duration: 1.05,
          easing: scrollEasing,
          lock: false,
          onComplete: dispatchSectionChange,
        });
      } else {
        window.scrollTo({
          top,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      }
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href^='#']")
        : null;
      const hash = anchor?.getAttribute("href");
      if (!anchor || !hash || hash === "#") return;

      event.preventDefault();
      scrollToHash(hash);
    };

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      snapMedia.removeEventListener("change", configureSectionSnap);
      if (snapSetupFrame) cancelAnimationFrame(snapSetupFrame);
      sectionSnap?.destroy();
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
