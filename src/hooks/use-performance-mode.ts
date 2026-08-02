import { useEffect, useState } from "react";

type NavigatorWithDeviceHints = Navigator & {
  deviceMemory?: number;
  connection?: EventTarget & { saveData?: boolean };
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const readPerformanceMode = () => {
  if (typeof window === "undefined") {
    return { reducedMotion: false, lowPower: false };
  }

  const deviceNavigator = navigator as NavigatorWithDeviceHints;
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const lowPower = Boolean(
    deviceNavigator.connection?.saveData
      || (deviceNavigator.deviceMemory && deviceNavigator.deviceMemory <= 4)
      || (deviceNavigator.hardwareConcurrency && deviceNavigator.hardwareConcurrency <= 4),
  );

  return { reducedMotion, lowPower };
};

export const usePerformanceMode = () => {
  const [mode, setMode] = useState(readPerformanceMode);

  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const deviceNavigator = navigator as NavigatorWithDeviceHints;
    const connection = deviceNavigator.connection;
    const update = () => setMode(readPerformanceMode());

    update();
    motionQuery.addEventListener("change", update);
    connection?.addEventListener("change", update);

    return () => {
      motionQuery.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
    };
  }, []);

  return {
    ...mode,
    allowEnhancedMotion: !mode.reducedMotion && !mode.lowPower,
  };
};

export const PerformanceMode = () => {
  const { reducedMotion, lowPower } = usePerformanceMode();

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.performance = lowPower ? "low" : "high";
    root.dataset.motion = reducedMotion ? "reduced" : "full";
  }, [lowPower, reducedMotion]);

  return null;
};
