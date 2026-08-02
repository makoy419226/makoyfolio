import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePerformanceMode } from "@/hooks/use-performance-mode";

type Variant = "up" | "fade" | "scale" | "left" | "right" | "lift" | "blur";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  amount?: number;
  once?: boolean;
  duration?: number;
}

const Reveal = ({
  children,
  variant = "up",
  delay = 0,
  className,
  amount = 0.12,
  once = true,
  duration = 0.44,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion, lowPower } = usePerformanceMode();
  const [visible, setVisible] = useState(reducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: amount, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, once, reducedMotion]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-visible={visible}
      data-low-power={lowPower || undefined}
      className={cn("motion-reveal", className)}
      style={{
        transitionDelay: `${Math.max(0, delay) * 1000}ms`,
        transitionDuration: `${Math.max(0.18, duration)}s`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
