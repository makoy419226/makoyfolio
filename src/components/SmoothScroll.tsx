import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const DESKTOP_SMOOTH_SCROLL = "(min-width: 768px) and (hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const NAV_OFFSET = -104;

const scrollEasing = (progress: number) => 1 - Math.pow(1 - progress, 3);

const SmoothScroll = () => {
  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_SMOOTH_SCROLL);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION);
    let lenis: Lenis | null = null;

    const configure = () => {
      lenis?.destroy();
      lenis = null;

      if (!desktopQuery.matches || reducedMotionQuery.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        duration: 0.72,
        easing: scrollEasing,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        anchors: {
          offset: NAV_OFFSET,
          duration: 0.72,
          easing: scrollEasing,
          lock: false,
        },
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    desktopQuery.addEventListener("change", configure);
    reducedMotionQuery.addEventListener("change", configure);

    return () => {
      desktopQuery.removeEventListener("change", configure);
      reducedMotionQuery.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
