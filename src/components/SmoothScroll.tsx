import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

const ENABLE_SMOOTH_SCROLL =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const scrollEasing = (progress: number) => 1 - Math.pow(1 - progress, 3);

const SmoothScroll = () => {
  const { allowEnhancedMotion } = usePerformanceMode();

  useEffect(() => {
    const mediaQuery = window.matchMedia(ENABLE_SMOOTH_SCROLL);
    let lenis: Lenis | null = null;

    const configure = () => {
      lenis?.destroy();
      lenis = null;

      if (!mediaQuery.matches || !allowEnhancedMotion) return;

      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.14,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        anchors: {
          duration: 0.7,
          easing: scrollEasing,
          lock: false,
        },
        stopInertiaOnNavigate: true,
      });
    };

    configure();
    mediaQuery.addEventListener("change", configure);

    return () => {
      mediaQuery.removeEventListener("change", configure);
      lenis?.destroy();
    };
  }, [allowEnhancedMotion]);

  return null;
};

export default SmoothScroll;
